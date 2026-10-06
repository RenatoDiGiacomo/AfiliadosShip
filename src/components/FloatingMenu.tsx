"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type MenuLink = { href: string; label: string; emoji?: string };

/**
 * Menu flutuante (celular): botão redondo fixo no canto que abre um painel com todas as telas do site.
 * Só aparece abaixo de `md` (no computador o cabeçalho já mostra tudo).
 */
export function FloatingMenu({
  links,
  searchPlaceholder,
  youtube,
}: {
  links: MenuLink[];
  searchPlaceholder: string;
  youtube?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
      {open && (
        <nav
          id="menu-flutuante"
          aria-label="Menu do site"
          className="fixed inset-x-3 bottom-24 z-50 max-h-[70vh] overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl"
        >
          <form action="/busca" method="get" role="search" className="mb-3 flex">
            <input
              type="search"
              name="q"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full rounded-l-full border border-r-0 border-slate-300 bg-slate-100 px-4 py-2 text-sm text-[var(--fg)] outline-none"
            />
            <button type="submit" aria-label="Buscar" className="rounded-r-full bg-[var(--brand)] px-4 text-[var(--on-brand)]">
              🔍
            </button>
          </form>
          <ul className="grid grid-cols-2 gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`flex h-full items-center gap-2 rounded-2xl px-3 py-3 text-sm font-bold ${
                    pathname === l.href
                      ? "bg-[var(--brand)] text-[var(--on-brand)]"
                      : "bg-slate-100 text-[var(--fg)] active:bg-slate-200"
                  }`}
                >
                  {l.emoji && <span aria-hidden="true">{l.emoji}</span>}
                  <span className="leading-tight">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {youtube && (
            <a
              href={youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand-dark)] px-3 py-3 text-sm font-bold text-white"
            >
              <span aria-hidden="true">▶</span> Nosso canal no YouTube
            </a>
          )}
        </nav>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="menu-flutuante"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand)] text-[var(--on-brand)] shadow-xl ring-4 ring-white transition active:scale-95"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
    </div>
  );
}
