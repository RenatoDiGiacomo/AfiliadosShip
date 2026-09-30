import type { Metadata } from "next";
import { CategoryCircles } from "@/components/CategoryCircles";
import { GuideCard } from "@/components/GuideCard";
import { HeroBanner } from "@/components/HeroBanner";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { TrustStrip } from "@/components/TrustStrip";
import { MARKETS, MARKET_IDS, PLATFORM_LABEL } from "@/data/markets";
import { getGuides, getProducts } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";

export const dynamicParams = false;
export const revalidate = 86400; // atualiza imagens extraídas dos links a cada 24h
export const generateStaticParams = () => MARKET_IDS.map((market) => ({ market }));

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const market = await getMarket(params);
  return {
    alternates: { canonical: `/${market}`, languages: { "pt-BR": "/br", "en-US": "/us" } },
  };
}

export default async function MarketHome({ params }: { params: Promise<{ market: string }> }) {
  const market = await getMarket(params);
  const t = dict[market];
  const products = getProducts(market);
  const guides = getGuides(market);

  return (
    <div className="space-y-12">
      <HeroBanner market={market} />

      <section>
        <SectionTitle title={t.categories} />
        <CategoryCircles market={market} />
      </section>

      <section>
        <SectionTitle title={t.featured} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <TrustStrip market={market} />

      <section>
        <SectionTitle title={t.guides} />
        <div className="grid gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>

      {MARKETS[market].platforms.map((platform) => (
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
