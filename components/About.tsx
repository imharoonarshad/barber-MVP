import Link from "next/link";
import { getShop } from "@/lib/shop";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function About({
  withHeading = true,
  preview = false,
}: {
  withHeading?: boolean;
  preview?: boolean;
}) {
  const shop = getShop();
  return (
    <section className="section bg-surface">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <img
            src={shop.about.image}
            alt={`Inside ${shop.name}`}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
          />
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-line/10 bg-bg p-5 shadow-lift sm:block">
            <p className="font-display text-3xl font-bold text-accent">Est. {shop.established}</p>
            <p className="text-xs uppercase tracking-wide text-muted">{shop.city}</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          {withHeading && <p className="eyebrow">About us</p>}
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">{shop.about.heading}</h2>
          {shop.about.body.map((p) => (
            <p key={p} className="mt-5 leading-relaxed text-muted">
              {p}
            </p>
          ))}

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line/10 pt-8">
            {shop.about.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-accent sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          {preview && (
            <Link href="/about" className="btn-outline mt-8">
              Read our story
              <ArrowRight width={16} height={16} />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
