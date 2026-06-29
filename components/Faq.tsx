"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shop } from "@/config/shop";
import { ChevronDown } from "./icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/** Animated FAQ accordion (single-open) with smooth height + fade transitions. */
export default function Faq({
  items = shop.faqs,
  withHeading = true,
}: {
  items?: { q: string; a: string }[];
  withHeading?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="container-px">
        {withHeading && (
          <SectionHeading
            eyebrow="FAQ"
            title="Good to know"
            subtitle="The questions we get asked most. Anything else — just call or message us."
          />
        )}
        <Reveal className="mx-auto mt-10 max-w-3xl divide-y divide-line/10 overflow-hidden rounded-2xl border border-line/10 bg-surface">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="px-6">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium"
                >
                  {f.q}
                  <ChevronDown
                    width={20}
                    height={20}
                    className={`shrink-0 text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
