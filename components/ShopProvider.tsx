"use client";

import { createContext, useContext } from "react";
import type { Shop } from "@/config/types";

const ShopContext = createContext<Shop | null>(null);

/** Provides the active tenant to all client components. Mounted once in the
 *  root layout with the server-resolved shop. */
export function ShopProvider({
  shop,
  children,
}: {
  shop: Shop;
  children: React.ReactNode;
}) {
  return <ShopContext.Provider value={shop}>{children}</ShopContext.Provider>;
}

/** Read the active tenant inside a client component. */
export function useShop(): Shop {
  const shop = useContext(ShopContext);
  if (!shop) {
    throw new Error("useShop() must be used inside <ShopProvider>");
  }
  return shop;
}
