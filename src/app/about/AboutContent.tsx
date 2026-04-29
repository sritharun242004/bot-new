"use client";

import React, { useRef, useState, useEffect } from "react";
import { RevealText } from "@/components/RevealText";
import { useReveal } from "@/hooks/useReveal";

const journey = [
  {
    title: "Listen & Discover",
    desc: "We dig into your workflows, data, and goals to identify where AI will actually move the needle. Specific opportunities with clear ROI.",
  },
  {
    title: "Build & Ship",
    desc: "We build the AI systems — agents, automations, custom GPTs, web apps. Fast, secure, and ready for your team to use.",
  },
  {
    title: "Evolve & Scale",
    desc: "AI systems need care. We monitor performance, fix issues, retrain models, and expand what's working. Your AI partner, not a one-time vendor.",
  },
];

const tools = [
  { name: "OpenAI", category: "LLM PROVIDER", desc: "GPT-4 powers our agents, chat systems and custom knowledge bases." },
  { name: "LangChain", category: "ORCHESTRATION", desc: "Chains, memory and tool use for complex multi-step AI workflows." },
  { name: "Next.js", category: "FRONTEND", desc: "Full-stack React framework for all client-facing AI products." },
  { name: "Python", category: "AI & BACKEND", desc: "Core language for pipelines, automation and backend APIs." },
  { name: "AWS", category: "CLOUD INFRA", desc: "Scalable cloud for deployment, storage and compute at any size." },
  { name: "Pinecone", category: "VECTOR SEARCH", desc: "Semantic search and RAG pipelines for AI knowledge retrieval." },
];

const whoText = "We're the AI partner that sticks. While others hand you a deck and disappear, we find opportunities, build the systems, and stay on to make sure they actually work.";
const whoWords = whoText.split(" ");

