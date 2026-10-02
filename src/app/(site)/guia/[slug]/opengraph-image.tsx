import { getGuide, getGuides } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { OG_SIZE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Guide preview";
export const generateStaticParams = () =>
  getGuides("br").map((g) => ({ slug: g.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const market = await getMarket();
  const { slug } = await params;
  const guide = getGuide(market, slug);
  return ogCard(market, {
    label: dict[market].guidesNav,
    title: guide?.title ?? dict[market].siteName,
    footer: dict[market].heroBadge,
  });
}
