import { agenda } from "@/data/agenda";

// Azulejo-inspired tile pattern rendered as SVG background
function AzulejoPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg
        className="absolute -right-24 -top-24 w-[600px] h-[600px] opacity-10"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Repeating tile motif — simplified azulejo geometry */}
        <defs>
          <pattern id="tile" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Outer border */}
            <rect x="2" y="2" width="76" height="76" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
            {/* Inner diamond */}
            <path d="M40 8 L72 40 L40 72 L8 40 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            {/* Corner flourishes */}
            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="72" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="72" cy="72" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="8" cy="72" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
            {/* Center cross */}
            <line x1="40" y1="20" x2="40" y2="60" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#tile)" />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative bg-green-600 text-white overflow-hidden min-h-[92vh] flex flex-col justify-end">
      <AzulejoPattern />

      {/* Top wordmark band */}
      <div className="absolute top-0 inset-x-0 h-16" />

      {/* Content */}
      <div className="container-site pb-20 pt-32 relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow label */}
          <p className="label text-white/60 mb-6">
            {agenda.dates} &mdash; {agenda.location}
          </p>

          {/* Main headline */}
          <h1 className="text-display-xl font-serif text-white mb-6 leading-[0.92]">
            {agenda.tagline}
          </h1>

          {/* Sub headline */}
          <p className="text-display-md font-serif text-white/70 mb-12">
            {agenda.eventName}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/agenda"
              className="
                inline-flex items-center gap-2 px-7 py-4
                bg-interaction text-near-black font-mono text-label-lg uppercase tracking-widest
                hover:opacity-90 transition-opacity
              "
            >
              View Agenda
              <ArrowRight />
            </a>
            <span className="text-white/40 font-mono text-label-sm uppercase tracking-widest">
              Lisbon, Portugal
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent strip */}
      <div className="h-1 w-full bg-interaction/40" />
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
