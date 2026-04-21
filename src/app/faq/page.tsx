import { Footer } from "@/components/Footer";
import { FAQContent } from "./FAQContent";

export const metadata = {
  title: "FAQ | The Bot Company",
  description: "Frequently asked questions about our AI services, timelines, and approach.",
};

export default function FAQPage() {
  return (
    <>
      <FAQContent />
      <Footer />
    </>
  );
}
