# Track360

Passenger-focused Indian Railways train tracking and delay information.

## Current implementation

- Live train search through the Railway Engine API.
- Selected-train dashboard for live status, timetable and route.
- Server-side API proxy: provider credentials are never sent to the browser.
- Automatic dashboard refresh every 60 seconds.
- Explicit provider freshness, confidence and observation timestamps where supplied.
- No fabricated positions, delay causes or ETAs when data is missing.

## Live data setup

Track360 currently integrates the independent **Railway Engine** API. It is not an official Indian Railways / CRIS service. Railway Engine documents a free API key, 60 requests/minute limit, live status, schedule, route and search endpoints. Provider coverage and uptime are not guaranteed.

1. Create an API key at https://railengine.vercel.app/ (Google sign-in).
2. Add it to the server environment as `RAILWAY_ENGINE_API_KEY`.
3. Do not use a `NEXT_PUBLIC_` prefix and do not commit the key.
4. Restart the server or redeploy after adding the environment variable.

For local development, create `.env.local` in the project root:

```env
RAILWAY_ENGINE_API_KEY=your_key_here
```

For a hosted deployment, add the same variable in the hosting provider's server-side environment settings.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## API routes

- `GET /api/trains/search?q=...`
- `GET /api/trains/:number` — fetches live status, schedule and route from the provider.

The train dashboard refreshes every 60 seconds while open. The data provider may return stale observations, missing ETA, incomplete route information, or an upstream error. Track360 displays those limitations instead of inventing values.

## Important limitations

- Railway Engine is an independent third-party provider, not an official railway source.
- Live status is dependent on upstream provider availability, coverage, freshness and rate limits.
- The app does not infer signal aspects, block clearances, controller decisions or exact operational causes.
- Departure-delay explanations and proprietary ETA prediction models are not implemented yet.
- Always verify critical journey information with official NTES / RailOne / railway enquiry 139.

Official NTES: https://enquiry.indianrail.gov.in/ntes/

## Project status

Development preview. No production deployment is implied by commits to this repository.
