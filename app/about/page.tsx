import type { Metadata } from "next";
import { shop } from "@/config/shop";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Milestones from "@/components/Milestones";
import Values from "@/components/Values";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: `About — ${shop.name}`,
  description: `The story behind ${shop.name}, ${shop.city}. ${shop.tagline}`,
};

export default function AboutPage() {
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
