import type { Shop } from "../types";
import { andersonLane } from "./anderson-lane";
import { firstPlace } from "./1st-place";

/* ============================================================================
   TENANT REGISTRY
   Add a new barber shop by importing its config and dropping it in SHOPS.
   Each shop is reachable at:
     • <slug>.yourbarbers.com           (subdomain)
     • any custom domain in shop.domains
     • <slug>.localhost:3000            (local dev)
     • ?shop=<slug>                     (local dev / preview override)
   ============================================================================ */
export const SHOPS: Shop[] = [andersonLane, firstPlace];

/** Fallback when a host doesn't match any tenant (e.g. the bare apex domain
 *  or a Vercel preview URL). */
export const DEFAULT_SLUG = "anderson-lane";

const bySlug = new Map(SHOPS.map((s) => [s.slug, s]));
const byDomain = new Map<string, Shop>();
for (const s of SHOPS) for (const d of s.domains) byDomain.set(d.toLowerCase(), s);

export function getShopBySlug(slug: string): Shop | null {
  return bySlug.get(slug) ?? null;
}

export function defaultShop(): Shop {
  return bySlug.get(DEFAULT_SLUG)!;
}

/** Match a request host to a tenant, or null if none matches.
 *  Order: exact custom domain → first subdomain label as slug. */
export function matchHost(host?: string | null): Shop | null {
  if (!host) return null;
  const hostname = host.toLowerCase().split(":")[0]; // strip port

  if (byDomain.has(hostname)) return byDomain.get(hostname)!;

  const firstLabel = hostname.split(".")[0];
  if (bySlug.has(firstLabel)) return bySlug.get(firstLabel)!;

  return null;
}

/** Like matchHost but always returns a shop (falls back to the default). */
export function resolveShopFromHost(host?: string | null): Shop {
  return matchHost(host) ?? defaultShop();
}
