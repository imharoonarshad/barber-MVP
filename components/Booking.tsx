"use client";

import { useMemo, useState } from "react";
import { shop } from "@/config/shop";
import { Check, Clock, Phone, Scissors, Star } from "./icons";

/* ----------------------------- helpers (mock) ----------------------------- */

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function to24h(t: string): number | null {
  // "9:00 AM" -> minutes since midnight
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return null;
  let h = parseInt(m[1], 10) % 12;
  if (/PM/i.test(m[3])) h += 12;
  return h * 60 + parseInt(m[2], 10);
}

function fmt(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

// Deterministic pseudo-random so "booked" slots don't reshuffle on every render.
function seeded(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

type DayOption = { iso: string; weekday: number; label: string; sub: string };

function nextDays(count: number): DayOption[] {
  const out: DayOption[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: d.getDay(),
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : WEEKDAYS[d.getDay()].slice(0, 3),
      sub: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    });
  }
  return out;
}

/* -------------------------------- component ------------------------------- */

export default function Booking() {
  const days = useMemo(() => nextDays(14), []);
  const [serviceIdx, setServiceIdx] = useState(0);
  const [barberIdx, setBarberIdx] = useState<number>(-1); // -1 = any available
  const [dateIso, setDateIso] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const selectedDay = days.find((d) => d.iso === dateIso) ?? null;

  // A day is bookable if the shop is open AND (any barber, or the chosen barber works).
  function dayOpen(d: DayOption): boolean {
    const h = shop.hours[(d.weekday + 6) % 7]; // hours[] is Mon..Sun; getDay() is Sun..Sat
    const shopOpen = !!h?.open;
    if (!shopOpen) return false;
    if (barberIdx === -1) return true;
    return !shop.stylists[barberIdx].daysOff.includes(d.weekday);
  }

  // Build the time-slot grid for the selected day.
  const slots = useMemo(() => {
    if (!selectedDay) return [];
    const h = shop.hours[(selectedDay.weekday + 6) % 7];
    if (!h?.open || !h?.close) return [];
    const start = to24h(h.open);
    const end = to24h(h.close);
    if (start == null || end == null) return [];
    const step = 45;
    const list: { time: string; booked: boolean }[] = [];
    for (let t = start; t + step <= end; t += step) {
      const label = fmt(t);
      const booked =
        seeded(`${barberIdx}-${selectedDay.iso}-${t}`) < 0.38; // ~38% pre-booked
      list.push({ time: label, booked });
    }
    return list;
  }, [selectedDay, barberIdx]);

  const canSubmit = name.trim() && phone.trim() && dateIso && time;

  function reset() {
    setDone(false);
    setTime("");
  }

  /* ------------------------------- success ------------------------------- */
  if (done) {
    const barber = barberIdx === -1 ? "Any available barber" : shop.stylists[barberIdx].name;
    return (
      <section id="book" className="section bg-surface">
        <div className="container-px">
          <div className="card mx-auto max-w-xl p-8 text-center sm:p-12">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15">
              <Check width={32} height={32} className="text-success" />
            </div>
            <h2 className="mt-6 text-3xl font-bold">Booking request sent!</h2>
            <p className="mt-3 text-muted">
              Thanks {name.split(" ")[0]} — {shop.shortName} will text{" "}
              <span className="text-ink">{phone}</span> shortly to confirm.
            </p>
            <div className="mt-8 space-y-3 rounded-xl border border-line/10 bg-surface-2 p-5 text-left text-sm">
              <Row label="Service" value={shop.services[serviceIdx].name} />
              <Row label="Barber" value={barber} />
              <Row
                label="When"
                value={`${selectedDay?.label}, ${selectedDay?.sub} · ${time}`}
              />
            </div>
            <button onClick={reset} className="btn-outline mt-8">
              Book another appointment
            </button>
            <p className="mt-4 text-xs text-muted">
              This is a demo booking — no appointment was actually scheduled.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------- the form ------------------------------ */
  return (
    <section id="book" className="section bg-surface">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <Clock width={15} height={15} />
            Book online · 24/7
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Reserve your chair</h2>
          <p className="mt-4 text-muted">
            Pick a service, your barber, and a time that works. See live availability —
            greyed-out slots are already taken.
          </p>
        </div>

        <div className="card mx-auto mt-12 max-w-3xl p-6 sm:p-8">
          {/* Step 1 — service */}
          <Step n={1} title="Choose a service" icon={<Scissors width={16} height={16} />} />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {shop.services.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setServiceIdx(i)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                  serviceIdx === i
                    ? "border-accent bg-accent/10"
                    : "border-line/12 bg-surface-2 hover:border-line/30"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold">{s.name}</span>
                  <span className="text-xs text-muted">{s.duration}</span>
                </span>
                <span className="font-display font-bold text-accent">{s.price}</span>
              </button>
            ))}
          </div>

          {/* Step 2 — barber */}
          <Step n={2} title="Choose your barber" icon={<Star width={15} height={15} />} className="mt-8" />
          <div className="mt-4 flex flex-wrap gap-3">
            <Chip active={barberIdx === -1} onClick={() => { setBarberIdx(-1); setTime(""); }}>
              Any available
            </Chip>
            {shop.stylists.map((b, i) => (
              <Chip key={b.name} active={barberIdx === i} onClick={() => { setBarberIdx(i); setTime(""); }}>
                {b.name.split(" ")[0]}
                {b.availableToday && (
                  <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-success" />
                )}
              </Chip>
            ))}
          </div>

          {/* Step 3 — date */}
          <Step n={3} title="Pick a date" icon={<Clock width={15} height={15} />} className="mt-8" />
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {days.map((d) => {
              const open = dayOpen(d);
              const active = dateIso === d.iso;
              return (
                <button
                  key={d.iso}
                  disabled={!open}
                  onClick={() => { setDateIso(d.iso); setTime(""); }}
                  className={`flex min-w-[68px] shrink-0 flex-col items-center rounded-xl border px-3 py-2.5 transition ${
                    active
                      ? "border-accent bg-accent text-accent-ink"
                      : open
                        ? "border-line/12 bg-surface-2 hover:border-line/30"
                        : "cursor-not-allowed border-line/8 bg-surface-2/40 text-muted/40"
                  }`}
                >
                  <span className="text-xs font-semibold">{d.label}</span>
                  <span className="text-xs">{open ? d.sub : "Closed"}</span>
                </button>
              );
            })}
          </div>

          {/* Step 4 — time */}
          <Step n={4} title="Pick a time" icon={<Clock width={15} height={15} />} className="mt-8" />
          {!selectedDay ? (
            <p className="mt-4 rounded-xl border border-dashed border-line/15 px-4 py-6 text-center text-sm text-muted">
              Select a date to see available times.
            </p>
          ) : slots.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-line/15 px-4 py-6 text-center text-sm text-muted">
              No times available that day — try another date.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {slots.map((s) => (
                <button
                  key={s.time}
                  disabled={s.booked}
                  onClick={() => setTime(s.time)}
                  className={`rounded-lg border px-2 py-2 text-sm font-medium transition ${
                    time === s.time
                      ? "border-accent bg-accent text-accent-ink"
                      : s.booked
                        ? "cursor-not-allowed border-line/8 bg-surface-2/40 text-muted/35 line-through"
                        : "border-line/12 bg-surface-2 hover:border-accent/50"
                  }`}
                >
                  {s.time}
                </button>
              ))}
            </div>
          )}

          {/* Step 5 — contact + confirm */}
          <Step n={5} title="Your details" icon={<Phone width={15} height={15} />} className="mt-8" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              className="input"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input"
              placeholder="Mobile number"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button
            disabled={!canSubmit}
            onClick={() => setDone(true)}
            className="btn-accent mt-6 w-full py-3.5 text-base"
          >
            {canSubmit
              ? `Confirm — ${shop.services[serviceIdx].name} · ${time}`
              : "Complete the steps above to book"}
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            No payment needed now. The shop confirms by text.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ small pieces ------------------------------ */

function Step({
  n,
  title,
  icon,
  className = "",
}: {
  n: number;
  title: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">
        {n}
      </span>
      <h3 className="text-base font-semibold">{title}</h3>
      <span className="text-accent">{icon}</span>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-accent bg-accent text-accent-ink"
          : "border-line/12 bg-surface-2 hover:border-line/30"
      }`}
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
