import Image from "next/image";
import { RiMapPinLine } from "@remixicon/react";
import type { Session, SessionType } from "@/data/agenda";

function to24hr(time: string): string | null {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let h = parseInt(match[1]);
  const m = match[2];
  const period = match[3].toUpperCase();
  if (period === "AM" && h === 12) h = 0;
  if (period === "PM" && h !== 12) h += 12;
  return `${String(h).padStart(2, "0")}:${m}`;
}

const typeConfig: Record<SessionType, { label: string; color: string }> = {
  keynote:  { label: "Keynote",  color: "bg-[#1B1B8F] text-white" },
  talk:     { label: "Talk",     color: "bg-[#1B1B8F]/80 text-white" },
  workshop: { label: "Workshop", color: "bg-[#1B1B8F]/70 text-white" },
  panel:    { label: "Panel",    color: "bg-[#1B1B8F]/60 text-white" },
  break:    { label: "Break",    color: "bg-lavender-dark text-[#1B1B8F]" },
  meal:     { label: "Meal",     color: "bg-lavender-dark text-[#1B1B8F]" },
  social:   { label: "Social",   color: "bg-lavender-dark text-[#1B1B8F]" },
  travel:   { label: "Travel",   color: "bg-lavender-dark text-[#1B1B8F]" },
};

interface SessionCardProps {
  session: Session;
  children?: React.ReactNode;
}

export function SessionCard({ session, children }: SessionCardProps) {
  const config = typeConfig[session.type];
  const isUtility = ["break", "meal", "travel", "social"].includes(session.type);

  if (isUtility && !session.highlight) {
    // Compact row for meals, breaks, travel
    return (
      <div className="flex items-center gap-4 py-4 px-5 bg-white border border-lavender-dark group">
        <time className="font-mono text-label-lg text-[#1B1B8F]/50 w-14 shrink-0">
          {session.time}
          {to24hr(session.time) && (
            <span className="block text-[#1B1B8F]/25">{to24hr(session.time)}</span>
          )}
        </time>
        <span className="flex-1 font-sans text-body-sm text-[#1B1B8F]/70">{session.title}</span>
        <span className={`badge ${config.color} text-label-sm`}>{config.label}</span>
        {session.location && (
          <span className="font-mono text-label-sm text-[#1B1B8F]/40 hidden sm:inline">
            {session.location}
          </span>
        )}
      </div>
    );
  }

  // Full card for talks, keynotes, workshops, panels, highlighted sessions
  return (
    <article className="group p-6 md:p-8 bg-white border border-lavender-dark transition-colors duration-200 hover:border-cobalt/30">
      <div className="flex items-start justify-between gap-4 mb-4">
        <time className="font-mono text-label-lg text-[#1B1B8F]/50">
          {session.time}
          {session.endTime && (
            <span className="hidden sm:inline"> – {session.endTime}</span>
          )}
          {to24hr(session.time) && (
            <span className="block text-[#1B1B8F]/25">
              {to24hr(session.time)}
              {session.endTime && to24hr(session.endTime) && (
                <span className="hidden sm:inline"> – {to24hr(session.endTime)}</span>
              )}
            </span>
          )}
        </time>
        <span className={`badge ${config.color}`}>{config.label}</span>
      </div>

      <h3 className="text-[1.375rem] sm:text-display-md font-serif mb-3 leading-tight text-[#1B1B8F]">
        {session.title}
      </h3>

      {session.description && (
        <p className="text-body-md mb-5 text-[#1B1B8F]/70">
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
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-label-sm bg-lavender-dark text-[#1B1B8F]">
                  {speaker.name[0]}
                </div>
              )}
              <div>
                <p className="font-sans text-body-sm font-medium leading-none mb-0.5 text-[#1B1B8F]">
                  {speaker.name}
                </p>
                {speaker.title && (
                  <p className="font-mono text-label-sm text-[#1B1B8F]/50">
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
        <div className="mt-5 pt-4 flex items-center gap-2 font-mono text-label-sm border-t border-lavender-dark text-[#1B1B8F]/50">
          <RiMapPinLine size={14} aria-hidden />
          {session.location}
        </div>
      )}

      {children}
    </article>
  );
}

