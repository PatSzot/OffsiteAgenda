"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/agenda", label: "Agenda" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-indigo-brand/15">
      <nav className="container-site flex items-center justify-between h-16">
        {/* Wordmark / logo slot */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="AirOps Lisbon 2026 — home"
        >
          <Image
            src="/AO-OffsiteSymbol.png"
            alt="AirOps Offsite"
            width={40}
            height={40}
            priority
            className="h-8 w-auto"
          />
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
                      ? "bg-cobalt text-white"
                      : "text-indigo-brand hover:bg-lavender"
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
