/* ============================================================================
   SHARED TYPES — the shape of one barber-shop tenant.
   Every shop in config/shops/*.ts is a `Shop`. Components read the active shop
   via getShop() (server) or useShop() (client) — never a hard-coded import.
   ============================================================================ */

export type Service = {
  name: string;
  price: string;
  duration: string;
  description: string;
  category: "Haircuts" | "Beard & Shave" | "Extras";
  popular?: boolean;
};

export type Stylist = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  experience: string;
  specialties: string[];
  rating: number;
  availableToday: boolean;
  daysOff: number[]; // 0=Sun … 6=Sat
};

export type Review = {
  name: string;
  rating: number;
  date: string;
  text: string;
  service?: string;
};

export type DayHours = { day: string; open: string | null; close: string | null };
export type Feature = { icon: string; title: string; body: string };
export type Value = { title: string; body: string };
export type Milestone = { year: string; title: string; body: string };
export type Faq = { q: string; a: string };
export type Step = { title: string; body: string };
export type Stat = { value: string; label: string };

/* ----------------------------------------------------------------------------
   THEME — per-shop colour palette. Values are "R G B" channels (space separated,
   no commas) so Tailwind's opacity modifiers work. These get injected as CSS
   variables at request time, overriding the defaults in app/globals.css.
   ---------------------------------------------------------------------------- */
export type Palette = {
  bg: string;
  surface: string;
  surface2: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  accentInk: string;
  accent2: string;
  accent2Ink: string;
  poleBlue: string;
  success: string;
  danger: string;
};

export type Theme = { dark: Palette; light: Palette };

/* The agency pitch banner shown on un-sold demos. */
export type Pitch = {
  show: boolean;
  message: string;
  ctaLabel: string;
  ctaEmail: string;
};

export type Shop = {
  // ---- Tenant routing ----
  slug: string; // used for <slug>.yourbarbers.com and ?shop=<slug>
  domains: string[]; // custom domains that map to this shop (lowercase, no port)

  // ---- Identity ----
  name: string;
  shortName: string;
  tagline: string;
  established: string;
  logoText: string;

  // ---- Contact ----
  phone: string;
  email: string;
  address: string;
  city: string;
  mapsUrl: string;
  social: { instagram: string; facebook: string; tiktok: string };

  // ---- Social proof ----
  rating: number;
  reviewCount: number;

  // ---- Content ----
  hero: { image: string; headline: string; sub: string };
  features: Feature[];
  about: { heading: string; body: string[]; image: string; stats: Stat[] };
  values: Value[];
  milestones: Milestone[];
  services: Service[];
  bookingSteps: Step[];
  stylists: Stylist[];
  gallery: string[];
  reviews: Review[];
  faqs: Faq[];
  hours: DayHours[];

  // ---- Branding & pitch ----
  theme: Theme;
  pitch: Pitch;
};

/* ----------------------------------------------------------------------------
   HEADER MENU types (the menu itself is generated per-shop in config/nav.ts).
   ---------------------------------------------------------------------------- */
export type MegaColumn = {
  title: string;
  icon: string;
  items: { label: string; href: string }[];
};
export type DropdownChild = { label: string; href: string; desc?: string };
export type NavMenuItem = {
  label: string;
  href?: string;
  emoji?: string;
  highlight?: boolean;
  mega?: boolean;
  columns?: MegaColumn[];
  children?: DropdownChild[];
};
