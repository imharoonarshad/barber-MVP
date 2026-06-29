"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pitch } from "@/config/shop";
import { ArrowRight, Close } from "./icons";

/** The agency's call-to-action strip. Dismissible (animated) so the demo can
 *  be viewed like a real site. Set `pitch.show = false` in config/shop.ts to
 *  remove it entirely before handing over a paid build. */
export default function PitchBanner() {
  const [open, setOpen] = useState(true);
  if (!pitch.show) return null;

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-50 overflow-hidden bg-accent text-accent-ink"
        >
          <div className="container-px flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-sm font-medium">
            <span className="font-semibold">{pitch.message}</span>
            <a
              href={`mailto:${pitch.ctaEmail}?subject=${encodeURIComponent(
                "I want my barbershop website",
              )}`}
              className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:opacity-80"
            >
              {pitch.ctaLabel}
              <ArrowRight width={15} height={15} />
            </a>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Dismiss"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-black/10"
          >
            <Close width={16} height={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
