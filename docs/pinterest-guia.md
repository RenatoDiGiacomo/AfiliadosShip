# Guia do Pinterest para o Daily Finds (mercado US)

Objetivo: levar visitantes dos EUA para os **guias e páginas de produto do seu site**. O pin nunca leva direto para a Amazon. Quem decide comprar clica no botão do site, e o clique passa por `/go/`.

---

## 1. Conta, site reivindicado e Rich Pins

### 1.1 Conta Business
1. Acesse https://business.pinterest.com e crie uma conta **Business** gratuita (ou converta a pessoal em Business).
2. Nome de exibição: algo com palavra-chave, como `Daily Finds | Kitchen & Tech Picks`.
3. Bio em inglês, clara: `Hand-picked kitchen gadgets, tech and everyday finds. Guides and comparisons.`
4. País e idioma: Estados Unidos, inglês.

### 1.2 Reivindicar o site (claim)
1. No Pinterest: **Configurações → Contas reivindicadas → Reivindicar**.
2. Escolha a opção de **meta tag HTML** e copie apenas o valor de `content` de `<meta name="p:domain_verify" content="XXXX">`.
3. Na Vercel, crie a variável `PINTEREST_SITE_VERIFICATION` com esse valor e faça redeploy (o projeto já coloca a tag em todas as páginas).
4. Volte ao Pinterest e clique em **Verificar**.

Se o Pinterest recusar reivindicar um endereço `*.vercel.app`, o único caminho é um domínio próprio (cerca de US$ 10 a 15 por ano), que passa a ser o único custo do projeto. Tente primeiro sem domínio.

### 1.3 Rich Pins
1. Abra o validador de Rich Pins do Pinterest (procure "Pinterest Rich Pin validator" na central de ajuda do Pinterest) e cole a URL de um guia e de um produto.
2. As páginas do site têm `og:title`, `og:description`, `og:site_name`, `og:image` (1000×1500) e `og:type` = `article`. Isso habilita **Rich Pins de artigo**: o pin mostra o título da página e a descrição automaticamente.
3. Se a validação passar, clique em **Aplicar**. A aprovação costuma levar de alguns minutos a alguns dias.

**Importante:** Rich Pins de *produto* exigem preço e disponibilidade no código. O site não mostra preço (regra da Amazon), então o tipo correto para o seu caso é **artigo**. Não tente simular o preço.

---

## 2. Boards (pastas de pins)

Crie de 5 a 8 boards. Nome com a palavra que a pessoa digitaria na busca, em inglês, e uma descrição de 2 ou 3 frases com palavras-chave naturais. Comece com estes e ajuste ao que você publicar:

1. `Kitchen Gadgets Worth Buying`
2. `Air Fryer Tips and Picks`
3. `Small Kitchen Organization Ideas`
4. `Gift Ideas for Cooks and Home Chefs`
5. `Best Wireless Mouse for Work and Gaming`
6. `Mini PC and Desktop Picks`
7. `Home Office and Desk Setup Ideas`
8. `Everyday Gadgets Under $50` (só use se os itens realmente cabem nessa faixa)

Regras:
- Coloque em cada board pelo menos 5 a 8 pins antes de divulgá-lo.
- Não crie board para um tema com um único pin.
- Poste cada pin no board mais específico (o Pinterest usa isso para entender o assunto).

---

## 3. Modelo de pin

| Campo | Regra |
|---|---|
| Imagem | Proporção **2:3** (1000 × 1500 px), com **texto grande na imagem** e fundo limpo |
| Título | Até 100 caracteres; palavra-chave principal no início |
| Descrição | 2 a 4 frases com palavras-chave naturais; termine com uma chamada para ação e o aviso de afiliado |
| Link de destino | **Sempre** o guia ou o produto no seu site (`https://SEU-SITE/us/guia/...` ou `/us/produto/...`). Nunca a Amazon, nunca `amzn.to` |
| Board | O mais específico possível |
| Texto alternativo | Uma frase que descreva a imagem |

Modelo de descrição:

```
[What it is in one sentence, with the main keyword]. [Who it is for / what it solves].
See the full guide with pros, cons and where to check the current price. (Affiliate site: we may earn a commission.)
```

Pins de produto: o texto na imagem deve ser o nome do produto e uma frase curta, como "Air fryer for small kitchens".

---

## 4. Frequência

- **Começo:** 3 a 5 pins por dia, distribuídos ao longo do dia, não todos de uma vez.
- Se o tempo apertar, 1 a 2 pins por dia constantes valem mais que 20 em um dia e nada depois.
- **Vários pins por URL:** cada guia ou produto pode ter 3 a 5 pins com imagens e títulos *diferentes*. É o que o Pinterest espera; repetir o mesmo pin idêntico muitas vezes é spam.
- Não poste o mesmo pin em vários boards ao mesmo tempo no mesmo dia.
- Pins levam semanas ou meses para render; o Pinterest funciona como busca, não como rede de amigos.

---

## 5. Imagens grátis

### Opção A: Canva grátis
1. Crie um design personalizado de 1000 × 1500 px.
2. Use fundo de cor sólida ou gradiente, título grande e o nome do site no rodapé.
3. Use fotos de produto **somente** se vieram de kit de imprensa do fabricante com licença que permita, ou se são suas. **Nunca** use foto baixada da página da Amazon.
4. Exporte em PNG ou JPG.

### Opção B: imagens geradas pelo próprio site (sem design)
O site já gera cartões 1000 × 1500 com o título, em texto sobre a cor da marca, para cada guia e produto:

