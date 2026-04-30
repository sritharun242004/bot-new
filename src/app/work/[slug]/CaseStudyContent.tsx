"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import type { Project } from "@/data/projects";

function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function ResultRow({ result, i }: { result: string; i: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.6);
  return (
    <div
      ref={ref}
      className={`flex items-center min-h-[180px] px-8 md:px-24 border-b border-base-400/20 group hover:bg-base-450/30 cursor-default ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : i % 2 === 0 ? "translateX(-50px)" : "translateX(50px)",
        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <span className="text-[clamp(3rem,8vw,7rem)] font-black text-base-450 group-hover:text-base-350 transition-colors duration-500 w-48 flex-shrink-0 leading-none">
        <CountUp target={i + 1} active={isVisible} />
      </span>
      <div className="h-16 w-px bg-base-400/30 mx-12 flex-shrink-0" />
      <p className={`text-[clamp(1.2rem,2vw,1.8rem)] leading-relaxed flex-1 text-base-100 transition-all duration-700 ${isVisible ? "font-bold" : "font-normal"} ${i % 2 === 0 ? "text-left" : "text-right"}`}>
        {result}
      </p>
    </div>
  );
}

function CountUp({ target, active }: { target: number; active: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const id = setInterval(() => {
      current += 1;
      setValue(current);
      if (current >= target) clearInterval(id);
    }, 120);
    return () => clearInterval(id);
  }, [active, target]);
  return <>{String(value).padStart(2, "0")}</>;
}

export function CaseStudyContent({ project }: { project: Project }) {
  const { caseStudy } = project;
  const ctaSectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: challengeRef, isVisible: challengeVisible } = useScrollReveal<HTMLElement>();
  const { ref: approachRef, isVisible: approachVisible } = useScrollReveal<HTMLElement>();
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollReveal<HTMLElement>();
  const solutionSectionRef = useRef<HTMLElement>(null);
  const [solutionWordProgress, setSolutionWordProgress] = useState(0);
  const { ref: resultsRef, isVisible: resultsVisible } = useScrollReveal<HTMLElement>(0.05);
  const { ref: techRef, isVisible: techVisible } = useScrollReveal();
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollReveal<HTMLElement>();
  const { ref: ctaRevealRef, isVisible: ctaVisible } = useScrollReveal();

  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      const section = solutionSectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        // Start when section centre hits 70% down viewport, finish at 20% from top
        const sectionCentre = rect.top + rect.height / 2;
        const progress = (vh * 1 - sectionCentre) / (vh * 0.5);
        setSolutionWordProgress(Math.min(1, Math.max(0, progress)));
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ctaSectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const ctaLine1 = "Let’s".split("");
  const ctaLine2 = "Build.".split("");

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cloudRef = useRef<HTMLDivElement>(null);

  const handleCloudMove = (e: React.MouseEvent) => {
    const rect = cloudRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotX = ((e.clientY - centerY) / rect.height) * -20;
    const rotY = ((e.clientX - centerX) / rect.width) * 20;
    setRotation({ x: rotX, y: rotY });
  };

  const handleCloudLeave = () => setRotation({ x: 0, y: 0 });

  const polaroidRotations = [-6, 3, -4, 7, -2, 5, -8, 4, -3, 6];
  const polaroidColors = [
    "bg-[#f5f0e8]",
    "bg-[#e8f0f5]",
    "bg-[#f0e8f5]",
    "bg-[#e8f5e8]",
    "bg-[#f5e8e8]",
    "bg-[#f5f5e8]",
  ];

  const techDetails: Record<string, { category: string; level: number }> = {
    "GPT-4": { category: "AI Model", level: 95 },
    "LangChain": { category: "Orchestration", level: 90 },
    "Pinecone": { category: "Vector DB", level: 85 },
    "Next.js": { category: "Frontend", level: 95 },
    "PostgreSQL": { category: "Database", level: 88 },
    "Redis": { category: "Cache", level: 82 },
    "Python": { category: "Backend", level: 92 },
    "FastAPI": { category: "API", level: 88 },
    "AWS": { category: "Cloud", level: 85 },
    "Docker": { category: "DevOps", level: 80 },
    "React": { category: "Frontend", level: 95 },
    "TypeScript": { category: "Language", level: 90 },
    "Temporal": { category: "Workflow", level: 78 },
    "RabbitMQ": { category: "Messaging", level: 82 },
  };

  const techPositions = caseStudy.techStack.map((tech, i) => {
    const total = caseStudy.techStack.length;
    const phi = Math.acos(-1 + (2 * i) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const radius = 280;
    return {
      tech,
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta),
      z: radius * Math.cos(phi),
      size: 0.8 + (i % 3) * 0.4,
    };
  });

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-50 h-[2px] bg-base-100 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* HERO — sticky scroll reveal */}
      <div ref={heroRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-base-500 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[40vw] font-black leading-none select-none"
              style={{ color: "rgba(255,255,255,0.02)" }}
            >
              01
            </span>
          </div>

          <Link
            href="/work"
            className="absolute top-8 left-8 z-20 text-xs uppercase tracking-widest text-base-350 hover:text-base-100 transition-colors"
          >
            ← Work
          </Link>

          <div className="relative z-10 text-center px-12">
            <p
              className="text-xs uppercase tracking-[0.4em] text-base-350 mb-8"
              style={{
                opacity: heroVisible ? 1 : 0,
                transition: "opacity 0.8s ease 200ms",
              }}
            >
              {project.tag} — {project.timeline}
            </p>
            <h1 className="text-[clamp(4rem,10vw,10rem)] font-black tracking-[-6px] leading-[0.9] text-base-100 uppercase text-center">
              {project.title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="mr-[0.15em] inline-block"
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible
                      ? "translateY(0) skewY(0deg)"
                      : "translateY(80px) skewY(3deg)",
                    transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms`,
                  }}
                >
                  {word === "AI" || word === "Automation" || word === "E-Commerce" ||
                    word === "CRM" || word === "Custom" || word === "GPT" ||
                    word === "Mobile" || word === "App" ||
                    word === "Data" || word === "Analytics" ||
                    word === "API" ? (
                    <span className="text-base-300">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>
            <p
              className="mt-12 text-xl text-base-350 max-w-lg mx-auto leading-relaxed"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 600ms",
              }}
            >
              {project.desc}
            </p>
          </div>

        </div>
      </div>

      {/* PANEL 1 — Challenge */}
      <section
        ref={challengeRef}
        className="min-h-screen flex items-center px-8 md:px-24 py-32 relative overflow-hidden bg-base-500"
      >
        <span
          className="absolute top-0 right-0 text-[30vw] font-black text-base-450/20 leading-none select-none pointer-events-none"
          style={{
            opacity: challengeVisible ? 0.2 : 0,
            transform: challengeVisible ? "translate(25%, -25%)" : "translate(40%, -40%)",
            transition: "all 1.5s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
          }}
        >
          01
        </span>
        <div
          className="relative z-10 max-w-3xl"
          style={{
            opacity: challengeVisible ? 1 : 0,
            transform: challengeVisible ? "translateX(0)" : "translateX(-60px)",
            transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-base-350 mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-base-400 inline-block" />
            THE CHALLENGE
          </p>
          <p className="text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-[1.3]">
            {caseStudy.challenge.split(" ").map((word, i) => (
              <span
                key={i}
                className="inline-block mr-[0.25em]"
                style={{
                  opacity: challengeVisible ? 1 : 0,
                  transform: challengeVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${i * 30}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 30}ms`,
                  color: "var(--base-100)",
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* PANEL 2 — Approach */}
      <section
        ref={approachRef}
        className="min-h-screen flex items-end justify-end px-8 md:px-24 py-32 relative overflow-hidden bg-base-450"
      >
        <span className="absolute bottom-0 left-0 text-[30vw] font-black text-base-500/40 leading-none select-none pointer-events-none -translate-x-1/4 translate-y-1/4">
          02
        </span>
        <div
          className="relative z-10 max-w-3xl text-right"
          style={{
            opacity: approachVisible ? 1 : 0,
            transform: approachVisible ? "translateX(0)" : "translateX(60px)",
            transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-base-350 mb-6 flex items-center gap-4 justify-end">
            THE APPROACH
            <span className="h-px w-12 bg-base-400 inline-block" />
          </p>
          <p className="text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-[1.3]">
            {caseStudy.approach.split(" ").map((word, i) => (
              <span
                key={i}
                className="inline-block mr-[0.25em]"
                style={{
                  opacity: approachVisible ? 1 : 0,
                  transform: approachVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${i * 30}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 30}ms`,
                  color: "var(--base-100)",
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* PANEL 3 — Solution */}
      <section
        ref={(el) => {
          (solutionRef as React.MutableRefObject<HTMLElement | null>).current = el;
          (solutionSectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }}
        className="min-h-screen flex items-center justify-center px-8 md:px-24 py-32 relative overflow-hidden bg-base-500"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[30vw] font-black text-base-450/20 leading-none select-none pointer-events-none -translate-y-1/4">
          03
        </span>
        <div
          className="relative z-10 max-w-5xl text-center"
          style={{
            opacity: solutionVisible ? 1 : 0,
            transform: solutionVisible ? "scale(1)" : "scale(0.95)",
            transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-base-350 mb-6 flex items-center gap-4 justify-center">
            <span className="h-px w-12 bg-base-400 inline-block" />
            THE SOLUTION
            <span className="h-px w-12 bg-base-400 inline-block" />
          </p>
          <p className="text-[clamp(2rem,3.5vw,3.2rem)] font-medium leading-[1.3]">
            {caseStudy.solution.split(" ").map((word, i, arr) => (
              <span
                key={i}
                style={{
                  color: solutionWordProgress > i / arr.length ? "var(--base-100)" : "var(--base-400)",
                  transition: "color 0.3s ease",
                }}
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* RESULTS */}
      <section ref={resultsRef} className="bg-base-500">
        <div className="px-8 md:px-24 py-16">
          <p className="text-xs uppercase tracking-[0.4em] text-base-350 flex items-center gap-4">
            <span className="h-px w-12 bg-base-400 inline-block" />
            RESULTS
          </p>
        </div>
        {caseStudy.results.map((result, i) => (
          <ResultRow key={i} result={result} i={i} />
        ))}
      </section>

      {/* TECH STACK */}
      <section className="py-24 bg-base-500 border-t border-base-400/20 overflow-hidden">
        {/* Header */}
        <div className="px-8 md:px-24 mb-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="h-px w-12 bg-base-400" />
            <p className="text-xs uppercase tracking-[0.4em] text-base-350 font-mono">
              Built with
            </p>
          </div>
          <span className="font-mono text-xs text-base-400 border border-base-400/30 px-4 py-2 rounded-full">
            {caseStudy.techStack.length} technologies
          </span>
        </div>

        {/* Row 1 — large outlined pills scrolling left */}
        <div className="relative flex overflow-hidden mb-4">
          <div className="flex gap-4 animate-marquee-slow shrink-0">
            {[...caseStudy.techStack, ...caseStudy.techStack, ...caseStudy.techStack].map((tech, i) => (
              <div key={i} className="flex-shrink-0 group cursor-default">
                <div className="flex items-center gap-3 rounded-full border-2 border-base-400/30 px-8 py-4 hover:border-base-100 hover:bg-base-450/50 transition-all duration-500">
                  <span className="w-2 h-2 rounded-full bg-base-400 group-hover:bg-base-100 transition-colors duration-300 flex-shrink-0" />
                  <span className="text-[clamp(1rem,2vw,1.5rem)] font-bold text-base-350 group-hover:text-base-100 transition-colors duration-500 whitespace-nowrap uppercase tracking-wider">
                    {tech}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — solid filled pills scrolling right */}
        <div className="relative flex overflow-hidden mb-4">
          <div className="flex gap-4 animate-marquee-slow-reverse shrink-0">
            {[...caseStudy.techStack, ...caseStudy.techStack, ...caseStudy.techStack]
              .reverse()
              .map((tech, i) => (
                <div key={i} className="flex-shrink-0 group cursor-default">
                  <div className="flex items-center gap-3 rounded-full bg-base-450 px-8 py-4 hover:bg-base-400 transition-all duration-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-base-300 flex-shrink-0" />
                    <span className="text-[clamp(0.9rem,1.8vw,1.3rem)] font-medium text-base-300 group-hover:text-base-100 transition-colors duration-500 whitespace-nowrap tracking-wide">
                      {tech}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Row 3 — ghost text scrolling left slower */}
        <div className="relative flex overflow-hidden">
          <div
            className="flex gap-12 shrink-0"
            style={{ animation: "marquee-slow 40s linear infinite" }}
          >
            {[...caseStudy.techStack, ...caseStudy.techStack, ...caseStudy.techStack].map((tech, i) => (
              <span
                key={i}
                className="flex-shrink-0 text-[clamp(3rem,6vw,5rem)] font-black whitespace-nowrap select-none cursor-default hover:opacity-100 transition-opacity duration-500"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.08)",
                  color: "transparent",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom separator */}
        <div className="px-8 md:px-24 mt-16 flex items-center gap-6">
          <div className="h-px flex-1 bg-base-400/20" />
          <span className="text-xs font-mono text-base-400 uppercase tracking-widest">
            Production ready
          </span>
          <div className="h-px flex-1 bg-base-400/20" />
        </div>
      </section>

      {/* TESTIMONIAL */}
      {caseStudy.testimonial && (
        <section
          ref={quoteRef}
          className="min-h-screen bg-base-500 flex items-center justify-center px-8 md:px-24 py-32 relative overflow-hidden"
        >
          <span
            className="absolute top-12 left-1/2 text-[30vw] font-black leading-none select-none pointer-events-none"
            style={{
              color: "rgba(255,255,255,0.03)",
              opacity: quoteVisible ? 1 : 0,
              transform: quoteVisible
                ? "translate(-50%, 0)"
                : "translate(-50%, -30px)",
              transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            &ldquo;
          </span>
          <div className="relative z-10 max-w-5xl text-center">
            <blockquote
              className="text-[clamp(2rem,4vw,3.5rem)] font-medium text-base-100 leading-[1.15] tracking-[-1px] text-center"
              style={{
                opacity: quoteVisible ? 1 : 0,
                transform: quoteVisible ? "translateY(0)" : "translateY(50px)",
                transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1) 300ms",
              }}
            >
              {caseStudy.testimonial.quote}
            </blockquote>
            <div
              className="mt-12 flex items-center justify-center gap-6"
              style={{
                opacity: quoteVisible ? 1 : 0,
                transform: quoteVisible ? "translateX(0)" : "translateX(-20px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 800ms",
              }}
            >
              <div className="h-px w-12 bg-base-400" />
              <div className="text-left">
                <p className="text-base-100 font-medium">
                  {caseStudy.testimonial.author}
                </p>
                <p className="text-base-350 text-sm mt-1">
                  {caseStudy.testimonial.role}
                </p>
              </div>
              <div className="h-px w-12 bg-base-400" />
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CTA — cursor glow */}
      <section
        ref={ctaSectionRef}
        onMouseMove={handleMouseMove}
        className="min-h-screen bg-base-450 flex flex-col items-center justify-center relative overflow-hidden cursor-none"
      >
        <div
          className="pointer-events-none absolute w-96 h-96 rounded-full blur-[100px] bg-base-200/5 transition-transform duration-100"
          style={{ left: mouse.x - 192, top: mouse.y - 192 }}
        />
        <div ref={ctaRevealRef} className="relative z-10 flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.4em] text-base-350 mb-8">
            Next step
          </p>
          <h2 className="text-[clamp(4rem,10vw,10rem)] font-black tracking-[-6px] leading-[0.9] text-base-100 text-center uppercase mb-16">
            <span className="block">
              {ctaLine1.map((ch, idx) => (
                <span
                  key={`l1-${idx}`}
                  className="inline-block"
                  style={{
                    opacity: ctaVisible ? 1 : 0,
                    transform: ctaVisible ? "translateY(0)" : "translateY(100px)",
                    transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 40}ms`,
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>
            <span className="block">
              {ctaLine2.map((ch, idx) => {
                const letterIndex = ctaLine1.length + idx;
                return (
                  <span
                    key={`l2-${idx}`}
                    className="inline-block"
                    style={{
                      opacity: ctaVisible ? 1 : 0,
                      transform: ctaVisible ? "translateY(0)" : "translateY(100px)",
                      transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${letterIndex * 40}ms`,
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          </h2>
          <div
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(0.95)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 800ms",
            }}
          >
            <CTAButton href="/contact" label="Let's talk" />
          </div>
        </div>
      </section>
    </>
  );
}
