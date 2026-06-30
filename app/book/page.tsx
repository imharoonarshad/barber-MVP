import type { Metadata } from "next";
import { getShop } from "@/lib/shop";
import PageHero from "@/components/PageHero";
import Booking from "@/components/Booking";
import Faq from "@/components/Faq";
import { RevealStagger, RevealItem } from "@/components/Reveal";

export function generateMetadata(): Metadata {
  const shop = getShop();
  return {
    title: `Book an Appointment — ${shop.name}`,
    description: `Book your chair online at ${shop.name}, ${shop.city}. Pick your service, barber and time in under a minute.`,
  };
}

export default function BookPage() {
  const shop = getShop();
  return (
    <>
      <PageHero
        eyebrow="Book online · 24/7"
        title="Book your appointment"
        subtitle="Three quick steps and you're in the chair. No account, no hassle."
      />

      {/* How it works */}
      <section className="section">
        <div className="container-px">
          <RevealStagger className="grid gap-6 md:grid-cols-3">
            {shop.bookingSteps.map((s, i) => (
              <RevealItem key={s.title} className="h-full">
              <div className="card h-full p-7">
                <span className="font-display text-4xl font-bold text-accent/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <Booking />
      <Faq />
    </>
  );
}
