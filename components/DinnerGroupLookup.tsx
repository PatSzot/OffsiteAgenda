"use client";

import { useState, useMemo } from "react";
import { RiSearchLine, RiGroupLine } from "@remixicon/react";
import { dinnerGroups } from "@/data/dinnerGroups";

export function DinnerGroupLookup() {
  const [query, setQuery] = useState("");

  const result = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    for (const g of dinnerGroups) {
      const match = g.people.find((p) =>
        p.name.toLowerCase().includes(q)
      );
      if (match) return { group: g, match };
    }
    return null;
  }, [query]);

  const noMatch = query.trim().length >= 2 && !result;

  return (
    <div className="mt-6 pt-6 border-t border-lavender-dark">
      <p className="font-mono text-label-sm text-[#1B1B8F]/50 uppercase tracking-widest mb-3">
        Find your group
      </p>

      {/* Input */}
      <div className="relative">
        <RiSearchLine
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1B1B8F]/30 pointer-events-none"
          aria-hidden
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your name…"
          className="w-full pl-8 pr-4 py-2.5 bg-lavender border border-lavender-dark font-sans text-body-sm text-[#1B1B8F] placeholder:text-[#1B1B8F]/30 focus:outline-none focus:border-cobalt transition-colors duration-200"
        />
      </div>

      {/* No match */}
      {noMatch && (
        <p className="mt-3 font-sans text-body-sm text-[#1B1B8F]/40">
          No match found — try a different spelling.
        </p>
      )}

      {/* Result */}
      {result && (
        <div className="mt-3 bg-cobalt p-5">
          <div className="flex items-center gap-2 mb-4">
            <RiGroupLine size={14} className="text-white/50" aria-hidden />
            <p className="font-mono text-label-sm text-white/50 uppercase tracking-widest">
              Group {result.group.group}
            </p>
          </div>
          <ul className="space-y-2">
            {result.group.people.map((person) => (
              <li
                key={person.name}
                className={`flex items-center justify-between gap-4 ${
                  person.name === result.match.name ? "opacity-100" : "opacity-60"
                }`}
              >
                <span
                  className={`font-sans text-body-sm ${
                    person.name === result.match.name
                      ? "text-white font-medium"
                      : "text-white/80"
                  }`}
                >
                  {person.name === result.match.name ? "→ " : ""}{person.name}
                </span>
                <span className="font-mono text-label-sm text-white/40 shrink-0">
                  {person.team}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
