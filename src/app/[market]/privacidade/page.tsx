import type { Metadata } from "next";
import { MARKET_IDS } from "@/data/markets";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";

export const dynamicParams = false;
export const generateStaticParams = () => MARKET_IDS.map((market) => ({ market }));

export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const market = await getMarket(params);
  return { title: dict[market].privacy, alternates: { canonical: `/${market}/privacidade` } };
}

export default async function Page({ params }: { params: Promise<{ market: string }> }) {
  const market = await getMarket(params);
  const t = dict[market];
  return (
    <article className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">{t.privacy}</h1>
      {t.privacyBody.map((p) => (
        <p key={p} className="text-slate-700">
          {p}
        </p>
      ))}
    </article>
  );
}
