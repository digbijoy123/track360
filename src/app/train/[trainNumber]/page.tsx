import TrainDashboard from "./train-dashboard";

export default async function TrainPage({ params }: { params: Promise<{ trainNumber: string }> }) {
  const { trainNumber } = await params;
  if (!/^\d{5}$/.test(trainNumber)) return <main className="site-shell"><p>Invalid train number.</p></main>;
  return <TrainDashboard trainNumber={trainNumber} />;
}
