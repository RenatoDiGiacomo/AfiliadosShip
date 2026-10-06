/**
 * Banners de campanha da home (só Brasil).
 * - Hero do topo: `HERO_ESPECIAL` (mosaico com os produtos de um guia). Sem produtos no guia = hero padrão.
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

/** Hero do topo: campanha sazonal. Os produtos são os que têm este guia no CSV (coluna `guias`). */
export const HERO_ESPECIAL = {
  guide: "dia-das-criancas",
  badge: "Especial Dia das Crianças",
  title: "Dia das Crianças: brinquedos em alta",
  sub: "Uma seleção do Mercado Livre para presentear, com pontos positivos e pontos de atenção de cada item.",
  cta: "Ver o especial",
  max: 9,
};
