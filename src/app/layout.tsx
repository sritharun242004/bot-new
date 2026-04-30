import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { MenuToggle } from "@/components/MenuToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PageTransition } from "@/components/PageTransition";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "The Bot Company | AI-Powered Bots & Automation Systems",
  description:
    "We build bots that think and systems that scale. AI agents, automation, web apps, and more — tailored for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased dark">
      <body className="min-h-screen font-[family-name:var(--font-manrope)]">
        <LenisProvider>
          <PageTransition>
            {children}
          </PageTransition>
          <CustomCursor />
          <ThemeToggle />
          <MenuToggle />
        </LenisProvider>
      </body>
    </html>
  );
}
