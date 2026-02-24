"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/agenda", label: "Agenda" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-stroke-green">
      <nav className="container-site flex items-center justify-between h-16">
        {/* Wordmark / logo slot */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="AirOps Lisbon 2026 — home"
        >
          <div className="w-7 h-7 bg-green-500 flex items-center justify-center">
            <span className="text-white font-mono text-label-sm font-medium">A</span>
          </div>
          <span className="font-mono text-label-lg text-near-black uppercase tracking-widest hidden sm:inline">
            AirOps
          </span>
        </Link>

        {/* Primary nav */}
        <ul className="flex items-center gap-1" role="list">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    px-4 py-2 font-mono text-label-lg uppercase tracking-widest transition-colors
                    ${active
                      ? "bg-near-black text-white"
                      : "text-near-black hover:bg-green-100"
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
