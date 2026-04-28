"use client";

import { RevealText } from "./RevealText";
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

const extraServices = ["Document AI", "Voice Bots", "Data Pipelines", "Analytics"];

export function WhatWeDo() {
  const ref = useReveal();

  return (
    <section className="bg-base-500 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <RevealText
          text={
            "We build bots that think —\nnot just respond. Strategy that\nfinds real opportunities.\nImplementation that ships.\nPartnership that scales."
          }
          as="h2"
          className="text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.15] tracking-[-2.4px] text-base-100"
        />

        <div ref={ref} className="mt-20 flex flex-col gap-6 md:flex-row md:items-start md:gap-16">
          <div className="md:w-1/3">
            <p className="reveal-up text-base font-medium text-base-100">
              What we build
            </p>
            <p className="reveal-up mt-4 text-base font-medium leading-relaxed text-base-200" data-delay="1">
              From AI agents and workflow automation to full-stack products —
              we cover the whole path.
            </p>
          </div>

          <div className="flex flex-wrap justify-end gap-3 md:w-2/3">
            {services.map((service, i) => (
              <span
                key={service}
                className="reveal-up group relative cursor-default overflow-hidden rounded-full border border-base-400 px-8 py-4 text-[clamp(1.2rem,2.5vw,2.5rem)] font-medium text-base-100 transition-all duration-500"
                data-delay={Math.min(i, 4)}
              >
                <span className="absolute inset-0 -translate-x-full rounded-full bg-base-100 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-base-500">
                  {service}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Auto-scrolling marquee of extra services */}
        <div className="mt-10 overflow-hidden">
          <div className="flex w-max gap-3 animate-marquee-slow">
            {[...extraServices, ...extraServices].map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="rounded-full border border-base-400 px-6 py-2 text-base font-medium text-base-100 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
