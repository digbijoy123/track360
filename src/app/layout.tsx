import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Track360 — Know your journey",
  description: "Passenger-first train tracking and delay intelligence for journeys across India."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
