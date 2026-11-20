// Servidor de revisão, acionado exclusivamente por sites-preview. Não entra no pacote público.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname, join, sep } from 'node:path';
const root = resolve('dist');
const types = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.woff2':'font/woff2','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.ico':'image/x-icon','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8' };
const baseHeaders = {};
for (const line of readFileSync(join(root,'_headers'),'utf8').split('\n')) {
  if (!line.trim() && Object.keys(baseHeaders).length) break;
  const match = line.match(/^  ([^:]+): (.+)$/);
  if (match) baseHeaders[match[1]] = match[2];
}
createServer((req,res) => {
  const url = new URL(req.url,'http://localhost');
  if (url.pathname === '/__qa__/') {
    // Harness de viewport: apenas este servidor de testes permite enquadrar as páginas.
    const size = Number(url.searchParams.get('width'));
    const width = [360,390,768,1440].includes(size) ? size : 390;
    const page = url.searchParams.get('page') === 'aluno' ? '/aluno/' : '/';
    res.writeHead(200,{'Content-Type':types['.html'],'X-Robots-Tag':'noindex, nofollow'});
    res.end(`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Sayford · revisão ${width}px</title><style>body{margin:0;background:#ccc}iframe{display:block;border:0;width:${width}px;height:1000px}</style><iframe title="Sayford em ${width} pixels" src="${page}"></iframe></html>`);
    return;
  }
  const headers = { ...baseHeaders };
  // O domínio publicado mantém frame-ancestors 'none'; a exceção abaixo é só de QA local.
  headers['Content-Security-Policy'] = headers['Content-Security-Policy'].replace("frame-ancestors 'none'", "frame-ancestors 'self'");
  delete headers['X-Frame-Options'];
  if (/^\/app(?:\/|$)/.test(url.pathname)) {res.writeHead(302,{...headers,Location:'/aluno/'});res.end();return;}
  let file = resolve(root,'.'+decodeURIComponent(url.pathname));
  if (file !== root && !file.startsWith(root+sep)) {res.writeHead(400);res.end();return;}
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file,'index.html');
  let status = 200;
  if (!existsSync(file) || statSync(file).isDirectory() || ['_headers','_redirects'].includes(file.split(sep).at(-1))) {file=join(root,'404.html');status=404;}
  if (url.pathname.startsWith('/aluno/') || file.endsWith('/404.html') || file.endsWith('/privacidade.html')) headers['X-Robots-Tag']='noindex, nofollow';
  res.writeHead(status,{...headers,'Content-Type':types[extname(file)] || 'application/octet-stream'});
  res.end(readFileSync(file));
}).listen(Number(process.env.PORT || process.argv[process.argv.indexOf('--port') + 1] || 4173),'0.0.0.0',()=>console.log('Sayford: servidor de revisão disponível.'));
