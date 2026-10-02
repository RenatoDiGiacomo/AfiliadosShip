import { MARKET_IDS } from "@/data/markets";
import { getProduct, getProducts } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { OG_SIZE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Product preview";
export const generateStaticParams = () =>
  MARKET_IDS.flatMap((market) => getProducts(market).map((p) => ({ market, slug: p.slug })));

export default async function Image({ params }: { params: Promise<{ market: string; slug: string }> }) {
  const market = await getMarket(params);
  const { slug } = await params;
  const product = getProduct(market, slug);
  return ogCard(market, {
    label: product?.category ?? dict[market].siteName,
    title: product?.title ?? dict[market].siteName,
    footer: dict[market].heroBadge,
  });
}
