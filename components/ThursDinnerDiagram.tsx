"use client";

import { useState } from "react";
import { RiArrowDownSLine, RiUserCommunityLine } from "@remixicon/react";
import { thursDinnerGroups } from "@/data/thursDinnerGroups";

export function ThursDinnerDiagram() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6 pt-6 border-t border-lavender-dark">
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
            {/* Header */}
            <div className="grid grid-cols-[auto_auto_1fr_auto] gap-x-3 px-5 py-2 bg-lavender-dark">
              <span className="font-mono text-label-sm text-[#1B1B8F]/40 uppercase tracking-widest w-20">Leader</span>
              <span className="font-mono text-label-sm text-[#1B1B8F]/40 uppercase tracking-widest w-4"></span>
              <span className="font-mono text-label-sm text-[#1B1B8F]/40 uppercase tracking-widest">Member</span>
              <span className="font-mono text-label-sm text-[#1B1B8F]/40 uppercase tracking-widest">Time / Location</span>
            </div>

            {thursDinnerGroups.map((g, gi) => (
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
                    {mi === 0 ? [g.time, g.location].filter(Boolean).join(" · ") : ""}
                  </span>
                </div>
              ))
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
