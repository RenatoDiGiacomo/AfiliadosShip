import type { Metadata } from "next";
import { CampaignBanner } from "@/components/CampaignBanner";
import { CategoryCircles } from "@/components/CategoryCircles";
import { GuideCard } from "@/components/GuideCard";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductCard } from "@/components/ProductCard";
import { SelectionCarousel } from "@/components/SelectionCarousel";
import { SectionTitle } from "@/components/SectionTitle";
import { TrustStrip } from "@/components/TrustStrip";
import { MARKETS, PLATFORM_LABEL } from "@/data/markets";
import { getCategories, getGuides, getProducts } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";

export const revalidate = 86400; // atualiza imagens extraídas dos links a cada 24h

export async function generateMetadata(): Promise<Metadata> {
  const market = await getMarket();
  return {
    alternates: { canonical: "/" },
    // Mercado sem produtos (página "em breve") não deve ser indexado.
    robots: getProducts(market).length === 0 ? { index: false, follow: false } : undefined,
  };
}

export default async function MarketHome() {
  const market = await getMarket();
  const t = dict[market];
  const products = getProducts(market);
  const guides = getGuides(market);

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-5xl">🛍️</p>
        <h1 className="mt-4 text-3xl font-extrabold text-[var(--fg)]">{t.comingSoonTitle}</h1>
        <p className="mt-2 text-[var(--fg-muted)]">{t.comingSoonText}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <CampaignBanner market={market} />
      <HeroBanner market={market} />

      {market !== "br" && getCategories(market).length > 0 && (
        <section>
          <SectionTitle title={t.categories} />
          <CategoryCircles market={market} />
        </section>
      )}

      <section>
        <SectionTitle title={t.featured} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <TrustStrip market={market} />

      {market === "br" && (
        <section>
          <SectionTitle title={t.guides} href={guides[0] ? `/guia/${guides[0].slug}` : undefined} linkLabel={t.seeAll} />
          <SelectionCarousel products={products.slice(0, 5)} />
        </section>
      )}

      {market !== "br" && guides.length > 0 && (
        <section>
          <SectionTitle title={t.guides} />
          <div className="grid gap-4 sm:grid-cols-2">
            {guides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </section>
      )}

      {MARKETS[market].platforms
        .filter((platform) => products.some((p) => p.platform === platform))
        .map((platform) => (
        <section key={platform}>
          <SectionTitle title={t.fromStore(PLATFORM_LABEL[platform])} />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter((p) => p.platform === platform)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
