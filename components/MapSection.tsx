"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(
  () => import("@/components/LeafletMap").then((m) => m.LeafletMap),
  { ssr: false }
);

const locations = [
  {
    id: "airport",
    label: "Airport",
    name: "Humberto Delgado Airport",
    address: "Alameda das Comunidades Portuguesas, Lisboa",
    detail: "Fly into LIS",
    tag: "LIS",
    mapsUrl: "https://maps.google.com/maps?q=Lisbon+Airport+LIS",
  },
  {
    id: "hotel",
    label: "Hotel",
    name: "Lisbon Marriott Hotel",
    address: "Av. dos Combatentes 45, 1600-042 Lisboa",
    detail: "Check-in 4 PM · Check-out 12 PM",
    tag: "HQ",
    mapsUrl: "https://maps.google.com/maps?q=Lisbon+Marriott+Hotel",
  },
  {
    id: "maat",
    label: "Thursday Venue",
    name: "MAAT",
    address: "Av. Brasília, 1300-598 Lisboa",
    detail: "Museum of Art, Architecture and Technology",
    tag: "Thu",
    mapsUrl: "https://maps.google.com/maps?q=MAAT+Museum+Lisbon",
  },
];

export function MapSection() {
  return (
    <section className="bg-cobalt">
      {/* Map */}
      <div className="relative w-full h-[480px] overflow-hidden">
        <LeafletMap />
        {/* Cobalt tint overlay */}
        <div className="absolute inset-0 bg-cobalt/20 mix-blend-multiply pointer-events-none" />

        {/* Taxi callout — top right */}
        <div className="absolute top-6 right-6 bg-cobalt text-white px-5 py-4 shadow-lg max-w-[220px]">
          <p className="font-mono text-label-sm uppercase tracking-widest text-white/50 mb-1">Airport → Hotel</p>
          <p className="font-serif text-display-md leading-none mb-1">15–25 min</p>
          <p className="font-mono text-label-sm text-white/60">~€15–20 · Uber / Bolt</p>
        </div>
      </div>

      {/* Location cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-t border-white/10">
        {locations.map((loc) => (
          <a
            key={loc.id}
            href={loc.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 md:px-12 py-10 flex flex-col gap-3 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-label-sm text-white/40 uppercase tracking-widest">{loc.label}</p>
              <span className="font-mono text-label-sm text-cobalt bg-white px-2 py-0.5">{loc.tag}</span>
            </div>
            <p className="font-serif text-display-md text-white leading-tight">{loc.name}</p>
            <p className="font-sans text-body-sm text-white/50">{loc.address}</p>
            <p className="font-mono text-label-sm text-white/30 mt-auto">{loc.detail}</p>
            <p className="font-mono text-label-sm text-white/40 group-hover:text-white transition-colors">
              Open in Maps ↗
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
