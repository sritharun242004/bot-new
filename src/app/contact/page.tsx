import { Footer } from "@/components/Footer";
import { ContactContent } from "./ContactContent";

export const metadata = {
  title: "Contact | The Bot Company",
  description: "Let's figure out your AI opportunity. Tell us what's slowing your team down.",
};

export default function ContactPage() {
  return (
    <>
      <ContactContent />
      <Footer />
    </>
  );
}
