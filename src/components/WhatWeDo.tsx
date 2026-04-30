"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const services = [
  "AI Agents",
  "Web Apps",
  "Automation",
  "Custom GPT",
  "CRM Systems",
  "Internal Tools",
  "Mobile Apps",
  "SaaS Products",
];

const words: { word: string; accent?: boolean }[] = [
  { word: "We" }, { word: "build" }, { word: "bots" }, { word: "that" },
  { word: "think" }, { word: "not" }, { word: "just" }, { word: "respond." },
  { word: "Strategy", accent: true }, { word: "that" }, { word: "finds" },
  { word: "real" }, { word: "opportunities." },
  { word: "Implementation", accent: true }, { word: "that" }, { word: "ships." },
  { word: "Partnership", accent: true }, { word: "that" }, { word: "scales." },
];

export function WhatWeDo() {
  const ref = useReveal();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const progress = (window.scrollY - sectionTop + windowHeight * 0.6) / (sectionHeight * 0.4);
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-base-500 px-6 min-h-screen flex flex-col justify-center transition-colors duration-300 py-20"
    >
      <div className="mx-auto max-w-none text-left">
        <h2 className="text-[clamp(2rem,7vw,8.5rem)] font-medium leading-[1.1] tracking-[-1px] text-left indent-[1em] md:indent-[3em] max-w-none">
          {words.map((item, i) => (
            <span
              key={i}
              style={{
                color:
                  scrollProgress > i / words.length
                    ? item.accent ? "var(--base-300)" : "var(--base-100)"
                    : "var(--base-400)",
                transition: "color 0.3s ease",
              }}
            >
              {item.word}{" "}
            </span>
          ))}
        </h2>

        <div ref={ref} className="mt-28 md:mt-40 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-left">
          <div>
            <p className="reveal-up text-lg font-medium text-base-100 opacity-60 mb-8">
              What we build
            </p>
            <p className="reveal-up text-[clamp(1rem,3.5vw,3.2rem)] font-medium leading-[1.3] text-base-100" data-delay="1">
              From AI agents and workflow automation to full-stack products
              we cover the whole path.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-5 items-start">
            {services.map((service, i) => (
              <span
                key={service}
                className="reveal-up rounded-full border border-base-100/10 px-6 py-4 md:px-10 md:py-7 text-[clamp(1rem,2.2vw,2.2rem)] font-medium tracking-tight text-base-100 text-center flex items-center justify-center hover:bg-base-100 hover:text-base-500 transition-colors duration-300 cursor-pointer"
                data-delay={Math.min(i, 4)}
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
