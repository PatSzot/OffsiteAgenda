import { SessionCard } from "@/components/SessionCard";
import { agenda } from "@/data/agenda";

export function AgendaSection() {
  return (
    <section>
      {/* Section header */}
      <div className="bg-cobalt px-8 md:px-12 lg:px-16 pt-16 pb-10">
        <h2 className="font-serif text-display-lg text-white">Agenda</h2>
      </div>

      {/* All days */}
      {agenda.days.map((day) => (
        <div key={day.id} id={day.id} className="bg-lavender border-t border-indigo-brand/15">
          {/* Day header */}
          <div className="border-b border-indigo-brand/15 px-8 md:px-12 lg:px-16 py-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="label text-cobalt mb-2">{day.label} — {day.date}</p>
              {day.theme && (
                <h3 className="text-display-lg font-serif text-indigo-brand">{day.theme}</h3>
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
          <div className="px-8 md:px-12 lg:px-16 py-12 flex flex-col gap-4">
            {day.sessions.map((session) => (
              <div key={session.id} id={session.id}>
                <SessionCard session={session} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
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
