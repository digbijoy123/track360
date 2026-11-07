export type DemoStop = {
  station: string;
  code: string;
  scheduled: string;
  actual?: string;
  state: "completed" | "current" | "upcoming";
};

export const demoTrain = {
  number: "90001",
  name: "Track360 Demo Express",
  from: "Guwahati",
  to: "Silchar",
  status: "DEMO JOURNEY",
  position: "Near Hojai",
  lastUpdated: "Simulated update · 12:42",
  delayMinutes: 18,
  eta: "20:40",
  scheduledEta: "20:22",
  stops: [
    { station: "Guwahati", code: "GHY", scheduled: "09:00", actual: "09:18", state: "completed" },
    { station: "Jagi Road", code: "JID", scheduled: "10:05", actual: "10:22", state: "completed" },
    { station: "Hojai", code: "HJI", scheduled: "11:20", state: "current" },
    { station: "Lumding Jn", code: "LMG", scheduled: "12:35", state: "upcoming" },
    { station: "New Haflong", code: " NHL", scheduled: "15:10", state: "upcoming" },
    { station: "Badarpur Jn", code: "BPB", scheduled: "18:25", state: "upcoming" },
    { station: "Silchar", code: "SCL", scheduled: "20:22", state: "upcoming" }
  ] satisfies DemoStop[]
};
