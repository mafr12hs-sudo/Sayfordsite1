# Sayford — auditoria final e conteúdo preenchido

Atualização: 20 de novembro de 2026. Escopo: site institucional.

As cinco páginas geradas estão sem marcadores editoriais pendentes. A campanha aprovada, os dois banners, a moldura e os oito prints originais foram preservados. O cabeçalho usa agora a assinatura horizontal da arte original de logo aprovada pelo proprietário. As condições comerciais foram completadas usando os registros de oferta atuais e o contrato mais recente. O texto apresenta a Sayford como escola; o nome do fundador aparece somente na identificação legal e nos comentários originais dos alunos.

**Estado desta entrega:** o pacote e o logo foram aprovados pelo proprietário, e a autenticação da conta GitHub foi concluída. O envio com CPF foi recusado pela revisão automática por falta de autorização específica inequívoca para divulgar esse identificador no repositório público. Esta versão pública não contém CPF: preserva somente o nome e os contatos profissionais, cidade e UF. A identificação fiscal e o endereço profissional completo permanecem pendentes. Nenhum dado foi inventado. A publicação deve ser conferida no histórico do repositório e no build da Cloudflare.

## Decisões de conteúdo e sua fonte

| Item | Conteúdo usado | Fundamento |
| --- | --- | --- |
| Método | Preparar antes do encontro, praticar com professor e revisar depois | Documento “Visão do Fundador” e preparação já implementada |
| Princípios | Aprendizado real, acompanhamento humano, autonomia, respeito ao ritmo, correção sem constrangimento | Visão pedagógica registrada pelo fundador |
| Promessas | Evolução acompanhada; sem prazo fixo de fluência ou promessa de certificação | Contrato recente e visão do fundador |
| Individual 1x | R$ 319/mês, quatro aulas mensais de 60 minutos | Referência vigente dos planos individuais; duração do contrato |
| Individual 2x | R$ 549/mês, oito aulas mensais de 60 minutos | Oferta vigente registrada; duração regular |
| Dupla | R$ 598 pela dupla/mês, oito aulas mensais de 60 minutos | Condição registrada para dupla com dois encontros semanais |
| Experimental | Gratuita, 30 minutos | Oferta aprovada anteriormente |
| Mensalidade | Quantidade mensal contratada; mês de cinco semanas não aumenta cobrança automaticamente | Contrato e esclarecimento do proprietário |
| Reposição | Até duas remarcações mensais, aviso de quatro horas e reposição em até 30 dias; emergências de boa-fé | Contrato de prestação de serviços educacionais de 19/11/2026 |
| Cancelamento da escola | Reposição ou acerto proporcional conforme contrato | Mesmo contrato |
| Encerramento | Sem permanência mínima e sem multa rescisória; comunicação por escrito | Contrato mais recente, que supera o modelo antigo com fidelidade |
| Pagamento e aceite | Pix mensal, vencimento combinado; contrato integral enviado antes do pagamento e aceite expresso por assinatura ou mensagem | Contrato atual |
| Nível inicial | Conversa e observação na aula experimental, objetivos e acompanhamento posterior | Experimental aprovada e personalização descrita no método |
| Ferramenta ao vivo | Zoom, com orientação de acesso enviada ao aluno | Forma de trabalho já adotada |
| Responsável | Michael Fonseca, prestador identificado no contrato, Contagem/MG | Fonte contratual; não foi criado CNPJ ou razão social fictícia |
| Contato de privacidade | WhatsApp existente e e-mail profissional informado no contrato | Canais já definidos; não se presume caixa do domínio ativa |
| Autenticação | Ainda usa ChatGPT; login próprio em implantação | Estado real da plataforma |
| Voz | 60 dias, exclusão pelo aluno e acesso da equipe conforme permissões | Política e rotinas de expurgo existentes |
| Outros registros | Sem promessa de descarte automático em 60 dias; solicitações tratadas pela Direção | Comportamento observado no código |
| Operadores | Cloudflare, OpenAI na autenticação, WhatsApp/Meta e provedor de e-mail | Serviços efetivamente usados |

O contrato de uma aluna contém uma mensalidade individual de R$ 299. Esse valor específico não foi tratado como tabela geral para novos alunos nem alterado no contrato. As condições individuais já contratadas são preservadas.

## Correções técnicas e visuais

