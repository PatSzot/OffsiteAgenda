import Image from "next/image";
import { agenda } from "@/data/agenda";

export function Hero() {
  return (
    <section className="min-h-screen bg-lavender flex flex-col items-center justify-center px-6 pt-16">
      <div className="flex flex-col items-center gap-10 w-full">
        {/* Main lockup — calligraphic wordmark */}
        <Image
          src="/OffsiteLogo.png"
          alt="AirOps Lisbon 2026"
          width={1320}
          height={660}
          priority
          className="w-full max-w-[700px] h-auto"
        />

        {/* Date / location */}
        <p className="font-mono text-label-lg uppercase tracking-widest text-indigo-brand/50">
          {agenda.dates} &mdash; {agenda.location}
        </p>

        {/* CTA */}
        <a
          href="/agenda"
          className="inline-flex items-center gap-2 px-7 py-4 bg-cobalt text-white font-mono text-label-lg uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          View Agenda
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
