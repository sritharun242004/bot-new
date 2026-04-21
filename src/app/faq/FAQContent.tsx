"use client";

import { useState } from "react";
import { RevealText } from "@/components/RevealText";
import { useReveal } from "@/hooks/useReveal";

const faqs = [
  {
    q: "How do I know if AI is right for my business?",
    a: "If you have repetitive tasks, unstructured data to process, or customer questions that could be answered faster — AI probably has a role. We start with a discovery session to find out where the real opportunities are.",
  },
  {
    q: "What does 'AI partner' actually mean?",
    a: "It means we don't just build and leave. We stay on to monitor, improve, and expand your AI systems. Think of us as your ongoing AI team — not a one-time vendor.",
  },
  {
    q: "How long until we see results?",
    a: "Most projects show first results in 2-4 weeks. We prioritize quick wins that prove value fast, then expand from there.",
  },
  {
    q: "What about our data privacy?",
    a: "Your data stays private. We never send it to public training sets, and we build on infrastructure you control. Enterprise-grade security is built into every layer.",
  },
  {
    q: "Do we need a technical team?",
    a: "No. We handle the entire technical side — from strategy to deployment. Your team just needs to show up and tell us what's frustrating them.",
  },
  {
    q: "What if AI doesn't work for our use case?",
    a: "We'll tell you honestly. Part of our job is knowing when NOT to use AI. If a simpler solution works better, we'll recommend that instead.",
  },
  {
    q: "How do you charge?",
    a: "We work on project-based pricing with clear milestones. No hourly billing surprises. For ongoing partnerships, we offer monthly retainers.",
  },
  {
    q: "Can you work with our existing tech stack?",
    a: "Yes. We integrate with whatever you're already using — CRMs, databases, APIs, cloud platforms. No rip-and-replace required.",
  },
  {
    q: "What makes you different from other AI agencies?",
    a: "We stay. Most agencies build and leave. We build, monitor, improve, and expand. We're honest about what's worth building and what isn't.",
  },
  {
    q: "What types of bots do you build?",
    a: "AI agents, custom GPTs, chat systems, automation bots, data processing pipelines, and intelligent internal tools. If it can think, we can build it.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-base-400/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="pr-4 text-lg font-medium text-base-100">{q}</span>
        <span className="shrink-0 text-2xl text-base-300">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: open ? "200px" : "0",
          transitionTimingFunction: "cubic-bezier(0.075, 0.82, 0.165, 1)",
        }}
      >
        <p className="pb-6 text-base leading-relaxed text-base-250">{a}</p>
      </div>
    </div>
  );
}

export function FAQContent() {
  const ref = useReveal();

  return (
    <section className="min-h-screen bg-base-500 px-6 pt-32 pb-24 md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-base-350">
          FAQ
        </p>
        <RevealText
          text={"Frequently Asked\nQuestions"}
          as="h1"
          className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-4px] text-base-100"
        />
        <p className="mt-6 text-base font-medium text-base-300">
          Straight answers about how we build, timelines, security, and ownership.
        </p>
      </div>

      <div ref={ref} className="mx-auto mt-16 max-w-3xl rounded-3xl bg-base-450 px-6 md:px-8">
        {faqs.map((faq) => (
          <FAQItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </div>
    </section>
  );
}
