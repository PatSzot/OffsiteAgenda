"use client";

import { useEffect, useRef } from "react";

const LOCATIONS = [
  {
    lat: 38.7756,
    lng: -9.1354,
    label: "LIS Airport",
  },
  {
    lat: 38.7444,
    lng: -9.1517,
    label: "Lisbon Marriott",
  },
  {
    lat: 38.6964,
    lng: -9.1996,
    label: "MAAT",
  },
];

function markerHtml(label: string) {
  return `
    <div style="display:flex;flex-direction:column;align-items:center">
      <div style="background:#1B1DB5;color:white;font-family:monospace;font-size:10px;letter-spacing:0.09em;text-transform:uppercase;padding:3px 9px;white-space:nowrap;box-shadow:0 2px 10px rgba(0,0,0,0.35)">
        ${label}
      </div>
      <div style="width:2px;height:6px;background:#1B1DB5"></div>
      <div style="width:11px;height:11px;border-radius:50%;background:#1B1DB5;border:2.5px solid white;box-shadow:0 0 0 1.5px #1B1DB5,0 2px 6px rgba(0,0,0,0.3)"></div>
    </div>
  `;
}

export function LeafletMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
      const map = L.map(containerRef.current!, {
        center: [38.735, -9.162],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        className: "map-tiles",
      }).addTo(map);

      LOCATIONS.forEach(({ lat, lng, label }) => {
        const labelWidth = label.length * 7 + 18;
        const icon = L.divIcon({
          className: "",
          html: markerHtml(label),
          iconSize: [labelWidth, 40],
          iconAnchor: [labelWidth / 2, 40],
        });
        L.marker([lat, lng], { icon }).addTo(map);
      });

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <style>{`
        .map-tiles { filter: grayscale(1) contrast(1.05) brightness(0.82); }
      `}</style>
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
}
