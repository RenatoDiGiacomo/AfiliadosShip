# CLAUDE.md — Site de Afiliados Multi-Mercado

## Visão geral
Site de reviews, comparações e guias de compra que monetiza via **links de afiliado**.
O mercado é decidido pela **localização do visitante**:

| Visitante | Rota | Idioma | Moeda | Plataformas de afiliado |
|-----------|------|--------|-------|-------------------------|
| Brasil | `/br` | pt-BR | BRL | Mercado Livre, Shopee Brasil |
| Resto do mundo (padrão) | `/us` | en-US | USD | Amazon (EUA), eBay |

Regra de ouro: **conteúdo e produtos de cada mercado são independentes**. O `/br` só mostra produtos brasileiros
(Mercado Livre/Shopee); o `/us` só mostra produtos dos EUA (Amazon/eBay). Nunca misturar.

## Stack
- Next.js (App Router) + React + TypeScript (strict)
- Tailwind CSS
- Dados em arquivos TS/JSON em `src/data` (sem banco no início; migrar para MySQL/MongoDB só se necessário)
- Deploy grátis: Vercel ou Cloudflare Pages
- Node 22, npm

## Estrutura de pastas
```
src/
  app/
    [market]/            # br | us (validado por generateStaticParams)
      page.tsx           # home do mercado
      produto/[slug]/    # página de produto/review
      guia/[slug]/       # guias e comparações ("melhores X")
    go/[platform]/[id]/route.ts     # redirect de afiliado (registra clique, 302 para a loja)
    sitemap.ts, robots.ts
  data/
    markets.ts           # config dos mercados (idioma, moeda, lojas ativas)
    products.br.ts       # produtos BR
    products.us.ts       # produtos US
    guides.br.ts / guides.us.ts
  lib/
    geo.ts               # detecção de país
    affiliate.ts         # monta links por plataforma
    i18n.ts              # textos por mercado
  components/
  middleware.ts          # redireciona / para /br ou /us
```

## Detecção de mercado (middleware)
1. Se existir cookie `market` (escolha manual do usuário), usar ele.
2. Senão ler o país pelo header: `x-vercel-ip-country` (Vercel) ou `cf-ipcountry` (Cloudflare).
3. `BR` → `/br`; qualquer outro → `/us`.
4. Ter um seletor de mercado no rodapé/header que grava o cookie `market`.
5. **Não** usar `Accept-Language` como fonte principal: o país do IP manda e o seletor manual sobrescreve.
6. Bots de busca: não redirecionar `/br` e `/us` diretamente; cada um tem `hreflang` e canonical próprios.
7. Em dev local (sem header), usar `?market=br|us` ou variável `DEFAULT_MARKET`.

## Modelo de dados
```ts
type Platform = 'mercadolivre' | 'shopee' | 'amazon' | 'ebay';
type Market = 'br' | 'us';

interface Product {
  id: string;
  slug: string;
  market: Market;
  platform: Platform;
  title: string;
  summary: string;
  pros: string[];
  cons: string[];
  price?: number;        // referência, pode estar desatualizado
  currency: 'BRL' | 'USD';
  image?: string;        // imagem manual (prioridade sobre a extraída do link)
  images?: string[];     // imagens extras manuais
  productUrl: string;    // URL limpa do produto na loja (sem tag)
  affiliateUrl?: string; // link gerado no painel (Mercado Livre/Shopee); tem prioridade sobre productUrl
  category: string;
  updatedAt: string;     // ISO
}
```

## Links de afiliado
- **Nunca** colocar link de afiliado direto no HTML. Tudo passa por `/go/[loja]/[id]`, que monta o link em `lib/affiliate.ts`.
- IDs/tags de afiliado ficam em variáveis de ambiente, nunca no código:
  - `AMAZON_TAG` (Amazon Associates EUA): vira o parâmetro `tag` da URL
  - `EBAY_CAMPID` (eBay Partner Network): vira os parâmetros de campanha da URL
- **Mercado Livre e Shopee:** o link de afiliado é gerado no painel de cada programa. Cole-o em `affiliateUrl` do produto; sem ele, o `/go/` redireciona para `productUrl` sem comissão.
- Outras variáveis: `SITE_URL` (sitemap/canonical) e `DEFAULT_MARKET` (dev local, `br` ou `us`). Ver `.env.example`.
- Links `<a>` de afiliado sempre com `rel="sponsored nofollow noopener" target="_blank"`.
- Cada plataforma tem regras de link diferentes; **confirmar no painel de cada programa** antes de gerar URLs.
- Adicionar plataforma nova = novo case em `affiliate.ts` + entrada em `markets.ts`. Sem mexer nas páginas.

