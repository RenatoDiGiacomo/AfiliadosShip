"use client";

import { useEffect } from "react";

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/**
 * Guarda de onde o visitante veio (UTMs do link do YouTube/TikTok) num cookie de 7 dias,
 * para o /go/ saber qual vídeo gerou o clique em "comprar". Não renderiza nada.
 */
export function UtmCapture() {
  useEffect(() => {
    try {
      const url = new URLSearchParams(window.location.search);
      const saved = new URLSearchParams();
      for (const k of KEYS) {
        const v = url.get(k);
        if (v) saved.set(k, v.slice(0, 100));
      }
      let refHost = "";
      try {
        const h = document.referrer ? new URL(document.referrer).hostname : "";
        if (h && h !== window.location.hostname) refHost = h;
      } catch {}

      const hasUtm = [...saved.keys()].length > 0;
      const hasCookie = document.cookie.split("; ").some((c) => c.startsWith("attr="));
      // UTM nova sempre sobrescreve; sem UTM, só guarda o site de origem se ainda não houver nada.
      if (!hasUtm && (hasCookie || !refHost)) return;
      if (refHost) saved.set("ref", refHost);
      document.cookie = `attr=${encodeURIComponent(saved.toString())}; path=/; max-age=604800; SameSite=Lax`;
    } catch {
      // cookies bloqueados: segue sem rastrear origem
    }
  }, []);
  return null;
}
