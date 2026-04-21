"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { RevealText } from "./RevealText";
import { getFeaturedProjects } from "@/data/projects";

const projects = getFeaturedProjects();

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
            {projects.map((project) => (
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

                  {/* Right side — visual placeholder */}
                  <div className="hidden flex-1 items-center justify-center rounded-3xl bg-base-500/50 md:flex">
                    <p className="text-lg font-medium text-base-350">
                      {project.featuredDetail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
