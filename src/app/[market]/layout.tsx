import type { Metadata } from "next";
import Link from "next/link";
import { MarketSwitcher } from "@/components/MarketSwitcher";
import { MARKETS, MARKET_IDS, SITE_URL } from "@/data/markets";
import { getCategories } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import "../globals.css";

const THEME = {
  br: { "--brand": "#6d28d9", "--brand-dark": "#4c1d95" },
  us: { "--brand": "#15803d", "--brand-dark": "#14532d" },
} as const;

export function generateStaticParams() {
  return MARKET_IDS.map((market) => ({ market }));
}

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const market = await getMarket(params);
  const t = dict[market];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.siteName, template: `%s | ${t.siteName}` },
    description: t.tagline,
    verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
    openGraph: { siteName: t.siteName, locale: MARKETS[market].lang.replace("-", "_"), type: "website" },
  };
}

export default async function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ market: string }>;
}) {
  const market = await getMarket(params);
  const t = dict[market];
  const categories = getCategories(market);

  return (
    <html lang={MARKETS[market].lang}>
      <body style={THEME[market] as React.CSSProperties} className="bg-slate-50 text-slate-900">
        <div className="bg-[var(--brand-dark)] px-4 py-1.5 text-center text-xs text-white">{t.announcement}</div>

        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 sm:flex-nowrap sm:gap-6">
            <Link href={`/${market}`} className="mr-auto shrink-0 text-lg font-extrabold text-[var(--brand)] sm:mr-0 sm:text-2xl">
              {t.siteName}
            </Link>
            <form action={`/${market}/busca`} method="get" role="search" className="order-last flex w-full sm:order-none sm:w-auto sm:flex-1">
              <input
                type="search"
                name="q"
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
                className="w-full rounded-l-full border border-r-0 border-slate-300 bg-slate-100 px-4 py-2 text-sm outline-none focus:border-[var(--brand)]"
              />
              <button
                type="submit"
                aria-label={t.searchTitle}
                className="rounded-r-full bg-[var(--brand)] px-4 text-white hover:bg-[var(--brand-dark)]"
              >
                🔍
              </button>
            </form>
            <MarketSwitcher market={market} />
          </div>
          <nav className="border-t border-slate-100">
            <div className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 py-2 text-sm font-medium text-slate-700">
              <Link href={`/${market}`} className="shrink-0 hover:text-[var(--brand)]">
                {t.home}
              </Link>
              {categories.map((c) => (
                <Link key={c.id} href={`/${market}/categoria/${c.id}`} className="shrink-0 hover:text-[var(--brand)]">
                  {c.name}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        <footer className="mt-12 bg-[var(--brand-dark)] text-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
            <div>
              <p className="text-lg font-extrabold">{t.siteName}</p>
              <p className="mt-2 text-sm text-white/80">{t.footerAbout}</p>
            </div>
            <div>
              <p className="font-semibold">{t.categories}</p>
              <ul className="mt-2 space-y-1 text-sm text-white/80">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href={`/${market}/categoria/${c.id}`} className="hover:underline">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold">Info</p>
              <ul className="mt-2 space-y-1 text-sm text-white/80">
                <li>
                  <Link href={`/${market}/privacidade`} className="hover:underline">
                    {t.privacy}
                  </Link>
                </li>
                <li>
                  <Link href={`/${market}/termos`} className="hover:underline">
                    {t.terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/15">
            <div className="mx-auto max-w-6xl space-y-1 px-4 py-4 text-xs text-white/70">
              <p>{t.disclosure}</p>
              {t.amazonNotice && <p>{t.amazonNotice}</p>}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
