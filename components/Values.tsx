import { getShop } from "@/lib/shop";
import SectionHeading from "./SectionHeading";
import { Check } from "./icons";
import { RevealStagger, RevealItem } from "./Reveal";

export default function Values() {
  const shop = getShop();
  return (
    <section className="section bg-surface">
      <div className="container-px">
        <SectionHeading
          eyebrow="What we stand for"
          title="Our values"
          subtitle="The principles behind every cut that leaves our chairs."
        />
        <RevealStagger className="mt-12 grid gap-5 md:grid-cols-3">
          {shop.values.map((v, i) => (
            <RevealItem key={v.title} className="h-full">
            <div className="card h-full p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Check width={18} height={18} className="text-accent" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
