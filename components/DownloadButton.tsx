"use client";

import { useState } from "react";

async function downloadPdf() {
  const [{ pdf }, { OffsitePdf }, React] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/components/OffsitePdf"),
    import("react"),
  ]);

  const logoSrc = `${window.location.origin}/OffsiteLogo.png`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blob = await pdf(React.createElement(OffsitePdf, { logoSrc }) as any).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lisbon-offsite-2026.pdf";
  link.click();
  URL.revokeObjectURL(url);
}

export function DownloadButton() {
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const handleClick = async () => {
    setStatus("loading");
    try {
      await downloadPdf();
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
          Download site as .PDF
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
