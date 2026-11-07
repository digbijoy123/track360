import { NextRequest, NextResponse } from "next/server";
import { railwayRequest } from "@/lib/railway-engine";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ number: string }> }
) {
  const { number } = await context.params;
  if (!/^\d{5}$/.test(number)) {
    return NextResponse.json({
      status: "INVALID_REQUEST",
      error: { code: "INVALID_TRAIN_NUMBER", message: "Enter a valid five-digit train number." }
    }, { status: 400 });
  }

  const date = request.nextUrl.searchParams.get("date");
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({
      status: "INVALID_REQUEST",
      error: { code: "INVALID_DATE", message: "Date must use YYYY-MM-DD format." }
    }, { status: 400 });
  }

  const suffix = date ? "?date=" + encodeURIComponent(date) : "";
  try {
    const [live, schedule, route] = await Promise.all([
      railwayRequest("/v1/train/" + number + "/status" + suffix),
      railwayRequest("/v1/train/" + number + "/schedule" + suffix),
      railwayRequest("/v1/train/" + number + "/route" + suffix)
    ]);

    const failed = [live, schedule, route].filter((item) => item.httpStatus >= 500 || item.httpStatus === 401);
    const httpStatus = live.httpStatus >= 400 ? live.httpStatus : 200;

    return NextResponse.json({
      provider: "Railway Engine",
      fetchedAt: new Date().toISOString(),
      live: live.body,
      schedule: schedule.body,
      route: route.body,
      partial: failed.length > 0
    }, { status: httpStatus });
  } catch {
    return NextResponse.json({
      status: "UPSTREAM_UNAVAILABLE",
      error: { code: "PROVIDER_TIMEOUT", message: "Live railway data could not be reached. Please retry." }
    }, { status: 502 });
  }
}
