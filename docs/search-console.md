# Google Search Console: verificar o site e enviar o sitemap

Tempo: cerca de 20 minutos. Custo: zero.

## Antes de começar
1. O site precisa estar publicado na Vercel e abrindo em `https://SEU-SITE/us`.
2. Na Vercel, em **Settings → Environment Variables**, confirme:
   - `SITE_URL` = o endereço público, sem barra no final (ex.: `https://meusite.vercel.app`). O sitemap, o canonical e o Open Graph usam esse valor.
   - `AMAZON_TAG` = sua tag do Associates (nunca no código).
3. Se mudou alguma variável, faça **Redeploy** (as variáveis só valem depois de um novo deploy).

## Passo a passo

### 1. Criar a propriedade
1. Acesse https://search.google.com/search-console e entre com sua conta Google.
2. Clique em **Adicionar propriedade**.
3. Escolha **Prefixo do URL** (o lado direito) e cole o endereço completo, com `https://`.
   - Não use "Domínio": ele exige mexer no DNS, e um endereço `*.vercel.app` não permite isso. Se um dia você comprar um domínio próprio, aí sim dá para usar "Domínio".

### 2. Verificar pela meta tag
1. Na tela de verificação, escolha **Tag HTML**.
2. O Google mostra algo como `<meta name="google-site-verification" content="XXXXXXXX" />`. Copie **só o valor** de `content`.
3. Na Vercel, crie a variável `GOOGLE_SITE_VERIFICATION` com esse valor e faça um novo deploy.
4. Abra o site, veja o código-fonte (Ctrl+U) e procure `google-site-verification`. Se aparecer, está certo.
5. Volte ao Search Console e clique em **Verificar**.

O projeto já lê essa variável e coloca a tag em todas as páginas, então você não mexe em código.

### 3. Enviar o sitemap
1. No menu esquerdo, abra **Sitemaps**.
2. Em "Adicionar novo sitemap", digite `sitemap.xml` e clique em **Enviar**.
3. O status deve virar **Sucesso**. Se ficar "Não foi possível buscar", aguarde alguns minutos e confira se `https://SEU-SITE/sitemap.xml` abre no navegador.

O sitemap lista a home, as categorias, os guias, os produtos e as páginas legais do `/us`. O `/br` só entra no sitemap quando tiver produtos.

### 4. Pedir a indexação das páginas principais
1. Na barra de cima, cole a URL da home (`https://SEU-SITE/us`) e tecle Enter.
2. Clique em **Solicitar indexação**. Faça o mesmo para os 2 guias e para 3 ou 4 produtos.
3. Isso acelera a descoberta, mas não garante a posição. Páginas novas costumam levar de alguns dias a algumas semanas para aparecer.

## O que olhar depois
- **Desempenho → Resultados da pesquisa:** cliques, impressões, posição média e as consultas que trouxeram visitas.
- **Indexação → Páginas:** quantas páginas estão indexadas e os motivos das que não estão.
- **Experiência → Core Web Vitals:** só aparece depois de haver tráfego suficiente.

Na primeira semana, é normal ver zero impressões. Nas semanas seguintes, o número de páginas indexadas é o indicador mais útil.

## Problemas comuns
| Sintoma | Causa provável | O que fazer |
|---|---|---|
| "Não foi possível verificar" | A variável não entrou no deploy | Redeploy e confira a tag no código-fonte |
| Sitemap com URLs `localhost` | `SITE_URL` não configurada | Defina `SITE_URL` e faça redeploy |
| "Descoberta, mas não indexada" | Site novo, pouco conteúdo | Publique os guias do cronograma e aguarde |
| `/br` fora do sitemap | O mercado ainda não tem produtos | Comportamento esperado |
