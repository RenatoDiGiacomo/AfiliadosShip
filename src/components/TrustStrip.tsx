import type { Market } from "@/data/types";
import { dict } from "@/lib/i18n";

export function TrustStrip({ market }: { market: Market }) {
  return (
    <div className={`grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${dict[market].trust.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
      {dict[market].trust.map((item) => (
        <div key={item.title} className="flex gap-3">
          <span className="text-3xl">{item.icon}</span>
          <div>
            <p className="font-semibold text-[var(--fg)]">{item.title}</p>
            <p className="text-sm text-[var(--fg-muted)]">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
