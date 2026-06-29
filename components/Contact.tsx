"use client";

import { useState } from "react";
import { shop } from "@/config/shop";
import { Check, Phone, Pin } from "./icons";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const tel = shop.phone.replace(/[^\d+]/g, "");

  const valid = form.name.trim() && form.email.trim() && form.message.trim();

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    // DEMO: front-end only. To go live, POST to an email service (Resend/Formspree)
    // or wire to the shop's inbox.  For now we just show a success state.
    setSent(true);
  }

  return (
    <section id="contact" className="section">
      <div className="container-px grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Questions? Say hello.</h2>
          <p className="mt-4 max-w-md text-muted">
            Booking, private events, or just want to chat about a style? Drop us a message
            and we'll get right back to you.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`tel:${tel}`}
              className="flex items-center gap-4 rounded-xl border border-line/10 bg-surface p-4 transition hover:border-accent/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                <Phone width={18} height={18} />
              </span>
              <span>
                <span className="block text-sm font-semibold">Call the shop</span>
                <span className="text-sm text-muted">{shop.phone}</span>
              </span>
            </a>
            <a
              href={shop.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-xl border border-line/10 bg-surface p-4 transition hover:border-accent/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent">
                <Pin width={18} height={18} />
              </span>
              <span>
                <span className="block text-sm font-semibold">Visit</span>
                <span className="text-sm text-muted">{shop.address}</span>
              </span>
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="card p-6 sm:p-8">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-success/15">
                <Check width={32} height={32} className="text-success" />
              </div>
              <h3 className="mt-6 text-2xl font-bold">Message sent!</h3>
              <p className="mt-2 text-muted">
                Thanks {form.name.split(" ")[0]} — we'll reply within a day.
              </p>
              <p className="mt-4 text-xs text-muted">
                (Demo form — connect it to the shop's inbox to receive real messages.)
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <input className="input" value={form.name} onChange={update("name")} placeholder="Your name" />
                </Field>
                <Field label="Email">
                  <input
                    className="input"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@email.com"
                  />
                </Field>
              </div>
              <Field label="Phone (optional)">
                <input
                  className="input"
                  inputMode="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="(555) 000-0000"
                />
              </Field>
              <Field label="Message">
                <textarea
                  className="input min-h-[120px] resize-y"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="How can we help?"
                />
              </Field>
              <button type="submit" disabled={!valid} className="btn-accent w-full py-3.5 text-base">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
