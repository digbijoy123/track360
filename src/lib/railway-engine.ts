const API_BASE = "https://railway-engine.apkscope.workers.dev";

export async function railwayRequest(path: string) {
  const apiKey = process.env.RAILWAY_ENGINE_API_KEY;
  if (!apiKey) {
    return {
      httpStatus: 503,
      body: {
        status: "NOT_CONFIGURED",
        error: {
          code: "RAILWAY_API_KEY_MISSING",
          message: "Live railway data is not configured. Add RAILWAY_ENGINE_API_KEY to the server environment."
        }
      }
    };
  }

  const response = await fetch(API_BASE + path, {
    headers: { "x-api-key": apiKey, accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(12000)
  });

  const body = await response.json().catch(() => ({
    status: "ERROR",
    error: { code: "INVALID_PROVIDER_RESPONSE", message: "The railway data provider returned an unreadable response." }
  }));

  return { httpStatus: response.status, body };
}
