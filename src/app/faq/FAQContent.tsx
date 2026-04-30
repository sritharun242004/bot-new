"use client";

import { FAQ } from "@/components/ui/faq-tabs";

const categories = {
  "services": "What We Build",
  "process": "How We Work",
  "pricing": "Pricing & Timeline",
  "partnership": "Long-Term Partnership",
};

const faqData = {
  "services": [
    {
      question: "What types of AI solutions do you build?",
      answer: "AI agents, custom GPTs, chat systems, automation bots, data processing pipelines, and intelligent internal tools. If it can think, we can build it — from customer-facing assistants to back-office automation that replaces hours of manual work.",
    },
    {
      question: "How do I know if AI is right for my business?",
      answer: "If you have repetitive tasks, unstructured data to process, or customer questions that could be answered faster — AI probably has a role. We start with a discovery session to find out where the real opportunities are before recommending anything.",
    },
    {
      question: "Can you work with our existing tech stack?",
      answer: "Yes. We integrate with whatever you're already using — CRMs, databases, APIs, cloud platforms. No rip-and-replace required. We build on top of your existing infrastructure, not against it.",
    },
    {
      question: "What if AI doesn't work for our use case?",
      answer: "We'll tell you honestly. Part of our job is knowing when NOT to use AI. If a simpler solution works better, we'll recommend that instead. We'd rather lose a project than build something that doesn't deliver real value.",
    },
    {
      question: "Do you build both front-end and back-end AI systems?",
      answer: "Yes. From user-facing chatbots and dashboards to back-end pipelines that process data silently in the background. We handle the full stack — strategy, design, development, and deployment.",
    },
  ],
  "process": [
    {
      question: "What does your engagement process look like?",
      answer: "We start with a discovery session to understand your goals and bottlenecks. Then we define a clear scope, build in short sprints with regular check-ins, and deploy with a focus on measurable outcomes. No surprises.",
    },
    {
      question: "How involved does our team need to be?",
      answer: "Your team just needs to show up and tell us what's frustrating them. We handle the entire technical side — strategy, architecture, development, and deployment. We translate business problems into working solutions.",
    },
    {
      question: "What about our data privacy and security?",
      answer: "Your data stays private. We never send it to public training sets, and we build on infrastructure you control. Enterprise-grade security is built into every layer — encryption, access controls, audit logs.",
    },
    {
      question: "Do we need a technical team on our side?",
      answer: "No. We handle everything technical end-to-end. The only requirement is a clear understanding of your business processes and the problems you need solved. We speak business, not just code.",
    },
    {
      question: "How do you ensure quality and reliability?",
      answer: "Every system we build goes through rigorous testing before launch — unit tests, integration tests, and real-world scenario testing. After launch, we monitor performance and address issues proactively.",
    },
  ],
  "pricing": [
    {
      question: "How do you charge for your services?",
      answer: "We work on project-based pricing with clear milestones and deliverables. No hourly billing surprises. You know exactly what you're getting and what it costs before we start. For ongoing work, we offer monthly retainers.",
    },
    {
      question: "How long until we see results?",
      answer: "Most projects show first results in 2–4 weeks. We prioritize quick wins that prove value fast, then expand from there. You'll see working software — not just a deck — within the first sprint.",
    },
    {
      question: "What's included in a typical project scope?",
      answer: "Discovery and scoping, system design and architecture, full development and integration, QA and testing, deployment, documentation, and a handover session. Ongoing support is available as a separate retainer.",
    },
    {
      question: "Are there any hidden costs?",
      answer: "Never. We provide a clear breakdown before any work begins — including third-party API costs, infrastructure estimates, and any dependencies. If scope changes during the project, we discuss it openly and agree before proceeding.",
    },
    {
      question: "Do you offer a discovery phase before full commitment?",
      answer: "Yes. We offer a paid discovery sprint where we audit your current processes, identify AI opportunities, and produce a concrete roadmap. This gives you a clear picture of ROI before committing to a full build.",
    },
  ],
  "partnership": [
    {
      question: "What does 'AI partner' actually mean?",
      answer: "It means we don't just build and leave. We stay on to monitor, improve, and expand your AI systems over time. Think of us as your ongoing AI team — not a one-time vendor who disappears after launch.",
    },
    {
      question: "What makes you different from other AI agencies?",
      answer: "We stay. Most agencies build and leave. We build, monitor, improve, and expand. We're honest about what's worth building and what isn't — and we measure our success by the business impact we deliver, not just the hours we log.",
    },
    {
      question: "How do you handle system updates and model improvements?",
      answer: "As AI models and tooling evolve rapidly, we proactively update your systems to take advantage of improvements. Retainer clients get priority access to model upgrades and capability expansions.",
    },
    {
      question: "Can you train our internal team to manage AI systems?",
      answer: "Absolutely. We offer training sessions and documentation so your team can understand and manage the systems we build. The goal is to give you ownership, not dependency on us.",
    },
    {
      question: "What's the typical length of an ongoing partnership?",
      answer: "Most of our long-term clients work with us on a rolling monthly retainer after initial project delivery. Engagements typically run 6–24 months as we continuously expand and improve your AI capabilities.",
    },
  ],
};

export function FAQContent() {
  return (
    <FAQ
      title="Got Questions?"
      subtitle="Everything you need to know"
      categories={categories}
      faqData={faqData}
    />
  );
}
