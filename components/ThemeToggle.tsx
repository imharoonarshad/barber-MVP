"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "./icons";

type Theme = "light" | "dark";

/** Light/dark switch. The actual <html data-theme> is set pre-paint by the
 *  inline script in layout.tsx (no flash); this just reflects + flips it. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`relative grid h-10 w-10 place-items-center rounded-lg text-muted transition hover:bg-line/10 hover:text-ink ${className}`}
    >
      {/* render nothing theme-specific until mounted to avoid hydration mismatch */}
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22 }}
          >
            {theme === "dark" ? <Sun width={20} height={20} /> : <Moon width={20} height={20} />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
