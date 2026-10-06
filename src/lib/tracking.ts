/**
 * Rastreamento de cliques de afiliado (/go/...).
 * - Origem do visitante (UTMs) vem do cookie `attr`, gravado pelo componente UtmCapture,
 *   ou de UTMs passadas direto na URL do /go.
 * - O clique vai para os logs da Vercel e, se GA_MEASUREMENT_ID + GA_API_SECRET existirem,
 *   também para o GA4 como evento `affiliate_click` (Measurement Protocol, gratuito).
 */

export const ATTR_COOKIE = "attr";
export const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"] as const;
export type AttrKey = (typeof ATTR_KEYS)[number];
export type Attribution = Partial<Record<AttrKey, string>>;

const clean = (v: string | null | undefined): string | undefined => (v ? v.slice(0, 100) : undefined);

function readCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return undefined;
}

export function parseAttribution(req: Request): Attribution {
  const out: Attribution = {};
  const raw = readCookie(req.headers.get("cookie"), ATTR_COOKIE);
  if (raw) {
    try {
      const saved = new URLSearchParams(decodeURIComponent(raw));
      for (const k of ATTR_KEYS) {
        const v = clean(saved.get(k));
        if (v) out[k] = v;
      }
    } catch {
      // cookie inválido: ignora
    }
  }
  // UTMs na própria URL do /go têm prioridade.
  const url = new URL(req.url);
  for (const k of ATTR_KEYS) {
    const v = clean(url.searchParams.get(k));
    if (v) out[k] = v;
  }
  return out;
}

export function isBot(userAgent: string | null): boolean {
  return /bot|crawl|spider|preview|slurp|facebookexternalhit|headless/i.test(userAgent ?? "");
}

/** client_id do GA4: reaproveita o do cookie `_ga` (GA1.x.<id>.<timestamp>) para ligar o clique ao visitante. */
export function gaClientId(req: Request): string {
  const raw = readCookie(req.headers.get("cookie"), "_ga");
  const parts = raw?.split(".");
  if (parts && parts.length >= 4) return `${parts[2]}.${parts[3]}`;
  return crypto.randomUUID();
}

export async function sendGa4Click(clientId: string, params: Record<string, string | undefined>): Promise<void> {
  const id = process.env.GA_MEASUREMENT_ID;
  const secret = process.env.GA_API_SECRET;
  if (!id || !secret) return;
  const eventParams: Record<string, string | number> = { engagement_time_msec: 1 };
  for (const [k, v] of Object.entries(params)) if (v) eventParams[k] = v;
  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(id)}&api_secret=${encodeURIComponent(secret)}`,
      {
        method: "POST",
        body: JSON.stringify({ client_id: clientId, events: [{ name: "affiliate_click", params: eventParams }] }),
        signal: AbortSignal.timeout(3000),
      },
    );
  } catch {
    // falha de rastreamento nunca pode quebrar o redirect
  }
}
