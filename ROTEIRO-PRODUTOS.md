# Roteiro: pegar produtos das lojas e colocar no site

Fluxo completo, do produto escolhido até ele aparecer no site. Tempo estimado: **10 a 15 minutos por produto**.

```
1. Cadastro nos programas (uma vez)
2. Escolher o produto
3. Pegar os dados na loja (link, link de afiliado, foto)
4. Preencher a planilha  ->  catalog/br.csv  ou  catalog/us.csv
5. npm run import        ->  valida e grava o catálogo
6. npm run dev           ->  conferir no navegador
7. Publicar (deploy)
```

## 1. Cadastro nos programas (uma vez só)

Você precisa estar aprovado para gerar links de afiliado. Cadastre o site já publicado e com conteúdo.

| Mercado | Programa | Onde gera link |
|---|---|---|
| BR | Mercado Livre Afiliados | painel de afiliados do Mercado Livre |
| BR | Shopee Afiliados | `affiliate.shopee.com.br` ou app (aprovação costuma levar alguns dias úteis) |
| US | Amazon Associates | barra SiteStripe na página do produto (logado no Associates) |
| US | eBay Partner Network (EPN) | gerador de links do EPN; o site monta os parâmetros com seu `campid` |

Depois do cadastro, guarde os códigos nas variáveis de ambiente (`.env.local` e no painel da hospedagem):
`AMAZON_TAG` (seu Store ID da Amazon) e `EBAY_CAMPID` (campanha do EPN). Mercado Livre e Shopee não usam variável: o link de afiliado vai na planilha.

> Confirme regras, requisitos e comissões direto em cada programa. Elas mudam e eu não consegui abrir as páginas oficiais do Mercado Livre para conferir.

## 2. Escolher o produto

- **Comece com 10 a 20 produtos**, concentrados em 2 ou 3 categorias (por exemplo Casa e cozinha, Tecnologia e Utilidades). Poucas categorias com vários produtos cada deixam o site mais forte do que muitas categorias com 1 produto.
- Prefira produtos com muitas avaliações boas, em estoque e de lojas confiáveis/oficiais.
- Veja a **comissão da categoria** no programa: varia bastante, e categorias de comissão baixa rendem pouco.
- Pense em **guias** ("melhores X para Y"): 3 a 5 produtos que respondem a uma busca real do Google.
- Não use produto que você (ou sua loja) vende: o Shopee, por exemplo, não permite promover itens da própria loja.

## 3. Pegar os dados na loja

Para cada produto você precisa de 3 coisas: **link limpo**, **link de afiliado** e **foto**.

### Mercado Livre (BR)
1. Abra a página do produto e copie a URL limpa (sem parâmetros de rastreio) para `link_produto`.
2. Logado como afiliado, gere o link de afiliado do produto pelo painel/barra de afiliados e cole em `link_afiliado`.
3. Sem `link_afiliado` o botão leva à loja **sem comissão** (o importador avisa).

### Shopee (BR)
1. Copie a URL da página do produto para `link_produto`.
2. No painel de afiliados: **Oferta** → escolha a categoria → **Obter link** → **Link personalizado**. Cole em `link_afiliado`.
3. Use o campo `sub_id` para identificar o produto/guia e ver depois o que converte.

### Amazon (EUA)
1. Abra o produto em amazon.com. Copie a URL: o importador reduz para `https://www.amazon.com/dp/CODIGO` (remove rastreios).
2. **Não preencha `link_afiliado`**: o site acrescenta sua `AMAZON_TAG` automaticamente.
3. **Fotos: não copie nem use o endereço da imagem da página da Amazon.** Uma fonte que consultei indica que isso é proibido e que as imagens só podem vir do conteúdo oficial do programa (API de publicidade de produtos, que exige conta aprovada). Por isso o site **não extrai imagens da Amazon**. Use uma foto própria (campo `imagem`) ou deixe a ilustração da categoria até configurar a API.
4. **Não mostre preço.**

### eBay (EUA)
1. Abra o item e copie a URL. O importador reduz para `https://www.ebay.com/itm/NUMERO`.
2. Não preencha `link_afiliado`: o site monta o link de rastreio do EPN com seu `EBAY_CAMPID` (parâmetros `campid`, `toolid`, `mkcid`, `mkrid`, `mkevt`).
3. Itens do eBay acabam: prefira produtos novos de vendedores grandes, e revise a lista com frequência.
4. **Não mostre preço.**

