"use client";

import { useReveal } from "@/hooks/useReveal";
import { RevealText } from "./RevealText";
import { useEffect, useState } from "react";

const MOGAPPAIR_MARKER_POSITION = {
  // Adjusted so the marker appears properly inside the Chennai map
  left: "36%",
  top: "39%", // corrected closer to actual Mogappair position on Chennai map
};

export function LocationSection() {
  const ref = useReveal();
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === "undefined") return true;

    const bg = getComputedStyle(document.documentElement)
      .getPropertyValue("--base-500")
      .trim();

    return bg !== "#FFFFFF";
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.documentElement)
        .getPropertyValue("--base-500")
        .trim();
      setIsDark(bg !== "#FFFFFF");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-base-500">
      <div ref={ref} className="mx-auto max-w-[1400px]">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* Left — Chennai map SVG (bigger) */}
          <div className="relative w-full lg:w-[60%] min-h-[280px] md:min-h-[500px] lg:min-h-[700px]">
            {/* Dark theme map (white lines) */}
            <img
              src="/chennai-dark.svg"
              alt="Chennai street map"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              style={{
                opacity: isDark ? 0.7 : 0,
              }}
            />

            {/* Light theme map (black lines) */}
            <img
              src="/chennai-light.svg"
              alt="Chennai street map"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              style={{
                opacity: isDark ? 0 : 0.8,
              }}
            />

            {/* Mogappair pin */}
            <div
              className="absolute z-10"
              style={MOGAPPAIR_MARKER_POSITION}
            >
              <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-base-100/20" />
              <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-base-100/30" />
              <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-base-100 shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-base-500" />
              </span>
              <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm md:text-lg font-extrabold text-base-100">
                Mogappair
              </span>
            </div>
          </div>

          {/* Right — text */}
          <div className="flex flex-col justify-center px-5 py-10 md:px-8 md:py-16 lg:px-14 lg:w-[40%] lg:py-24">
            <RevealText
              lines={[
                <span className="text-base-350">Based in</span>,
                <>
                  <span className="text-base-350">Chenn</span>AI<span className="text-base-350">, India</span>
                </>
              ]}
              as="h2"
              className="text-[clamp(2.5rem,5vw,4rem)] font-[550] leading-[1.1] tracking-[-2.4px] text-base-100"
            />

            <p className="reveal-up mt-6 max-w-sm text-base font-medium leading-relaxed text-base-250">
              Building bots and systems from the heart of South India.
              Working with teams worldwide, shipping from Mogappair.
            </p>

            <div
              className="reveal-up mt-8 flex items-center gap-3"
              data-delay="1"
            >
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-base-100/40" />
                <span className="relative h-2 w-2 rounded-full bg-base-100" />
              </span>
              <span className="text-sm font-medium uppercase tracking-wider text-base-350">
                Available worldwide
              </span>
            </div>

            <p
              className="reveal-up mt-12 text-sm font-medium uppercase tracking-wider text-base-350"
              data-delay="2"
            >
              Chennai
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
