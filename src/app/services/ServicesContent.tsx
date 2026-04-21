"use client";

import { RevealText } from "@/components/RevealText";
import { CTAButton } from "@/components/CTAButton";
import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    num: "01",
    tag: "AI AGENTS",
    title: "AI Agents & Custom GPT",
    desc: "Intelligent agents that understand your business context, automate conversations, and make decisions. Custom GPTs trained on your data with privacy built in.",
  },
  {
    num: "02",
    tag: "AUTOMATION",
    title: "Workflow Automation",
    desc: "End-to-end automation pipelines — from data ingestion to approvals and execution. We automate what matters so your team focuses on what humans do best.",
  },
  {
    num: "03",
    tag: "WEB & MOBILE",
    title: "AI-Powered Apps",
    desc: "Production-ready web and mobile applications with AI woven into the core. Smart products that learn, adapt, and improve with every interaction.",
  },
  {
    num: "04",
    tag: "INTERNAL TOOLS",
    title: "CRM & Internal Tools",
    desc: "Replace spreadsheets with role-based dashboards, smart notifications, and workflows that scale. Built for how your team actually works.",
  },
];

const process = [
  { num: "01", title: "Listen", desc: "We spend time understanding your business, not just your tech." },
  { num: "02", title: "Design", desc: "We identify specific AI opportunities ranked by impact and effort." },
  { num: "03", title: "Automate", desc: "We automate the repetitive, error-prone tasks that slow you down." },
  { num: "04", title: "Build", desc: "We build and integrate with your existing tools. Your team uses it as we build." },
  { num: "05", title: "Scale", desc: "We make sure your team actually uses it. Training, docs, and support." },
  { num: "06", title: "Evolve", desc: "We stay on to monitor, improve, and expand. The loop keeps learning." },
];

const differentiators = [
  { num: "01", title: "Privacy first", desc: "Your data stays private. We never send it to public training sets." },
  { num: "02", title: "Honest advice", desc: "We'll tell you when something isn't worth building. No upselling, no hype." },
  { num: "03", title: "Partners, not vendors", desc: "We stick around to make sure it works. Your ongoing AI partner." },
];

export function ServicesContent() {
  const cardsRef = useReveal();
  const processRef = useReveal();
  const diffRef = useReveal();

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[70vh] items-end bg-base-500 px-6 pb-20 pt-32 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-wider text-base-350">
            Services
          </p>
          <RevealText
            text={"From AI-curious\nto AI-powered."}
            as="h1"
            className="mt-4 text-[clamp(3rem,7vw,5rem)] font-medium leading-[1.05] tracking-[-4px] text-base-100"
          />
          <p className="mt-8 max-w-lg text-base font-medium leading-relaxed text-base-200">
            Whether you&apos;re exploring where AI could help or ready to scale
            what&apos;s already working, we meet you where you are.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-base-500 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-wider text-base-350">
            How we help
          </p>
          <RevealText
            text="Pick the starting point that fits you"
            as="h2"
            className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-[550] tracking-[-2.4px] text-base-200"
          />

          <div ref={cardsRef} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <div
                key={s.num}
                className="reveal-up flex flex-col rounded-3xl bg-base-450 p-8"
                data-delay={i}
              >
                <span className="text-xs font-medium text-base-350">
                  {s.num} / 04 &middot; {s.tag}
                </span>
                <h3 className="mt-4 text-2xl font-medium tracking-[-1.2px] text-base-100">
                  {s.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-base-250">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-base-500 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-wider text-base-350">
            How we work
          </p>
          <RevealText
            text={"A simple path from\nAI-curious to AI-powered"}
            as="h2"
            className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-[550] tracking-[-2.4px] text-base-200"
          />

          <div ref={processRef} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((p, i) => (
              <div
                key={p.num}
                className="reveal-up rounded-3xl bg-base-450 p-8"
                data-delay={Math.min(i, 4)}
              >
                <span className="text-sm font-medium text-base-350">
                  {p.num} / 06
                </span>
                <h3 className="mt-4 text-xl font-medium tracking-[-1.2px] text-base-100">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-base-250">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-base-500 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-wider text-base-350">
            What stays consistent
          </p>
          <RevealText
            text="What makes us different"
            as="h2"
            className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-[550] tracking-[-2.4px] text-base-200"
          />

          <div ref={diffRef} className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {differentiators.map((d, i) => (
              <div
                key={d.num}
                className="reveal-up rounded-3xl bg-base-450 p-8"
                data-delay={i}
              >
                <span className="text-sm font-medium text-base-350">
                  {d.num} / 03
                </span>
                <h3 className="mt-4 text-xl font-medium tracking-[-1.2px] text-base-100">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-base-250">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-base-500 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <RevealText
            text={"Let's figure out your\nAI opportunity."}
            as="h2"
            className="text-[clamp(2rem,4vw,3.5rem)] font-[550] tracking-[-2.4px] text-base-200"
          />
          <p className="mt-6 text-base font-medium text-base-300">
            Tell us what&apos;s slowing your team down. We&apos;ll be honest about what&apos;s worth building.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButton href="/contact" label="Let's talk" />
          </div>
        </div>
      </section>
    </>
  );
}
