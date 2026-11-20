import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
execFileSync(process.execPath,['scripts/build.mjs']);
const root=resolve('dist');
const read=p=>readFileSync(join(root,p),'utf8');
const pages=['index.html','aluno/index.html','app/index.html','privacidade.html','404.html'];
function list(dir) {return readdirSync(dir).flatMap(n=>statSync(join(dir,n)).isDirectory()?list(join(dir,n)):[join(dir,n)]);}

test('página inicial permanece institucional e não redireciona para a plataforma',()=>{
 const html=read('index.html');
 assert.match(html,/<title>Sayford \| Escola de inglês online para adultos<\/title>/);
 const main=html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
 assert.doesNotMatch(main,/Quem acompanha você|Olá, eu sou Michael|id="professor"|assets\/michael/);
 assert.doesNotMatch(html,/http-equiv="refresh"|location\s*=/);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.match(html,/href="\/aluno\/"/);
 assert.doesNotMatch(html,/chatgpt\.site|mafr12hs@gmail|fonts\.google/);
});
test('as quatro imagens da campanha original e a moldura foram preservadas',()=>{
 const approved={
  "campanha-escola.webp": "db3b109c4589d2f51fa45ef42649ed0f6e45d25a729b4963190aa0e4adc0ea5d",
  "campanha-escola-mobile.webp": "dea0c94a7461ae0cc6444ec3fe592f413abb3ba25692b81f772f19e0e7dcee82",
  "campanha-horarios.webp": "3e066dcef58a21af4e0ef887fd6a010e6211abb0cc9dfb98e34b9b7733fd9c36",
  "campanha-horarios-mobile.webp": "562176d977cff8feaa7c67f3d7d20b34c7c2108bca783418d269e807df77108a"
};
 for(const [file,hash] of Object.entries(approved)) assert.equal(createHash('sha256').update(readFileSync(join(root,'assets',file))).digest('hex'),hash);
 assert.match(read('assets/sayford.css'),/\.hero-slide::before[^}]*border: 1px solid/);
});
test('todos os assets e links internos das páginas existem',()=>{
 for(const page of pages) {
  const html=read(page);
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
  assert.equal(ids.size,[...html.matchAll(/\bid="([^"]+)"/g)].length,`IDs repetidos: ${page}`);
  for(const [,raw] of html.matchAll(/\b(?:href|src|srcset)="([^"]+)"/g)) {
   const url=raw.split(/\s/)[0];
   if (/^(?:https?:|mailto:|data:)/.test(url)) continue;
   if(url.startsWith('#')) {assert.ok(ids.has(url.slice(1)),`${page}: ${url}`);continue;}
   let file=url.startsWith('/')?join(root,url):resolve(root,dirname(page),url);
   if(url.endsWith('/'))file=join(file,'index.html');
   assert.ok(existsSync(file),`${page}: falta ${url}`);
  }
 }
});
test('fontes são locais e o pacote público não inclui retratos, fontes internas ou arquivos de auditoria',()=>{
 const files=list(root);
 assert.ok(files.some(f=>f.endsWith('inter-latin.woff2')));
 assert.ok(files.some(f=>f.endsWith('fraunces-latin.woff2')));
 assert.equal(files.filter(f=>/michael|about\.png|LEIAME|\.zip$|\.mjs$|\.test\.|\.git|site\.config/.test(f)).length,0);
 assert.doesNotMatch(read('assets/sayford.css'),/https?:\/\//);
 assert.match(read('assets/sayford.css'),/font-display: swap/);
});
test('Área do aluno mantém acesso real e identifica corretamente o estágio dos aplicativos',()=>{
 const aluno=read('aluno/index.html'), app=read('app/index.html');
 assert.match(aluno,/noindex, nofollow/);
 assert.match(aluno,/data-platform-link href="https:\/\/sayford-estudos-piloto\.aridfawn2\.chatgpt\.site\/"/);
 assert.match(aluno,/conta do ChatGPT/);
 assert.equal((aluno.match(/ disabled>/g)||[]).length,2);
 assert.doesNotMatch(aluno,/<form|Instalar app|Adicionar à Tela/);
 assert.match(app,/url=\/aluno\//);
 assert.doesNotMatch(app,/chatgpt\.site/);
 assert.match(read('_redirects'),/^\/app\/ \/aluno\/ 302$/m);
});
test('metadados e navegação para contato não omitem o objetivo do aluno',()=>{
 const html=read('index.html');
 const desc=html.match(/name="description" content="([^"]+)"/)[1];
 assert.ok(desc.length>=150&&desc.length<=160,`${desc.length} caracteres`);
 assert.match(html,/property="og:image:alt"/);
 assert.match(html,/name="twitter:title"/);
 assert.match(html,/name="twitter:description"/);
 for(const [,href] of html.matchAll(/href="([^"]+)"/g)) {
  if(!href.startsWith('https://wa.me/'))continue;
  const message=new URL(href.replaceAll('&amp;','&')).searchParams.get('text');
  if(message.includes('aula experimental'))assert.equal(message,'Olá! Vim pela Sayford e quero agendar uma aula experimental. Meu objetivo com o inglês é: ');
 }
});
test('CSP é restritiva e autoriza apenas o JSON-LD exato; sitemap não expõe áreas privadas',()=>{
 const headers=read('_headers'), html=read('index.html');
 const jsonld=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
 const hash=createHash('sha256').update(jsonld).digest('base64');
 assert.match(headers,/default-src 'none'/);
 assert.ok(headers.includes(`'sha256-${hash}'`));
 assert.doesNotMatch(headers,/unsafe-inline|unsafe-eval|\{\{/);
 assert.match(headers,/microphone=\(\), camera=\(\)/);
 assert.match(headers,/X-Content-Type-Options: nosniff/);
 assert.match(read('sitemap.xml'),/https:\/\/www.sayford.com.br\//);
 assert.equal((read('sitemap.xml').match(/<loc>/g)||[]).length,1);
});

function carouselFixture() {
 const handlers={};
 const slides=Array.from({length:3},(_,i)=>({hidden:false,getAttribute:()=>`Slide ${i+1}`}));
 const dots=Array.from({length:3},()=>({attributes:{},setAttribute(k,v){this.attributes[k]=v;}}));
 const status={textContent:''};
 const controls={hidden:true,querySelectorAll:()=>dots,contains:()=>true,addEventListener:(e,f)=>{handlers[e]=f;}};
 const swipe={addEventListener:(e,f)=>{handlers[e]=f;}};
 const carousel={querySelectorAll:()=>slides,querySelector:s=>s==='.carousel-controls'?controls:s==='.carousel-status'?status:swipe,setAttribute(){}};
 const document={querySelector:()=>null,querySelectorAll:()=>[carousel]};
 vm.runInNewContext(read('assets/sayford.js'),{document,window:{matchMedia:()=>({matches:false})}});
 const click=(step,index)=>handlers.click({target:{closest:()=>({hasAttribute:k=>k==='data-carousel-slide'&&index!==undefined,dataset:index===undefined?{carouselStep:String(step)}:{carouselSlide:String(index)}})}});
 return {slides,dots,status,controls,handlers,click};
}
test('carrossel avança, volta, seleciona diretamente e retorna do último para o primeiro',()=>{
 const c=carouselFixture();
 assert.deepEqual(c.slides.map(x=>x.hidden),[false,true,true]);
 assert.equal(c.controls.hidden,false);
 c.click(1);assert.deepEqual(c.slides.map(x=>x.hidden),[true,false,true]);
 c.click(-1);assert.deepEqual(c.slides.map(x=>x.hidden),[false,true,true]);
 c.click(0,2);assert.deepEqual(c.slides.map(x=>x.hidden),[true,true,false]);
 c.click(1);assert.deepEqual(c.slides.map(x=>x.hidden),[false,true,true]);
 assert.equal(c.dots[0].attributes['aria-pressed'],'true');
});
test('carrossel funciona com teclado e gesto horizontal; gesto vertical não troca imagem',()=>{
 const c=carouselFixture();let prevented=false;
 c.handlers.keydown({key:'ArrowLeft',preventDefault(){prevented=true;}});
 assert.equal(prevented,true);assert.equal(c.slides[2].hidden,false);
 c.handlers.touchstart({touches:[{identifier:1,clientX:100,clientY:100}]});
 c.handlers.touchend({changedTouches:[{identifier:1,clientX:25,clientY:110}]});
 assert.equal(c.slides[0].hidden,false);
 c.handlers.touchstart({touches:[{identifier:1,clientX:100,clientY:100}]});
 c.handlers.touchend({changedTouches:[{identifier:1,clientX:105,clientY:230}]});
 assert.equal(c.slides[0].hidden,false);
 c.handlers.touchcancel();
 assert.doesNotMatch(read('assets/sayford.js'),/setInterval|setTimeout/);
});


test('o carrossel usa os oito prints originais íntegros, ampliáveis e com a autoria correta',()=>{
 const html=read('index.html');
 const section=html.slice(html.indexOf('<section class="section reviews"'),html.indexOf('<section class="section plans"'));
 assert.equal((section.match(/data-carousel-item/g)||[]).length,8);
 assert.equal((section.match(/data-carousel-slide=/g)||[]).length,8);
 assert.equal((section.match(/class="review-image-link"/g)||[]).length,8);
 assert.doesNotMatch(section,/ilustrativ|depoimento-estudo|depoimento-conversa|depoimento-escola/);
 assert.match(section,/Maria Alice A\./);
 const originals={
  "Final-vitor.webp": "03238909f06cf3f2a92addf536ef6d06e2dd353343f614b46685429e76b60baa",
  "isadora.webp": "73e1dffc422ea0b7e5f34c529c6ecebbfa2a88c03914e84e8f5f65094a2ae916",
  "Lara-final.webp": "fcedb2efbc3f99722e701925b74d147460639df488e487ce973cc7466d8825be",
  "Thales-Final.webp": "aceb8f08fd72013fd31f1929d779afda62239734ce1bddebd4ba9b1c88c6ac4f",
  "vivi-final.webp": "73e5b4a41aa10f11ebc0947d93c5033fb68d143388e99bb1ddf95a0030815e32",
  "ANA-FINAL.webp": "e57f57ccf5ec9fa73819da8efabdf90c511c60a89d40b4b6b3a0fd64478317cf",
  "Kleber-Final.webp": "8aea3830c02ebc194651cc1360359474d5bac87d50ddd1276ad9c5c29e26c1da",
  "Jean.webp": "94596fb55839f838cc96f4161fb60516ad9c1e1b9e3e0ada30c61f9fa4458fed"
};
 for(const [file,hash] of Object.entries(originals)) {
  assert.equal(createHash('sha256').update(readFileSync(join(root,'assets/depoimentos',file))).digest('hex'),hash);
  assert.ok(section.includes('assets/depoimentos/'+file));
 }
 assert.doesNotMatch(list(root).join('\n'),/depoimento-(?:estudo|conversa|escola)/);
});


test('a apresentação pública distingue o fundador do professor e não expõe número pessoal',()=>{
 const html=read('index.html');
 const founder=html.match(/<section class="section founder"[\s\S]*?<\/section>/)?.[0];
 assert.ok(founder,'seção do fundador ausente');
 assert.match(founder,/Michael Fonseca/);
 assert.match(founder,/Fundador e criador da Sayford/);
 assert.doesNotMatch(founder,/(?:professor Michael|seu professor Michael|CEO)/i);
 assert.match(read('assets/sayford.css'),/\.founder-layout/);
 for(const path of pages){
  const page=read(path);
  assert.doesNotMatch(page,/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/,`${path}: número pessoal com máscara de CPF`);
  assert.doesNotMatch(page,/CPF\/CNPJ|CPF [0-9]/i,`${path}: identificação pessoal indevida`);
 }
});
