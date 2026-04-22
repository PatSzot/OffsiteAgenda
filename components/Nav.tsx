"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiMenuLine, RiCloseLine, RiArrowRightUpLine } from "@remixicon/react";

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
    { href: "/faq", label: "Help Center" },
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
          <a
            href="https://lisbon-tarot-omega.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full font-mono text-label-lg uppercase tracking-widest transition-all duration-200 ${isDark ? "text-white/80 hover:text-white hover:bg-white/15" : "text-indigo-brand hover:bg-cobalt/10"}`}
          >
            Tarot Reading
            <RiArrowRightUpLine size={13} aria-hidden />
          </a>
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
          {menuOpen ? <RiCloseLine size={22} aria-hidden /> : <RiMenuLine size={22} aria-hidden />}
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
          <a
            href="https://lisbon-tarot-omega.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full font-mono text-label-lg uppercase tracking-widest transition-all duration-200 ${isDark ? "text-white/80 hover:text-white hover:bg-white/15" : "text-indigo-brand hover:bg-cobalt/10"}`}
          >
            Tarot Reading
            <RiArrowRightUpLine size={13} aria-hidden />
          </a>
        </div>
      )}
    </header>
  );
}

