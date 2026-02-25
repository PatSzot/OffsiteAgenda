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


      </main>

      <Footer />
    </>
  );
}
