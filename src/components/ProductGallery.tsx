"use client";

import { useState } from "react";
import { ProductImage } from "./ProductImage";

export function ProductGallery({ images, alt, fallback }: { images: string[]; alt: string; fallback: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} ${i + 1}`}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-white ${
                i === active ? "border-[var(--brand)] ring-2 ring-[var(--brand)]/30" : "border-slate-200"
              }`}
            >
              <ProductImage src={src} alt="" fallback={fallback} className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
      <div className="relative aspect-square flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <ProductImage src={images[active]} alt={alt} fallback={fallback} className="absolute inset-0 h-full w-full object-contain" />
      </div>
    </div>
  );
}