- Guia: `https://SEU-SITE/us/guia/SLUG-DO-GUIA/opengraph-image`
- Produto: `https://SEU-SITE/us/produto/SLUG-DO-PRODUTO/opengraph-image`

Abra o endereço no navegador, clique com o botão direito e salve a imagem. Serve como pin de "texto na imagem" e o título sempre bate com a página. Um exemplo está em `docs/og-exemplo-produto.png`.

Dica para variar: duas ou três imagens por guia, mudando só o texto (por exemplo "Best X", "X vs Y", "Before you buy X").

---

## 6. Dez modelos de títulos e descrições

Troque os termos entre colchetes pelos produtos reais.

1. **Título:** `Best Air Fryers for Small Kitchens: Top Picks and What to Know`
   **Descrição:** `Short on counter space? Compare air fryer sizes, features and trade-offs before you buy. Read the full guide. (Affiliate site.)`
2. **Título:** `Razer Orochi V2 vs Basilisk V3 X vs Viper V3: Which Wireless Mouse?`
   **Descrição:** `Three Razer wireless mice compared by size, battery life and grip style. Find out which one fits your hand and desk.`
3. **Título:** `Best Kitchen Gadgets Under $25 [confirme os valores antes]`
   **Descrição:** `Small tools that earn their drawer space: shears, spatulas, sink strainers and more. See pros and cons for each.`
4. **Título:** `Kitchen Gift Ideas for People Who Love to Cook`
   **Descrição:** `Practical gift picks for home cooks, from frothers to air fryers. Every pick lists what it does well and what to watch for.`
5. **Título:** `Mini PC vs Gaming Desktop: Which One Do You Actually Need?`
   **Descrição:** `A compact mini PC or a full gaming tower? We break down performance, size and everyday use so you can choose.`
6. **Título:** `Best Wireless Mouse for Work: Long Battery, Comfortable Grip`
   **Descrição:** `Looking for a mouse that lasts months on a battery? These picks compare battery life, weight and connectivity.`
7. **Título:** `Small Kitchen Must-Haves: Slim Toaster, Shears and More`
   **Descrição:** `Space-saving kitchen finds for small apartments and tight counters. Check the pros, cons and sizes before you buy.`
8. **Título:** `Is a Prebuilt Gaming PC Worth It? What to Check Before Buying`
   **Descrição:** `Prebuilt RTX 5070 gaming PCs compared on cooling, power supply, storage and brand support. Read before you decide.`
9. **Título:** `5 Everyday Kitchen Gadgets That Make Cooking Easier`
   **Descrição:** `Simple upgrades like a sink strainer, silicone spatulas and an electric pepper mill. See what each one is good and not so good at.`
10. **Título:** `How to Froth Milk at Home Without an Espresso Machine`
    **Descrição:** `A rechargeable handheld frother is the simplest route to cafe-style drinks. Here is what to look for.`

Regras para os modelos:
- Só escreva "under $X" ou "cheap" quando você conferiu os preços na Amazon naquele dia; o site não mostra preço justamente para não ficar desatualizado.
- Só prometa o que o guia de fato entrega.

---

## 7. Regras de conformidade

**Afiliado**
- Divulgue que é afiliado: o site já mostra o aviso e a frase "As an Amazon Associate I earn from qualifying purchases." em todas as páginas. Nas descrições dos pins, acrescente uma menção curta como `(Affiliate site.)`.
- Não finja que é uma avaliação baseada em uso se você não usou o produto. Descreva como "guia" e "comparação" baseados nas especificações.

**Amazon**
- **Sem preço em tempo real.** Não escreva preço em pin, título ou imagem como se fosse atual. O preço só é exibido na página da Amazon.
- **Sem links curtos da Amazon** (`amzn.to`, `a.co`) em pins, posts ou respostas.
- **Não clique nos seus próprios links** e não compre por eles. Isso leva ao banimento.
- **Não use fotos copiadas da Amazon** nas imagens dos pins.
- Não peça a ninguém que compre "para te ajudar" nem ofereça recompensa por cliques.

**Pinterest**
- Pins com links que levam ao seu site. Não use redirecionadores nem encurtadores.
- Nada de spam: nada de dezenas de pins idênticos, nada de imagens enganosas.
- Não poste conteúdo de outras marcas como se fosse seu.

**Reddit e Quora**
- Nenhum link de afiliado direto. Responda a pergunta de verdade; só cite o seu guia se for útil e se a regra do subreddit permitir.
- Declare o vínculo quando fizer sentido ("I run a small guide site about this").

---

## 8. Como medir e quando duplicar

No Pinterest Analytics, veja por pin e por board:
- **Impressões:** o pin está sendo mostrado.
- **Cliques de saída (outbound clicks):** quantas pessoas foram ao site. É o número que importa.
- **Salvamentos:** sinal de que a ideia interessa (o Pinterest passa a mostrá-lo mais).

Leitura dos números:

| O que você vê | Interpretação | O que fazer |
|---|---|---|
| Muitas impressões, poucos cliques | Imagem ou título fracos | Refazer a imagem e o título, mesma URL |
| Cliques de saída altos | O tema funciona | **Duplicar:** 3 a 5 pins novos para a mesma URL, e um guia novo no mesmo tema |
| Poucas impressões | Board ou palavra-chave fracos | Mudar o nome do board e as palavras da descrição |

Regra de bolso: depois de 2 a 4 semanas, o que tem mais cliques de saída entra no plano da semana seguinte; o que tem menos de 50 impressões depois de um mês é deixado de lado.

Para a parte de vendas, olhe o painel do Amazon Associates (cliques e itens pedidos). O Pinterest mostra o clique até o seu site, mas só a Amazon mostra o que acontece depois.
