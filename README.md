# AfiliadosShip

Site de reviews e guias de compra com links de afiliado, em dois mercados escolhidos pela localização do visitante:

- **Brasil** → `/br` (pt-BR, Mercado Livre e Shopee)
- **Resto do mundo** → `/us` (en-US, Amazon e eBay)

Detalhes de arquitetura e regras: veja `CLAUDE.md`.

## Rodar

```bash
npm install
cp .env.example .env.local   # preencha AMAZON_TAG e EBAY_CAMPID quando tiver
npm run dev
```

Em dev não há header de país: use `http://localhost:3000/?market=br` ou `?market=us` (grava o cookie), ou defina `DEFAULT_MARKET` no `.env.local`.

## Adicionar produtos

Preencha `catalog/br.csv` / `catalog/us.csv` e rode `npm run import`. Passo a passo completo em **`ROTEIRO-PRODUTOS.md`**.

## Antes de publicar (importante)

Os produtos em `src/data/products.*.ts` são **exemplos** (links de busca das lojas, textos genéricos).
1. Troque `productUrl` por URLs reais de produtos que você pesquisou.
2. Mercado Livre/Shopee: cole o link do painel de afiliados em `affiliateUrl`.
3. Reescreva resumos, prós e contras com informação real e original.
4. Revise `/privacidade` e `/termos` (são modelos básicos).
5. Defina `SITE_URL` com o domínio final.

## Imagens

O site tenta ler a imagem de cada produto a partir do `productUrl` (Open Graph / JSON-LD). Se não encontrar, mostra uma imagem ilustrativa da categoria (`public/placeholders/`). Enquanto os `productUrl` forem páginas de busca (como nos exemplos), todas as imagens serão a genérica. Para forçar uma imagem, preencha `image` ou `images` no produto.

## Deploy grátis

Vercel (recomendado: já envia o país do visitante em `x-vercel-ip-country`) ou Cloudflare Pages (`cf-ipcountry`). Configure as variáveis do `.env.example` no painel.

## Programas de afiliados

Cadastro exige o site publicado com conteúdo. Confirme regras, comissões e formatos de link direto em cada programa (Amazon Associates, eBay Partner Network, Mercado Livre Afiliados, Shopee Afiliados).
