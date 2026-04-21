"use client";

import { useReveal } from "@/hooks/useReveal";
import { RevealText } from "./RevealText";

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
    <section className="bg-base-500 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-base font-medium text-base-350">How we work</p>
        <RevealText
          text={"How we build bots\nthat actually work"}
          as="h2"
          className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[550] leading-tight tracking-[-2.4px] text-base-200"
        />

        <div ref={ref} className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {phases.map((phase, i) => (
            <div
              key={phase.num}
              className="reveal-up rounded-3xl bg-base-450 p-8"
              data-delay={Math.min(i, 4)}
            >
              <span className="text-sm font-medium text-base-350">
                {phase.num} / 06
              </span>
              <h3 className="mt-4 text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-[-1.2px] text-base-100">
                {phase.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-base-250">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
