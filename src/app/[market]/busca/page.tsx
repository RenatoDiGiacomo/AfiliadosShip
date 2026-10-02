import type { Metadata } from "next";
import Link from "next/link";
import { CategoryCircles } from "@/components/CategoryCircles";
import { ProductCard } from "@/components/ProductCard";
import { searchProducts } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";

export const metadata: Metadata = { robots: { index: false, follow: true } };

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ market: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const market = await getMarket(params);
  const { q = "" } = await searchParams;
  const query = q.trim().slice(0, 80);
  const t = dict[market];
  const results = query ? searchProducts(market, query) : [];

  return (
    <div className="space-y-6">
      <nav className="text-sm text-[var(--fg-soft)]">
        <Link href={`/${market}`} className="hover:underline">
          {t.home}
        </Link>{" "}
        / {t.searchTitle}
      </nav>
      <h1 className="text-2xl font-extrabold">{query ? t.results(query, results.length) : t.searchTitle}</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-[var(--fg-muted)]">{t.noResults}</p>
          <CategoryCircles market={market} />
        </div>
      )}
    </div>
  );
}