| Item | Resultado |
| --- | --- |
| Versão publicada antiga | Identificada pelo conteúdo da inicial e pelo repositório `mafr12hs-sudo/Sayfordsite1` |
| Repositório de publicação | Check público `Workers Builds: sayford-site` confirmado no commit anterior |
| Apresentação pessoal | Removida a seção de professor, foto e textos em primeira pessoa |
| Carrossel principal | Dois banners originais, troca manual por botões, indicadores, teclado e gesto |
| Depoimentos | Oito prints originais, sem recorte ou reescrita, com opção de ampliar |
| Autoria | O arquivo `Lara-final.webp` é apresentado como Maria Alice, conforme o print |
| Plataforma | Thumb de celulares e descrição pedagógica; sem prints internos do app |
| Área do aluno | Página local, acesso intencional ao ambiente existente e aplicativos com disponibilidade real |
| Fontes | Fraunces e Inter locais, com licenças e `font-display: swap` |
| Contato | Mensagem da aula experimental pede o objetivo do interessado |
| SEO | Descrição de 157 caracteres, metadados sociais, canonical e sitemap |
| Segurança | CSP com hash do JSON-LD, `nosniff`, políticas de referência e permissões, bloqueio de enquadramento |
| Pacote público | Lista fechada em `dist/`; código, ZIP e relatórios não são servidos |
| Privacidade | Texto operacional preenchido, sem ocultar o login atual ou inventar prazos e infraestrutura |

## Verificações

`npm test`: dez de dez testes aprovados. A validação estrutural das cinco páginas preenchidas foi concluída sem erros. Os recursos locais e as âncoras são verificados pela suíte. Os quatro banners desktop/mobile e os oito prints têm integridade conferida por hash.

A navegação dos carrosséis e o menu foram verificados no navegador. Início e Área do aluno foram revisados novamente com os textos finais nos layouts de 360, 390, 768 e 1440 px, sem rolagem lateral. O contraste da borda do botão outline é de 6,56:1. Não há analytics, pixels ou cookies próprios adicionados ao site.

## O que não foi concluído ou não se afirma

A autenticação do proprietário foi verificada no GitHub. A confirmação de publicação depende do commit no repositório e do resultado do deploy, sem presumir que uma etapa equivale à outra. A publicação do site foi autorizada; o CPF foi excluído desta entrega pública e depende de autorização específica. Falta informar um endereço profissional completo para identificação comercial completa. O conteúdo da privacidade não representa garantia de adequação jurídica integral, e não foram inventados países de armazenamento ou ciclos de backup dos provedores.

A migração do aplicativo, a distribuição pública de APK e a versão iPhone não fazem parte desta atualização. O site informa o estágio real e não contém login fictício. Não foram modificados DNS, e-mail ou a política técnica de voz.

## Arquivos principais

| Arquivo | Alteração |
| --- | --- |
| `index.html` | Escola, método, preços, duração, FAQ, oito avaliações e identificação legal |
| `aluno/index.html` | Acesso e identificação legal |
| `privacidade.html` | Controlador, contato, finalidades, autenticação, operadores, retenção e direitos |
| `assets/sayford.css` | Moldura, carrosséis, prints sem cortes, controles responsivos e preços |
| `assets/sayford.js` | Navegação manual, teclado e gestos |
| `assets/depoimentos/` | Oito arquivos originais obtidos do site do proprietário |
| `scripts/build.mjs` | Lista fechada de recursos e hash da CSP |
| `scripts/preview.mjs` | Revisão local, sem entrar na publicação |
| `tests/site.test.mjs` | Dez verificações de integridade, links e comportamento |
| `site.config.json` | URL central do ambiente de estudos |
| `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `404.html` | Configuração estática e tratamento de navegação |
| `wrangler.jsonc` | Build e pasta pública do Worker existente |
| `LEIAME.md`, `DECISOES.md` | Publicação, origem dos dados e restrições ainda aplicáveis |

## Publicação e restauração

O repositório correto é `mafr12hs-sudo/Sayfordsite1`, Worker `sayford-site`. Devem ser enviados os arquivos extraídos, e não somente um ZIP. O deploy executa o build e serve `dist/`. O repositório `Sayford-Site` contém uma página de redirecionamento antiga e não é a base desta entrega.

Antes das alterações, a tag `sayford-antes-auditoria-20261120` e um pacote Git verificado preservaram o commit `04e715ca3652cc75a028b05ebf3cf14fe77c3ee9`.

## Referências

Contrato de prestação de serviços educacionais atualizado em 19/11/2026; documento “Visão do Fundador”; histórico de ofertas e decisões do proprietário; código da política de voz e do acesso atual.

- https://developers.cloudflare.com/workers/static-assets/headers/
- https://developers.cloudflare.com/workers/static-assets/redirects/
- https://www2.camara.leg.br/legin/fed/decret/2013/decreto-7962-15-marco-2013-775557-publicacaooriginal-139266-pe.html
- https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm


## Limite da versão pública

A revisão automática recusou o envio dos arquivos com CPF porque a autorização de publicar o site não estabeleceu de forma inequívoca o consentimento para tornar esse documento público. A alternativa adotada exclui o CPF tanto das páginas quanto dos arquivos de fonte enviados ao GitHub. O site pode ser examinado e a publicação técnica concluída; a identificação comercial não deve ser considerada integralmente finalizada até a regularização fiscal e do endereço profissional.
