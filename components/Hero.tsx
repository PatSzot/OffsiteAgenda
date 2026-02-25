import Image from "next/image";
import { agenda } from "@/data/agenda";

export function Hero() {
  return (
    <section className="min-h-screen bg-lavender flex flex-col pt-16">
      {/* Full-bleed wordmark */}
      <div className="w-full">
        <Image
          src="/OffsiteLogo.png"
          alt="AirOps Lisbon 2026"
          width={1320}
          height={660}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* Info bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-6 md:px-10 lg:px-16 py-10 border-t border-indigo-brand/15">
        <p className="font-mono text-label-lg uppercase tracking-widest text-indigo-brand/50">
          {agenda.dates} &mdash; {agenda.location}
        </p>
        <a
          href="/agenda"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-cobalt text-white font-mono text-label-lg uppercase tracking-widest hover:opacity-90 transition-opacity"
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
