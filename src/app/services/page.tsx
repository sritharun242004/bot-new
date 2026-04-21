import { Footer } from "@/components/Footer";
import { ServicesContent } from "./ServicesContent";

export const metadata = {
  title: "Services | The Bot Company",
  description: "From AI-curious to AI-powered. AI agents, automation, web apps, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesContent />
      <Footer />
    </>
  );
}
