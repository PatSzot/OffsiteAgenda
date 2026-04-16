"use client";

import { useState, useMemo } from "react";
import { RiSearchLine, RiGroupLine, RiArrowDownSLine, RiUserCommunityLine } from "@remixicon/react";
import { dinnerGroups } from "@/data/dinnerGroups";

export function DinnerGroupLookup() {
  const [query, setQuery] = useState("");
  const [allOpen, setAllOpen] = useState(false);

  const result = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    for (const g of dinnerGroups) {
      const match = g.people.find((p) => p.name.toLowerCase().includes(q));
      if (match) return { group: g, match };
    }
    return null;
  }, [query]);

  const noMatch = query.trim().length >= 2 && !result;

  return (
    <div className="mt-6 pt-6 border-t border-lavender-dark space-y-5">

      {/* ── Name lookup ─────────────────────────────────────────── */}
      <div>
        <p className="font-mono text-label-sm text-[#1B1B8F]/50 uppercase tracking-widest mb-3">
          Find your group
        </p>

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

        {noMatch && (
          <p className="mt-3 font-sans text-body-sm text-[#1B1B8F]/40">
            No match found — try a different spelling.
          </p>
        )}

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
                    {person.name === result.match.name ? "→ " : ""}
                    {person.name}
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

      {/* ── All groups accordion ─────────────────────────────────── */}
      <div className="border border-lavender-dark">
        <button
          onClick={() => setAllOpen((o) => !o)}
          aria-expanded={allOpen}
          className="w-full flex items-center justify-between gap-4 px-5 py-3.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-inset"
        >
          <span className="flex items-center gap-2 font-mono text-label-sm text-[#1B1B8F]/50 uppercase tracking-widest">
            <RiUserCommunityLine size={14} aria-hidden />
            All groups
          </span>
          <RiArrowDownSLine
            size={16}
            aria-hidden
            className={`text-[#1B1B8F]/30 transition-transform duration-200 ${allOpen ? "rotate-180" : ""}`}
          />
        </button>

        {allOpen && (
          <div className="border-t border-lavender-dark">
            {/* Header row */}
            <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 px-5 py-2 bg-lavender-dark">
              <span className="font-mono text-label-sm text-[#1B1B8F]/40 uppercase tracking-widest">Group</span>
              <span className="font-mono text-label-sm text-[#1B1B8F]/40 uppercase tracking-widest">Name</span>
              <span className="font-mono text-label-sm text-[#1B1B8F]/40 uppercase tracking-widest">Team</span>
            </div>

            {dinnerGroups.map((g, gi) => (
              <div key={g.group}>
                {g.people.map((person, pi) => (
                  <div
                    key={person.name}
                    className={`grid grid-cols-[auto_1fr_auto] gap-x-4 px-5 py-2 items-baseline border-t border-lavender-dark/60 ${
                      gi % 2 === 0 ? "bg-white" : "bg-lavender/50"
                    }`}
                  >
                    {/* Group number — only on first row of each group */}
                    <span className="font-mono text-label-sm text-cobalt w-8">
                      {pi === 0 ? `G${g.group}` : ""}
                    </span>
                    <span className="font-sans text-body-sm text-[#1B1B8F]">{person.name}</span>
                    <span className="font-mono text-label-sm text-[#1B1B8F]/40 text-right">{person.team}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
