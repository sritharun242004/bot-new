import { Footer } from "@/components/Footer";
import { AboutContent } from "./AboutContent";

export const metadata = {
  title: "About | The Bot Company",
  description: "We build bots that think and systems that scale. Learn about our AI-first approach.",
};

export default function AboutPage() {
  return (
    <>
      <AboutContent />
      <Footer />
    </>
  );
}
