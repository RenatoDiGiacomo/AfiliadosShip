import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { OG_SIZE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Site preview";

export default async function Image() {
  const market = await getMarket();
  const t = dict[market];
  return ogCard(market, { label: t.heroBadge, title: t.heroTitle, footer: t.tagline });
}
