# Plano de divulgação (sem dinheiro e sem rede social pronta)

## Expectativa realista

- Sem anúncios, o tráfego vem de **Google (lento: semanas a meses)**, **Pinterest**, **canais de promoções** (Telegram/WhatsApp, no Brasil) e **vídeos curtos**. Nada disso é imediato.
- A Amazon costuma exigir **3 vendas nos primeiros 180 dias**, senão encerra a conta (confirme no programa). Por isso o objetivo dos primeiros 30 dias é conseguir as primeiras compras, não escalar.
- Um site de "achados" gerais é difícil de ranquear no Google porque cobre muita coisa. Por isso **a divulgação ativa (Pinterest, canais, vídeos) importa mais que o Google no começo**. O Google vem como bônus com o tempo.

## Antes de divulgar (obrigatório)

1. Tire os produtos de exemplo: cadastre **pelo menos 10 produtos reais** por mercado ativo (ver `ROTEIRO-PRODUTOS.md`). Ninguém compra de uma vitrine de exemplo, e a Amazon avalia o site.
2. Conferir `/privacidade` e `/termos` e o aviso de afiliado (já no rodapé).
3. **Google Search Console** (grátis):
   - Adicione seu site e verifique pela **meta tag**: copie o código e coloque em `GOOGLE_SITE_VERIFICATION` na Vercel (o site já lê essa variável).
   - Envie o sitemap: `https://SEU-SITE/sitemap.xml`.
4. Um **domínio próprio** (cerca de R$ 40 por ano) passa mais confiança do que `.vercel.app`, mas não é obrigatório para começar. Se mudar o endereço, atualize o site no cadastro da Amazon.

## Regras da Amazon ao divulgar (leia o Operating Agreement)

- **Cadastre no Associates todos os sites e perfis** (Pinterest, canal, etc.) onde você divulgar.
- Informe que recebe comissão em cada divulgação (na página já está; em posts e vídeos use uma frase curta, como "link de afiliado").
- Não envie links de afiliado por e-mail nem em material offline/e-book.
- Não compre pelos seus links nem peça para amigos "clicarem para ajudar".
- Não mostre preço da Amazon como se fosse em tempo real.
- Prefira **levar as pessoas para o seu site** (páginas de produto e coleções) e deixar o botão de compra lá, em vez de colar o link da Amazon direto nos posts.

## Canais gratuitos

### Brasil (quando Shopee/Mercado Livre estiverem aprovados)
| Canal | Como usar | Esforço |
|---|---|---|
| **Canal de Telegram** de achadinhos | Posts curtos: foto, nome, por que vale, link para a **página do produto no seu site**. 3 a 5 posts por dia. É o formato mais comum de "achadinhos" no Brasil | 30 min/dia |
| **Canal/comunidade no WhatsApp** | Mesmo conteúdo, depois que o Telegram ganhar ritmo | 10 min/dia |
| **Pinterest** | Um pin por produto, com a foto, título claro e link para o seu site. Pins duram meses e trazem visitas de graça | 30 min, 3x por semana |
| **Vídeos curtos** (TikTok, Reels, Shorts) | 15 a 30 s mostrando o produto em uso ou uma lista "3 achadinhos de R$ X". Não precisa mostrar o rosto | 1 hora, 2x por semana |

### Estados Unidos (Amazon, já funcionando)
| Canal | Como usar | Esforço |
|---|---|---|
| **Pinterest** (melhor começo) | Boards por categoria ("kitchen finds", "pet finds"), pins em inglês com link para o seu site | 30 min, 3x por semana |
| **Vídeos curtos em inglês** | "3 finds under $X", sem precisar aparecer | 1 hora, 2x por semana |
| **Reddit** | Só em comunidades que aceitam, **lendo as regras de cada uma**. Participe ajudando antes de divulgar. Spam leva a banimento | 20 min/dia |
| **Google** | Coleções em inglês com títulos que respondem buscas ("best X under $25") | contínuo |

> Os EUA exigem conteúdo em inglês e mais paciência. Para ver resultado mais rápido, o Brasil tende a dar retorno antes, porque você conhece o público.

## Como criar conteúdo que converte

- Mostre **um produto, um benefício claro e um ponto de atenção**. Gente compra quando confia.
- Use as fotos e textos da página de produto (texto seu, não copiado).
- Use preço e promoções só no que for permitido por cada programa. Na Amazon, sem preço.
- Um post bom por dia vence dez posts ruins. Tenha um horário fixo.

## Medir o que funciona

- **Amazon Associates:** cliques, pedidos e receita no painel. Crie **tracking IDs separados por canal** (ex.: um para Pinterest, um para vídeos) para saber o que converte.
- **Shopee/Mercado Livre:** use o `sub_id`/etiqueta de cada link (quando o painel permitir) com o nome do canal.
- **Search Console:** quais buscas trazem visitas.
- **Logs da Vercel:** cada clique no botão gera um registro `affiliate_click` (produto, loja e mercado).

## Plano dos primeiros 30 dias

**Semana 1: preparar**
- [ ] 10+ produtos reais no mercado ativo, exemplos removidos
- [ ] Search Console configurado e sitemap enviado
- [ ] Conta no Pinterest e (no Brasil) canal no Telegram criados e cadastrados nos programas
- [ ] Domínio próprio, se possível

**Semanas 2 a 4: rotina**
- [ ] 3 a 5 posts por dia no Telegram (BR) ou 1 a 2 pins por dia (EUA)
- [ ] 2 vídeos curtos por semana
- [ ] 3 produtos novos e 1 coleção nova por semana
- [ ] Domingo: 20 min para ver números e repetir o que funcionou

## Regra de ouro

Comece por **um** canal e mantenha por 30 dias antes de abrir outro. Quem espalha em cinco canais e abandona todos não colhe nada.
