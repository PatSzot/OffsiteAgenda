"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { SessionCard } from "@/components/SessionCard";
import { agenda } from "@/data/agenda";

export default function AgendaPage() {
  const [activeDay, setActiveDay] = useState(agenda.days[0].id);
  const day = agenda.days.find((d) => d.id === activeDay) ?? agenda.days[0];

  return (
    <>
      <Nav />

      {/* Page hero */}
      <div className="bg-cobalt pt-32 pb-16">
        <div className="container-site">
          <p className="label text-white/50 mb-4">{agenda.eventName}</p>
          <h1 className="text-display-xl font-serif text-white mb-2">Agenda</h1>
          <p className="font-sans text-body-lg text-white/60">{agenda.dates} — {agenda.location}</p>
        </div>
      </div>

      {/* Sticky day tabs */}
      <div className="sticky top-16 z-40 bg-lavender/90 backdrop-blur-md border-b border-indigo-brand/10">
        <div className="container-site">
          <div className="flex gap-1 py-3 overflow-x-auto scrollbar-none" role="tablist" aria-label="Days">
            {agenda.days.map((d) => (
              <button
                key={d.id}
                role="tab"
                aria-selected={d.id === activeDay}
                aria-controls={`panel-${d.id}`}
                onClick={() => setActiveDay(d.id)}
                className={`
                  shrink-0 px-5 py-2.5 rounded-full font-mono text-label-lg uppercase tracking-widest transition-colors
                  ${d.id === activeDay
                    ? "bg-cobalt text-white"
                    : "text-indigo-brand hover:bg-lavender-dark"
                  }
                `}
              >
                {d.label}
                <span
                  className={`
                    ml-2 hidden sm:inline font-sans normal-case tracking-normal text-body-sm
                    ${d.id === activeDay ? "text-white/60" : "text-indigo-brand/40"}
                  `}
                >
                  {d.date}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Day panel */}
      <main className="bg-lavender section" id={`panel-${day.id}`} role="tabpanel">
        <div className="container-site">
          {/* Day header */}
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="label text-cobalt mb-2">{day.label} — {day.date}</p>
              {day.theme && (
                <h2 className="text-display-lg font-serif text-indigo-brand">{day.theme}</h2>
              )}
            </div>
            {day.location && (
              <p className="font-mono text-label-sm text-indigo-brand/50 flex items-center gap-1.5">
                <PinIcon />
                {day.location}
              </p>
            )}
          </div>

          {/* Sessions */}
          <div className="flex flex-col gap-4">
            {day.sessions.map((session) => (
              <div key={session.id} id={session.id} className="animate-slide-up">
                <SessionCard session={session} />
              </div>
            ))}
          </div>

          {day.sessions.length === 0 && (
            <div className="text-center py-24">
              <p className="font-mono text-label-lg text-indigo-brand/30 uppercase tracking-widest">
                Agenda coming soon
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-cobalt text-white py-12">
        <div className="container-site flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-label-sm text-white/40 uppercase tracking-widest">
            {agenda.eventName}
          </p>
          <p className="font-mono text-label-sm text-white/30">{agenda.location}</p>
        </div>
      </footer>
    </>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M6 1a3 3 0 0 1 3 3c0 2-3 7-3 7S3 6 3 4a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="6" cy="4" r="1" fill="currentColor" />
    </svg>
  );
}
