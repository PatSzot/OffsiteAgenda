"use client";

import { useState } from "react";
import { RiTimeLine, RiMapPinLine } from "@remixicon/react";
import { thursDinnerGroups } from "@/data/thursDinnerGroups";

const CX = 250;
const CY = 215;
const RADIUS = 155;
const LEADER_R = 40;
const MEMBER_R = 30;

function NodeLabel({
  name,
  x,
  y,
  fill,
  fontSize = 9.5,
}: {
  name: string;
  x: number;
  y: number;
  fill: string;
  fontSize?: number;
}) {
  const parts = name.split(" ");
  const lh = fontSize * 1.3;
  const startY = y - (lh * (parts.length - 1)) / 2;
  return (
    <text
      textAnchor="middle"
      fontSize={fontSize}
      fill={fill}
      fontFamily="var(--font-sans, system-ui, sans-serif)"
      fontWeight="500"
    >
      {parts.map((p, i) => (
        <tspan key={i} x={x} y={startY + i * lh}>
          {p}
        </tspan>
      ))}
    </text>
  );
}

export function ThursDinnerDiagram() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const group = thursDinnerGroups[activeIdx];
  const n = group.members.length;

  return (
    <div className="mt-6 pt-6 border-t border-lavender-dark">
      <p className="font-mono text-label-sm text-[#1B1B8F]/50 uppercase tracking-widest mb-3">
        Dinner groups
      </p>

      {/* Leader selector */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {thursDinnerGroups.map((g, i) => (
          <button
            key={g.leader}
            onClick={() => { setActiveIdx(i); setHoveredMember(null); }}
            className={`px-3 py-1.5 font-mono text-label-sm uppercase tracking-widest transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-inset ${
              i === activeIdx
                ? "bg-cobalt text-white"
                : "bg-lavender-dark text-[#1B1B8F]/60 hover:text-[#1B1B8F] hover:bg-lavender-dark"
            }`}
          >
            {g.leader}
          </button>
        ))}
      </div>

      {/* Node diagram */}
      <div className="bg-lavender/60 border border-lavender-dark">
        <svg
          viewBox="0 0 500 430"
          className="w-full"
          aria-label={`Dinner group led by ${group.leader}`}
        >
          {/* Connecting lines */}
          {group.members.map((member, i) => {
            const angle = (i * (2 * Math.PI)) / n - Math.PI / 2;
            const mx = CX + RADIUS * Math.cos(angle);
            const my = CY + RADIUS * Math.sin(angle);
            const isHovered = hoveredMember === member;
            return (
              <line
                key={member}
                x1={CX}
                y1={CY}
                x2={mx}
                y2={my}
                stroke="#1B1DB5"
                strokeOpacity={isHovered ? 0.5 : 0.12}
                strokeWidth={isHovered ? 2 : 1.5}
                style={{ transition: "stroke-opacity 150ms, stroke-width 150ms" }}
              />
            );
          })}

          {/* Member nodes */}
          {group.members.map((member, i) => {
            const angle = (i * (2 * Math.PI)) / n - Math.PI / 2;
            const mx = CX + RADIUS * Math.cos(angle);
            const my = CY + RADIUS * Math.sin(angle);
            const isHovered = hoveredMember === member;
            return (
              <g
                key={member}
                onMouseEnter={() => setHoveredMember(member)}
                onMouseLeave={() => setHoveredMember(null)}
                style={{ cursor: "default" }}
              >
                <circle
                  cx={mx}
                  cy={my}
                  r={isHovered ? MEMBER_R + 4 : MEMBER_R}
                  fill={isHovered ? "#1B1DB5" : "white"}
                  stroke="#1B1DB5"
                  strokeWidth="1.5"
                  strokeOpacity={isHovered ? 1 : 0.25}
                  style={{ transition: "r 150ms, fill 150ms" }}
                />
                <NodeLabel
                  name={member}
                  x={mx}
                  y={my}
                  fill={isHovered ? "white" : "#2323A5"}
                  fontSize={9.5}
                />
              </g>
            );
          })}

          {/* Leader node */}
          <circle cx={CX} cy={CY} r={LEADER_R} fill="#1B1DB5" />
          <NodeLabel name={group.leader} x={CX} y={CY} fill="white" fontSize={13} />
        </svg>

        {/* Time / Location */}
        {(group.time || group.location) && (
          <div className="flex flex-wrap items-center gap-5 px-5 pb-4 -mt-1">
            {group.time && (
              <span className="flex items-center gap-1.5 font-mono text-label-sm text-[#1B1B8F]/40">
                <RiTimeLine size={12} aria-hidden />
                {group.time}
              </span>
            )}
            {group.location && (
              <span className="flex items-center gap-1.5 font-mono text-label-sm text-[#1B1B8F]/40">
                <RiMapPinLine size={12} aria-hidden />
                {group.location}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
