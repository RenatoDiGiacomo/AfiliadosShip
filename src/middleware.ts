import { NextResponse, type NextRequest } from "next/server";
import { isMarket } from "@/data/markets";
import { ACTIVE_MARKETS } from "@/lib/active";
import { MARKET_COOKIE, getCountry, resolveMarket } from "@/lib/geo";

const ONE_YEAR = 60 * 60 * 24 * 365;

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const requested = url.searchParams.get("market");

  // Escolha manual: /?market=br|us grava o cookie e vai para o mercado.
  if (isMarket(requested)) {
    url.pathname = `/${requested}`;
    url.search = "";
    const res = NextResponse.redirect(url);
    res.cookies.set(MARKET_COOKIE, requested, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }

  let market = resolveMarket(
    req.cookies.get(MARKET_COOKIE)?.value,
    getCountry(req.headers),
    process.env.DEFAULT_MARKET,
  );
  // Mercado ainda sem produtos: leva o visitante ao primeiro mercado ativo.
  if (ACTIVE_MARKETS.length > 0 && !ACTIVE_MARKETS.includes(market)) market = ACTIVE_MARKETS[0];
  url.pathname = `/${market}`;
  url.search = "";
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

// Só a raiz. /br e /us (e tudo abaixo) são acessados diretamente, inclusive por buscadores.
export const config = { matcher: ["/"] };
