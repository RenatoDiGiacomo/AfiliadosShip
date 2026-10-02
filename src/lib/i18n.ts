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
  checkPrice: (store: string) => string;
  priceOn: (store: string) => string;
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
  comingSoonTitle: string;
  comingSoonText: string;
  privacyBody: string[];
  termsBody: string[];
}

export const dict: Record<Market, Dict> = {
  br: {
    siteName: "Achado da Web",
    tagline: "Achados selecionados: produtos úteis do Mercado Livre e da Shopee, com prós e contras.",
    announcement: "Você compra direto no Mercado Livre e na Shopee. Nós só mostramos os melhores achados.",
    searchPlaceholder: "O que você está procurando?",
    heroBadge: "Achados da semana",
    heroTitle: "Os melhores achados da web",
    heroSub: "Produtos selecionados do Mercado Livre e da Shopee. Você compra direto na loja.",
    heroCta: "Ver seleção",
    guides: "Seleções",
    guidesNav: "Guias",
    categories: "Categorias",
    featured: "Achados em destaque",
    seeAll: "Ver todos",
    fromStore: (store) => (store === "Shopee" ? "Em destaque na Shopee" : `Em destaque no ${store}`),
    readReview: "Ler análise",
    buyOn: (store) => (store === "Shopee" ? "Ver na Shopee" : `Ver no ${store}`),
    checkPrice: (store) => (store === "Shopee" ? "Ver preço na Shopee" : `Ver preço no ${store}`),
    priceOn: (store) => (store === "Shopee" ? "Preço atual na Shopee" : `Preço atual no ${store}`),
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
      { icon: "🔍", title: "Análises objetivas", text: "Pontos positivos, pontos de atenção e o que observar antes de comprar." },
      { icon: "💸", title: "Sem custo extra", text: "Recebemos comissão da loja. Você paga o mesmo preço." },
    ],
    footerAbout: "Achados selecionados para você economizar tempo na hora de comprar.",
    comingSoonTitle: "Em breve",
    comingSoonText: "Estamos preparando os achados do Brasil. Volte em breve!",
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
    siteName: "Daily Finds",
    tagline: "Hand-picked useful finds from Amazon and eBay, with pros and cons.",
    announcement: "You buy directly on Amazon and eBay. We just show you the best finds.",
    searchPlaceholder: "What are you looking for?",
    heroBadge: "This week's finds",
    heroTitle: "The best finds on the internet",
    heroSub: "Hand-picked products from Amazon and eBay. You buy directly from the store.",
    heroCta: "See the collection",
    guides: "Collections",
    guidesNav: "Guides",
    categories: "Categories",
    featured: "Featured finds",
    seeAll: "See all",
    fromStore: (store) => `Featured on ${store}`,
    readReview: "Read review",
    buyOn: (store) => `View on ${store}`,
    checkPrice: (store) => `Check price on ${store}`,
    priceOn: (store) => `Current price on ${store}`,
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
    footerAbout: "Hand-picked finds to save you time when shopping.",
    comingSoonTitle: "Coming soon",
    comingSoonText: "We are getting the finds ready. Check back soon!",
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
