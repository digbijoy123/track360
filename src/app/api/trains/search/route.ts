import { NextRequest, NextResponse } from "next/server";
import { railwayRequest } from "@/lib/railway-engine";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("q") || "").trim();
  if (query.length < 2 || query.length > 80) {
    return NextResponse.json({
      status: "INVALID_REQUEST",
      error: { code: "INVALID_QUERY", message: "Enter at least two characters." }
    }, { status: 400 });
  }

  try {
    const result = await railwayRequest("/v1/trains/search?q=" + encodeURIComponent(query) + "&limit=8");
    return NextResponse.json(result.body, { status: result.httpStatus });
  } catch {
    return NextResponse.json({
      status: "UPSTREAM_UNAVAILABLE",
      error: { code: "PROVIDER_TIMEOUT", message: "The train search provider did not respond. Try again shortly." }
    }, { status: 502 });
  }
}
