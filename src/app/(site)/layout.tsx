import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MARKETS, SITE_URL } from "@/data/markets";
import { FloatingMenu, type MenuLink } from "@/components/FloatingMenu";
import { UtmCapture } from "@/components/UtmCapture";
import { HERO_ESPECIAL } from "@/data/featured";
import { getCategories, getGuides } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { legalPath } from "@/lib/paths";
import "../globals.css";

const THEME = {
  // Achado da Web (BR): azul-marinho do canal + amarelo/âmbar; ciano como detalhe.
  br: {
    "--brand": "#FFB020", "--brand-dark": "#0B1426", "--brand-text": "#B45309", "--on-brand": "#0B1426",
    "--hero-from": "#14284d", "--cta-bg": "#FFB020", "--cta-fg": "#0B1426", "--cta-hover": "#ffc34d",
    "--header-bg": "#0B1426", "--header-fg": "#e2e8f0", "--logo": "#FFB020", "--accent": "#2DC8F0",
    "--page-bg": "#ffffff", "--fg": "#0B1426", "--fg-muted": "#1e3a5f", "--fg-soft": "#4b5f7d",
  },
  us: {
    "--brand": "#15803d", "--brand-dark": "#14532d", "--brand-text": "#15803d", "--on-brand": "#ffffff",
    "--hero-from": "#15803d", "--cta-bg": "#ffffff", "--cta-fg": "#14532d", "--cta-hover": "#f1f5f9",
    "--header-bg": "#ffffff", "--header-fg": "#334155", "--logo": "#15803d", "--accent": "#15803d",
    "--page-bg": "#f8fafc", "--fg": "#0f172a", "--fg-muted": "#475569", "--fg-soft": "#64748b",
  },
} as const;

// Pedaço do banner do canal (logo + nome) mostrado no topo. Só o Brasil tem.
const BANNER: Record<string, { src: string; w: number; h: number } | null> = {
  br: { src: "/brand/banner-br.webp", w: 1400, h: 186 },
  us: null,
};

// Google Tag Manager (ID público). Pode ser trocado pela variável NEXT_PUBLIC_GTM_ID na Vercel.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-N8VRPD6X";
const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

// Canal do YouTube mostrado no rodapé (só o Brasil tem).
const YOUTUBE: Record<string, string | null> = {
  br: "https://www.youtube.com/@achados-da-web",
  us: null,
};


export async function generateMetadata(): Promise<Metadata> {
  const market = await getMarket();
  const t = dict[market];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.siteName, template: `%s | ${t.siteName}` },
    description: t.tagline,
    verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
    // Reivindicar o site no Pinterest (meta tag p:domain_verify).
    other: process.env.PINTEREST_SITE_VERIFICATION ? { "p:domain_verify": process.env.PINTEREST_SITE_VERIFICATION } : undefined,
    openGraph: { siteName: t.siteName, locale: MARKETS[market].lang.replace("-", "_"), type: "website" },
  };
}

export default async function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const market = await getMarket();
  const t = dict[market];
  const categories = getCategories(market);
  const banner = BANNER[market];
  const guides = getGuides(market);
  const special = guides.find((g) => g.slug === HERO_ESPECIAL.guide);
  const menuLinks: MenuLink[] = [
    { href: "/", label: t.home, emoji: "🏠" },
    ...(special ? [{ href: `/guia/${special.slug}`, label: special.title, emoji: "🎉" }] : []),
    { href: "/achados", label: t.allFinds, emoji: "🛍️" },
    ...guides.filter((g) => g.slug !== special?.slug).map((g) => ({ href: `/guia/${g.slug}`, label: g.title, emoji: "✨" })),
    ...categories.map((c) => ({ href: `/categoria/${c.id}`, label: c.name })),
  ];

  return (
    <html lang={MARKETS[market].lang}>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }} />
        {/* End Google Tag Manager */}
      </head>
      <body style={{ ...THEME[market], backgroundColor: "var(--page-bg)", color: "var(--fg)" } as React.CSSProperties} className="min-h-screen">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <UtmCapture />
        <div className="bg-[var(--brand-dark)] px-4 py-1.5 text-center text-xs text-white">{t.announcement}</div>

        {banner && (
          <div className="bg-[#0B1426]">
            <Link href="/" className="mx-auto flex max-w-6xl justify-center" aria-label={t.siteName}>
              <Image
                src={banner.src}
                width={banner.w}
                height={banner.h}
                alt={t.siteName}
                priority
                className="h-16 w-auto max-w-full sm:h-24"
                style={{ maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)" }}
              />
            </Link>
          </div>
        )}

        <header className="sticky top-0 z-30 bg-[var(--header-bg)] shadow-sm">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 sm:flex-nowrap sm:gap-6">
            {!banner && (
              <Link href="/" className="mr-auto shrink-0 text-lg font-extrabold text-[var(--logo)] sm:mr-0 sm:text-2xl">
                {t.siteName}
              </Link>
            )}
            <form action={`/busca`} method="get" role="search" className="order-last flex w-full sm:order-none sm:w-auto sm:flex-1">
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
                className="rounded-r-full bg-[var(--brand)] px-4 text-[var(--on-brand)] hover:opacity-90"
              >
                🔍
              </button>
            </form>
          </div>
          <nav className="border-t border-white/10">
            <div className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 py-2 text-sm font-medium text-[var(--header-fg)]">
              <Link href="/" className="shrink-0 hover:text-[var(--logo)]">
                {t.home}
              </Link>
              <Link href="/achados" className="shrink-0 hover:text-[var(--logo)]">
                {t.allFinds}
              </Link>
              {special && (
                <Link href={`/guia/${special.slug}`} className="shrink-0 font-bold text-[var(--logo)] hover:underline">
                  🎉 {special.title}
                </Link>
              )}
              {categories.map((c) => (
                <Link key={c.id} href={`/categoria/${c.id}`} className="shrink-0 hover:text-[var(--logo)]">
                  {c.name}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        <FloatingMenu links={menuLinks} searchPlaceholder={t.searchPlaceholder} youtube={YOUTUBE[market] ?? undefined} />

        <footer className="mt-12 border-t border-white/10 bg-[var(--brand-dark)] text-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
            <div>
              <p className="text-lg font-extrabold">{t.siteName}</p>
              <p className="mt-2 text-sm text-white/80">{t.footerAbout}</p>
              {YOUTUBE[market] && (
                <a
                  href={YOUTUBE[market]!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-bold text-[var(--on-brand)] hover:opacity-90"
                >
                  <span aria-hidden>▶</span> Nosso canal no YouTube
                </a>
              )}
            </div>
            <div>
              <p className="font-semibold">{t.categories}</p>
              <ul className="mt-2 space-y-1 text-sm text-white/80">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href={`/categoria/${c.id}`} className="hover:underline">
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
                  <Link href={legalPath(market, "privacy")} className="hover:underline">
                    {t.privacy}
                  </Link>
                </li>
                <li>
                  <Link href={legalPath(market, "terms")} className="hover:underline">
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
