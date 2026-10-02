# Cronograma de 30 dias: tráfego orgânico nos EUA (Google + Pinterest)

Premissas: cerca de 1 hora por dia, custo zero, sem audiência prévia, só o mercado `/us`.

## Antes do dia 1: o relógio da Amazon
A Amazon exige **3 vendas qualificadas em 180 dias** contadas da data do seu cadastro no Associates. Se não acontecer, a conta é encerrada.

- Data do cadastro: `____/____/______`
- Prazo final (cadastro + 180 dias): `____/____/______`
- Anote o prazo na agenda e confira o contador no painel do Associates uma vez por semana.

Isso muda a estratégia: como o prazo é curto e o site é novo, o Pinterest vem primeiro (pode trazer cliques em semanas) e o Google vem como aposta de médio prazo (costuma levar meses).

## Visão geral

| Semana | Foco | Entrega principal |
|---|---|---|
| 1 | Base técnica e contas | Site no ar, Search Console, Pinterest Business com site reivindicado, boards |
| 2 | Primeiro guia novo + primeiros pins | 1 guia (presente de fim de ano) e 3 a 5 pins |
| 3 | Segundo guia + tração | 1 guia de comparação, 3 a 5 pins, primeiras respostas em Reddit e Quora |
| 4 | Terceiro guia + análise | 1 guia, 3 a 5 pins, revisão de métricas e decisão do que duplicar |

Em todas as semanas: pins dos guias e produtos já publicados continuam saindo (ver o guia do Pinterest, em `docs/pinterest-guia.md`).

Observação sobre a época: estamos no fim de setembro. O Pinterest costuma ter a procura por ideias de presente e de fim de ano começando 6 a 8 semanas antes da data, então vale publicar os guias de presente logo.

## Semana 1: publicar e abrir os canais
| Dia | Tarefa (cerca de 1h) |
|---|---|
| 1 | Conferir o site publicado: `SITE_URL` e `AMAZON_TAG` na Vercel, abrir `/us`, `/us/privacy`, `/us/terms`, clicar em um produto e ver se o botão leva à Amazon |
| 2 | Search Console: verificar o site e enviar o sitemap (`docs/search-console.md`) |
| 3 | Criar a conta Pinterest **Business** e preencher o perfil (nome, bio com palavras-chave, foto) |
| 4 | Reivindicar o site no Pinterest (variável `PINTEREST_SITE_VERIFICATION`) e validar os Rich Pins |
| 5 | Criar de 5 a 8 boards com nomes otimizados (lista no guia do Pinterest) |
| 6 | Criar as primeiras 10 imagens de pin (Canva grátis) para os 2 guias e os produtos com foto |
| 7 | Publicar 3 pins e revisar o que o Pinterest aceitou ou recusou |

Meta da semana: site verificado nos dois serviços, sitemap enviado, 5 boards criados e 3 pins no ar.

## Semana 2: primeiro guia novo
| Dia | Tarefa |
|---|---|
| 8 | Pesquisar palavra-chave: digitar o tema na busca do Pinterest e no Google e anotar as sugestões automáticas |
| 9 | Escolher de 5 a 8 produtos para o guia e montar as linhas no `catalog/us.csv` (resumo original, pontos positivos e de atenção) |
| 10 | Escrever o guia (título, introdução e a coluna `guias`), rodar `npm run import` e publicar (commit e push) |
| 11 | Pedir a indexação do guia no Search Console e criar 3 a 5 imagens de pin para ele |
| 12 | Publicar 2 pins do guia e 1 do produto principal |
| 13 | Publicar mais 1 a 2 pins; responder 2 perguntas no Quora sobre o tema (sem link de afiliado) |
| 14 | Checagem de métricas (checklist abaixo) |

Sugestão de guia: presentes de cozinha e utilidades para o fim de ano (título na linha de "Kitchen gift ideas under $50"). Só use "under $X" se todos os itens realmente cabem nesse valor quando você conferir os preços na Amazon; o site não mostra preço, então escreva faixas que você verificou.

