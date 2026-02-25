import Image from "next/image";
import { agenda } from "@/data/agenda";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#0F0F57" }} className="overflow-hidden">
      <div className="border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-8 md:px-12 lg:px-16 py-6">
        <p className="font-mono text-label-sm text-white/30 uppercase tracking-widest">
          {agenda.eventName}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://app.slack.com/client/T60M1J1N1/C0AG6QNAJ78"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-label-sm text-white/40 uppercase tracking-widest hover:text-white/70 transition-colors"
          >
            Offsite Slack ↗
          </a>
          <p className="font-mono text-label-sm text-white/20">
            {agenda.dates} — {agenda.location}
          </p>
        </div>
      </div>
      <div className="px-8 md:px-12 lg:px-16 pb-8 md:pb-12 lg:pb-16">
        <Image
          src="/OffsiteLogo.png"
          alt="AirOps Lisbon 2026"
          width={1320}
          height={660}
          className="w-full h-auto opacity-25"
        />
      </div>
    </footer>
  );
}
