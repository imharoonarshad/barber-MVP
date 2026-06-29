"use client";

import { motion } from "framer-motion";
import { shop } from "@/config/shop";
import SectionHeading from "./SectionHeading";

/** Vertical timeline of shop milestones — each entry slides in on scroll. */
export default function Milestones() {
  return (
    <section className="section">
      <div className="container-px">
        <SectionHeading
          eyebrow="Our journey"
          title="From two chairs to a neighborhood institution"
        />
        <ol className="mt-12 max-w-3xl">
          {shop.milestones.map((m, i) => {
            const last = i === shop.milestones.length - 1;
            return (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-accent/40 bg-surface font-display text-sm font-bold text-accent">
                    {m.year}
                  </span>
                  {!last && <span className="mt-2 w-px flex-1 bg-line/15" />}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