## Semana 3: comparação e primeiras respostas
| Dia | Tarefa |
|---|---|
| 15 | Escolher uma comparação com os produtos que já estão no site (ex.: os três mouses Razer) |
| 16 | Escrever o guia de comparação e publicar |
| 17 | Indexação no Search Console e 3 a 5 imagens de pin |
| 18 | Publicar 2 a 3 pins |
| 19 | Reddit: encontrar 2 ou 3 subreddits do tema, ler as regras e responder perguntas com ajuda real (sem link de afiliado; só cite o link do seu guia se a regra do subreddit permitir e o link realmente responder à pergunta) |
| 20 | Pinterest: publicar 2 a 3 pins novos de produtos e guias antigos, com imagem diferente |
| 21 | Checagem de métricas |

## Semana 4: terceiro guia e decisão
| Dia | Tarefa |
|---|---|
| 22 | Escolher o tema do terceiro guia com base no que o Pinterest Analytics mostrou (qual pin teve mais impressões e cliques) |
| 23 | Escrever e publicar o guia |
| 24 | Indexação e imagens de pin |
| 25 | Publicar 3 pins e duplicar a variação que funcionou melhor (mesmo produto, imagem e título novos) |
| 26 | Respostas em Quora e Reddit (2 a 3) |
| 27 | Revisar os guias antigos: melhorar título e descrição das páginas com impressões e poucos cliques no Search Console |
| 28 | Checagem de métricas completa e plano dos próximos 30 dias |
| 29 a 30 | Reserva para atrasos |

## Marcos e metas
Números de referência, não promessas: conta nova e sem audiência tem resultados muito variáveis, e o Google costuma demorar meses para entregar tráfego.

| Marco | Meta ao final do mês |
|---|---|
| Páginas indexadas no Google | 10 ou mais |
| Pins publicados | 40 a 60 |
| Impressões no Pinterest | 2.000 ou mais (qualquer valor maior é bônus) |
| Cliques de saída do Pinterest para o site | 50 a 150 |
| Cliques de afiliado registrados no painel da Amazon | 30 a 100 |
| Vendas qualificadas | 1 (o ideal é chegar perto de 3 antes do fim do prazo de 180 dias) |

Como ler o resultado:
- Se os pins têm impressões mas ninguém clica, o problema é a imagem ou o título.
- Se há cliques para o site mas ninguém clica no botão da Amazon, o problema é o guia ou o produto.
- Se há cliques na Amazon mas não há venda, o problema costuma ser o produto ou a faixa de preço (ajuste a escolha dos itens).

## Checklist semanal de métricas (15 minutos)
**Search Console**
- [ ] Páginas indexadas (Indexação → Páginas) e novas páginas não indexadas
- [ ] Impressões, cliques e as 5 principais consultas (Desempenho)
- [ ] Erros no sitemap

**Pinterest Analytics**
- [ ] Impressões e cliques de saída da semana
- [ ] Os 5 pins com mais cliques de saída (qual board, qual produto, qual título)
- [ ] Seguidores (só para acompanhar; não é a meta)

**Amazon Associates (fonte mais confiável de cliques e vendas)**
- [ ] Cliques e itens pedidos (Relatórios → Resumo de ganhos)
- [ ] Vendas qualificadas acumuladas e dias restantes do prazo de 180 dias

**Cliques em `/go/`**
- Cada clique grava uma linha `affiliate_click` nos logs da Vercel, mas no plano gratuito os logs ficam disponíveis por pouco tempo. Use essas linhas só para conferir que o redirecionamento funciona. Para a contagem oficial, use o painel do Associates.

**Regras que valem toda semana**
- [ ] Não clicar nos seus próprios links de afiliado e não comprar pelos seus próprios links
- [ ] Nenhum preço digitado à mão no site
- [ ] Nenhum link curto da Amazon (`amzn.to`) em pin, post ou resposta
