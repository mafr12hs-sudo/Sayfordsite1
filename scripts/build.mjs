import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
const config = JSON.parse(readFileSync(join(root, 'site.config.json'), 'utf8'));
for (const key of ['publicOrigin', 'appUrl']) {
  const parsed = new URL(config[key]);
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new Error(`URL inválida: ${key}`);
}
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const pages = ['index.html','privacidade.html','404.html','aluno/index.html','app/index.html'];
const assets = [
  'assets/sayford-logo-aprovado.png','assets/sayford.css','assets/sayford.js','assets/sayford-icon.png','assets/apple-touch-icon.png','assets/sayford-social.jpg',
  'assets/campanha-escola.webp','assets/campanha-escola-mobile.webp','assets/campanha-horarios.webp','assets/campanha-horarios-mobile.webp',
  'assets/sayford-app-android-iphone.webp',
  'assets/depoimentos/Final-vitor.webp',
  'assets/depoimentos/isadora.webp',
  'assets/depoimentos/Lara-final.webp',
  'assets/depoimentos/Thales-Final.webp',
  'assets/depoimentos/vivi-final.webp',
  'assets/depoimentos/ANA-FINAL.webp',
  'assets/depoimentos/Kleber-Final.webp',
  'assets/depoimentos/Jean.webp',
  'assets/fonts/fraunces-latin.woff2','assets/fonts/fraunces-latin-italic.woff2','assets/fonts/inter-latin.woff2',
  'assets/fonts/OFL-Fraunces.txt','assets/fonts/OFL-Inter.txt', 'favicon.ico', 'robots.txt', 'sitemap.xml', '_redirects',
];
for (const file of [...pages, ...assets]) {
  const target = join(out, file);
  mkdirSync(dirname(target), { recursive: true });
  if (pages.includes(file)) {
    const html = readFileSync(join(root, file), 'utf8').replaceAll('{{APP_URL}}', config.appUrl.replaceAll('&','&amp;'));
    writeFileSync(target, html);
  } else cpSync(join(root, file), target);
}
const html = readFileSync(join(out, 'index.html'), 'utf8');
const jsonld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
if (!jsonld) throw new Error('Dados estruturados ausentes');
JSON.parse(jsonld);
const hash = createHash('sha256').update(jsonld).digest('base64');
writeFileSync(join(out, '_headers'), readFileSync(join(root, '_headers'), 'utf8').replace('{{STRUCTURED_DATA_HASH}}', `'sha256-${hash}'`));
console.log(`Site estático preparado: ${pages.length} páginas; sem arquivos internos ou fotos pessoais no pacote público.`);
