import type { Shop, NavMenuItem } from "./types";

/* Simple flat list — used by the footer. Same routes for every shop. */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_COLUMNS: { title: string; icon: string; category: Shop["services"][number]["category"] }[] = [
  { title: "Haircuts", icon: "scissors", category: "Haircuts" },
  { title: "Beard & Shave", icon: "star", category: "Beard & Shave" },
  { title: "Extras", icon: "sparkle", category: "Extras" },
];

/** Build the header mega-menu from a shop's own data, so every tenant gets a
 *  correct menu (service names, review count, city) with no hand-editing. */
export function buildNavMenu(shop: Shop): NavMenuItem[] {
  const columns = SERVICE_COLUMNS.map((c) => ({
    title: c.title,
    icon: c.icon,
    items: shop.services
      .filter((s) => s.category === c.category)
      .slice(0, 4)
      .map((s) => ({ label: s.name, href: "/services" })),
  })).filter((col) => col.items.length > 0);

  return [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", mega: true, columns },
    {
      label: "About",
      href: "/about",
      children: [
        { label: "Our Story", href: "/about", desc: `In ${shop.city} since ${shop.established}` },
        { label: "Our Barbers", href: "/team", desc: "Meet the team" },
        { label: "Reviews", href: "/reviews", desc: `${shop.rating}★ from ${shop.reviewCount} clients` },
      ],
    },
    { label: "Gallery", href: "/gallery" },
    {
      label: "Deals",
      emoji: "🔥",
      highlight: true,
      href: "/book",
      children: [
        { label: "New Client — 20% Off", href: "/book", desc: "Your first visit special" },
        { label: "Senior Tuesdays", href: "/book", desc: "Discounted cuts every Tuesday" },
        { label: "Kids Combo", href: "/book", desc: "Cut + cleanup for under-12s" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ];
}