## Interface (estilo loja)
- Layout inspirado em vitrines: barra de anúncio, header com busca e menu de categorias, banner com mosaico de fotos, círculos de categoria, grades de produtos com foto grande, faixa de confiança, guias, seções por loja e rodapé escuro.
- Cor por mercado via CSS vars `--brand`/`--brand-dark` (definidas no layout): BR roxo, US verde. Botão de compra sempre verde.
- Rotas: `/[market]` (home), `/categoria/[id]`, `/busca?q=` (noindex), `/produto/[slug]`, `/guia/[slug]`.
- Categorias em `src/data/categories.ts` (ids compartilhados entre mercados; também nomeiam `public/placeholders/<id>.svg`).
- Não há dados de exemplo: o catálogo vem só de `catalog/<mercado>.csv` → `npm run import` → `src/data/catalog.<mercado>.json`.
- Preço: só aparece no BR e apenas se `price` for preenchido manualmente (rotulado "Preço de referência"). Nunca mostrar preço de Amazon/eBay.

## Imagens
- `lib/media.ts` (`getProductMedia`): ordem = imagens manuais (`image`/`images`) > imagens extraídas do `productUrl` > placeholder ilustrativo da categoria (`/placeholders/<categoryId>.svg`, genérico em `/placeholders/generic.svg`).
- Extração: lê `og:image`, `twitter:image`, `link rel=image_src` e `image` do JSON-LD da página do produto (até 6). Cache de 24h por URL; timeout de 5s; se falhar, usa a imagem genérica.
- Páginas de busca/listagem (Amazon `/s`, eBay `/sch/`, `lista.mercadolivre`, Shopee `/search`) são ignoradas: só têm o logo da loja. Use URLs reais de produto.
- Lojas podem bloquear a leitura (sem imagem extraída): nesse caso preencha `image`/`images` à mão.
- Componentes: `ProductImage` (troca para a genérica se a imagem der erro), `ProductGallery` (página do produto), `ProductCard`, `ProductRow` (ranking nos guias), `GuideCard` (mosaico).
- **Amazon: nunca extrair nem linkar imagens das páginas de produto** (regra do programa; o código já pula a Amazon). Use imagem própria em `image` ou a API oficial de publicidade de produtos (requer conta aprovada).
- eBay/ML/Shopee: a extração é feita, mas confirme nos termos de cada programa o uso de imagens. `IMAGE_SCRAPING=off` desliga a extração em todas as lojas.
- Páginas com `revalidate = 86400` para atualizar as imagens.

## Catálogo (como produtos entram no site)
- Fonte de verdade: planilhas `catalog/br.csv` e `catalog/us.csv`. `npm run import` valida e gera `src/data/catalog.<mercado>.json` (não editar o JSON à mão).
- Com o JSON vazio (`[]`) o mercado mostra "em breve" (noindex, fora do sitemap). O import grava `src/data/markets.active.json` (mercados com produtos); o middleware e o seletor usam essa lista para não mandar ninguém a um mercado vazio.
- Guias: metadados em `guides.<mercado>.ts`; a lista de produtos vem da coluna `guias` do CSV (slug do guia). Guias sem produtos marcados não aparecem no site.
- Só aparecem categorias com produtos (`getCategories`).
- Amazon/eBay: o importador normaliza a URL (`/dp/ASIN`, `/itm/ID`) e ignora `preco`. Amazon/eBay não usam `link_afiliado` (o código monta pelo env).
- Processo completo: `ROTEIRO-PRODUTOS.md`.

## Conformidade (obrigatório)
- Aviso de afiliado visível em toda página com link: pt-BR ("Ganhamos comissão por compras feitas pelos links, sem custo extra para você") e en-US (equivalente). Amazon exige a frase: "As an Amazon Associate I earn from qualifying purchases."
- Páginas `/privacidade` e `/termos` por mercado (necessárias para aprovação nos programas).
- Não exibir preço da Amazon/eBay como se fosse em tempo real. Usar "preço de referência" ou não mostrar. Preços desatualizados violam as regras.
- Não copiar textos/imagens de terceiros; usar imagens permitidas pelos programas ou as próprias.
- Não incentivar cliques próprios nem compras pelos próprios links (causa banimento).
- Conteúdo original e útil (SEO): nada de texto genérico gerado em massa sem revisão.

## SEO
- Metadata por página (`generateMetadata`), `hreflang` (`pt-BR`, `en-US`), canonical, Open Graph.
- `sitemap.ts` gera URLs dos dois mercados; `robots.ts` bloqueia `/go/`.
- JSON-LD (`Product`, `Review`, `BreadcrumbList`) nas páginas de produto.
- Páginas estáticas (SSG) sempre que possível; `revalidate` para atualizações.

