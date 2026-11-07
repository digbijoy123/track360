# Track360 — Initial Architecture

## Product boundary
Track360 is a passenger-facing train journey information website. A passenger searches for a train and sees information for that selected service only. Internal backend services may analyze broader railway movement and historical patterns.

## Core passenger capabilities
- Train lookup by name or number.
- Selected-train journey overview and map.
- Station departure intelligence.
- En-route stoppage and delay intelligence.
- Estimated arrival time with confidence and freshness indicators.
- Clear distinction between verified facts, operational evidence, and model inference.

## Intelligence domains
### Station Departure Intelligence
Compare scheduled departure with observed train movement and available operational evidence. Potential inputs include incoming rake/turnaround status, station activity, timetable, nearby train movement, route constraints, and official operational updates.

### En-route Delay Intelligence
Detect unexpected stoppages and evaluate contextual evidence such as nearby train movement, junction activity, section topology, timetable constraints, and historical patterns.

## Prediction contract
Every prediction exposed to passengers should include:
- value: predicted departure or arrival timestamp/window.
- generatedAt: when the prediction was generated.
- expiresAt: when it must be refreshed or treated as stale.
- confidence: calibrated confidence or an explicitly labelled qualitative band.
- evidence: supporting observations and their sources.
- explanation: concise passenger-readable interpretation.
- status: provisional, updated, stale, or withdrawn.

Never present an inferred cause as a confirmed operational fact. GPS position alone does not reveal signal aspect, dispatcher instructions, or the exact reason a train is held.

## Initial implementation stack
- Next.js + React + TypeScript.
- PostgreSQL with PostGIS when spatial queries are introduced.
- MapLibre GL for 2D mapping; 3D mapping only after the data and 2D experience are reliable.
- Provider adapters isolate external train-position and timetable sources from product logic.

## Data strategy and constraints
The first engineering risk is access to fresh, lawful, sufficiently granular railway data. The initial UI must not imply live data until a provider and its terms are validated. Demo data must be labelled as demo data.

## Initial domain entities
Train, station, route, route stop, timetable, train observation, provider ingestion record, departure event, stoppage event, operational evidence, prediction, and prediction history.

## Non-goals for the first milestone
- Passenger accounts or mandatory sign-in.
- Public multi-train control-room dashboard.
- Unverified claims about signals, block sections, or railway staff decisions.
- Production ETA promises before validation against historical outcomes.
