import type { Metadata } from "next";
import { shop } from "@/config/shop";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: `Gallery — ${shop.name}`,
  description: `Step inside ${shop.name} and see the cuts, fades and finishes our barbers are known for.`,
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="The work"
        title="Inside the shop"
        subtitle="Real cuts, real finishes, real atmosphere. Here's a look at what to expect when you pull up a chair."
      />
      <Gallery withHeading={false} />
      <CTABand
        title="Like what you see?"
        subtitle="Book your spot and let our barbers do their thing."
      />
    </>
  );
}
