import { CATEGORIES } from "@/data/categories";
import { guidesBR } from "@/data/guides.br";
import { guidesUS } from "@/data/guides.us";
import { productsBR } from "@/data/products.br";
import { productsUS } from "@/data/products.us";
import type { Guide, Market, Product } from "@/data/types";

const ALL_PRODUCTS: Product[] = [...productsBR, ...productsUS];
const ALL_GUIDES: Guide[] = [...guidesBR, ...guidesUS];

export const getProducts = (market: Market) => ALL_PRODUCTS.filter((p) => p.market === market);
export const getProduct = (market: Market, slug: string) =>
  ALL_PRODUCTS.find((p) => p.market === market && p.slug === slug);
export const getProductById = (id: string) => ALL_PRODUCTS.find((p) => p.id === id);

export const getGuides = (market: Market) => ALL_GUIDES.filter((g) => g.market === market);
export const getGuide = (market: Market, slug: string) =>
  ALL_GUIDES.find((g) => g.market === market && g.slug === slug);

/** Produtos de um guia, sempre do mesmo mercado do guia. */
export const getGuideProducts = (guide: Guide) => {
  // Catálogo real: produtos que listam o slug do guia. Sem nenhum, usa guide.productIds (exemplos).
  const tagged = getProducts(guide.market).filter((p) => p.guides?.includes(guide.slug));
  if (tagged.length > 0) return tagged;
  return guide.productIds
    .map(getProductById)
    .filter((p): p is Product => p !== undefined && p.market === guide.market);
};

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
