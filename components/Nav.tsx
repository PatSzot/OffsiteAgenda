"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavProps {
  variant?: "light" | "dark";
  fixed?: boolean;
}

export function Nav({ variant = "light", fixed = true }: NavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = variant === "dark";

  const linkClass = (href: string) => {
    const active = pathname === href;
    const base =
      "px-5 py-2 rounded-full font-mono text-label-lg uppercase tracking-widest transition-all duration-200";
    if (active) {
      return `${base} ${isDark ? "bg-white text-cobalt" : "bg-cobalt text-white shadow-sm"}`;
    }
    return `${base} ${
      isDark
        ? "text-white/80 hover:text-white hover:bg-white/15"
        : "text-indigo-brand hover:bg-cobalt/10"
    }`;
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/agenda", label: "Agenda" },
  ];

  return (
    <header className={`${fixed ? "fixed top-0 inset-x-0 z-50" : "relative"} ${isDark ? "bg-cobalt" : "bg-transparent"}`}>
      <nav
        className="flex items-center justify-between px-6 md:px-10 lg:px-16 h-16"
        aria-label="Primary navigation"
      >
        {/* Logo — left */}
        <Link href="/" aria-label="AirOps Offsite — home">
          <Image
            src="/Offsite-CompanyLogo.svg"
            alt="AirOps"
            width={120}
            height={40}
            priority
            className={`h-7 w-auto${isDark ? " brightness-0 invert" : ""}`}
          />
        </Link>

        {/* Desktop links — right */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-md transition-colors ${
            isDark
              ? "text-white hover:bg-white/10"
              : "text-indigo-brand hover:bg-cobalt/10"
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className={`md:hidden border-b px-6 pb-4 pt-1 flex flex-col gap-1 ${
            isDark
              ? "bg-cobalt-dark border-white/10"
              : "bg-lavender border-indigo-brand/15"
          }`}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(href)}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M3 5.5h16M3 11h16M3 16.5h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M17 5L5 17M5 5l12 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
