import type { Platform } from "@/data/types";

const LOGOS: Partial<Record<Platform, string>> = {
  shopee: "/shopee.png",
  mercadolivre: "/mercadoLivre.svg",
};

/** Logo da loja (Shopee, Mercado Livre). Plataformas sem arquivo de logo não mostram nada. */
export function PlatformLogo({ platform, size = 16, className = "" }: { platform: Platform; size?: number; className?: string }) {
  const src = LOGOS[platform];
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" aria-hidden width={size} height={size} className={`inline-block shrink-0 ${className}`} style={{ width: size, height: size }} />
  );
}
