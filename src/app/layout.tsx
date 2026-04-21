import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { MenuToggle } from "@/components/MenuToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-outfit",
});

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
    <html lang="en" className={`${manrope.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen font-[family-name:var(--font-manrope)]">
        <LenisProvider>
          {children}
          <ThemeToggle />
          <MenuToggle />
        </LenisProvider>
      </body>
    </html>
  );
}
