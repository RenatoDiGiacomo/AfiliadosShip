import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { MARKET_IDS } from "@/data/markets";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";

type Params = Promise<{ market: string; id: string }>;

export const dynamicParams = false;
export const revalidate = 86400;
export const generateStaticParams = () =>
  MARKET_IDS.flatMap((market) => getCategories(market).map((c) => ({ market, id: c.id })));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const market = await getMarket(params);
  const { id } = await params;
  const category = getCategory(market, id);
  if (!category) return {};
  return { title: category.name, alternates: { canonical: `/${market}/categoria/${id}` } };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const market = await getMarket(params);
  const { id } = await params;
  const category = getCategory(market, id);
  if (!category) notFound();
  const t = dict[market];
  const products = getProductsByCategory(market, id);

  return (
    <div className="space-y-6">
      <nav className="text-sm text-slate-500">
        <Link href={`/${market}`} className="hover:underline">
          {t.home}
        </Link>{" "}
        / {category.name}
      </nav>
      <h1 className="text-3xl font-extrabold">
        <span className="mr-2">{category.emoji}</span>
        {category.name}
      </h1>
      <div className="flex flex-wrap gap-2">
        {getCategories(market).map((c) => (
          <Link
            key={c.id}
            href={`/${market}/categoria/${c.id}`}
            className={`rounded-full border px-3 py-1 text-sm ${
              c.id === id
                ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-[var(--brand)]"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
