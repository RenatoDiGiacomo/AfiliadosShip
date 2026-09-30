import { NextResponse } from "next/server";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { getProductById } from "@/lib/data";

export const dynamic = "force-dynamic";

// /go/<loja>/<id>: a loja aparece na URL para deixar claro o destino (ex.: /go/amazon/us-...).
export async function GET(_req: Request, { params }: { params: Promise<{ platform: string; id: string }> }) {
  const { platform, id } = await params;
  const product = getProductById(id);
  if (!product || product.platform !== platform) return new NextResponse("Not found", { status: 404 });

  // Registro simples de clique (aparece nos logs da hospedagem). Métricas melhores: ver roadmap.
  console.log(
    JSON.stringify({
      event: "affiliate_click",
      id: product.id,
      platform: product.platform,
      market: product.market,
      at: new Date().toISOString(),
    }),
  );

  return NextResponse.redirect(buildAffiliateUrl(product), 302);
}
