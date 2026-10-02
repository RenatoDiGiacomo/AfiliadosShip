import { CATEGORIES } from "@/data/categories";
import { guidesBR } from "@/data/guides.br";
import { guidesUS } from "@/data/guides.us";
import { productsBR } from "@/data/products.br";
import { productsUS } from "@/data/products.us";
import type { Guide, Market, Product } from "@/data/types";

// Ordem de chegada: o último produto do CSV vem primeiro em todas as listas (home, categorias, guias, carrossel, busca).
const newestFirst = (list: Product[]) => list.slice().reverse();
const ALL_PRODUCTS: Product[] = [...newestFirst(productsBR), ...newestFirst(productsUS)];
const ALL_GUIDES: Guide[] = [...guidesBR, ...guidesUS];

export const getProducts = (market: Market) => ALL_PRODUCTS.filter((p) => p.market === market);
export const getProduct = (market: Market, slug: string) =>
  ALL_PRODUCTS.find((p) => p.market === market && p.slug === slug);
export const getProductById = (id: string) => ALL_PRODUCTS.find((p) => p.id === id);

/** Só coleções que têm produtos (a lista vem da coluna `guias` do CSV). */
export const getGuides = (market: Market) =>
  ALL_GUIDES.filter((g) => g.market === market && getGuideProducts(g).length > 0);
export const getGuide = (market: Market, slug: string) => getGuides(market).find((g) => g.slug === slug);

/** Produtos de um guia: os que listam o slug do guia na coluna `guias`, do mesmo mercado. */
export const getGuideProducts = (guide: Guide) =>
  getProducts(guide.market).filter((p) => p.guides?.includes(guide.slug));

/** Só categorias que têm pelo menos um produto (evita páginas vazias). */
export const getCategories = (market: Market) =>
  CATEGORIES[market].filter((c) => getProducts(market).some((p) => p.categoryId === c.id));
export const getCategory = (market: Market, id: string) => getCategories(market).find((c) => c.id === id);
export const getProductsByCategory = (market: Market, categoryId: string) =>
  getProducts(market).filter((p) => p.categoryId === categoryId);

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Busca simples: todos os termos precisam aparecer no título, resumo ou categoria. */
export function searchProducts(market: Market, query: string): Product[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return getProducts(market).filter((p) => {
    const haystack = normalize(`${p.title} ${p.summary} ${p.category}`);
    return terms.every((t) => haystack.includes(t));
  });
}
