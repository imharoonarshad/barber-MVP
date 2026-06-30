import type { Metadata } from "next";
import { getShop } from "@/lib/shop";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Milestones from "@/components/Milestones";
import Values from "@/components/Values";
import CTABand from "@/components/CTABand";

export function generateMetadata(): Metadata {
  const shop = getShop();
  return {
    title: `About — ${shop.name}`,
    description: `The story behind ${shop.name}, ${shop.city}. ${shop.tagline}`,
  };
}

export default function AboutPage() {
  const shop = getShop();
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={`About ${shop.shortName}`}
        subtitle={`${shop.tagline}`}
        image={shop.about.image}
      />
      <About withHeading={false} />
      <Milestones />
      <Values />
      <CTABand
        title="Come see the difference"
        subtitle="Pull up a chair and find out why the neighborhood keeps coming back."
      />
    </>
  );
}
