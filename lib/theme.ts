import type { Palette, Theme } from "@/config/types";

/* Map palette keys → CSS variable names used throughout globals.css / Tailwind. */
const VAR_MAP: [keyof Palette, string][] = [
  ["bg", "--bg"],
  ["surface", "--surface"],
  ["surface2", "--surface-2"],
  ["ink", "--ink"],
  ["muted", "--muted"],
  ["line", "--line"],
  ["accent", "--accent"],
  ["accentInk", "--accent-ink"],
  ["accent2", "--accent-2"],
  ["accent2Ink", "--accent-2-ink"],
  ["poleBlue", "--pole-blue"],
  ["success", "--success"],
  ["danger", "--danger"],
];

function paletteVars(p: Palette): string {
  return VAR_MAP.map(([key, cssVar]) => `${cssVar}:${p[key]}`).join(";");
}

/** Build the per-shop CSS that overrides the default palette in globals.css.
 *  Emits both the dark (default) and light (data-theme="light") blocks so the
 *  nav theme toggle keeps working. */
export function themeCss(theme: Theme): string {
  return (
    `:root{${paletteVars(theme.dark)}}` +
    `:root[data-theme="light"]{${paletteVars(theme.light)}}`
  );
}

/** "245 182 28" → "rgb(245,182,28)" — for the inline SVG favicon. */
export function rgbChannels(channels: string): string {
  return `rgb(${channels.trim().split(/\s+/).join(",")})`;
}
