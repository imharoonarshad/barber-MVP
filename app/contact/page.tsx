import type { Metadata } from "next";
import { shop } from "@/config/shop";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import LocationHours from "@/components/LocationHours";

export const metadata: Metadata = {
  title: `Contact & Location — ${shop.name}`,
  description: `Find ${shop.name} at ${shop.address}. Call ${shop.phone} or send us a message.`,
};

export default function ContactPage() {
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
