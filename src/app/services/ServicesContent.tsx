"use client";

import { useEffect, useRef, useState } from "react";
import { RevealText } from "@/components/RevealText";
import { CTAButton } from "@/components/CTAButton";
import { useReveal } from "@/hooks/useReveal";
import { ArrowRight } from "lucide-react";

const services = [
  {
    num: "01",
    tag: "AI AGENTS",
    title: "AI Agents & Custom GPT",
    desc: "Intelligent agents that understand your business context, automate conversations, and make decisions. Custom GPTs trained on your data with privacy built in.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  },
  {
    num: "02",
    tag: "AUTOMATION",
    title: "Workflow Automation",
    desc: "End-to-end automation pipelines — from data ingestion to approvals and execution. We automate what matters so your team focuses on what humans do best.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    num: "03",
    tag: "WEB & MOBILE",
    title: "AI-Powered Apps",
    desc: "Production-ready web and mobile applications with AI woven into the core. Smart products that learn, adapt, and improve with every interaction.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
  },
  {
    num: "04",
    tag: "INTERNAL TOOLS",
    title: "CRM & Internal Tools",
    desc: "Replace spreadsheets with role-based dashboards, smart notifications, and workflows that scale. Built for how your team actually works.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

const svgArts = [
  // Card 1 — Neural network nodes
  `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="80" r="8" fill="#4a9eff" opacity="0.6"/>
    <circle cx="200" cy="60" r="5" fill="#4a9eff" opacity="0.4"/>
    <circle cx="320" cy="100" r="10" fill="#4a9eff" opacity="0.5"/>
    <circle cx="140" cy="200" r="6" fill="#00d4ff" opacity="0.7"/>
    <circle cx="260" cy="180" r="8" fill="#4a9eff" opacity="0.4"/>
    <circle cx="80" cy="300" r="5" fill="#00d4ff" opacity="0.5"/>
    <circle cx="350" cy="280" r="9" fill="#4a9eff" opacity="0.6"/>
    <circle cx="200" cy="320" r="6" fill="#00d4ff" opacity="0.5"/>
    <circle cx="300" cy="350" r="4" fill="#4a9eff" opacity="0.3"/>
    <line x1="80" y1="80" x2="200" y2="60" stroke="#4a9eff" stroke-width="1.5" opacity="0.3"/>
    <line x1="200" y1="60" x2="320" y2="100" stroke="#4a9eff" stroke-width="1.5" opacity="0.3"/>
    <line x1="80" y1="80" x2="140" y2="200" stroke="#4a9eff" stroke-width="1.5" opacity="0.3"/>
    <line x1="320" y1="100" x2="260" y2="180" stroke="#4a9eff" stroke-width="1.5" opacity="0.3"/>
    <line x1="140" y1="200" x2="260" y2="180" stroke="#4a9eff" stroke-width="1.5" opacity="0.3"/>
    <line x1="140" y1="200" x2="80" y2="300" stroke="#4a9eff" stroke-width="1.5" opacity="0.3"/>
    <line x1="260" y1="180" x2="350" y2="280" stroke="#4a9eff" stroke-width="1.5" opacity="0.3"/>
    <line x1="80" y1="300" x2="200" y2="320" stroke="#4a9eff" stroke-width="1.5" opacity="0.3"/>
    <line x1="350" y1="280" x2="200" y2="320" stroke="#4a9eff" stroke-width="1.5" opacity="0.3"/>
    <line x1="200" y1="320" x2="300" y2="350" stroke="#4a9eff" stroke-width="1.5" opacity="0.2"/>
  </svg>`,

  // Card 2 — Flowing automation pipeline
  `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="80" width="80" height="40" rx="8" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.4"/>
    <rect x="160" y="80" width="80" height="40" rx="8" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.4"/>
    <rect x="300" y="80" width="80" height="40" rx="8" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.4"/>
    <rect x="80" y="190" width="80" height="40" rx="8" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.4"/>
    <rect x="220" y="190" width="80" height="40" rx="8" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.4"/>
    <rect x="150" y="300" width="80" height="40" rx="8" fill="none" stroke="#00ff88" stroke-width="1.5" opacity="0.4"/>
    <line x1="100" y1="100" x2="160" y2="100" stroke="#00ff88" stroke-width="1.5" opacity="0.3" marker-end="url(#arrow)"/>
    <line x1="240" y1="100" x2="300" y2="100" stroke="#00ff88" stroke-width="1.5" opacity="0.3"/>
    <line x1="60" y1="120" x2="120" y2="190" stroke="#00ff88" stroke-width="1.5" opacity="0.3"/>
    <line x1="200" y1="120" x2="260" y2="190" stroke="#00ff88" stroke-width="1.5" opacity="0.3"/>
    <line x1="160" y1="210" x2="190" y2="300" stroke="#00ff88" stroke-width="1.5" opacity="0.3"/>
    <line x1="300" y1="210" x2="230" y2="300" stroke="#00ff88" stroke-width="1.5" opacity="0.3"/>
    <circle cx="60" cy="100" r="4" fill="#00ff88" opacity="0.7"/>
    <circle cx="200" cy="100" r="4" fill="#00ff88" opacity="0.7"/>
    <circle cx="340" cy="100" r="4" fill="#00ff88" opacity="0.7"/>
    <circle cx="120" cy="210" r="4" fill="#00ff88" opacity="0.7"/>
    <circle cx="260" cy="210" r="4" fill="#00ff88" opacity="0.7"/>
    <circle cx="190" cy="320" r="4" fill="#00ff88" opacity="0.7"/>
  </svg>`,

  // Card 3 — 3D cubes / web apps
  `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <polygon points="100,60 160,30 220,60 160,90" fill="none" stroke="#8b5cf6" stroke-width="1.5" opacity="0.6"/>
    <polygon points="100,60 160,90 160,150 100,120" fill="none" stroke="#6d28d9" stroke-width="1.5" opacity="0.5"/>
    <polygon points="160,90 220,60 220,120 160,150" fill="none" stroke="#7c3aed" stroke-width="1.5" opacity="0.4"/>
    <polygon points="220,160 280,130 340,160 280,190" fill="none" stroke="#8b5cf6" stroke-width="1.5" opacity="0.5"/>
    <polygon points="220,160 280,190 280,250 220,220" fill="none" stroke="#6d28d9" stroke-width="1.5" opacity="0.4"/>
    <polygon points="280,190 340,160 340,220 280,250" fill="none" stroke="#7c3aed" stroke-width="1.5" opacity="0.3"/>
    <polygon points="60,260 120,230 180,260 120,290" fill="none" stroke="#8b5cf6" stroke-width="1.5" opacity="0.4"/>
    <polygon points="60,260 120,290 120,350 60,320" fill="none" stroke="#6d28d9" stroke-width="1.5" opacity="0.3"/>
    <polygon points="120,290 180,260 180,320 120,350" fill="none" stroke="#7c3aed" stroke-width="1.5" opacity="0.2"/>
  </svg>`,

  // Card 4 — Dashboard/CRM data visualization
  `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="100" x2="400" y2="100" stroke="#22d3ee" stroke-width="0.5" opacity="0.15"/>
    <line x1="0" y1="200" x2="400" y2="200" stroke="#22d3ee" stroke-width="0.5" opacity="0.15"/>
    <line x1="0" y1="300" x2="400" y2="300" stroke="#22d3ee" stroke-width="0.5" opacity="0.15"/>
    <line x1="100" y1="0" x2="100" y2="400" stroke="#22d3ee" stroke-width="0.5" opacity="0.15"/>
    <line x1="200" y1="0" x2="200" y2="400" stroke="#22d3ee" stroke-width="0.5" opacity="0.15"/>
    <line x1="300" y1="0" x2="300" y2="400" stroke="#22d3ee" stroke-width="0.5" opacity="0.15"/>
    <rect x="40" y="240" width="35" height="80" rx="4" fill="#22d3ee" opacity="0.4"/>
    <rect x="95" y="180" width="35" height="140" rx="4" fill="#22d3ee" opacity="0.5"/>
    <rect x="150" y="140" width="35" height="180" rx="4" fill="#22d3ee" opacity="0.6"/>
    <rect x="205" y="200" width="35" height="120" rx="4" fill="#22d3ee" opacity="0.4"/>
    <rect x="260" y="160" width="35" height="160" rx="4" fill="#22d3ee" opacity="0.5"/>
    <rect x="315" y="120" width="35" height="200" rx="4" fill="#22d3ee" opacity="0.6"/>
    <polyline points="40,200 95,160 150,120 205,140 260,100 315,80"
      fill="none" stroke="#22d3ee" stroke-width="2" opacity="0.5"/>
    <circle cx="40" cy="200" r="4" fill="#22d3ee" opacity="0.8"/>
    <circle cx="95" cy="160" r="4" fill="#22d3ee" opacity="0.8"/>
    <circle cx="150" cy="120" r="4" fill="#22d3ee" opacity="0.8"/>
    <circle cx="205" cy="140" r="4" fill="#22d3ee" opacity="0.8"/>
    <circle cx="260" cy="100" r="4" fill="#22d3ee" opacity="0.8"/>
    <circle cx="315" cy="80" r="4" fill="#22d3ee" opacity="0.8"/>
  </svg>`,
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
  const [activePhase, setActivePhase] = useState(0);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = diffRef.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>(".mobile-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observers = phaseRefs.current.map((ref, i) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActivePhase(i);
        },
        { threshold: 0.5 },
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const phaseColors = [
    "from-[#0a0a1a] to-[#0d1a2e]",
    "from-[#0a1a0d] to-[#0d2e1a]",
    "from-[#1a0a0a] to-[#2e1a0d]",
    "from-[#1a0a1a] to-[#2e0d2e]",
    "from-[#0a1a1a] to-[#0d2e2e]",
    "from-[#1a1a0a] to-[#2e2e0d]",
  ];

  const phaseIcons = ["◎", "◈", "◉", "⬡", "◐", "∞"];

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[70vh] items-end bg-base-500 px-6 pb-20 pt-32 md:px-12">
        <div className="flex w-full flex-col gap-12 md:flex-row md:items-end">
          <div className="w-full md:w-1/2">
            <p className="text-sm font-medium uppercase tracking-widest text-base-350">
              Services
            </p>
            <h1 className="mt-4 text-[clamp(3rem,6vw,6rem)] font-bold leading-[1.05] tracking-[-3px] text-base-100">
              From <span className="text-base-300">AI-curious</span>
              <br />to <span className="text-base-300">AI-powered.</span>
            </h1>
          </div>
          <div className="flex w-full items-end justify-end md:w-1/2">
            <p className="text-right text-xl font-medium leading-relaxed text-base-250">
              Whether you&apos;re exploring where AI could help or ready to{" "}
              <br />scale what&apos;s already working, we meet you where you are.
            </p>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-base-500 px-6 py-16 md:px-12">
        <div className="w-full">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-base-350">
            How we help
          </p>
          <RevealText
            text="Pick the starting point that fits you"
            as="h2"
            className="mt-4 text-center text-[clamp(2.5rem,5vw,4.5rem)] font-medium tracking-[-2px] text-base-100"
          />

          <div ref={cardsRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <div
                key={s.num}
                className="reveal-up group relative w-full overflow-hidden rounded-3xl cursor-pointer"
                style={{ minHeight: "520px" }}
                data-delay={i}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-6" style={{ minHeight: "520px" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-white/60 uppercase tracking-widest">
                      {s.num} / 04
                    </span>
                    <span className="text-xs font-mono text-white/60 uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">
                      {s.tag}
                    </span>
                  </div>
                  <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-0">
                    <h3 className="text-[clamp(1.8rem,2.5vw,2.4rem)] font-bold text-white leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-base text-white/70 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section ref={diffRef} className="bg-base-500 py-0 md:py-24 px-6 md:px-12 relative overflow-hidden">

        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-black leading-none"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.025)',
              color: 'transparent'
            }}>
            DIFF
          </span>
        </div>

        <div className="mx-auto max-w-6xl relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 md:mb-20 pb-2 md:pb-8 border-b border-base-400/20">
            <div className="mobile-reveal">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-base-400" />
                <p className="text-xs uppercase tracking-[0.4em] text-base-350 font-mono">What stays consistent</p>
              </div>
              <RevealText
                text="What makes us different"
                as="h2"
                className="text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-[-3px] leading-[0.9] text-base-100"
              />
            </div>
            <p className="mobile-reveal max-w-xs text-base text-base-350 md:text-right md:pb-2 mt-4 md:mt-0" data-delay="1">
              Three things that never change no matter the project.
            </p>
          </div>

          {/* Three differentiator rows — large editorial style */}
          <div className="flex flex-col">
            {differentiators.map((d, i) => (
              <div key={d.num}
                className="mobile-reveal group flex flex-col md:flex-row md:items-center gap-6 md:gap-16 py-1 md:py-12 border-b border-base-400/20 cursor-default hover:bg-base-450/20 px-6 -mx-6 rounded-3xl transition-all duration-500 relative overflow-hidden"
                data-delay={String(i + 1)}>

                {/* Hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                  style={{
                    background: [
                      'radial-gradient(ellipse at left, rgba(74,158,255,0.04) 0%, transparent 60%)',
                      'radial-gradient(ellipse at left, rgba(0,255,136,0.04) 0%, transparent 60%)',
                      'radial-gradient(ellipse at left, rgba(139,92,246,0.04) 0%, transparent 60%)',
                    ][i]
                  }}
                />

                {/* Number */}
                <div className="flex-shrink-0 relative">
                  <span className="text-[5rem] font-black leading-none tracking-[-4px] transition-all duration-500"
                    style={{
                      WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                      color: 'transparent',
                    }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute -bottom-1 left-0 text-xs font-mono text-base-400 group-hover:text-base-300 transition-colors duration-300">
                    / 03
                  </span>
                </div>

                {/* Vertical divider */}
                <div className="hidden md:block w-px self-stretch bg-base-400/20 group-hover:bg-base-400/40 transition-colors duration-500 flex-shrink-0" />

                {/* Title */}
                <div className="md:w-64 flex-shrink-0">
                  <h3 className="text-[clamp(2rem,3vw,2.8rem)] font-black tracking-[-2px] leading-none text-base-100 group-hover:translate-x-2 transition-transform duration-500">
                    {d.title}
                  </h3>
                </div>

                {/* Desc */}
                <div className="flex-1">
                  <div className="h-px w-0 group-hover:w-full bg-base-400/20 mb-4 transition-all duration-700 hidden md:block" />
                  <p className="text-xl text-base-300 leading-relaxed group-hover:text-base-200 transition-colors duration-500 max-w-lg">
                    {d.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-base-500 px-6 py-24 md:px-12">
        <div className="w-full">
          <div className="rounded-3xl bg-base-450 px-12 py-20 text-center">
            <RevealText
              text="Let's figure out your AI opportunity."
              as="h2"
              className="text-[clamp(2.5rem,5vw,5rem)] font-[550] tracking-[-2.4px] text-base-200"
            />
            <p className="mt-6 text-2xl font-medium text-base-300">
              Tell us what&apos;s slowing your team down. We&apos;ll be honest about what&apos;s worth building.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton href="/contact" label="Let's talk" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}