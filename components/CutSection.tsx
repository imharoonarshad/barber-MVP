"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

const CutScene3D = dynamic(() => import("./CutScene3D"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <div className="h-24 w-24 animate-spin rounded-full border-2 border-line/10 border-t-accent opacity-50" />
    </div>
  ),
});

export default function CutSection() {
  return (
    <section className="section relative overflow-hidden bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(50% 60% at 30% 50%, rgb(var(--accent-2) / 0.10), transparent 70%)",
        }}
      />
      <div className="container-px relative grid items-center gap-10 lg:grid-cols-2">
        {/* 3D canvas (left on desktop, below copy on mobile) */}
        <div className="relative order-2 h-[360px] sm:h-[440px] lg:order-1 lg:h-[520px]">
          <CutScene3D />
        </div>

        {/* copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2"
        >
          <p className="eyebrow">
            <span className="h-px w-8 bg-accent" />
            Craft you can see
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Sharp tools.
            <br />
            Sharper hands.
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Every cut is scissor-over-comb precision and a steady hand — no rushing the
            chair. This is what a real barber's craft looks like, snip by snip.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line/15 bg-surface px-4 py-2 text-sm text-muted">
            <span className="text-lg">✋</span>
            Drag the scissors to turn them
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="btn-accent px-8 py-3.5 text-base">
              Book your cut
            </Link>
            <Link href="/services" className="btn-outline px-8 py-3.5 text-base">
              See the menu
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
