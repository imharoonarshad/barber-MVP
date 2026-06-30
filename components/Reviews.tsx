import Link from "next/link";
import { getShop } from "@/lib/shop";
import { Stars, Quote, ArrowRight } from "./icons";
import { RevealStagger, RevealItem } from "./Reveal";

export default function Reviews({
  limit,
  withHeading = true,
  preview = false,
}: {
  limit?: number;
  withHeading?: boolean;
  preview?: boolean;
}) {
  const shop = getShop();
  const items = limit ? shop.reviews.slice(0, limit) : shop.reviews;
  return (
    <section className="section">
      <div className="container-px">
        {withHeading && (
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">
                <span className="h-px w-8 bg-accent" />
                Reviews
              </p>
              <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
                Loved by the neighborhood
              </h2>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-line/10 bg-surface px-6 py-4">
              <span className="font-display text-4xl font-bold text-accent">
                {shop.rating.toFixed(1)}
              </span>
              <div>
                <Stars value={shop.rating} />
                <p className="mt-1 text-xs text-muted">{shop.reviewCount} Google reviews</p>
              </div>
            </div>
          </div>
        )}

        <RevealStagger
          className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${withHeading ? "mt-12" : ""}`}
        >
          {items.map((r) => (
            <RevealItem key={r.name + r.date} className="h-full">
            <figure className="card flex h-full flex-col p-6">
              <Quote width={28} height={28} className="text-accent/40" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink/90">
                {r.text}
              </blockquote>
              <figcaption className="mt-5 border-t border-line/10 pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <Stars value={r.rating} />
                </div>
                <p className="mt-1 text-xs text-muted">
                  {r.service ? `${r.service} · ` : ""}
                  {r.date}
                </p>
              </figcaption>
            </figure>
            </RevealItem>
          ))}
        </RevealStagger>

        {preview && (
          <div className="mt-10 text-center">
            <Link href="/reviews" className="btn-outline">
              Read all reviews
              <ArrowRight width={16} height={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
