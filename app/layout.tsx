import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getShop } from "@/lib/shop";
import { themeCss, rgbChannels } from "@/lib/theme";
import { ShopProvider } from "@/components/ShopProvider";
import PitchBanner from "@/components/PitchBanner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCallBar from "@/components/StickyCallBar";

export function generateMetadata(): Metadata {
  const shop = getShop();
  const title = `${shop.name} — ${shop.city} Barbershop`;
  return {
    title,
    description: shop.tagline,
    openGraph: {
      title,
      description: shop.tagline,
      images: [shop.hero.image],
      type: "website",
    },
    icons: {
      // Inline SVG favicon with the shop's brand mark — no asset file needed.
      icon: `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="${rgbChannels(
          shop.theme.dark.accent,
        )}"/><text x="16" y="22" font-family="Georgia,serif" font-size="12" font-weight="bold" text-anchor="middle" fill="${rgbChannels(
          shop.theme.dark.accentInk,
        )}">${shop.logoText}</text></svg>`,
      )}`,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0e0e10",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const shop = getShop();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Per-shop colour palette — overrides the defaults in globals.css. */}
        <style dangerouslySetInnerHTML={{ __html: themeCss(shop.theme) }} />
        {/* Set the saved theme before paint so there's no flash. Defaults to dark. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
        {/* Fonts via <link> (not next/font) so the build never hard-fails
            offline — falls back to Georgia/system if Google Fonts is blocked. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ShopProvider shop={shop}>
          <div className="barber-stripe" aria-hidden />
          <PitchBanner />
          <Nav />
          <main>{children}</main>
          <Footer />
          <StickyCallBar />
        </ShopProvider>
      </body>
    </html>
  );
}
