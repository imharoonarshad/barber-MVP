import { headers } from "next/headers";
import { cache } from "react";
import type { Shop } from "@/config/types";
import { getShopBySlug, resolveShopFromHost } from "@/config/shops";

/* ----------------------------------------------------------------------------
   getShop() — the active tenant for the current request, for SERVER components
   and pages. Reads the `x-shop-slug` header set by middleware.ts; falls back to
   resolving from the host directly. Wrapped in React cache() so it runs once
   per request no matter how many components call it.
   (Client components use useShop() from components/ShopProvider instead.)
   ---------------------------------------------------------------------------- */
export const getShop = cache((): Shop => {
  const h = headers();
  const slug = h.get("x-shop-slug");
  if (slug) {
    const matched = getShopBySlug(slug);
    if (matched) return matched;
  }
  return resolveShopFromHost(h.get("host"));
});
