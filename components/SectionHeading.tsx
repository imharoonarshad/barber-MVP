"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "./icons";

/** Consistent section heading: eyebrow + title + optional subtitle, with an
 *  optional "view all" link on the right. Animates in on scroll. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  cta,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  cta?: { href: string; label: string };
}) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col gap-6 ${
        cta ? "sm:flex-row sm:items-end sm:justify-between" : ""
      } ${centered ? "items-center text-center" : ""}`}
    >
      <div className={`max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {eyebrow && (
          <p className={`eyebrow ${centered ? "justify-center" : ""}`}>
            {!centered && <span className="h-px w-8 bg-accent" />}
            {eyebrow}
          </p>
        )}
        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">{title}</h2>
        {subtitle && <p className="mt-4 text-muted">{subtitle}</p>}
      </div>
      {cta && (
        <Link href={cta.href} className="btn-outline shrink-0">
          {cta.label}
          <ArrowRight width={16} height={16} />
        </Link>
      )}
    </motion.div>
  );
}
