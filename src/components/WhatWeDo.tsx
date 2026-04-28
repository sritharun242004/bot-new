"use client";

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

export function WhatWeDo() {
  const ref = useReveal();

  return (
    <section className="bg-base-500 px-6 min-h-screen flex flex-col justify-center transition-colors duration-300 py-20">
      <div className="mx-auto max-w-none text-left">
        <h2 className="text-[clamp(2.2rem,7vw,7rem)] font-medium leading-[1.15] tracking-[-2px] text-left text-base-100">
          We build bots that think — not just respond. Strategy that finds real opportunities. Implementation that ships. Partnership that scales.
        </h2>

        {/* Sub-section matching Image 7 style */}
        <div ref={ref} className="mt-16 md:mt-40 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-left">
          <div className="max-w-md">
            <p className="reveal-up text-lg font-medium text-base-100 opacity-60 mb-8">
              What we build
            </p>
            <p className="reveal-up text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-[1.3] text-base-100" data-delay="1">
              From AI agents and workflow automation to full-stack products —
              we cover the whole path.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 items-start">
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
