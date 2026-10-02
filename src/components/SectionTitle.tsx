import Link from "next/link";

export function SectionTitle({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <h2 className="text-xl font-bold text-[var(--fg)] sm:text-2xl">{title}</h2>
      {href && linkLabel && (
        <Link href={href} className="text-sm font-semibold text-[var(--brand-text)] hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
