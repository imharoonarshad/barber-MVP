import type { Metadata } from "next";
import { getShop } from "@/lib/shop";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Faq from "@/components/Faq";
import CTABand from "@/components/CTABand";

export function generateMetadata(): Metadata {
  const shop = getShop();
  return {
    title: `Services & Pricing — ${shop.name}`,
    description: `Haircuts, fades, beard trims, hot-towel shaves and more at ${shop.name}, ${shop.city}.`,
  };
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & pricing"
        title="Cuts, shaves & everything between"
        subtitle="A full menu of classic and modern grooming — every service finished with a hot towel and a sharp lineup."
      />
      <Services variant="full" />
      <Features />
      <Faq />
      <CTABand
        title="Found your service?"
        subtitle="Book it in under a minute and pick the barber you want."
      />
    </>
  );
}
