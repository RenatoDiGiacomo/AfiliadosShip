import type { Product } from "@/data/types";
import { ProductCard } from "./ProductCard";

/** Carrossel horizontal (arrasta/rola) com os 5 produtos mais recentes: o último do CSV vem primeiro. */
export function SelectionCarousel({ products }: { products: Product[] }) {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
      {products.map((p) => (
        <div key={p.id} className="w-60 shrink-0 snap-start sm:w-64 [&>article]:h-full">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
