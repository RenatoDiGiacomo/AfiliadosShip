import type { Metadata } from "next";
import { dict } from "@/lib/i18n";
import { getMarket } from "@/lib/market";
import { legalPath } from "@/lib/paths";

export async function generateMetadata(): Promise<Metadata> {
  const market = await getMarket();
  return { title: dict[market].terms, alternates: { canonical: legalPath(market, "terms") } };
}

export default async function Page() {
  const market = await getMarket();
  const t = dict[market];
  return (
    <article className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">{t.terms}</h1>
      {t.termsBody.map((p) => (
        <p key={p} className="text-[var(--fg-muted)]">
          {p}
        </p>
      ))}
    </article>
  );
}
