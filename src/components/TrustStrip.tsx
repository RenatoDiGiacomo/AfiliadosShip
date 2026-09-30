import type { Market } from "@/data/types";
import { dict } from "@/lib/i18n";

export function TrustStrip({ market }: { market: Market }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-3">
      {dict[market].trust.map((item) => (
        <div key={item.title} className="flex gap-3">
          <span className="text-3xl">{item.icon}</span>
          <div>
            <p className="font-semibold text-slate-900">{item.title}</p>
            <p className="text-sm text-slate-600">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
