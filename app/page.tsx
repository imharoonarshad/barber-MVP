import Hero from "@/components/Hero";
import Experience3D from "@/components/Experience3D";
import Features from "@/components/Features";
import Services from "@/components/Services";
import About from "@/components/About";
import Stylists from "@/components/Stylists";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import CutSection from "@/components/CutSection";
import CTABand from "@/components/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience3D />
      <Features />
      <Services variant="preview" />
      <About preview />
      <Stylists preview />
      <Reviews limit={3} preview />
      <Gallery limit={6} preview />
      <CutSection />
      <CTABand />
    </>
  );
}
