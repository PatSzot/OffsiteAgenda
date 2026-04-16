"use client";

import { useState, useMemo } from "react";
import { RiArrowDownSLine, RiUserCommunityLine, RiSearchLine, RiArrowRightUpLine } from "@remixicon/react";
import { thursDinnerGroups, type ThursDinnerGroup } from "@/data/thursDinnerGroups";

function LocationLink({ group }: { group: ThursDinnerGroup }) {
  const label = [group.time, group.location].filter(Boolean).join(" · ");
  if (!label) return null;
  if (group.locationUrl) {
    return (
      <a
        href={group.locationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-70 transition-opacity"
      >
        {label}
        <RiArrowRightUpLine size={11} aria-hidden />
      </a>
    );
  }
  return <span>{label}</span>;
}

export function ThursDinnerDiagram() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const result = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    for (const g of thursDinnerGroups) {
      const match = [g.leader, ...g.members].find((name) =>
        name.toLowerCase().includes(q)
      );
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
            <p className="font-mono text-label-sm text-white/50 uppercase tracking-widest mb-4">
              {result.group.leader}&apos;s group
            </p>
            <ul className="space-y-2 mb-4">
              {[result.group.leader, ...result.group.members].map((name) => (
                <li
                  key={name}
                  className={`flex items-center justify-between gap-4 ${
                    name === result.match ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <span className={`font-sans text-body-sm ${name === result.match ? "text-white font-medium" : "text-white/80"}`}>
                    {name === result.match ? "→ " : ""}{name}
                    {name === result.group.leader ? (
                      <span className="ml-2 font-mono text-label-sm text-white/40">leader</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
            {(result.group.time || result.group.location) && (
              <p className="font-mono text-label-sm text-white/40 border-t border-white/10 pt-3">
                <LocationLink group={result.group} />
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── All groups accordion ─────────────────────────────────── */}
      <div className="border border-lavender-dark">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-4 px-5 py-3.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-inset"
        >
          <span className="flex items-center gap-2 font-mono text-label-sm text-[#1B1B8F]/50 uppercase tracking-widest">
            <RiUserCommunityLine size={14} aria-hidden />
            All groups
          </span>
          <RiArrowDownSLine
            size={16}
            aria-hidden
            className={`text-[#1B1B8F]/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="border-t border-lavender-dark">
            <div className="grid grid-cols-[auto_auto_1fr_auto] gap-x-3 px-5 py-2 bg-lavender-dark">
              <span className="font-mono text-label-sm text-[#1B1B8F]/40 uppercase tracking-widest w-20">Leader</span>
              <span className="w-4" />
              <span className="font-mono text-label-sm text-[#1B1B8F]/40 uppercase tracking-widest">Member</span>
              <span className="font-mono text-label-sm text-[#1B1B8F]/40 uppercase tracking-widest">Time / Location</span>
            </div>

            {thursDinnerGroups.map((g, gi) =>
              g.members.map((member, mi) => (
                <div
                  key={`${g.leader}-${member}`}
                  className={`grid grid-cols-[auto_auto_1fr_auto] gap-x-3 px-5 py-2 items-baseline border-t border-lavender-dark/60 ${
                    gi % 2 === 0 ? "bg-white" : "bg-lavender/50"
                  }`}
                >
                  <span className="font-mono text-label-sm text-cobalt w-20">
                    {mi === 0 ? g.leader : ""}
                  </span>
                  <span className="font-mono text-label-sm text-[#1B1B8F]/25 w-4 text-right">
                    {mi + 1}
                  </span>
                  <span className="font-sans text-body-sm text-[#1B1B8F]">{member}</span>
                  <span className="font-mono text-label-sm text-[#1B1B8F]/40 text-right whitespace-nowrap">
                    {mi === 0 ? <LocationLink group={g} /> : ""}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
}
