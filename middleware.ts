import { NextRequest, NextResponse } from "next/server";
import { matchHost, DEFAULT_SLUG } from "@/config/shops";

/* ----------------------------------------------------------------------------
   Resolves the active tenant for every request and passes it to the app via
   the `x-shop-slug` request header.

   Priority:
     1. ?shop=<slug>  — explicit override (dev/preview); persisted in a cookie
     2. host match    — real subdomain / custom domain (wins over a stale cookie)
     3. cookie        — sticky dev override from a previous ?shop=
     4. default       — apex domain / Vercel preview URLs
   ---------------------------------------------------------------------------- */
export function middleware(req: NextRequest) {
  const queryOverride = req.nextUrl.searchParams.get("shop");
  const hostShop = matchHost(req.headers.get("host"));
  const cookieSlug = req.cookies.get("shop")?.value;

  const slug =
    queryOverride || hostShop?.slug || cookieSlug || DEFAULT_SLUG;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-shop-slug", slug);

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  if (queryOverride) {
    res.cookies.set("shop", queryOverride, { path: "/", sameSite: "lax" });
  }
  return res;
}

export const config = {
  // Run on pages, not on static assets / Next internals.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
