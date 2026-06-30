import Link from "next/link";
import { NAV_LINKS } from "@/config/shop";
import { getShop } from "@/lib/shop";
import { Instagram, Facebook, Phone, Pin } from "./icons";

export default function Footer() {
  const shop = getShop();
  const tel = shop.phone.replace(/[^\d+]/g, "");
  return (
    <footer className="border-t border-line/10 bg-surface">
      <div className="container-px pt-16 pb-[calc(8rem+env(safe-area-inset-bottom))] lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent font-display text-sm font-extrabold text-accent-ink shadow-sm">
                {shop.logoText}
              </span>
              <span className="text-lg font-bold">{shop.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {shop.tagline}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={shop.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-line/15 text-muted transition hover:border-accent/50 hover:text-accent"
              >
                <Instagram width={18} height={18} />
              </a>
              <a
                href={shop.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-line/15 text-muted transition hover:border-accent/50 hover:text-accent"
              >
                <Facebook width={18} height={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[...NAV_LINKS.filter((l) => l.href !== "/"), { href: "/book", label: "Book online" }].map(
                (l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink/80 transition hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              <li className="flex items-start gap-2">
                <Pin width={16} height={16} className="mt-0.5 text-accent" />
                <a href={shop.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-accent">
                  {shop.address}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone width={16} height={16} className="text-accent" />
                <a href={`tel:${tel}`} className="hover:text-accent">
                  {shop.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/10 pt-6 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            © {shop.established}–present {shop.name}. All rights reserved.
          </p>
          {shop.pitch.show ? (
            <p>
              Want this as your real website?{" "}
              <a
                href={`mailto:${shop.pitch.ctaEmail}?subject=${encodeURIComponent(
                  "I want my barbershop website",
                )}`}
                className="font-semibold text-accent hover:underline"
              >
                Let's talk →
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
