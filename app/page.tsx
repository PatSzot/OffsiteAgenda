import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { agenda } from "@/data/agenda";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Quick info strip */}
        <section className="bg-off-white section">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-stroke-green overflow-hidden">
              {[
                { label: "When",     value: agenda.dates },
                { label: "Where",    value: agenda.location },
                { label: "Duration", value: `${agenda.days.length} Days` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-off-white px-8 py-8">
                  <p className="label text-near-black/50 mb-2">{label}</p>
                  <p className="font-serif text-display-md text-near-black">{value}</p>
                </div>
              ))}
            </div>

            {/* Day previews */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {agenda.days.map((day, i) => (
                <a
                  key={day.id}
                  href={`/agenda#${day.id}`}
                  className="group block bg-white border border-stroke-green p-8 hover:shadow-md transition-shadow"
                >
                  <p className="label text-green-500 mb-3">{day.label}</p>
                  <h2 className="font-serif text-display-md text-near-black mb-2 group-hover:text-green-500 transition-colors">
                    {day.theme ?? `Day ${i + 1}`}
                  </h2>
                  <p className="font-mono text-label-sm text-near-black/50 mb-6">{day.date}</p>
                  <p className="font-sans text-body-sm text-near-black/60">
                    {day.sessions.length} sessions
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-600 text-white py-12">
        <div className="container-site flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-label-sm text-white/40 uppercase tracking-widest">
            {agenda.eventName}
          </p>
          <p className="font-mono text-label-sm text-white/30">
            {agenda.location}
          </p>
        </div>
      </footer>
    </>
  );
}
