"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { buildNavMenu } from "@/config/shop";
import type { NavMenuItem } from "@/config/shop";
import { useShop } from "@/components/ShopProvider";
import { Phone, Menu, Close, Plus, ChevronDown, ICONS, Scissors } from "./icons";
import ThemeToggle from "./ThemeToggle";

const EASE = [0.16, 1, 0.3, 1] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
};

export default function Nav() {
  const shop = useShop();
  const NAV_MENU = buildNavMenu(shop);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer
  const [openMenu, setOpenMenu] = useState<string | null>(null); // desktop hover panel
  const [mobileSection, setMobileSection] = useState<string | null>(null); // mobile accordion

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href?: string) =>
    !href ? false : href === "/" ? pathname === "/" : pathname.startsWith(href);

  const tel = shop.phone.replace(/[^\d+]/g, "");
  const activePanel = NAV_MENU.find(
    (i) => i.label === openMenu && (i.mega || i.children),
  );

  const topClass = (it: NavMenuItem) =>
    `inline-flex items-center gap-1.5 text-sm font-medium transition ${
      it.highlight
        ? "text-accent2 hover:brightness-125"
        : isActive(it.href)
          ? "text-accent"
          : "text-muted hover:text-ink"
    }`;

  return (
    <header
      onMouseLeave={() => setOpenMenu(null)}
      className={`sticky top-0 z-40 border-b bg-bg/85 backdrop-blur-md transition-colors duration-300 ${
        scrolled || open || openMenu ? "border-line/10 shadow-soft" : "border-transparent"
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-3" aria-label={shop.name}>
          <motion.span
            whileHover={{ rotate: -6, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="grid h-10 w-10 place-items-center rounded-lg bg-accent font-display text-sm font-extrabold text-accent-ink shadow-sm"
          >
            {shop.logoText}
          </motion.span>
          <span className="text-base font-bold tracking-tight">
            {shop.shortName}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_MENU.map((it) => {
            const hasPanel = !!(it.mega || it.children);
            return (
              <div
                key={it.label}
                className="py-2"
                onMouseEnter={() => setOpenMenu(hasPanel ? it.label : null)}
              >
                {it.href ? (
                  <Link href={it.href} className={topClass(it)}>
                    {it.label}
                    {it.emoji && <span>{it.emoji}</span>}
                    {hasPanel && (
                      <ChevronDown
                        width={14}
                        height={14}
                        className={`transition-transform ${openMenu === it.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>
                ) : (
                  <button className={topClass(it)}>
                    {it.label}
                    {it.emoji && <span>{it.emoji}</span>}
                    {hasPanel && (
                      <ChevronDown
                        width={14}
                        height={14}
                        className={`transition-transform ${openMenu === it.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a href={`tel:${tel}`} className="btn-outline">
            <Phone width={16} height={16} />
            {shop.phone}
          </a>
          <Link href="/book" className="btn-accent">
            Book now
          </Link>
        </div>

        {/* Mobile cluster: theme toggle + hamburger */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            className="relative grid h-10 w-10 place-items-center rounded-lg text-ink hover:bg-line/10"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Close width={24} height={24} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu width={24} height={24} />
              </motion.span>
            )}
          </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Desktop hover panel (mega / dropdown) */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            key={activePanel.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute left-0 right-0 top-full hidden border-b border-line/10 bg-bg/95 shadow-lift backdrop-blur-md lg:block"
          >
            <div className="container-px py-8">
              {activePanel.mega && activePanel.columns ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {activePanel.columns.map((col) => {
                    const Icon = ICONS[col.icon] ?? Scissors;
                    return (
                      <div key={col.title}>
                        <div className="flex items-center gap-2 text-accent">
                          <Icon width={18} height={18} />
                          <h3 className="text-sm font-bold uppercase tracking-wide">
                            {col.title}
                          </h3>
                        </div>
                        <ul className="mt-4 space-y-1">
                          {col.items.map((c) => (
                            <li key={c.label}>
                              <Link
                                href={c.href}
                                className="block rounded-lg px-3 py-2 text-sm text-ink/80 transition hover:bg-surface hover:text-accent"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                  {/* CTA card */}
                  <div className="flex flex-col justify-between rounded-2xl border border-accent/20 bg-surface p-5">
                    <div>
                      <p className="font-display text-lg font-bold">Walk-ins welcome</p>
                      <p className="mt-1 text-sm text-muted">
                        Or reserve your chair online in under a minute.
                      </p>
                    </div>
                    <Link href="/book" className="btn-accent mt-4 w-full">
                      Book now
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid max-w-3xl gap-2 sm:grid-cols-2">
                  {activePanel.children?.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      className="group rounded-xl border border-transparent p-4 transition hover:border-line/10 hover:bg-surface"
                    >
                      <div className="flex items-center gap-2 font-semibold">
                        {c.label}
                        {activePanel.highlight && <span>🔥</span>}
                      </div>
                      {c.desc && <p className="mt-1 text-sm text-muted">{c.desc}</p>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 -z-10 bg-black/50 backdrop-blur-sm lg:hidden"
              aria-hidden
            />
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line/10 bg-bg lg:hidden"
            >
              <motion.div
                variants={list}
                initial="hidden"
                animate="show"
                className="container-px flex flex-col divide-y divide-line/10 pb-6"
              >
                {NAV_MENU.map((it) => {
                  const hasPanel = !!(it.mega || it.children);
                  const expanded = mobileSection === it.label;
                  const bigLabel = `font-display text-2xl font-bold uppercase tracking-wide ${
                    it.highlight ? "text-accent2" : "text-ink"
                  }`;
                  return (
                    <motion.div key={it.label} variants={item} className="py-1">
                      {hasPanel ? (
                        <>
                          <button
                            onClick={() => setMobileSection(expanded ? null : it.label)}
                            className="flex w-full items-center justify-between py-4"
                            aria-expanded={expanded}
                          >
                            <span className={bigLabel}>
                              {it.label}
                              {it.emoji && <span className="ml-2">{it.emoji}</span>}
                            </span>
                            <motion.span
                              animate={{ rotate: expanded ? 45 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-muted"
                            >
                              <Plus width={26} height={26} />
                            </motion.span>
                          </button>
                          <AnimatePresence initial={false}>
                            {expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <div className="pb-4">
                                  {it.href && (
                                    <Link
                                      href={it.href}
                                      className="block py-2 text-base font-semibold text-accent"
                                    >
                                      View all {it.label.toLowerCase()} →
                                    </Link>
                                  )}
                                  {it.mega && it.columns
                                    ? it.columns.map((col) => (
                                        <div key={col.title} className="mb-2 mt-3">
                                          <p className="text-xs font-bold uppercase tracking-wide text-accent">
                                            {col.title}
                                          </p>
                                          {col.items.map((c) => (
                                            <Link
                                              key={c.label}
                                              href={c.href}
                                              className="block py-1.5 text-base text-muted hover:text-ink"
                                            >
                                              {c.label}
                                            </Link>
                                          ))}
                                        </div>
                                      ))
                                    : it.children?.map((c) => (
                                        <Link
                                          key={c.label}
                                          href={c.href}
                                          className="block py-2 text-base text-muted hover:text-ink"
                                        >
                                          {c.label}
                                          {c.desc && (
                                            <span className="block text-sm text-muted/70">
                                              {c.desc}
                                            </span>
                                          )}
                                        </Link>
                                      ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link href={it.href ?? "/"} className={`block py-4 ${bigLabel}`}>
                          {it.label}
                          {it.emoji && <span className="ml-2">{it.emoji}</span>}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                <motion.div variants={item} className="flex flex-col gap-2 pt-5">
                  <Link href="/book" className="btn-accent w-full">
                    Book an appointment
                  </Link>
                  <a href={`tel:${tel}`} className="btn-outline w-full">
                    <Phone width={16} height={16} />
                    Call {shop.phone}
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
