"use client";

import { useState } from "react";

async function captureAndDownload() {
  const html2canvas = (await import("html2canvas")).default;

  // Temporarily expand all accordions so content is visible
  const buttons = document.querySelectorAll<HTMLButtonElement>("[aria-expanded]");
  const prevStates: boolean[] = [];
  buttons.forEach((btn) => {
    prevStates.push(btn.getAttribute("aria-expanded") === "true");
    btn.setAttribute("aria-expanded", "true");
    btn.click();
  });

  // Small wait for DOM to update
  await new Promise((r) => setTimeout(r, 200));

  const canvas = await html2canvas(document.body, {
    scale: 2,
    useCORS: true,
    logging: false,
    ignoreElements: (el) =>
      el.classList.contains("leaflet-tile-pane") ||
      el.classList.contains("leaflet-control-container"),
  });

  // Restore accordion state
  buttons.forEach((btn, i) => {
    if (!prevStates[i]) btn.click();
  });

  // Split into ~A4-ish chunks at 2x scale so each is phone-readable
  const MAX_HEIGHT = 14000;
  const total = canvas.height;
  const numParts = Math.ceil(total / MAX_HEIGHT);

  for (let i = 0; i < numParts; i++) {
    const srcY = i * MAX_HEIGHT;
    const partH = Math.min(MAX_HEIGHT, total - srcY);

    const part = document.createElement("canvas");
    part.width = canvas.width;
    part.height = partH;
    const ctx = part.getContext("2d")!;
    ctx.drawImage(canvas, 0, srcY, canvas.width, partH, 0, 0, canvas.width, partH);

    const link = document.createElement("a");
    link.download = numParts === 1
      ? "lisbon-offsite.png"
      : `lisbon-offsite-${i + 1}-of-${numParts}.png`;
    link.href = part.toDataURL("image/png");
    link.click();

    // stagger to avoid browser blocking multiple downloads
    if (i < numParts - 1) await new Promise((r) => setTimeout(r, 400));
  }
}

export function DownloadButton() {
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const handleClick = async () => {
    setStatus("loading");
    try {
      await captureAndDownload();
    } finally {
      setStatus("idle");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading"}
      style={{ backgroundColor: "#0000FF" }}
      className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-mono text-label-lg uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-60"
    >
      {status === "loading" ? (
        <>
          <Spinner />
          Generating…
        </>
      ) : (
        <>
          <DownloadIcon />
          Download as Image
        </>
      )}
    </button>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2v8M5 7l3 3 3-3M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="animate-spin">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
