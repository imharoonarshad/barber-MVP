"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

// Three.js touches the DOM/WebGL, so load it only in the browser.
const BarberPole3D = dynamic(() => import("./BarberPole3D"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <div className="h-40 w-10 animate-pulse rounded-full bg-gradient-to-b from-accent2 via-white/80 to-pole-blue/80 opacity-40" />
    </div>
  ),
});

export default function Experience3D() {
  return (
    <section className="section relative overflow-hidden bg-surface">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-70"
        style={{
          background:
            "radial-gradient(50% 60% at 70% 50%, rgb(var(--accent) / 0.12), transparent 70%)",
        }}
      />
      <div className="container-px relative grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">
            <span className="h-px w-8 bg-accent" />
            The real-deal experience
          </p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            The pole that marks a real barbershop
          </h2>
          <p className="mt-5 max-w-md text-muted">
            For over a century, the red-white-and-blue pole has meant one thing: a proper
            barber works here. Ours has been spinning on Anderson Lane since 2009 —
            give it a spin.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line/15 bg-surface-2 px-4 py-2 text-sm text-muted">
            <span className="text-lg">✋</span>
            Drag the pole to spin it
          </div>
          <div className="mt-8">
            <Link href="/book" className="btn-accent px-8 py-3.5 text-base">
              Book your chair
            </Link>
          </div>
        </motion.div>

        {/* 3D canvas */}
        <div className="relative h-[380px] sm:h-[460px] lg:h-[520px]">
          <BarberPole3D />
        </div>
      </div>
    </section>
  );
}
