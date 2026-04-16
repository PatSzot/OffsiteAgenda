"use client";

import { useState } from "react";
import { RiDownloadLine, RiLoaderLine } from "@remixicon/react";

async function toWhitePng(src: string): Promise<string> {
  const img = new window.Image();
  img.crossOrigin = "anonymous";
  await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = rej; img.src = src; });
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

async function downloadPdf() {
  const [{ pdf }, { OffsitePdf }, React] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/components/OffsitePdf"),
    import("react"),
  ]);

  const logoSrc = await toWhitePng(`${window.location.origin}/OffsiteLogo.png`);
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
          <RiLoaderLine size={16} aria-hidden className="animate-spin" />
          Generating…
        </>
      ) : (
        <>
          <RiDownloadLine size={16} aria-hidden />
          Download site as .PDF
        </>
      )}

    </button>
  );
}

