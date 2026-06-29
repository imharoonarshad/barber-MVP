import type { Config } from "tailwindcss";

/**
 * DESIGN SYSTEM — all colours are driven by CSS variables defined in
 * app/globals.css (the `:root` block).  To re-theme the whole site for a new
 * barber shop you only touch TWO places:
 *   1. app/globals.css  -> the colour variables (pull these from the shop logo)
 *   2. config/shop.ts    -> the shop's content (name, services, photos, etc.)
 *
 * Every component below uses these semantic names (bg / surface / ink / accent…)
 * so nothing hard-codes a colour.  Swap the variables, the whole site re-skins.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)", // page background
        surface: "rgb(var(--surface) / <alpha-value>)", // cards / sections
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)", // raised elements
        ink: "rgb(var(--ink) / <alpha-value>)", // primary text
        muted: "rgb(var(--muted) / <alpha-value>)", // secondary text
        line: "rgb(var(--line) / <alpha-value>)", // borders (used at low opacity)
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)", // signboard yellow — primary
          ink: "rgb(var(--accent-ink) / <alpha-value>)", // text ON yellow
        },
        accent2: {
          DEFAULT: "rgb(var(--accent-2) / <alpha-value>)", // barber red — secondary
          ink: "rgb(var(--accent-2-ink) / <alpha-value>)", // text ON red
        },
        "pole-blue": "rgb(var(--pole-blue) / <alpha-value>)", // barber-pole blue
        success: "rgb(var(--success) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgb(0 0 0 / 0.45)",
        lift: "0 24px 60px -20px rgb(0 0 0 / 0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.8s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
