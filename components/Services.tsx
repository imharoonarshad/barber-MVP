import { shop, type Service } from "@/config/shop";
import SectionHeading from "./SectionHeading";
import { RevealStagger, RevealItem } from "./Reveal";

function Card({ s }: { s: Service }) {
  return (
    <div className="card group relative flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
      {s.popular && (
        <span className="absolute right-5 top-5 rounded-full bg-accent2/15 px-3 py-1 text-xs font-semibold text-accent2">
          Popular
        </span>
      )}
      <h3 className="pr-20 text-xl font-semibold">{s.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
      <div className="mt-6 flex items-end justify-between border-t border-line/10 pt-4">
        <span className="text-xs uppercase tracking-wide text-muted">{s.duration}</span>
        <span className="font-display text-2xl font-bold text-accent">{s.price}</span>
      </div>
    </div>
  );
}

/**
 * variant="preview" → 3 highlighted services + link to the full menu (Home).
 * variant="full"    → the entire menu grouped by category (Services page).
 */
export default function Services({
  variant = "full",
  withHeading = true,
}: {
  variant?: "preview" | "full";
  withHeading?: boolean;
}) {
  if (variant === "preview") {
    const featured = shop.services.filter((s) => s.popular).slice(0, 3);
    const picks = featured.length >= 3 ? featured : shop.services.slice(0, 3);
    return (
      <section className="section">
        <div className="container-px">
          <SectionHeading
            eyebrow="Services & pricing"
            title="Honest prices. No surprises."
            subtitle="A few of our most-booked services — see the full menu for everything we offer."
            cta={{ href: "/services", label: "View full menu" }}
          />
          <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((s) => (
              <RevealItem key={s.name} className="h-full">
                <Card s={s} />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>
    );
  }

  const categories = ["Haircuts", "Beard & Shave", "Extras"] as const;
  return (
    <section className="section">
      <div className="container-px">
        {withHeading && (
          <SectionHeading
            eyebrow="Services & pricing"
            title="The full menu"
            subtitle="Every service comes with a hot towel and a finish that lasts. Prices are starting rates and may vary with hair length and style."
            cta={{ href: "/book", label: "Book a service" }}
          />
        )}
        <div className="mt-12 space-y-14">
          {categories.map((cat) => {
            const items = shop.services.filter((s) => s.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <div className="flex items-center gap-4">
                  <h3 className="font-display text-2xl font-bold">{cat}</h3>
                  <span className="h-px flex-1 bg-line/10" />
                </div>
                <RevealStagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s) => (
                    <RevealItem key={s.name} className="h-full">
                      <Card s={s} />
                    </RevealItem>
                  ))}
                </RevealStagger>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
