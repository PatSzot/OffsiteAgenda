import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { agenda } from "@/data/agenda";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Quick info strip — full bleed */}
        <section className="bg-lavender border-t border-b border-indigo-brand/15">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-indigo-brand/15">
            {[
              { label: "When",     value: agenda.dates },
              { label: "Where",    value: agenda.location },
              { label: "Duration", value: `${agenda.days.length} Days` },
            ].map(({ label, value }) => (
              <div key={label} className="px-8 md:px-12 py-10 md:py-14">
                <p className="label text-indigo-brand/40 mb-3">{label}</p>
                <p className="font-serif text-display-md text-indigo-brand">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Day previews — full bleed editorial grid */}
        <section className="bg-lavender border-b border-indigo-brand/15">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-indigo-brand/15">
            {agenda.days.map((day, i) => (
              <a
                key={day.id}
                href={`/agenda#${day.id}`}
                className="group block px-8 md:px-12 py-12 md:py-16 hover:bg-lavender-dark transition-colors border-t-4 border-t-cobalt"
              >
                <p className="label text-cobalt mb-4">{day.label}</p>
                <h2 className="font-serif text-display-md text-indigo-brand mb-3 group-hover:text-cobalt transition-colors">
                  {day.theme ?? `Day ${i + 1}`}
                </h2>
                <p className="font-mono text-label-sm text-indigo-brand/50 mb-10">{day.date}</p>
                <p className="font-sans text-body-sm text-indigo-brand/40">
                  {day.sessions.length} sessions
                </p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
