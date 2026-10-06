# Rastreamento de cliques por vídeo

## Como funciona
1. Link no vídeo/bio leva para o site **com UTM**.
2. `UtmCapture` (layout) guarda as UTMs num cookie `attr` por 7 dias.
3. Quando a pessoa clica em "ver preço" (`/go/<loja>/<id>`), a rota lê o cookie, registra o clique nos **logs da Vercel** (JSON `affiliate_click`) e envia o evento **`affiliate_click`** ao GA4. Bots são ignorados.

## Links com UTM (use um por vídeo/plataforma)
Formato: `https://achadinhohomeoffice.vercel.app/produto/<slug>?utm_source=<plataforma>&utm_medium=<tipo>&utm_campaign=<video>`

- YouTube Short (bio/comentário): `?utm_source=youtube&utm_medium=shorts&utm_campaign=squishy-pao`
- TikTok (bio): `?utm_source=tiktok&utm_medium=video&utm_campaign=squishy-pao`
- Pinterest: `?utm_source=pinterest&utm_medium=pin&utm_campaign=<nome>`

Regra: `utm_campaign` = nome curto do vídeo, sem espaço/acento.

## Ligar o GA4 (uma vez, grátis)
1. GA4 > Admin > Data streams > seu stream: copie o **Measurement ID** (`G-...`).
2. Mesma tela > Measurement Protocol API secrets > Create: copie o **secret**.
3. Vercel > Settings > Environment Variables: `GA_MEASUREMENT_ID` e `GA_API_SECRET` (Production) e faça redeploy.
4. GA4 > Admin > Events: marque `affiliate_click` como **key event** (evento-chave).
5. (Opcional) Admin > Custom definitions: crie dimensões de evento para `platform`, `product_id`, `utm_campaign`, para ver nos relatórios. Os eventos aparecem em Reports > Realtime em segundos.

Sem as duas variáveis o site continua funcionando e só grava nos logs da Vercel (Project > Logs, filtre por `affiliate_click`).

## Excluir seu tráfego
GA4 > Admin > Data streams > Configure tag settings > Define internal traffic (seu IP) e ative o filtro de dados "Internal Traffic". Evita contar o Tag Assistant e seus testes.
