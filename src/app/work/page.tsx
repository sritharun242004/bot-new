import { Footer } from "@/components/Footer";
import { WorkContent } from "./WorkContent";

export const metadata = {
  title: "Work | The Bot Company",
  description: "AI implementations that work. See how we help businesses put AI to work.",
};

export default function WorkPage() {
  return (
    <>
      <WorkContent />
      <Footer />
    </>
  );
}
