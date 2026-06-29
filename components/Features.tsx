import { shop } from "@/config/shop";
import { ICONS, Scissors } from "./icons";
import { RevealStagger, RevealItem } from "./Reveal";

/** "Why choose us" — the four feature cards. */
export default function Features() {
  return (
    <section className="section">
      <div className="container-px">
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shop.features.map((f) => {
            const Icon = ICONS[f.icon] ?? Scissors;
            return (
              <RevealItem key={f.title} className="h-full">
                <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/30">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
                    <Icon width={22} height={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
