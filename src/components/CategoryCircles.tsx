import Link from "next/link";
import type { Market } from "@/data/types";
import { getCategories } from "@/lib/data";

export function CategoryCircles({ market }: { market: Market }) {
  return (
    <div className="flex gap-5 overflow-x-auto pb-2 sm:justify-center">
      {getCategories(market).map((c) => (
        <Link key={c.id} href={`/${market}/categoria/${c.id}`} className="group flex w-20 shrink-0 flex-col items-center gap-2">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand)] text-3xl shadow transition group-hover:scale-110">
            {c.emoji}
          </span>
          <span className="text-center text-xs font-medium text-slate-700">{c.name}</span>
        </Link>
      ))}
    </div>
  );
}
