import Image from "next/image";
import { agenda } from "@/data/agenda";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0F0F57" }} className="overflow-hidden">
      <div className="border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-8 md:px-12 lg:px-16 py-6">
        <p className="font-mono text-label-sm text-white/30 uppercase tracking-widest">
          {agenda.eventName}
        </p>
        <p className="font-mono text-label-sm text-white/20">
          {agenda.dates} — {agenda.location}
        </p>
      </div>
      <Image
        src="/OffsiteLogo.png"
        alt="AirOps Lisbon 2026"
        width={1320}
        height={660}
        className="w-full h-auto opacity-25"
      />
    </footer>
  );
}
