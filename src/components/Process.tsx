"use client";

import { useReveal } from "@/hooks/useReveal";

const phases = [
  {
    num: "01",
    title: "Listen",
    desc: "We dig into your workflows, data, and goals. What's working, what's frustrating, where AI might help.",
  },
  {
    num: "02",
    title: "Design",
    desc: "We design with intent — specific opportunities with clear ROI, not generic recommendations.",
  },
  {
    num: "03",
    title: "Automate",
    desc: "We automate what matters — repetitive tasks, data flows, and decision points that slow your team down.",
  },
  {
    num: "04",
    title: "Build",
    desc: "We build fast, secure, and ready for your team. Your team uses it as we build so we can adjust in real time.",
  },
  {
    num: "05",
    title: "Scale",
    desc: "We don't just deploy — we make sure your team actually uses it. Training, docs, and support until it sticks.",
  },
  {
    num: "06",
    title: "Evolve",
    desc: "We stay on to monitor, improve, and expand. It's not a pipeline — it's a loop that keeps learning with you.",
  },
];

export function Process() {
  const ref = useReveal();

  return (
    <section className="bg-base-500 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} className="flex flex-col items-start">
          <div className="reveal-up" data-delay="0">
            <p className="text-base font-medium text-base-350">How we work</p>
            <h2 className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-[550] leading-tight tracking-[-2.4px] text-base-100">
              How we build bots<br />
              that actually work
            </h2>
          </div>

          <div className="mt-16 w-full">
            {phases.map((phase) => (
              <div
                key={phase.num}
                className="group flex cursor-default items-center justify-between gap-8 rounded-2xl border-b border-base-400/20 px-6 py-10 transition-all duration-300 hover:bg-base-450/30 hover:px-8"
              >
                {/* Phase number */}
                <div className="w-1/4">
                  <span className="text-[clamp(3rem,6vw,5rem)] font-[550] tracking-[-3px] text-base-400 transition-colors duration-300 group-hover:text-base-200">
                    {phase.num}
                  </span>
                </div>

                {/* Title */}
                <div className="w-1/2">
                  <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium text-base-100">
                    {phase.title}
                  </h3>
                </div>

                {/* Desc */}
                <div className="w-1/4">
                  <p className="text-right text-base text-base-350 transition-colors duration-300 group-hover:text-base-250">
                    {phase.desc}
                  </p>
                </div>

                {/* Arrow */}
                <span className="-translate-x-4 text-2xl text-base-100 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
