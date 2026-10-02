import { MARKET_IDS } from "@/data/markets";
import { getGuide, getGuides } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { OG_SIZE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Guide preview";
export const generateStaticParams = () =>
  MARKET_IDS.flatMap((market) => getGuides(market).map((g) => ({ market, slug: g.slug })));

export default async function Image({ params }: { params: Promise<{ market: string; slug: string }> }) {
  const market = await getMarket(params);
  const { slug } = await params;
  const guide = getGuide(market, slug);
  return ogCard(market, {
    label: dict[market].guidesNav,
    title: guide?.title ?? dict[market].siteName,
    footer: dict[market].heroBadge,
  });
}
