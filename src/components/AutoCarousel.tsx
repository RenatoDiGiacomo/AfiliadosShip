"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Carrossel automático com setas: avança sozinho a cada `interval` ms, volta ao início no fim,
 * pausa com o mouse/toque por cima e respeita "reduzir movimento". Também dá para arrastar/rolar.
 */
export function AutoCarousel({
  children,
  interval = 1800,
  slideClassName = "w-[46%] sm:w-[40%]",
  label,
}: {
  children: ReactNode;
  interval?: number;
  slideClassName?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const justDragged = useRef(false);
  const drag = useRef<{ x: number; left: number; moved: boolean; id: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);
  const slides = Children.toArray(children);
  const total = slides.length;

  // Rolagem própria (rápida, ~350 ms): a "smooth" do navegador é lenta e não dá para ajustar.
  const goTo = useCallback((i: number) => {
    const el = ref.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (!el || !target) return;
    indexRef.current = i;
    setActive(i);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const to = target.offsetLeft - el.offsetLeft;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (reduce) {
      el.scrollLeft = to;
      return;
    }
    const from = el.scrollLeft;
    const start = performance.now();
    const dur = 350;
    el.style.scrollSnapType = "none";
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.scrollLeft = from + (to - from) * e;
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else {
        el.style.scrollSnapType = "";
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const next = useCallback(() => goTo((indexRef.current + 1) % total), [goTo, total]);
  const prev = useCallback(() => goTo((indexRef.current - 1 + total) % total), [goTo, total]);

  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [paused, total, interval, next]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // Mantém o ponto ativo certo quando a pessoa rola com o dedo/mouse.
  const onScroll = () => {
    if (rafRef.current) return;
    const el = ref.current;
    if (!el) return;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    indexRef.current = best;
    setActive(best);
  };

  // Segurar e arrastar com o mouse (no toque, a rolagem nativa do celular já funciona).
  const nearest = () => {
    const el = ref.current;
    if (!el) return 0;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !ref.current) return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false, id: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      el.style.scrollSnapType = "none";
      el.setPointerCapture(d.id);
      setDragging(true);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    justDragged.current = true;
    setTimeout(() => {
      justDragged.current = false;
    }, 0);
    setDragging(false);
    goTo(nearest());
  };

  const arrow =
    "absolute top-[42%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#5b1456] shadow-lg ring-2 ring-[#FFE14D] transition hover:scale-110 active:scale-95 sm:h-11 sm:w-11";

  return (
    <div
      className="relative min-w-0 max-w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
    >
      <div
        ref={ref}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          // Depois de arrastar, não abre o produto por engano.
          if (drag.current?.moved || justDragged.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className={`flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
      >
        {slides.map((s, i) => (
          <div key={i} className={`shrink-0 snap-start ${slideClassName}`}>
            {s}
          </div>
        ))}
      </div>
      {total > 1 && (
        <>
          <button type="button" onClick={prev} aria-label="Anterior" className={`${arrow} left-2`}>
            <Chevron dir="left" />
          </button>
          <button type="button" onClick={next} aria-label="Próximo" className={`${arrow} right-2`}>
            <Chevron dir="right" />
          </button>
          <div className="mt-1 flex justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para o item ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${i === active ? "w-6 bg-white" : "w-2.5 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** Seta desenhada em SVG: fica sempre centralizada no botão (o caractere ‹ › ficava torto). */
function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}
