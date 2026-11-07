import Link from "next/link";
import { notFound } from "next/navigation";
import { demoTrain } from "@/lib/demo-train";

export default async function TrainPage({ params }: { params: Promise<{ trainNumber: string }> }) {
  const { trainNumber } = await params;
  if (trainNumber !== demoTrain.number) notFound();

  return (
    <main className="site-shell dashboard-shell">
      <nav className="topbar">
        <Link className="brand" href="/"><span className="brand-mark">T</span><span>track<span className="brand-accent">360</span></span></Link>
        <Link className="back-link" href="/">← Search another train</Link>
      </nav>

      <div className="demo-warning"><strong>SIMULATED PREVIEW</strong><span>This is fictional sample data, not a live Indian Railways train or operational update.</span></div>

      <section className="train-heading">
        <div>
          <div className="eyebrow">TRAIN {demoTrain.number} · {demoTrain.status}</div>
          <h1>{demoTrain.name}</h1>
          <p className="route-subtitle">{demoTrain.from} <span>→</span> {demoTrain.to}</p>
        </div>
        <div className="delay-pill">+{demoTrain.delayMinutes} min illustrative delay</div>
      </section>

      <section className="metric-grid">
        <article className="metric-card"><span>SIMULATED POSITION</span><strong>{demoTrain.position}</strong><small>{demoTrain.lastUpdated}</small></article>
        <article className="metric-card"><span>ESTIMATED ARRIVAL</span><strong>{demoTrain.eta}</strong><small>Illustrative · Scheduled {demoTrain.scheduledEta}</small></article>
        <article className="metric-card"><span>DATA CONFIDENCE</span><strong>Not rated</strong><small>No live provider connected</small></article>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-panel journey-panel">
          <div className="panel-top"><div><div className="eyebrow">YOUR SELECTED TRAIN</div><h2>Journey progress</h2></div><span className="demo-tag">DEMO DATA</span></div>
          <div className="route-endpoints"><div><strong>{demoTrain.from}</strong><span>Origin · 09:00</span></div><div className="route-line"><i /></div><div><strong>{demoTrain.to}</strong><span>Destination · 20:22</span></div></div>
          <div className="stop-list">
            {demoTrain.stops.map((stop) => (
              <div className={"stop-row " + stop.state} key={stop.code}>
                <div className="stop-marker"><i /></div>
                <div className="stop-name"><strong>{stop.station}</strong><span>{stop.code.trim()}</span></div>
                <div className="stop-time"><strong>{stop.actual ?? stop.scheduled}</strong><span>{stop.actual ? "Simulated actual" : "Scheduled"}</span></div>
                <div className="stop-state">{stop.state === "completed" ? "Passed" : stop.state === "current" ? "Current" : "Upcoming"}</div>
              </div>
            ))}
          </div>
        </article>

        <aside className="insight-column">
          <article className="dashboard-panel insight-card">
            <div className="eyebrow">01 / STATION DEPARTURE INTELLIGENCE</div>
            <h2>Origin departure</h2>
            <div className="insight-value">09:18 <span>+18 min</span></div>
            <p>In this sample scenario, the train leaves Guwahati 18 minutes after its illustrative schedule.</p>
            <div className="evidence-note"><strong>Evidence status</strong><span>Sample schedule comparison only. No station or rake data is connected.</span></div>
          </article>
          <article className="dashboard-panel insight-card">
            <div className="eyebrow">02 / EN-ROUTE DELAY INTELLIGENCE</div>
            <h2>Current stoppage</h2>
            <div className="insight-value">Not confirmed</div>
            <p>The demo places the train near Hojai. It does not establish that the train is stopped or explain an operational cause.</p>
            <div className="evidence-note"><strong>Possible cause</strong><span>No cause inferred. A location estimate alone cannot establish signal or traffic conditions.</span></div>
          </article>
          <article className="confidence-card">
            <strong>Why this matters</strong>
            <p>Real Track360 predictions will show their source, timestamp, confidence and supporting evidence. We will not label guesses as railway facts.</p>
          </article>
        </aside>
      </section>
      <footer className="dashboard-footer"><span>Track360 · Passenger journey intelligence concept</span><Link href="/">Back to home</Link></footer>
    </main>
  );
}
