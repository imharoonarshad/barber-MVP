import { shop } from "@/config/shop";
import SectionHeading from "./SectionHeading";
import { RevealStagger, RevealItem } from "./Reveal";
import StylistCard from "./StylistCard";

export default function Stylists({
  withHeading = true,
  preview = false,
}: {
  withHeading?: boolean;
  preview?: boolean;
}) {
  return (
    <section className={`section ${withHeading ? "bg-surface" : ""}`}>
      <div className="container-px">
        {withHeading && (
          <SectionHeading
            eyebrow="The team"
            title="Meet your barbers"
            subtitle="Real craftsmen with years behind the chair. Pick your barber when you book."
            cta={preview ? { href: "/team", label: "Meet the team" } : undefined}
          />
        )}
        <RevealStagger
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${withHeading ? "mt-12" : ""}`}
        >
          {shop.stylists.map((b) => (
            <RevealItem key={b.name} className="h-full">
              <StylistCard b={b} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
