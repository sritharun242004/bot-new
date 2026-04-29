import { Hero } from "@/components/Hero";
import { ClientMarquee } from "@/components/ClientMarquee";
import { Stats } from "@/components/Stats";
import { WhatWeDo } from "@/components/WhatWeDo";
import { LogoGrid } from "@/components/Logo Grid";
import { FeaturedWork } from "@/components/FeaturedWork";
import { HowWeWork } from "@/components/HowWeWork";
import { CalEmbed } from "@/components/CalEmbed";
import { CTASection } from "@/components/CTASection";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoGrid />
      <Stats />
      <WhatWeDo />
      <ClientMarquee />
      <FeaturedWork />
      <HowWeWork />
      <CalEmbed />
      <LocationSection />
      <CTASection />
      <Footer />
    </>
  );
}
