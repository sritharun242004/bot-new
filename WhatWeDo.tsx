"use client";

import { RevealText } from "./RevealText";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";

const logos = [
  { src: "/logos/become.webp", alt: "Become", invert: true },
  { src: "/logos/mentor-cloud.png", alt: "Mentor Cloud", split: 24, invertRight: true, className: "h-10 md:h-12", width: 180, height: 60 },
  { src: "/logos/icemail-alt.png", alt: "Icemail", split: 28, invertRight: true },
  { src: "/logos/belsterns.png", alt: "Belsterns", invert: true },
  { src: "/logos/printrove.webp", alt: "Printrove", invert: true },
  { src: "/logos/happy-cars.png", alt: "Happy Cars", invert: true },
  { src: "/logos/spi-edge.png", alt: "SPI Edge", invert: true, width: 180, height: 60, className: "h-10 md:h-12" },
  { src: "/logos/inai-logo.png", alt: "Inai Logo", invert: true, width: 180, height: 60, className: "h-10 md:h-12" },
  { src: "/logos/keenstack.png", alt: "Keenstack", split: 52, invertLeftCustom: true, width: 180, height: 60, className: "h-10 md:h-12" },
  { src: "/logos/maa-ilay.png", alt: "Maa Ilay", width: 180, height: 60, className: "h-10 md:h-12" },
  { src: "/logos/mathewarts.png", alt: "Mathew Arts", invert: true, width: 180, height: 60, className: "h-10 md:h-12" },
  { src: "/logos/BJP Logo.png", alt: "BJP Logo", width: 180, height: 60, className: "h-10 md:h-12" },
];

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

  const renderLogo = (logo: any) => {
    const width = logo.width || 120;
    const height = logo.height || 45;

    if (logo.split) {
      return (
        <div
          key={logo.src}
          className="relative flex items-center justify-center transition-all duration-300"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {/* Left Part */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              clipPath: `inset(0 ${100 - logo.split}% 0 0)`,
              filter: logo.invertLeftCustom
                ? "invert(calc(1 - var(--logo-invert, 0)))"
                : logo.invertLeft ? "invert(var(--logo-invert, 0))" : "none"
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={width}
              height={height}
              unoptimized
              className={`${logo.className ?? "h-8 md:h-9"} w-auto object-contain transition-transform duration-300`}
            />
          </div>
          {/* Right Part */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              clipPath: `inset(0 0 0 ${logo.split}%)`,
              filter: logo.invertRightCustom
                ? "invert(calc(1 - var(--logo-invert, 0)))"
                : logo.invertRight ? "invert(var(--logo-invert, 0))" : "none"
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={width}
              height={height}
              unoptimized
              className={`${logo.className ?? "h-8 md:h-9"} w-auto object-contain transition-transform duration-300`}
            />
          </div>
        </div>
      );
    }

    return (
      <div
        key={logo.src}
        className="flex items-center justify-center"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          width={width}
          height={height}
          unoptimized
          className={`${logo.className ?? "h-9"} w-auto object-contain transition-all duration-300`}
          style={{
            filter: logo.invert ? "invert(var(--logo-invert, 0))" : "none"
          }}
        />
      </div>
    );
  };

  return (
    <section className="bg-base-100 px-6 min-h-screen flex flex-col justify-center transition-colors duration-300 py-20">
      <div className="mx-auto max-w-[88rem] text-left">
        {/* Logo Grid - Surgical Theme Adaptation */}
        <div className="mb-40 grid grid-cols-2 md:grid-cols-6 justify-items-center gap-x-12 gap-y-16 mx-auto max-w-6xl">
          {logos.map(renderLogo)}
        </div>

        <RevealText
          text="<span style='display:inline-block; width: 12vw;'></span><span class='text-base-300'>We build bots that think — not just respond. <span class='text-base-500'>Strategy</span> that finds real opportunities. <span class='text-base-500'>Implementation</span> that ships. <span class='text-base-500'>Partnership</span> that scales.</span>"
          as="h2"
          className="text-[clamp(1.6rem,7.5vw,8.5rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-justify"
        />

        {/* Sub-section matching Image 7 style */}
        <div ref={ref} className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
          <div className="max-w-md">
            <p className="reveal-up text-lg font-medium text-base-500 opacity-60 mb-8">
              What we build
            </p>
            <p className="reveal-up text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-[1.3] text-base-500" data-delay="1">
              From AI agents and workflow automation to full-stack products —
              we cover the whole path.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 items-start">
            {services.map((service, i) => (
              <span
                key={service}
                className="reveal-up rounded-full border border-base-500/10 px-10 py-7 text-[clamp(1.2rem,2.2vw,2.2rem)] font-medium tracking-tight text-base-500 text-center flex items-center justify-center hover:bg-base-500 hover:text-base-100 transition-colors duration-300 cursor-pointer"
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
