import Image from "next/image";
import type { Session, SessionType } from "@/data/agenda";

const typeConfig: Record<SessionType, { label: string; color: string }> = {
  keynote:  { label: "Keynote",  color: "bg-cobalt text-white" },
  talk:     { label: "Talk",     color: "bg-indigo-brand text-white" },
  workshop: { label: "Workshop", color: "bg-cobalt/80 text-white" },
  panel:    { label: "Panel",    color: "bg-cobalt/60 text-white" },
  break:    { label: "Break",    color: "bg-lavender-dark text-indigo-brand" },
  meal:     { label: "Meal",     color: "bg-lavender-dark text-indigo-brand" },
  social:   { label: "Social",   color: "bg-lavender-dark text-indigo-brand" },
  travel:   { label: "Travel",   color: "bg-lavender-dark text-indigo-brand" },
};

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  const config = typeConfig[session.type];
  const isUtility = ["break", "meal", "travel", "social"].includes(session.type);

  if (isUtility && !session.highlight) {
    // Compact row for meals, breaks, travel
    return (
      <div className="flex items-center gap-4 py-4 px-5 rounded-2xl bg-lavender-dark/60 group">
        <time className="font-mono text-label-lg text-indigo-brand/50 w-14 shrink-0">
          {session.time}
        </time>
        <span className="flex-1 font-sans text-body-sm text-indigo-brand/70">{session.title}</span>
        <span className={`badge ${config.color} text-label-sm`}>{config.label}</span>
        {session.location && (
          <span className="font-mono text-label-sm text-indigo-brand/40 hidden sm:inline">
            {session.location}
          </span>
        )}
      </div>
    );
  }

  // Full card for talks, keynotes, workshops, panels, highlighted sessions
  return (
    <article
      className={`
        group rounded-3xl p-6 md:p-8 transition-shadow hover:shadow-md
        ${session.highlight ? "bg-cobalt text-white" : "bg-white text-indigo-brand"}
      `}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <time
          className={`
            font-mono text-label-lg uppercase tracking-widest
            ${session.highlight ? "text-white/60" : "text-indigo-brand/50"}
          `}
        >
          {session.time}
          {session.endTime && (
            <span className="hidden sm:inline"> – {session.endTime}</span>
          )}
        </time>
        <span className={`badge ${config.color}`}>{config.label}</span>
      </div>

      <h3
        className={`
          text-display-md font-serif mb-3 leading-tight
          ${session.highlight ? "text-white" : "text-indigo-brand"}
        `}
      >
        {session.title}
      </h3>

      {session.description && (
        <p
          className={`
            text-body-md mb-5
            ${session.highlight ? "text-white/70" : "text-indigo-brand/70"}
          `}
        >
          {session.description}
        </p>
      )}

      {/* Speakers */}
      {session.speakers && session.speakers.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {session.speakers.map((speaker) => (
            <div key={speaker.name} className="flex items-center gap-2">
              {speaker.avatar ? (
                <Image
                  src={speaker.avatar}
                  alt={speaker.name}
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
              ) : (
                <div
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center font-mono text-label-sm
                    ${session.highlight ? "bg-white/20 text-white" : "bg-lavender-dark text-indigo-brand"}
                  `}
                >
                  {speaker.name[0]}
                </div>
              )}
              <div>
                <p
                  className={`
                    font-sans text-body-sm font-medium leading-none mb-0.5
                    ${session.highlight ? "text-white" : "text-indigo-brand"}
                  `}
                >
                  {speaker.name}
                </p>
                {speaker.title && (
                  <p
                    className={`
                      font-mono text-label-sm
                      ${session.highlight ? "text-white/50" : "text-indigo-brand/50"}
                    `}
                  >
                    {speaker.title}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Location */}
      {session.location && (
        <div
          className={`
            mt-5 pt-4 flex items-center gap-2 font-mono text-label-sm
            ${session.highlight ? "border-t border-white/20 text-white/50" : "border-t border-indigo-brand/10 text-indigo-brand/50"}
          `}
        >
          <PinIcon />
          {session.location}
        </div>
      )}
    </article>
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
