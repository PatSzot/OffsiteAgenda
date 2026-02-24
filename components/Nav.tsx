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
        : "text-indigo-brand hover:bg-white/40"
    }`;
  };

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center gap-1 px-2 py-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 shadow-xl shadow-black/10"
        aria-label="Primary navigation"
      >
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>

        <Link
          href="/"
          className="mx-1 flex items-center justify-center"
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

        <Link href="/agenda" className={linkClass("/agenda")}>
          Agenda
        </Link>
      </nav>
    </header>
  );
}
