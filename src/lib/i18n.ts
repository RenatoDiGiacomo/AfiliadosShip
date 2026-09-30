import type { Market } from "@/data/types";

export interface Dict {
  siteName: string;
  tagline: string;
  announcement: string;
  searchPlaceholder: string;
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  guides: string;
  guidesNav: string;
  categories: string;
  featured: string;
  seeAll: string;
  fromStore: (store: string) => string;
  readReview: string;
  buyOn: (store: string) => string;
  pros: string;
  cons: string;
  updatedOn: string;
  home: string;
  privacy: string;
  terms: string;
  disclosure: string;
  amazonNotice?: string;
  otherMarket: string;
  related: string;
  productsCount: (n: number) => string;
  referencePrice: string;
  results: (q: string, n: number) => string;
  noResults: string;
  searchTitle: string;
  trust: { icon: string; title: string; text: string }[];
  footerAbout: string;
  privacyBody: string[];
  termsBody: string[];
}

export const dict: Record<Market, Dict> = {
  br: {
    siteName: "Achados Home Office",
    tagline: "Reviews e guias de compra para montar seu home office gastando pouco.",
    announcement: "Você compra direto no Mercado Livre e na Shopee. Nós só mostramos os melhores achados.",
    searchPlaceholder: "O que você está procurando?",
    heroBadge: "Achados da semana",
    heroTitle: "Monte seu home office sem gastar muito",
    heroSub: "Guias e comparações com produtos do Mercado Livre e da Shopee.",
    heroCta: "Ver guia completo",
    guides: "Guias de compra",
    guidesNav: "Guias",
    categories: "Categorias",
    featured: "Destaques da semana",
    seeAll: "Ver todos",
    fromStore: (store) => (store === "Shopee" ? "Em destaque na Shopee" : `Em destaque no ${store}`),
    readReview: "Ler análise",
    buyOn: (store) => (store === "Shopee" ? "Ver na Shopee" : `Ver no ${store}`),
    pros: "Pontos positivos",
    cons: "Pontos de atenção",
    updatedOn: "Atualizado em",
    home: "Início",
    privacy: "Privacidade",
    terms: "Termos",
    disclosure:
      "Ganhamos comissão por compras feitas pelos links deste site, sem custo extra para você. Preços e disponibilidade mudam: confira sempre na loja.",
    otherMarket: "English (US)",
    related: "Veja também",
    productsCount: (n) => `${n} produtos`,
    referencePrice: "Preço de referência",
    results: (q, n) => `${n} resultado${n === 1 ? "" : "s"} para "${q}"`,
    noResults: "Nenhum produto encontrado. Tente outro termo ou navegue pelas categorias.",
    searchTitle: "Busca",
    trust: [
      { icon: "🛒", title: "Compra direto na loja", text: "Você finaliza no Mercado Livre ou na Shopee, com as regras de cada loja." },
      { icon: "🔍", title: "Análises objetivas", text: "Pontos positivos, pontos de atenção e o que observar antes de comprar." },
      { icon: "💸", title: "Sem custo extra", text: "Recebemos comissão da loja. Você paga o mesmo preço." },
    ],
    footerAbout: "Reviews, comparações e guias de compra para quem trabalha em casa.",
    privacyBody: [
      "Este site pode usar cookies para lembrar sua escolha de mercado (Brasil ou EUA) e para medir o uso do site.",
      "Ao clicar em links de afiliado, você é redirecionado para a loja (Mercado Livre, Shopee), que possui sua própria política de privacidade.",
      "Não coletamos dados pessoais além dos necessários para o funcionamento do site. Modelo básico: revise com um profissional antes de publicar.",
    ],
    termsBody: [
      "O conteúdo deste site é informativo e não constitui recomendação de compra individualizada.",
      "Preços, estoque e condições são definidos pelas lojas e podem mudar sem aviso.",
      "Podemos receber comissão por compras feitas pelos links de afiliado. Modelo básico: revise com um profissional antes de publicar.",
    ],
  },
  us: {
    siteName: "Desk Picks",
    tagline: "Reviews and buying guides to build a great home office on a budget.",
    announcement: "You buy directly on Amazon and eBay. We just show you the best finds.",
    searchPlaceholder: "What are you looking for?",
    heroBadge: "This week's picks",
    heroTitle: "Build your home office without overspending",
    heroSub: "Guides and comparisons featuring products from Amazon and eBay.",
    heroCta: "See the full guide",
    guides: "Buying guides",
    guidesNav: "Guides",
    categories: "Categories",
    featured: "This week's highlights",
    seeAll: "See all",
    fromStore: (store) => `Featured on ${store}`,
    readReview: "Read review",
    buyOn: (store) => `View on ${store}`,
    pros: "What's good",
    cons: "Things to watch",
    updatedOn: "Updated",
    home: "Home",
    privacy: "Privacy",
    terms: "Terms",
    disclosure:
      "We earn a commission from purchases made through links on this site, at no extra cost to you. Prices and availability change: always check the store.",
    amazonNotice: "As an Amazon Associate I earn from qualifying purchases.",
    otherMarket: "Português (BR)",
    related: "You may also like",
    productsCount: (n) => `${n} products`,
    referencePrice: "Reference price",
    results: (q, n) => `${n} result${n === 1 ? "" : "s"} for "${q}"`,
    noResults: "No products found. Try another term or browse the categories.",
    searchTitle: "Search",
    trust: [
      { icon: "🛒", title: "Buy directly at the store", text: "You check out on Amazon or eBay, under each store's own rules." },
      { icon: "🔍", title: "Straightforward reviews", text: "What's good, what to watch, and what to check before buying." },
      { icon: "💸", title: "No extra cost", text: "We earn a commission from the store. You pay the same price." },
    ],
    footerAbout: "Reviews, comparisons and buying guides for people who work from home.",
    privacyBody: [
      "This site may use cookies to remember your market choice (Brazil or US) and to measure site usage.",
      "When you click an affiliate link you are sent to the store (Amazon, eBay), which has its own privacy policy.",
      "We do not collect personal data beyond what is needed to run the site. Basic template: review with a professional before publishing.",
    ],
    termsBody: [
      "Content on this site is informational and is not individual purchase advice.",
      "Prices, stock and conditions are set by the stores and may change without notice.",
      "We may earn a commission from purchases made through affiliate links. Basic template: review with a professional before publishing.",
    ],
  },
};