export function AboutContent() {
  const whoRef = useReveal();
  const journeyRef = useReveal();
  const toolsRef = useReveal();
  const whoSectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = whoSectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const progress = (window.scrollY - sectionTop + window.innerHeight * 0.6) / sectionHeight;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-screen items-center bg-base-500 px-6 md:px-12">
        <div className="flex w-full flex-col gap-8 md:flex-row md:items-center">

          {/* Left column — text at bottom */}
          <div className="flex w-full flex-col justify-end md:w-1/2 pt-95">
            <RevealText
              lines={[
                <>We build <span className="text-base-300">bots</span></>,
                "that think.",
              ]}
              as="h1"
              className="text-[clamp(4.5rem,10.5vw,7.5rem)] font-medium leading-[1.05] tracking-[-4px] text-base-100"
            />
            <div className="mt-8 max-w-xl">
              <p className="text-xl font-medium leading-relaxed text-base-200">
                Not another consulting deck. Not a proof-of-concept that dies on
                the vine. We build AI that runs in production, fits your workflows,
                and keeps getting better.
              </p>
            </div>
          </div>

          {/* Right column — large image */}
          <div className="w-full md:w-1/2">
            <div className="h-[75vh] w-full overflow-hidden rounded-3xl bg-base-450 mt-16">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team working"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Who we are */}
      <section
        ref={(el) => {
          (whoRef as React.MutableRefObject<HTMLElement | null>).current = el;
          (whoSectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }}
        className="bg-base-500 px-6 py-24 md:px-12"
      >
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="reveal-up text-base font-medium text-base-350">Who we are</p>
          <h3 className="mt-6 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.2] tracking-[-1.2px]">
            {whoWords.map((word, i) => (
              <span
                key={i}
                style={{
                  color: scrollProgress > i / whoWords.length ? "var(--base-100)" : "var(--base-400)",
                  transition: "color 0.3s ease",
                }}
              >
                {word}{" "}
              </span>
            ))}
          </h3>
        </div>
      </section>

      {/* The full AI journey */}
      <section className="bg-base-500 py-24 relative overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-12 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-base-400" />
            <p className="text-xs uppercase tracking-[0.4em] text-base-350 font-mono">
              How we help
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-2px] text-base-200">
              The full AI journey
            </h2>
            <p className="max-w-sm text-lg text-base-250 leading-relaxed md:text-right">
              From figuring out where AI fits to building it and keeping
              it running — we cover the whole path.
            </p>
          </div>
        </div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-[4.5rem] left-0 right-0 h-px bg-base-400/20 z-0" />

          <div className="flex overflow-x-auto scrollbar-hide px-6 md:px-12 pb-8 gap-0">
            {journey.map((item, i) => (
              <div
                key={item.title}
                className="flex-shrink-0 w-[380px] group cursor-default relative"
              >
                {/* Timeline node */}
                <div className="relative z-10 flex flex-col items-start mb-8">
                  <div className="flex items-center gap-4 w-full">
                    {/* Node circle */}
                    <div className="w-9 h-9 rounded-full border-2 border-base-400 bg-base-500 flex items-center justify-center flex-shrink-0 group-hover:border-base-100 transition-colors duration-300">
                      <span className="text-xs font-mono text-base-400 group-hover:text-base-100 transition-colors duration-300">
                        0{i + 1}
                      </span>
                    </div>
                    {/* Line to next */}
                    {i < journey.length - 1 && (
                      <div className="flex-1 h-px bg-base-400/20" />
                    )}
                  </div>
                </div>

                {/* Card */}
                <div className="mr-5 rounded-3xl bg-base-450 p-8 h-[280px] flex flex-col justify-between group-hover:bg-base-400/30 relative overflow-hidden border border-base-400/0 hover:border-base-400/20" style={{ transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.7s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  {/* Gradient reveal */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: [
                        "radial-gradient(ellipse at top left, rgba(74,158,255,0.07) 0%, transparent 70%)",
                        "radial-gradient(ellipse at top right, rgba(0,255,136,0.07) 0%, transparent 70%)",
                        "radial-gradient(ellipse at bottom, rgba(139,92,246,0.07) 0%, transparent 70%)",
                      ][i],
                    }}
                  />

                  {/* Large watermark */}
                  <div
                    className="absolute -right-4 -bottom-4 text-[8rem] font-black leading-none select-none pointer-events-none"
                    style={{
                      WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                      color: "transparent",
                    }}
                  >
                    0{i + 1}
                  </div>

                  <div className="relative z-10">
                    {/* Tag */}
                    <span className="text-xs uppercase tracking-widest text-base-400 font-mono border border-base-400/30 px-3 py-1 rounded-full group-hover:border-base-300 group-hover:text-base-300 transition-all duration-300">
                      {["Strategy", "Implementation", "Partnership"][i]}
                    </span>
                  </div>

                  <div className="relative z-10 mt-6">
                    <h3 className="text-[clamp(1.5rem,2vw,2rem)] font-black tracking-[-2px] leading-[0.9] text-base-100 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-lg text-base-300 leading-relaxed group-hover:text-base-200 transition-colors duration-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="px-6 md:px-12 mt-8 flex items-center gap-6">
          <div className="h-px flex-1 bg-base-400/20" />
          <span className="text-xs font-mono uppercase tracking-widest text-base-400">
            End to end AI
          </span>
          <div className="h-px flex-1 bg-base-400/20" />
        </div>
      </section>

      {/* Tech toolkit */}
      <section className="bg-base-500 py-24 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="flex items-end justify-between mb-16 pb-8 border-b border-base-400/20">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-base-400" />
                <p className="text-xs uppercase tracking-[0.4em] text-base-350 font-mono">Our AI toolkit</p>
              </div>
              <h2 className="text-[clamp(3rem,6vw,6rem)] font-bold tracking-[-3px] leading-[0.9] text-base-100">
                Built on<br />proven tech
              </h2>
            </div>
            <div className="flex items-center gap-3 pb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-green-400 uppercase tracking-widest">All systems live</span>
            </div>
          </div>

          {/* Tool grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-base-400/20">
            {tools.map((tool, i) => (
              <div key={tool.name}
                className="group bg-base-450 p-8 flex flex-col justify-between min-h-[260px] cursor-default hover:bg-base-400/40 transition-all duration-500 relative overflow-hidden">

                {/* Top row */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-base-300 group-hover:text-base-200 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm uppercase tracking-widest font-mono border border-base-400/50 px-3 py-1 rounded-full text-base-300 group-hover:border-base-200 group-hover:text-base-200 transition-all duration-300">
                    {tool.category}
                  </span>
                </div>

                {/* Tool name */}
                <div>
                  <h3 className="text-[clamp(2.4rem,3.5vw,3.2rem)] font-black tracking-[-2px] leading-none text-base-200 group-hover:text-base-100 transition-colors duration-500 mb-6">
                    {tool.name}
                  </h3>
                  {/* Animated progress bar */}
                  <div className="h-px bg-base-400/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-base-100 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${70 + (i % 4) * 8}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-mono text-base-300 group-hover:text-base-200 transition-colors duration-300">
                      In production
                    </span>
                    <span className="text-sm font-mono text-base-300 group-hover:text-base-200 transition-colors duration-300">
                      {70 + (i % 4) * 8}%
                    </span>
                  </div>
                  <p className="mt-4 text-base text-base-300 leading-relaxed group-hover:text-base-200 transition-colors duration-300">
                    {tool.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer strip */}
          <div className="mt-16 flex items-center justify-between pt-8 border-t border-base-400/20">
            <p className="text-xs font-mono text-base-400 uppercase tracking-widest">Production grade</p>
            <p className="text-xs font-mono text-base-400 uppercase tracking-widest">{tools.length} core technologies</p>
            <p className="text-xs font-mono text-base-400 uppercase tracking-widest">Verified stack</p>
          </div>

        </div>
      </section>

      <section className="w-full bg-base-500 px-4 pb-6 md:px-6">
        <div className="relative h-[95vh] w-full overflow-hidden rounded-3xl">
          {/* Full bleed background image */}
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80"
            alt="Team working"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-12">
            {/* Center text */}
            <div className="flex flex-1 items-center justify-center">
              <h2 className="text-[clamp(4rem,10vw,9rem)] font-medium tracking-[-4px] text-white text-center">
                The Bot Company
              </h2>
            </div>

            {/* Bottom row */}
            <div className="flex items-end justify-between">
              <p className="text-2xl font-medium text-white/80">
                Your AI partner
              </p>
              <p className="max-w-xs text-right text-lg font-medium leading-relaxed text-white/60">
                Tell us where AI could help. We&apos;ll find the opportunity, build it,
                and stick around to make it work.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}