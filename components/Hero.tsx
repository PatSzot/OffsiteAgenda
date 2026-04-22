"use client";

import Lottie from "lottie-react";
import animationData from "@/public/OffsiteLogo.json";
import { agenda } from "@/data/agenda";
import { DownloadButton } from "@/components/DownloadButton";

export function Hero() {
  return (
    <section className="min-h-[40vh] sm:min-h-screen bg-lavender flex flex-col">
      {/* Full-bleed wordmark */}
      <div className="w-full">
        <Lottie
          animationData={animationData}
          loop={false}
          autoplay={true}
          className="w-full h-auto"
          style={{ willChange: "transform" }}
          aria-hidden
        />
      </div>

      {/* Info bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-6 md:px-10 lg:px-16 py-10 border-t border-indigo-brand/15">
        <p className="font-mono text-label-lg uppercase tracking-widest text-indigo-brand/50">
          {agenda.dates} &mdash; {agenda.location}
        </p>
        <DownloadButton />
      </div>
    </section>
  );
}
