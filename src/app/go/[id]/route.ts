import { NextResponse } from "next/server";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { getProductById } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return new NextResponse("Not found", { status: 404 });

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
