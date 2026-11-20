# Sayford — site institucional

Esta entrega recupera os banners aprovados e apresenta a Sayford como escola, com Michael Fonseca identificado exclusivamente como fundador e criador (não como professor do site). O aplicativo e os dados dos alunos continuam separados.

## Publicar sem trocar a versão

Repositório identificado: `mafr12hs-sudo/Sayfordsite1`, branch `main`. O commit anterior tem o check `Workers Builds: sayford-site` bem-sucedido. `Sayford-Site` é o repositório antigo com redirecionamento e não deve ser usado.

Extraia o ZIP e envie os **arquivos e pastas**, não apenas o ZIP. A raiz precisa conter `index.html`, `assets/`, `aluno/`, `app/`, `package.json`, `scripts/` e `wrangler.jsonc`. Evite uma pasta extra envolvendo todo o conteúdo.

Na integração atual da Cloudflare, manter o deploy command `npx wrangler deploy`. O arquivo `wrangler.jsonc` executa `npm run build` e serve `dist/`. O nome permanece `sayford-site`; rotas e domínios ficam no painel existente. Não foi incluída migração de DNS.

## Verificar e gerar a pasta pública

Validado com Node.js 22. O build e os onze testes automatizados não precisam instalar dependências.

```bash
npm test
npm run build
```

Para validar a estrutura HTML com o validador usado na auditoria:

```bash
npm exec --yes --package=html-validate -- html-validate dist/index.html dist/aluno/index.html dist/app/index.html dist/privacidade.html dist/404.html
```

`dist/` é recriada e contém somente os arquivos públicos permitidos. Os retratos e outros arquivos antigos que ainda estejam na base do repositório não são copiados. Não configure `assets.directory` como `.`: isso publicaria arquivos que não pertencem ao site.

## Migração do aplicativo: pontos de troca

A URL do ambiente atual fica em **`site.config.json`, campo `appUrl`**. Troque para o endereço definitivo somente depois de publicar e testar o login próprio e a migração de dados. Rode `npm run build` novamente. A troca chega ao botão da Área do aluno sem redirecionar a página inicial.

Os campos `androidApkUrl` e `iphoneAppUrl` documentam disponibilidades futuras; ambos estão nulos e não ativam downloads automaticamente. Nesta versão os dois botões estão desabilitados. Ao lançar cada aplicativo, revisar e ativar explicitamente seu cartão em `aluno/index.html`, atualizar os textos da seção Plataforma e testar o arquivo/loja real. Não colocar uma URL fictícia.

Após a migração, atualizar também `privacidade.html`, especialmente a seção “Como funciona o acesso hoje”. Ela descreve o login com ChatGPT que ainda está ativo. Não apagar essa informação antes de o login próprio funcionar.

## Conteúdo preenchido e revisão de identificação

A metodologia, os preços, a duração, o FAQ e a privacidade foram preenchidos com as decisões e os documentos disponíveis. Consulte AUDITORIA_FINAL.md para a origem de cada condição. As páginas não mantêm marcadores editoriais pendentes.

Esta versão não publica o CPF do responsável nem o armazena no pacote. A identificação visível informa nome, cidade, e os canais de contato existentes. O endereço profissional completo ainda não foi informado; não foi inventado endereço ou CNPJ. Conferir com assessoria jurídica quais dados cadastrais a oferta comercial precisa divulgar antes de considerar concluída a conformidade legal.

Os oito prints de depoimentos são os arquivos originais do site do proprietário, copiados sem edição para assets/depoimentos. Os comentários podem citar o nome do fundador dentro da imagem; isso não cria uma apresentação dele como professor do visitante.

## Carrosséis e acessibilidade

A troca é manual por anterior/próximo, indicadores e teclas de direção nos controles. Gestos horizontais são aceitos no banner e nos depoimentos. Não existe troca automática. O menu móvel fecha ao navegar ou pressionar Escape. Fontes são locais, há foco visível, link de pular conteúdo e preferência de redução de movimento.

## Segurança e dados

A inicial não coleta formulários nem usa analytics. O contato é iniciado pelo visitante no WhatsApp. `_headers` inclui CSP restritiva com hash exato do JSON-LD, `nosniff`, política de referência e câmera/microfone desabilitados. `_redirects` faz `/app/` seguir para `/aluno/`, sem saída automática para o ChatGPT. `404.html` é a resposta para páginas inexistentes, conforme a configuração do Worker.

O servidor `scripts/preview.mjs` inclui um harness interno de teste responsivo em `/__qa__/`. Esse código não é copiado para `dist/` nem implantado em produção. A exceção de enquadramento existe somente nesse servidor de revisão.

## Revisão corrigida — 20/11/2026

- `index.html`: seção "Quem criou a Sayford" identifica Michael Fonseca como **fundador e criador**, sem apresentá-lo como professor.
- `index.html`, `aluno/index.html` e `privacidade.html`: CPF retirado das páginas de acesso público.
- `dist/` foi regenerada pelo build e contém as mesmas correções.
- O logo aprovado, oito prints de avaliações, campanhas, carrosséis e preços existentes não foram alterados.

**No GitHub Desktop:** extraia o ZIP, copie o conteúdo (não a pasta externa nem o ZIP) para a pasta local do repositório, preserve a pasta oculta `.git`, volte ao GitHub Desktop, clique em `Commit to main` e depois em `Push origin`. A publicação depende ainda do deploy da Cloudflare.
