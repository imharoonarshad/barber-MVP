import type { Metadata } from "next";
import { shop } from "@/config/shop";
import PageHero from "@/components/PageHero";
import Reviews from "@/components/Reviews";
import { Stars } from "@/components/icons";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: `Reviews — ${shop.name}`,
  description: `${shop.rating}★ from ${shop.reviewCount} reviews. See why ${shop.city} trusts ${shop.name}.`,
};

export default function ReviewsPage() {
  // Quick rating distribution for the summary (illustrative for the demo).
  const dist = [
    { stars: 5, pct: 86 },
    { stars: 4, pct: 10 },
    { stars: 3, pct: 3 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 0 },
  ];

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What our clients say"
        subtitle="We let the chair do the talking — here's what the neighborhood thinks."
      />

      {/* Rating summary */}
      <section className="section">
        <div className="container-px">
          <div className="card grid items-center gap-8 p-8 sm:grid-cols-[auto_1fr] sm:p-10">
            <div className="text-center sm:border-r sm:border-line/10 sm:pr-10">
              <p className="font-display text-6xl font-bold text-accent">
                {shop.rating.toFixed(1)}
              </p>
              <Stars value={shop.rating} className="mt-3 justify-center" />
              <p className="mt-2 text-sm text-muted">{shop.reviewCount} Google reviews</p>
            </div>
            <div className="space-y-2">
              {dist.map((d) => (
                <div key={d.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-6 text-muted">{d.stars}★</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-muted">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Reviews withHeading={false} />
      <CTABand
        title="Ready to write your own review?"
        subtitle="Come in for a cut and see what everyone's talking about."
      />
    </>
  );
}