## Convenções de código
- TypeScript strict, sem `any`.
- Componentes funcionais, nomes em inglês no código; **textos exibidos** vêm de `lib/i18n.ts`, nunca hardcoded.
- Server Components por padrão; `"use client"` só quando necessário.
- Imports absolutos com `@/`.
- Commits em português, curtos, no imperativo (ex.: "Adiciona página de guia").

## Comandos
```bash
npm install
npm run dev      # http://localhost:3000  (use ?market=br ou ?market=us)
npm run build
npm run lint     # typecheck (tsc --noEmit)
```

## Como adicionar…
- **Produto:** incluir em `src/data/products.<market>.ts` com `productUrl` limpa.
- **Guia:** incluir em `src/data/guides.<market>.ts` referenciando IDs de produtos.
- **Plataforma:** tipo em `Platform`, builder em `lib/affiliate.ts`, env var, aviso legal correspondente.
- **Mercado novo (ex.: Portugal, México):** entrada em `markets.ts`, dados próprios, textos em `i18n.ts`, regra no middleware.

## Roadmap
1. MVP: `/br` e `/us`, 5 produtos e 2 guias por mercado, `/go/`, aviso de afiliado, sitemap.
2. Cadastro nos programas de afiliado (precisa de site publicado com conteúdo).
3. Métricas de clique por produto/plataforma.
4. Mais nichos e guias, foco em SEO de cauda longa.
5. (Opcional) Importação de produtos por API/planilha.

## Perfil do dono do projeto
Renato, dev full stack (React/TS, Next.js, Node/NestJS, MySQL, MongoDB). Prefere respostas em português,
código direto e prático, sem enrolação. Sem orçamento para anúncios: tudo deve rodar em plano gratuito
e crescer via SEO orgânico. Recebimento dos afiliados US em dólar (Nomad).

## O que NÃO fazer
- Não criar dropshipping nem revender produto comprado nas lojas.
- Não colocar chaves, tags ou tokens no repositório.
- Não misturar produtos BR e US no mesmo mercado.
- Não adicionar dependências pesadas sem necessidade (site precisa ser rápido).
## SEO e divulgação (docs/)
- `docs/search-console.md`, `docs/cronograma-30-dias.md`, `docs/pinterest-guia.md` (e `.pdf`).
- Páginas legais: `/us/privacy`, `/us/terms` (rewrite de `/us/privacidade` e `/us/termos`); `/br/privacidade`, `/br/termos`. Use `legalPath()` de `src/lib/paths.ts`.
- Open Graph: `opengraph-image.tsx` (home, produto, guia) gera cartão 1000x1500 só com texto (next/og). Produto e guia usam `og:type=article` (Rich Pins de artigo; Rich Pin de produto exigiria preço).
- hreflang só entre mercados com produtos, com `x-default` → /us. `robots.ts` bloqueia `/go/` e `/busca`.
- Variáveis: `GOOGLE_SITE_VERIFICATION` e `PINTEREST_SITE_VERIFICATION` (meta tags), `SITE_URL`, `AMAZON_TAG`.
- Sem `Review` no JSON-LD: exigiria nota (rating) real que o site não tem. Não inventar.

- O botão de troca de mercado foi removido do header (decisão do dono): cada visitante vai ao mercado do seu país. `/?market=br|us` continua funcionando por URL; `MarketSwitcher.tsx` ficou sem uso.

## Shopee automática (API de afiliados)
- `npm run shopee` preenche `imagem` e `link_afiliado` das linhas Shopee do `catalog/br.csv` pela API aberta da Shopee (`--force` refaz, `--dry` só mostra). Depois `npm run import`.
- Credenciais `SHOPEE_APP_ID` e `SHOPEE_SECRET` só em `.env.local` (fora do Git). `link_produto` no formato `https://shopee.com.br/product/<loja>/<item>`.
- Testado só contra um servidor falso (assinatura, leitura e gravação do CSV); a chamada real à API ainda não foi testada.

## Site só Brasil, sem /br (2026-10-02)
- As rotas ficam na raiz (`src/app/(site)/`): `/`, `/achados`, `/produto/<slug>`, `/categoria/<id>`, `/guia/<slug>`, `/busca`, `/privacidade`, `/termos`. `getMarket()` sempre devolve "br" (o argumento é ignorado).
- `/br/...` e `/us/...` antigos redirecionam (308) para o endereço novo (`next.config.mjs`). O middleware de geo foi removido.
- `/achados` lista todos os produtos do mais novo para o mais antigo (o último do CSV vem primeiro). É o link único do perfil do canal.
- Os dados dos EUA (`catalog/us.csv`, `products.us.ts`) continuam no repositório, mas não são mais servidos.
- Se um dia voltar a ter vários mercados, recriar o segmento `[market]` e o middleware (ver histórico do git).
