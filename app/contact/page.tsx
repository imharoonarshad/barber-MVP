import type { Metadata } from "next";
import { getShop } from "@/lib/shop";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import LocationHours from "@/components/LocationHours";

export function generateMetadata(): Metadata {
  const shop = getShop();
  return {
    title: `Contact & Location — ${shop.name}`,
    description: `Find ${shop.name} at ${shop.address}. Call ${shop.phone} or send us a message.`,
  };
}

export default function ContactPage() {
  const shop = getShop();
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact & location"
        subtitle={`Drop by ${shop.address}, give us a call, or send a message — we'll get right back to you.`}
      />
      <Contact />
      <LocationHours />
    </>
  );
}
