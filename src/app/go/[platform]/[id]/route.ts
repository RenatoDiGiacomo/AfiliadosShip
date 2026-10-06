import { after, NextResponse } from "next/server";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { getProductById } from "@/lib/data";
import { gaClientId, isBot, parseAttribution, sendGa4Click } from "@/lib/tracking";

export const dynamic = "force-dynamic";

// /go/<loja>/<id>: a loja aparece na URL para deixar claro o destino (ex.: /go/amazon/us-...).
export async function GET(req: Request, { params }: { params: Promise<{ platform: string; id: string }> }) {
  const { platform, id } = await params;
  const product = getProductById(id);
  if (!product || product.platform !== platform) return new NextResponse("Not found", { status: 404 });

  if (!isBot(req.headers.get("user-agent"))) {
    const attr = parseAttribution(req);
    // Log (aparece nos logs da Vercel) + evento no GA4, sem atrasar o redirect.
    console.log(
      JSON.stringify({
        event: "affiliate_click",
        id: product.id,
        platform: product.platform,
        market: product.market,
        ...attr,
        at: new Date().toISOString(),
      }),
    );
    after(() =>
      sendGa4Click(gaClientId(req), {
        product_id: product.id,
        product_title: product.title.slice(0, 100),
        platform: product.platform,
        category: product.category,
        ...attr,
      }),
    );
  }

  return NextResponse.redirect(buildAffiliateUrl(product), 302);
}
