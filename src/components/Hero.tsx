"use client";

import { CTAButton } from "./CTAButton";
import { useEffect, useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = setTimeout(() => {
      el.querySelectorAll(".line-inner, .reveal-up").forEach((t) => {
        t.classList.add("revealed");
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-base-500 px-6">
      <div ref={ref} className="flex flex-col items-center gap-5 md:gap-8 text-center">
        <h1 className="text-[clamp(3.2rem,10vw,8rem)] font-normal leading-[1.05] tracking-[-3px] md:tracking-[-4px] text-base-100">
          <span className="block line-mask">
            <span className="block line-inner" data-delay="0">
              <span className="font-bold">Bots</span> <span className="font-normal">that think.</span>
            </span>
          </span>
          <span className="block line-mask">
            <span className="block line-inner" data-delay="1">
              <span className="font-bold text-base-350">Systems</span> <span className="font-normal">that scale.</span>
            </span>
          </span>
        </h1>
        <div className="reveal-up w-full max-w-2xl" data-delay="2">
          <p className="text-center text-lg md:text-xl font-medium leading-relaxed text-base-200">
            We build AI agents, automation systems, and intelligent software that actually works for your business. No hype. No bloated projects. Just practical AI that saves time and money.
          </p>
        </div>
        <div className="reveal-up" data-delay="3">
          <CTAButton href="/contact" label="Let's talk" />
        </div>
      </div>
    </section>
  );
}
