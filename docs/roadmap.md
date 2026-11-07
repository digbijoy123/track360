# Track360 — Build Roadmap

## Milestone 1: Product foundation
- [x] Create Next.js + TypeScript project structure.
- [x] Establish passenger-first homepage and visual direction.
- [x] Document intelligence boundaries and data-provenance requirements.
- [ ] Add accessible light/dark theme switching.
- [ ] Add train search results and selected-train route page using clearly labelled fixtures.

## Milestone 2: Domain and data contracts
- [ ] Define train, station, route, timetable, observation, stoppage, evidence, and prediction types.
- [ ] Define provider adapter interface.
- [ ] Validate candidate railway data providers, licensing, freshness, coverage, and rate limits.
- [ ] Design PostgreSQL/PostGIS schema and migrations.

## Milestone 3: Journey intelligence
- [ ] Implement station departure event detection.
- [ ] Implement en-route stoppage detection.
- [ ] Build evidence-backed explanation and prediction contracts.
- [ ] Backtest ETA and departure estimates against historical observations.

## Milestone 4: Passenger experience
- [ ] Add 2D route map after route geometry is validated.
- [ ] Add departure and en-route intelligence panels.
- [ ] Show source, last-updated time, confidence, and stale-data state.
- [ ] Add responsive and accessibility testing.

## Release gate
No live-data or prediction feature should be labelled production-ready until its data source, terms of use, coverage, freshness, and measured accuracy have been validated. Deployment is intentionally out of scope until explicitly authorized.
