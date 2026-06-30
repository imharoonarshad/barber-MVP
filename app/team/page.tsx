import type { Metadata } from "next";
import { getShop } from "@/lib/shop";
import PageHero from "@/components/PageHero";
import Stylists from "@/components/Stylists";
import Values from "@/components/Values";
import CTABand from "@/components/CTABand";

export function generateMetadata(): Metadata {
  const shop = getShop();
  return {
    title: `Our Barbers — ${shop.name}`,
    description: `Meet the master barbers at ${shop.name}, ${shop.city}. Book with the barber that fits your style.`,
  };
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="The team"
        title="Meet your barbers"
        subtitle="Every chair is run by a licensed pro with years of craft behind it. Get to know the crew, then book your favourite."
      />
      <Stylists withHeading={false} />
      <Values />
      <CTABand
        title="Book with your barber"
        subtitle="Choose your barber and a time that works — we'll handle the rest."
      />
    </>
  );
}
