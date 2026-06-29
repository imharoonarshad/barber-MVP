"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Stylist } from "@/config/shop";
import { Stars, Check } from "./icons";

const MAX_TAGS = 3;

export default function StylistCard({ b }: { b: Stylist }) {
  const [bioOpen, setBioOpen] = useState(false);
  const [bioClamped, setBioClamped] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const bioRef = useRef<HTMLParagraphElement>(null);

  // Detect whether the bio actually overflows the clamp, so we only
  // show the "See more" control when it's needed.
  useEffect(() => {
    const el = bioRef.current;
    if (!el) return;
    const check = () => setBioClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [b.bio]);

  const extraTags = b.specialties.length - MAX_TAGS;
  const visibleTags =
    tagsOpen || extraTags <= 0 ? b.specialties : b.specialties.slice(0, MAX_TAGS);

  return (
    <article className="card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={b.photo}
          alt={b.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
        <span
          className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
            b.availableToday ? "bg-success/90 text-white" : "bg-bg/70 text-muted"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              b.availableToday ? "bg-white" : "bg-muted"
            }`}
          />
          {b.availableToday ? "Available today" : "Fully booked today"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{b.name}</h3>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
            <Stars value={b.rating} className="hidden sm:inline-flex" />
            {b.rating.toFixed(1)}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-accent">{b.role}</p>
        <p className="mt-1 text-xs uppercase tracking-wide text-muted">
          {b.experience} experience
        </p>

        <p
          ref={bioRef}
          className={`mt-3 text-sm leading-relaxed text-muted ${
            bioOpen ? "" : "line-clamp-3"
          }`}
        >
          {b.bio}
        </p>
        {(bioClamped || bioOpen) && (
          <button
            type="button"
            onClick={() => setBioOpen((v) => !v)}
            className="mt-1 self-start text-sm font-semibold text-accent transition hover:opacity-80"
          >
            {bioOpen ? "See less" : "See more"}
          </button>
        )}

        <ul className="mt-4 flex flex-wrap gap-2">
          {visibleTags.map((s) => (
            <li
              key={s}
              className="inline-flex items-center gap-1 rounded-full border border-line/10 bg-surface-2 px-3 py-1 text-xs text-muted"
            >
              <Check width={12} height={12} className="text-accent" />
              {s}
            </li>
          ))}
          {extraTags > 0 && (
            <li>
              <button
                type="button"
                onClick={() => setTagsOpen((v) => !v)}
                className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-surface-2 px-3 py-1 text-xs font-semibold text-accent transition hover:bg-accent/10"
              >
                {tagsOpen ? "See less" : `+${extraTags} more`}
              </button>
            </li>
          )}
        </ul>

        <div className="mt-auto pt-6">
          <Link href="/book" className="btn-outline w-full">
            Book with {b.name.split(" ")[0]}
          </Link>
        </div>
      </div>
    </article>
  );
}
