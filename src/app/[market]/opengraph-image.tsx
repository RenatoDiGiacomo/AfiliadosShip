import { MARKET_IDS } from "@/data/markets";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { OG_SIZE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Site preview";
export const generateStaticParams = () => MARKET_IDS.map((market) => ({ market }));

export default async function Image({ params }: { params: Promise<{ market: string }> }) {
  const market = await getMarket(params);
  const t = dict[market];
  return ogCard(market, { label: t.heroBadge, title: t.heroTitle, footer: t.tagline });
}
