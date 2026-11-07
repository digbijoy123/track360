"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type TrainResult = { number: string; name: string; originCode?: string; destinationCode?: string };

export default function Home() {
  const [train, setTrain] = useState("");
  const [results, setResults] = useState<TrainResult[]>([]);
  const [message, setMessage] = useState("");
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = train.trim();
    if (query.length < 2) {
      setMessage("Enter at least two characters or a train number.");
      return;
    }
    setSearching(true);
    setMessage("");
    setResults([]);
    try {
      const response = await fetch("/api/trains/search?q=" + encodeURIComponent(query), { cache: "no-store" });
      const json = await response.json();
      if (!response.ok || json.status !== "SUCCESS") {
        setMessage(json.error?.message || "Train search is unavailable. Please try again.");
      } else {
        const matches = json.data?.results || [];
        setResults(matches);
        if (matches.length === 0) setMessage("No matching trains were returned by the live data provider.");
      }
    } catch {
      setMessage("Could not reach Track360. Check your connection and retry.");
    } finally {
      setSearching(false);
    }
  }

  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand" href="/" aria-label="Track360 home"><span className="brand-mark">T</span><span>track<span className="brand-accent">360</span></span></a>
        <div className="nav-meta"><span className="status-dot" />Passenger journey intelligence</div>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-line" /> INDIAN RAILWAYS, MADE CLEARER</div>
        <h1>Know where your train is.<br /><span>Know what happens next.</span></h1>
        <p className="hero-copy">Track your journey with reported train movement, station timings, delay information and estimated arrival updates.</p>

        <form className="search-panel" onSubmit={handleSearch}>
          <label htmlFor="train-search">Find your train</label>
          <div className="search-row">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input id="train-search" value={train} onChange={(event) => { setTrain(event.target.value); setMessage(""); setResults([]); }} placeholder="Enter train name or 5-digit number" autoComplete="off" />
            <button type="submit" disabled={searching}>{searching ? "Searching…" : "Search trains →"}</button>
          </div>
          <div className="search-hint">Live train search · Results depend on provider coverage</div>
          {message && <p className="search-message" role="status">{message}</p>}
          {results.length > 0 && <div className="search-results" aria-label="Train search results">
            {results.map((item) => <button className="result-item" type="button" key={item.number} onClick={() => router.push("/train/" + item.number)}>
              <span><strong>{item.number} · {item.name}</strong><small>{item.originCode || "—"} → {item.destinationCode || "—"}</small></span><b>Track →</b>
            </button>)}
          </div>}
        </form>

        <div className="trust-row"><div><span className="trust-icon">◎</span><span>Journey-focused tracking</span></div><div><span className="trust-icon">◷</span><span>Source timestamps</span></div><div><span className="trust-icon">↗</span><span>Reported arrival estimates</span></div></div>
      </section>

      <section className="feature-section">
        <div className="section-heading"><div><div className="eyebrow">MORE THAN A LIVE LOCATION</div><h2>Understand the delay,<br />not just the delay time.</h2></div><p>Track360 combines train status, timetable and route observations into one passenger-focused view. Data freshness and provider limitations remain visible.</p></div>
        <div className="feature-grid">
          <article className="feature-card"><div className="feature-number">01 / DEPARTURE</div><div className="feature-symbol">↗</div><h3>Station departure information</h3><p>Compare scheduled station times with actual times reported by the data provider.</p><span className="feature-foot">SCHEDULE · ACTUAL TIMES · PLATFORM WHEN AVAILABLE</span></article>
          <article className="feature-card"><div className="feature-number">02 / EN ROUTE</div><div className="feature-symbol">⌁</div><h3>Journey progress</h3><p>Follow last reported location, route progress and stoppages without inventing signal or control-room causes.</p><span className="feature-foot">LOCATION · ROUTE · STOPPAGES</span></article>
          <article className="feature-card"><div className="feature-number">03 / ARRIVAL</div><div className="feature-symbol">◎</div><h3>Arrival estimates</h3><p>See ETA when the provider reports it, with its timestamp and freshness status.</p><span className="feature-foot">ETA · CONFIDENCE · LAST UPDATED</span></article>
        </div>
      </section>
      <footer className="footer"><a className="brand footer-brand" href="/"><span className="brand-mark">T</span><span>track<span className="brand-accent">360</span></span></a><p>Clearer journeys begin with better information.</p><span className="footer-note">Independent passenger information tool · Not an official railway service</span></footer>
    </main>
  );
}
