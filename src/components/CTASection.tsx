"use client";

import { RevealText } from "./RevealText";
import { CTAButton } from "./CTAButton";
import { useReveal } from "@/hooks/useReveal";

export function CTASection() {
  const ref = useReveal();

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-base-500 p-4">
      <div className="relative flex h-[calc(100vh-2rem)] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-base-450">
        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="whitespace-nowrap text-[20vw] font-bold uppercase tracking-tight text-base-100">
            BOTS
          </span>
        </div>

        <div ref={ref} className="relative z-10 flex flex-col items-center gap-6 text-center px-6">
          <RevealText
            text="The Bot Company"
            as="h1"
            className="text-[clamp(2.8rem,8vw,6rem)] font-medium tracking-[-2px] md:tracking-[-4px] text-base-100"
          />
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <div className="line-mask">
              <h3 className="line-inner text-[clamp(2rem,8vw,8rem)] font-black tracking-[-2px] md:tracking-[-4px] leading-none text-base-100 text-center">
                Your AI partner
              </h3>
            </div>
            <p className="reveal-up text-[clamp(1.2rem,2.5vw,2rem)] font-medium leading-relaxed text-base-250 text-center md:text-right">
              Tell us what&apos;s slowing your team down. We&apos;ll automate the boring
              and build the bold.
            </p>
          </div>
          <div className="reveal-up" data-delay="1">
            <CTAButton href="/contact" label="Let's talk" />
          </div>
        </div>
      </div>
    </section>
  );
}
