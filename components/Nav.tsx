"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = pathname === href;
    return `px-5 py-2 rounded-full font-mono text-label-lg uppercase tracking-widest transition-all duration-200 ${
      active
        ? "bg-cobalt text-white shadow-sm"
        : "text-indigo-brand hover:bg-cobalt/10"
    }`;
  };

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center px-2 py-2 rounded-full bg-white/50 backdrop-blur-2xl border border-white/70 shadow-2xl shadow-cobalt/10"
        aria-label="Primary navigation"
      >
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>

        <div className="mx-2 h-6 w-px bg-indigo-brand/15" />

        <Link
          href="/"
          className="mx-2 flex items-center justify-center"
          aria-label="AirOps Offsite — home"
        >
          <Image
            src="/AO-OffsiteSymbol.png"
            alt="AirOps Offsite"
            width={36}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="mx-2 h-6 w-px bg-indigo-brand/15" />

        <Link href="/agenda" className={linkClass("/agenda")}>
          Agenda
        </Link>
      </nav>
    </header>
  );
}
