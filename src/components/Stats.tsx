"use client";

import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "20+", label: "Clients served" },
  { value: "100%", label: "AI-powered solutions" },
  { value: "6", label: "Phase build loop" },
  { value: "<2wk", label: "To first deployment" },
];

export function Stats() {
  const ref = useReveal();

  return (
    <section ref={ref} className="border-y border-base-400/30 bg-base-500 px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center">
            <div className="line-mask">
              <h2
                className="line-inner text-[clamp(2rem,5vw,3.5rem)] font-[550] tracking-[-2.4px] text-base-200"
                data-delay={i}
              >
                {stat.value}
              </h2>
            </div>
            <div className="line-mask mt-2">
              <p
                className="line-inner text-base font-medium text-base-350"
                data-delay={i + 1}
              >
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
