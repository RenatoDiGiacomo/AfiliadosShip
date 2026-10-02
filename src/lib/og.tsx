import { ImageResponse } from "next/og";
import type { Market } from "@/data/types";
import { dict } from "@/lib/i18n";

/** Proporção 2:3 (1000x1500): formato do Pinterest. */
export const OG_SIZE = { width: 1000, height: 1500 };

const COLORS = { br: ["#14284d", "#0B1426"], us: ["#15803d", "#14532d"] } as const;

/** Cartão de compartilhamento sem foto de loja: só texto e cor da marca (não usa imagem de terceiros). */
export function ogCard(market: Market, opts: { label: string; title: string; footer: string }) {
  const t = dict[market];
  const [from, to] = COLORS[market];
  const size = opts.title.length > 70 ? 76 : opts.title.length > 40 ? 92 : 110;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "white",
          background: `linear-gradient(160deg, ${from}, ${to})`,
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", opacity: 0.85 }}>
          {opts.label}
        </div>
        <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.1 }}>{opts.title}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 40, opacity: 0.9 }}>{opts.footer}</div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 800 }}>{t.siteName}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
