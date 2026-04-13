"use client";

import Lottie from "lottie-react";
import animationData from "@/public/OffsiteLogo.json";
import { agenda } from "@/data/agenda";

export function Hero() {
  return (
    <section className="min-h-screen bg-lavender flex flex-col pt-16">
      {/* Full-bleed wordmark */}
      <div className="w-full">
        <Lottie
          animationData={animationData}
          loop={false}
          autoplay={true}
          className="w-full h-auto"
        />
      </div>

      {/* Info bar */}
      <div className="px-6 md:px-10 lg:px-16 py-10 border-t border-indigo-brand/15">
        <p className="font-mono text-label-lg uppercase tracking-widest text-indigo-brand/50">
          {agenda.dates} &mdash; {agenda.location}
        </p>
      </div>
    </section>
  );
}
