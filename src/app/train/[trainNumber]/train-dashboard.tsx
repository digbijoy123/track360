"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type ApiBundle = {
  provider?: string;
  fetchedAt?: string;
  live?: { status?: string; data?: Record<string, any>; error?: { message?: string }; meta?: Record<string, any> };
  schedule?: { status?: string; data?: Record<string, any>; error?: { message?: string } };
  route?: { status?: string; data?: Record<string, any>; error?: { message?: string } };
  error?: { message?: string };
};

function value(input: unknown, fallback = "Not reported") {
  return input === null || input === undefined || input === "" ? fallback : String(input);
}

export default function TrainDashboard({ trainNumber }: { trainNumber: string }) {
  const [bundle, setBundle] = useState<ApiBundle | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState("");

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/trains/" + trainNumber, { cache: "no-store" });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error?.message || "Live data is currently unavailable.");
        setBundle(null);
      } else {
        setBundle(json);
        setError("");
        setLastChecked(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      }
    } catch {
      setError("Could not connect to Track360. Check your internet connection and retry.");
    } finally {
      setLoading(false);
    }
  }, [trainNumber]);

  useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, 60000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const live = bundle?.live?.data || {};
  const schedule = bundle?.schedule?.data || {};
  const routeData = bundle?.route?.data || {};
  const stops = Array.isArray(routeData.stops) ? routeData.stops : [];
  const freshness = live.freshness || {};
  const freshnessState = typeof freshness === "string" ? freshness : freshness.state;
  const updatedAt = live.lastUpdatedAt || live.updatedAt || live.observedAt || live.position?.observedAt;
  const trainName = live.trainName || schedule.trainName || "Train " + trainNumber;
  const currentStation = live.currentStation?.name || live.currentStation || live.lastReportedStation?.name || live.statusNote;
  const delay = live.delayMinutes ?? live.delay?.minutes;
  const eta = live.eta || live.destinationEta || live.expectedArrival;
  const confidence = live.confidence || "Not supplied";

  return (
    <main className="site-shell dashboard-shell">
      <nav className="topbar">
        <Link className="brand" href="/"><span className="brand-mark">T</span><span>track<span className="brand-accent">360</span></span></Link>
        <Link className="back-link" href="/">← Search another train</Link>
      </nav>

      <div className="live-banner">
        <span className="live-indicator" />
        <strong>LIVE DATA CONNECTION</strong>
        <span>Source: {bundle?.provider || "Railway Engine"} · Auto-refresh every 60 seconds</span>
      </div>

      <section className="train-heading">
        <div>
          <div className="eyebrow">TRAIN {trainNumber} · PROVIDER REPORTED STATUS</div>
          <h1>{trainName}</h1>
          <p className="route-subtitle">{value(schedule.origin?.name || schedule.origin?.code, "Origin")} <span>→</span> {value(schedule.destination?.name || schedule.destination?.code, "Destination")}</p>
        </div>
        <button className="refresh-button" onClick={refresh} disabled={loading}>↻ Refresh now</button>
      </section>

      {error && <div className="error-panel"><strong>Live data unavailable</strong><p>{error}</p><small>Track360 will not substitute fictional train positions or timings.</small></div>}
      {loading && !bundle && <div className="loading-panel">Connecting to the railway data provider…</div>}

      {bundle && <>
        <section className="metric-grid">
          <article className="metric-card"><span>LAST REPORTED LOCATION</span><strong>{value(currentStation)}</strong><small>Provider's last observation</small></article>
          <article className="metric-card"><span>REPORTED DELAY</span><strong>{delay === undefined ? "Not reported" : Number(delay) + " min"}</strong><small>As supplied by data provider</small></article>
          <article className="metric-card"><span>DESTINATION ETA</span><strong>{value(eta)}</strong><small>Not independently predicted by Track360</small></article>
        </section>

        <section className="data-provenance">
          <div><span>DATA FRESHNESS</span><strong>{value(freshnessState, "Not supplied")}</strong></div>
          <div><span>CONFIDENCE</span><strong>{value(confidence)}</strong></div>
          <div><span>PROVIDER UPDATED</span><strong>{value(updatedAt)}</strong></div>
          <div><span>TRACK360 CHECKED</span><strong>{lastChecked || "—"}</strong></div>
        </section>

        <section className="dashboard-panel journey-panel">
          <div className="panel-top"><div><div className="eyebrow">PROVIDER ROUTE DATA</div><h2>Station-by-station journey</h2></div><span className="demo-tag">SOURCE DATA</span></div>
          {stops.length === 0 ? <p className="empty-state">The provider did not return a route for this train and date.</p> :
            <div className="stop-list">{stops.map((stop: any, index: number) => {
              const station = stop.station || {};
              const stationName = station.name || stop.stationName || station.code || "Station";
              const code = station.code || stop.stationCode || "";
              const actual = stop.actualDeparture || stop.actualArrival || stop.actualTime;
              const scheduled = stop.scheduledDeparture || stop.scheduledArrival || "—";
              const isCurrent = live.currentStation?.code === code || live.currentStation === code;
              return <div className={"stop-row " + (isCurrent ? "current" : "")} key={String(stop.sequence || index) + code}>
                <div className="stop-marker"><i /></div>
                <div className="stop-name"><strong>{stationName}</strong><span>{code}</span></div>
                <div className="stop-time"><strong>{value(actual || scheduled)}</strong><span>{actual ? "Reported actual" : "Scheduled"}</span></div>
                <div className="stop-state">{isCurrent ? "Last reported" : value(stop.platform, "")}</div>
              </div>;
            })}</div>
          }
        </section>
      </>}

      <footer className="dashboard-footer"><span>Track360 · Independent passenger information tool</span><Link href="/">Back to home</Link></footer>
    </main>
  );
}
