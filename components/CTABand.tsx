import Link from "next/link";
import { shop } from "@/config/shop";
import { Phone } from "./icons";
import Reveal from "./Reveal";

/** Full-width call-to-action band used at the bottom of most pages. */
export default function CTABand({
  title = "Ready for a fresh cut?",
  subtitle = "Book your chair in under a minute, or call the shop — we'll get you looking sharp.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const tel = shop.phone.replace(/[^\d+]/g, "");
  return (
    <section className="section">
      <div className="container-px">
        <Reveal className="relative overflow-hidden rounded-3xl border border-accent/20 bg-surface px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, rgb(var(--accent) / 0.16), transparent 70%)",
            }}
          />
          <h2 className="mx-auto max-w-2xl text-4xl font-bold sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/book" className="btn-accent px-8 py-3.5 text-base">
              Book an appointment
            </Link>
            <a href={`tel:${tel}`} className="btn-outline px-8 py-3.5 text-base">
              <Phone width={18} height={18} />
              {shop.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
