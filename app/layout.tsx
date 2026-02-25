import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AirOps Lisbon 2026",
  description: "AirOps company offsite — Lisbon, Portugal",
  icons: {
    icon: "/Offsite-Favicon.png",
  },
  openGraph: {
    title: "AirOps Lisbon 2026",
    description: "AirOps company offsite — Lisbon, Portugal",
    type: "website",
    images: [
      {
        url: "/Offsite-OpenGraph.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
