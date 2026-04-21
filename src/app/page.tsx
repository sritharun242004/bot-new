import { Hero } from "@/components/Hero";
import { ClientMarquee } from "@/components/ClientMarquee";
import { Stats } from "@/components/Stats";
import { WhatWeDo } from "@/components/WhatWeDo";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Process } from "@/components/Process";
import { CalEmbed } from "@/components/CalEmbed";
import { CTASection } from "@/components/CTASection";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <Stats />
      <WhatWeDo />
      <FeaturedWork />
      <Process />
      <CalEmbed />
      <LocationSection />
      <CTASection />
      <Footer />
    </>
  );
}
