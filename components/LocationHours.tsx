"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { shop } from "@/config/shop";
import { Pin, Clock, Phone } from "./icons";

export default function LocationHours() {
  const [todayName, setTodayName] = useState<string | null>(null);

  useEffect(() => {
    setTodayName(
      new Date().toLocaleDateString("en-US", { weekday: "long" }),
    );
  }, []);

  const tel = shop.phone.replace(/[^\d+]/g, "");
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${shop.name} ${shop.address}`,
  )}&output=embed`;

  return (
    <section id="location" className="section bg-surface">
      <div className="container-px grid gap-8 lg:grid-cols-2">
        {/* Info */}
        <div className="flex flex-col">
          <p className="eyebrow">Visit us</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Find the shop</h2>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Pin width={18} height={18} />
              </span>
              <div>
                <p className="font-semibold">Address</p>
                <a
                  href={shop.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted hover:text-accent"
                >
                  {shop.address}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Phone width={18} height={18} />
              </span>
              <div>
                <p className="font-semibold">Phone</p>
                <a href={`tel:${tel}`} className="text-sm text-muted hover:text-accent">
                  {shop.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Clock width={18} height={18} />
              </span>
              <div className="w-full max-w-sm">
                <p className="font-semibold">Opening hours</p>
                <ul className="mt-2 space-y-1.5">
                  {shop.hours.map((h) => {
                    const isToday = h.day === todayName;
                    return (
                      <li
                        key={h.day}
                        className={`flex justify-between rounded-md px-2 py-1 text-sm ${
                          isToday ? "bg-accent/10 font-semibold text-ink" : "text-muted"
                        }`}
                      >
                        <span>
                          {h.day}
                          {isToday && <span className="ml-2 text-xs text-accent">Today</span>}
                        </span>
                        <span>{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="btn-accent">
              Book an appointment
            </Link>
            <a href={shop.mapsUrl} target="_blank" rel="noreferrer" className="btn-outline">
              Get directions
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-3xl border border-line/10 shadow-soft">
          <iframe
            title={`Map to ${shop.name}`}
            src={mapSrc}
            className="h-full min-h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