### Fotos (todas as lojas)
- O site tenta ler a foto da página do produto (Mercado Livre, Shopee, eBay). Se a loja bloquear, aparece a ilustração da categoria.
- Para garantir foto: hospede a sua própria (ex.: foto tirada por você, ou fornecida com permissão) e coloque a URL em `imagem` / `imagens_extras`.
- Confira nos termos de cada programa o que é permitido fazer com imagens das lojas. Para desligar a leitura automática em todas as lojas: `IMAGE_SCRAPING=off`.

## 4. Preencher a planilha

Abra `catalog/br.csv` (Brasil) ou `catalog/us.csv` (EUA) no Excel ou Google Planilhas. Use `catalog/EXEMPLO-br.csv` como modelo. Salve como **CSV** (separado por ponto e vírgula ou vírgula, ambos funcionam).

| Coluna | Obrigatória | O que colocar |
|---|---|---|
| `slug` | não | Nome na URL (`teclado-mecanico-x`). Vazio = gerado do título |
| `titulo` | sim | Nome curto do produto |
| `plataforma` | sim | BR: `mercadolivre` ou `shopee`. US: `amazon` ou `ebay` |
| `categoria` | sim | `home`, `tech`, `beauty`, `fitness`, `fashion`, `pets`, `kids`, `gadgets` (ou o nome exibido) |
| `link_produto` | sim | URL limpa da página do produto |
| `link_afiliado` | ML/Shopee: sim | Link gerado no painel. Amazon/eBay: deixe vazio |
| `imagem` | não | URL da foto principal (sua) |
| `imagens_extras` | não | Outras fotos, separadas por `\|` |
| `resumo` | sim | 1 a 2 frases **suas** sobre o produto |
| `positivos` | recomendado | Pontos fortes, separados por `\|` |
| `atencao` | recomendado | Pontos de atenção, separados por `\|` |
| `preco` | não | Só BR, preço de referência (ex.: `149,90`). Ignorado nos EUA |
| `guias` | não | Slugs dos guias onde o produto entra, separados por `\|` (ex.: `achados-da-semana`, `utilidades-do-dia-a-dia`; nos EUA: `weekly-finds`, `everyday-gadgets`) |

Enquanto `catalog/br.csv` ou `catalog/us.csv` tiver só o cabeçalho, o site mostra os **produtos de exemplo**. Assim que tiver pelo menos 1 produto, os exemplos daquele mercado somem.

## 5. Escrever o conteúdo

- **Resumo, positivos e atenção devem ser seus.** Não copie a descrição da loja: é ruim para o Google e para a aprovação nos programas.
- Seja específico e honesto: diga para quem o produto serve e quando **não** vale a pena. Isso gera confiança e cliques.
- Só afirme o que você pesquisou (avaliações, especificações). Não invente teste que não fez.

## 6. Importar e conferir

```bash
npm run import        # os dois mercados  (ou: npm run import -- br)
npm run dev
```

- **ERRO**: nada é gravado até você corrigir (plataforma errada, categoria inexistente, slug repetido, campo obrigatório vazio).
- **aviso**: grava, mas vale corrigir (ex.: ML/Shopee sem `link_afiliado`, link de busca em vez de página de produto, resumo curto).
- Abra `http://localhost:3000/?market=br` (ou `us`) e confira: foto, botão, categoria, guia.
- **Clique em cada botão** e veja se abre o produto certo na loja.

## 7. Publicar

Faça commit das mudanças (inclui `src/data/catalog.*.json`, gerados pelo import) e publique na Vercel. Confirme `SITE_URL`, `AMAZON_TAG` e `EBAY_CAMPID` no painel da hospedagem.

## Checklist por produto

- [ ] Link do produto abre e o item está disponível
- [ ] Link de afiliado abre o **mesmo** produto (ML/Shopee)
- [ ] Nenhum preço da Amazon/eBay aparece
- [ ] Resumo e pontos escritos por você
- [ ] Categoria e guia corretos
- [ ] Aviso de afiliado visível (já está no rodapé e nas páginas)
- [ ] Você não clicou nos próprios links para "testar" várias vezes nem comprou por eles (pode ser tratado como fraude)

## Rotina semanal (20 minutos)

1. Abrir cada link e remover/trocar produtos indisponíveis (apague a linha da planilha e rode `npm run import`).
2. Conferir se os links de afiliado ainda funcionam.
3. Adicionar 2 a 3 produtos novos ou um guia novo.
4. Ver no painel de cada programa o que converteu e priorizar esses nichos.

Produtos que não mudaram mantêm a data "Atualizado em"; só os editados recebem a data do dia.

## O que ainda é manual (e pode ser automatizado depois)

Hoje você copia links e dados à mão. Dá para automatizar mais tarde com as APIs oficiais (por exemplo, a API Browse do eBay e a API de publicidade da Amazon), que também resolvem a questão das imagens, mas cada uma exige conta aprovada e tem regras próprias.
