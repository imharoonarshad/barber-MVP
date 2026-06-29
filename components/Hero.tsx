"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { shop } from "@/config/shop";
import { Phone, Pin, Stars, Scissors } from "./icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const up: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const tel = shop.phone.replace(/[^\d+]/g, "");

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Background photo with a slow zoom-in */}
      <motion.img
        src={shop.hero.image}
        alt={`${shop.name} interior`}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Always-dark scrim (independent of theme) so the white hero text reads
          in both light and dark mode; only the very bottom fades into the page. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/55 to-bg" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

      <div className="container-px flex min-h-[88vh] flex-col justify-center py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.p variants={up} className="eyebrow">
            <span className="h-px w-8 bg-accent" />
            Est. {shop.established} · {shop.city}
          </motion.p>

          <motion.h1
            variants={up}
            className="mt-5 whitespace-pre-line font-display text-5xl font-bold leading-[1.05] text-white sm:text-7xl"
          >
            {shop.hero.headline}
          </motion.h1>

          <motion.p variants={up} className="mt-6 max-w-xl text-lg text-white/75">
            {shop.hero.sub}
          </motion.p>

          <motion.div variants={up} className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-accent-ink">
              <Scissors width={15} height={15} />
              Walk-ins Welcome
            </span>
          </motion.div>

          <motion.div variants={up} className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/book" className="btn-accent px-8 py-3.5 text-base">
              Book an appointment
            </Link>
            <a
              href={`tel:${tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
            >
              <Phone width={18} height={18} />
              {shop.phone}
            </a>
          </motion.div>

          <motion.div
            variants={up}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75"
          >
            <span className="inline-flex items-center gap-2">
              <Stars value={shop.rating} />
              <span className="font-semibold text-white">{shop.rating.toFixed(1)}</span>
              <span>· {shop.reviewCount} Google reviews</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Pin width={16} height={16} className="text-accent" />
              {shop.address}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
