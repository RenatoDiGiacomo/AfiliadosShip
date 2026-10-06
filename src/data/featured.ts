/**
 * Banners de campanha da home (só Brasil).
 * - `BANNER_PRINCIPAL`: banner grande, no topo (acima do hero). Troque o `slug` (do CSV) e os textos.
 * - `BANNER_COMPACTO`: banner pequeno, mais abaixo na página.
 * Slug inexistente no catálogo = o banner some.
 */
export type Campaign = {
  /** Slug do produto (CSV) cuja foto aparece no banner. */
  slug: string;
  /** Para onde o banner leva. Padrão: página do produto. */
  href?: string;
  badge: string;
  title: string;
  sub: string;
  chips: string[];
  cta: string;
  /** Classes Tailwind do fundo (gradiente). */
  gradient: string;
  /** Cor do selo e do botão. */
  accent: string;
  accentText: string;
};

export const BANNER_PRINCIPAL: Campaign = {
  slug: "squishy-glitter-grande",
  badge: "Novo no Mercado Livre",
  title: "Squishy grande com glitter para apertar e relaxar",
  sub: "Bola macia e sensorial, com brilho por todo lado. A cor vem aleatória. Veja o preço e o prazo atuais no Mercado Livre.",
  chips: ["Tamanho grande", "Macio e sensorial", "+500 vendidos"],
  cta: "Ver o Squishy",
  gradient: "from-pink-500 via-rose-500 to-orange-400",
  accent: "#FFE14D",
  accentText: "#4a1030",
};

export const BANNER_COMPACTO: Campaign = {
  slug: "beep-boop-bichinho-virtual",
  href: "/guia/beep-boop",
  badge: "Coleção",
  title: "Beep Boop, o bichinho virtual que vira chaveiro",
  sub: "Escolha o seu personagem: Tochi, Kirin, Mochi e Miao Miao.",
  chips: ["Mini jogos", "Vira chaveiro"],
  cta: "Ver a coleção",
  gradient: "from-fuchsia-600 via-violet-600 to-blue-600",
  accent: "#FFE14D",
  accentText: "#2b1055",
};
