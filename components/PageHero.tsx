"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useShop } from "@/components/ShopProvider";

/** Compact banner at the top of every inner page (about, services, etc.). */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  const shop = useShop();
  const resolvedImage = image ?? shop.hero.image;
  return (
    <section className="relative isolate overflow-hidden border-b border-line/10">
      <motion.img
        src={resolvedImage}
        alt=""
        aria-hidden
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Always-dark banner (independent of theme) for consistent white text. */}
      <div className="absolute inset-0 -z-10 bg-black/65" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/55 via-black/30 to-black/55" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="container-px py-20 sm:py-28"
      >
        <nav className="mb-5 flex items-center gap-2 text-xs text-white/60" aria-label="Breadcrumb">
          <Link href="/" className="transition hover:text-accent">
            Home
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">{title}</span>
        </nav>
        {eyebrow && (
          <p className="eyebrow">
            <span className="h-px w-8 bg-accent" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-xl text-lg text-white/75">{subtitle}</p>}
      </motion.div>
    </section>
  );
}
