"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [train, setTrain] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = train.trim();
    if (!query) return;
    window.alert("Train search for \"" + query + "\" will be available when the data API is connected.");
  }

  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand" href="/" aria-label="Track360 home">
          <span className="brand-mark">T</span><span>track<span className="brand-accent">360</span></span>
        </a>
        <div className="nav-meta"><span className="status-dot" />Passenger journey intelligence</div>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-line" /> INDIAN RAILWAYS, MADE CLEARER</div>
        <h1>Know where your train is.<br /><span>Know what happens next.</span></h1>
        <p className="hero-copy">Track your journey with a clearer picture of delays, unexpected halts, station departures and estimated arrival times.</p>

        <form className="search-panel" onSubmit={handleSearch}>
          <label htmlFor="train-search">Find your train</label>
          <div className="search-row">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input id="train-search" value={train} onChange={(event) => setTrain(event.target.value)} placeholder="Enter train name or number" autoComplete="off" />
            <button type="submit">Track train <span aria-hidden="true">→</span></button>
          </div>
          <div className="search-hint">Search by train name or 5-digit train number</div>
        </form>

        <div className="trust-row">
          <div><span className="trust-icon">◎</span><span>Journey-focused tracking</span></div>
          <div><span className="trust-icon">◷</span><span>Delay explanations</span></div>
          <div><span className="trust-icon">↗</span><span>Arrival estimates</span></div>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <div><div className="eyebrow">MORE THAN A LIVE LOCATION</div><h2>Understand the delay,<br />not just the delay time.</h2></div>
          <p>Track360 is being built to turn train movement and operational signals into useful, transparent journey updates.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-number">01 / DEPARTURE</div><div className="feature-symbol">↗</div>
            <h3>Station departure intelligence</h3>
            <p>Understand when a train is expected to leave and what evidence may explain a late departure.</p>
            <span className="feature-foot">SCHEDULE · TURNAROUND · STATION ACTIVITY</span>
          </article>
          <article className="feature-card">
            <div className="feature-number">02 / EN ROUTE</div><div className="feature-symbol">⌁</div>
            <h3>Unexpected halt insights</h3>
            <p>See when a stoppage appears unusual and follow changing estimates as the journey progresses.</p>
            <span className="feature-foot">STOPPAGE · SECTION · NEARBY TRAFFIC</span>
          </article>
          <article className="feature-card">
            <div className="feature-number">03 / ARRIVAL</div><div className="feature-symbol">◎</div>
            <h3>Arrival time forecasts</h3>
            <p>Follow estimated arrival times with freshness, confidence and evidence made visible.</p>
            <span className="feature-foot">ETA · CONFIDENCE · LAST UPDATED</span>
          </article>
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="/"><span className="brand-mark">T</span><span>track<span className="brand-accent">360</span></span></a>
        <p>Clearer journeys begin with better information.</p>
        <span className="footer-note">Independent passenger information concept · Not an official railway service</span>
      </footer>
    </main>
  );
}
