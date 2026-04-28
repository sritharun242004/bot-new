"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { RevealText } from "./RevealText";
import { getFeaturedProjects } from "@/data/projects";

const projects = getFeaturedProjects();

function NeuralNetworkVisual() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="nnGlow">
          <stop offset="0%" stopColor="#4a9eff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4a9eff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="#4a9eff" strokeWidth="1" opacity="0.35">
        <line x1="80" y1="80" x2="200" y2="200" />
        <line x1="320" y1="80" x2="200" y2="200" />
        <line x1="80" y1="320" x2="200" y2="200" />
        <line x1="320" y1="320" x2="200" y2="200" />
        <line x1="80" y1="80" x2="320" y2="80" />
        <line x1="80" y1="320" x2="320" y2="320" />
        <line x1="80" y1="200" x2="200" y2="200" />
        <line x1="320" y1="200" x2="200" y2="200" />
      </g>
      <circle cx="80" cy="80" r="6" fill="#4a9eff" opacity="0.8" />
      <circle cx="320" cy="80" r="6" fill="#4a9eff" opacity="0.8" />
      <circle cx="80" cy="200" r="5" fill="#4a9eff" opacity="0.7" />
      <circle cx="320" cy="200" r="5" fill="#4a9eff" opacity="0.7" />
      <circle cx="80" cy="320" r="6" fill="#4a9eff" opacity="0.8" />
      <circle cx="320" cy="320" r="6" fill="#4a9eff" opacity="0.8" />
      <circle cx="200" cy="200" r="30" fill="url(#nnGlow)">
        <animate attributeName="r" values="20;45;20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="200" r="10" fill="#00d4ff" />
    </svg>
  );
}

function FlowingPipelineVisual() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect x="40" y="170" width="60" height="60" rx="8" fill="none" stroke="#00ff88" strokeWidth="1.5" opacity="0.7" />
      <rect x="170" y="170" width="60" height="60" rx="8" fill="none" stroke="#00ff88" strokeWidth="1.5" opacity="0.7" />
      <rect x="300" y="170" width="60" height="60" rx="8" fill="none" stroke="#00ff88" strokeWidth="1.5" opacity="0.7" />
      <circle cx="70" cy="200" r="4" fill="#00ff88" />
      <circle cx="200" cy="200" r="4" fill="#00ff88" />
      <circle cx="330" cy="200" r="4" fill="#00ff88" />
      <line x1="100" y1="200" x2="170" y2="200" stroke="#00ff88" strokeWidth="2" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="230" y1="200" x2="300" y2="200" stroke="#00ff88" strokeWidth="2" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1s" repeatCount="indefinite" />
      </line>
      <polygon points="160,196 172,200 160,204" fill="#00ff88" />
      <polygon points="290,196 302,200 290,204" fill="#00ff88" />
      <rect x="105" y="60" width="60" height="60" rx="8" fill="none" stroke="#00ff88" strokeWidth="1.2" opacity="0.4" />
      <rect x="235" y="280" width="60" height="60" rx="8" fill="none" stroke="#00ff88" strokeWidth="1.2" opacity="0.4" />
      <line x1="135" y1="120" x2="135" y2="170" stroke="#00ff88" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <line x1="265" y1="230" x2="265" y2="280" stroke="#00ff88" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
}

function DashboardMockupVisual() {
  const bars = [40, 60, 35, 80, 50, 90, 70];
  return (
    <div className="h-full w-full p-8">
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="rounded-xl border border-base-400/50 bg-base-450/80 p-4">
          <div className="text-[10px] uppercase tracking-widest text-base-350">Revenue</div>
          <div className="mt-2 text-2xl font-semibold text-base-100">$42.8k</div>
          <div className="mt-1 text-xs text-emerald-400">↑ 12.4%</div>
        </div>
        <div className="rounded-xl border border-base-400/50 bg-base-450/80 p-4">
          <div className="text-[10px] uppercase tracking-widest text-base-350">Conv. rate</div>
          <div className="mt-2 text-2xl font-semibold text-base-100">3.8%</div>
          <div className="mt-1 text-xs text-emerald-400">↑ 0.9%</div>
        </div>
        <div className="col-span-2 rounded-xl border border-base-400/50 bg-base-450/80 p-4">
          <div className="text-[10px] uppercase tracking-widest text-base-350">7-day sales</div>
          <div className="mt-4 flex h-24 items-end gap-2">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-base-100/80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeometricPatternVisual() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <g fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.35">
        <circle cx="200" cy="200" r="40">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="200" r="80">
          <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="30s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="200" r="120" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="40s" repeatCount="indefinite" />
        </circle>
        <rect x="150" y="150" width="100" height="100">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="25s" repeatCount="indefinite" />
        </rect>
        <polygon points="200,100 270,260 130,260">
          <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="35s" repeatCount="indefinite" />
        </polygon>
      </g>
    </svg>
  );
}

const visuals = [NeuralNetworkVisual, FlowingPipelineVisual, DashboardMockupVisual];

export function FeaturedWork() {
  const headerRef = useReveal();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const scrollableWidth = track.scrollWidth - window.innerWidth;
      const sectionHeight = section.offsetHeight - window.innerHeight;

      if (sectionTop < 0 || sectionTop > sectionHeight) return;

      const progress = sectionTop / sectionHeight;
      const translateX = progress * scrollableWidth;
      track.style.transform = `translateX(-${translateX}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Height = enough vertical scroll to move through all cards
  const scrollHeight = `${projects.length * 100}vh`;

  return (
    <section className="relative bg-base-500">
      {/* Header */}
      <div ref={headerRef} className="px-6 pt-32 pb-12 text-center md:px-12">
        <p className="reveal-up text-base font-medium text-base-350">
          Featured work
        </p>
        <RevealText
          text={"What we build\nfor businesses like yours"}
          as="h2"
          className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[550] leading-tight tracking-[-2.4px] text-base-200"
        />
      </div>

      {/* Horizontal scroll container */}
      <div ref={sectionRef} style={{ height: scrollHeight }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full items-center gap-6 px-6 will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {projects.map((project, i) => {
              const Visual = visuals[i] ?? GeometricPatternVisual;
              return (
                <div
                  key={project.slug}
                  className="h-[calc(100vh-4rem)] w-[calc(100vw-3rem)] flex-shrink-0"
                >
                  <div className="relative flex h-full w-full flex-col gap-6 overflow-hidden rounded-[2rem] bg-base-450 p-8 md:flex-row md:p-12">
                    {/* Left content */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <span className="text-sm font-medium uppercase tracking-wider text-base-350">
                          {project.tag}
                        </span>
                        <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,3rem)] font-medium tracking-[-1.2px] text-base-100">
                          {project.title}
                        </h2>
                        <p className="mt-4 max-w-md text-base leading-relaxed text-base-250">
                          {project.desc}
                        </p>
                      </div>
                      <div className="mt-8">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-base-100/75 px-6 py-3 text-sm font-semibold text-base-500 backdrop-blur-[10px] transition-opacity hover:opacity-90"
                        >
                          View details
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                          >
                            <path d="M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Right side — dynamic visual panel */}
                    <div className="relative hidden flex-1 items-center justify-center overflow-hidden rounded-3xl bg-base-500/80 md:flex">
                      <Visual />
                      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs uppercase tracking-widest text-base-350">
                        {project.featuredDetail}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
