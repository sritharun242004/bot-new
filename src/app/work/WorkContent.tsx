"use client";

import Link from "next/link";
import { RevealText } from "@/components/RevealText";
import { useReveal } from "@/hooks/useReveal";
import { getMainProjects, getExperimentalProjects } from "@/data/projects";

const projects = getMainProjects();
const experimental = getExperimentalProjects();

export function WorkContent() {
  const gridRef = useReveal();
  const expRef = useReveal();

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-32 text-center">
        <span className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[20vw] font-black leading-none text-base-450">
          WORK
        </span>
        <p className="relative z-10 text-sm uppercase tracking-widest text-base-350">
          Our Work
        </p>
        <h1 className="relative z-10 mt-4 text-[clamp(3rem,7vw,6rem)] font-bold tracking-[-3px] text-base-100">
          AI implementations<br />that work.
        </h1>
      </div>

      {/* Magazine grid */}
      <section className="bg-base-500 px-6 pb-16 md:px-12">
        <div ref={gridRef} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((p, i) => {
            const isLarge = i % 4 === 0 || i % 4 === 3;
            const colSpan = isLarge ? "md:col-span-2" : "md:col-span-1";

            const bg = i % 2 === 0 ? "bg-base-450" : "bg-base-200";
            const isLight = bg === "bg-base-200";

            const tagClass = "text-base-350";
            const titleClass = isLight ? "text-base-500" : "text-base-100";
            const descClass = isLight ? "text-base-400" : "text-base-250";
            const arrowClass = isLight
              ? "border-base-400/30 text-base-400 group-hover:bg-base-500 group-hover:text-white"
              : "border-white/20 text-white/50 group-hover:bg-white group-hover:text-base-500";

            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={`group relative min-h-[500px] cursor-pointer overflow-hidden rounded-3xl ${bg} ${colSpan}`}
              >
                {/* Background with hover zoom */}
                <div className={`absolute inset-0 ${bg} transition-transform duration-700 group-hover:scale-105`} />

                {/* Arrow badge */}
                <div className={`absolute top-6 right-6 h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-300
${i % 2 === 0
  ? 'border-base-300/70 text-base-200 group-hover:bg-base-500 group-hover:text-base-100 group-hover:border-base-500'
  : 'border-base-500/50 text-base-500 group-hover:bg-base-500 group-hover:text-base-100 group-hover:border-base-500'
}`}>
                  →
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className={`mb-2 text-xs uppercase tracking-widest ${tagClass}`}>
                    {p.tag}
                  </p>
                  <h3 className={`text-[clamp(1.5rem,3vw,2.5rem)] font-bold ${titleClass}`}>
                    {p.title}
                  </h3>
                  {isLarge && (
                    <p className={`mt-2 text-sm ${descClass}`}>{p.desc}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Experimental */}
      <section className="bg-base-500 px-6 py-24 md:px-12">
        <div className="w-full">
          <p className="text-sm font-medium uppercase tracking-wider text-base-350">
            Experimental Builds
          </p>
          <RevealText
            text="Small ideas, shipped fast."
            as="h2"
            className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-2px] text-base-100"
          />
          <p className="mt-4 max-w-lg text-base font-medium text-base-300">
            Quick prototypes that prove a concept, test an interaction, or explore new workflows.
          </p>

          <div ref={expRef} className="mt-12 flex flex-col gap-4 md:flex-row md:overflow-x-auto md:pb-4 md:scrollbar-hide">
            {experimental.map((p, i) => {
              const isLight = i % 2 === 1;
              const cardBg = isLight
                ? "bg-base-100 border border-base-400/20"
                : "bg-base-450";
              const tagClass = isLight ? "text-base-400" : "text-base-350";
              const titleClass = isLight ? "text-base-500" : "text-base-100";
              const descClass = isLight ? "text-base-400" : "text-base-350";
              const arrowClass = isLight
                ? "bg-base-500 text-base-100"
                : "bg-base-100 text-base-500";

              return (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className={`group relative flex h-auto min-h-[220px] w-full md:h-[280px] md:w-[400px] md:flex-shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-3xl p-8 ${cardBg}`}
                >
                  <span
                    className="pointer-events-none absolute right-6 top-4 select-none text-[8rem] font-black leading-none"
                    style={{ color: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)" }}
                  >
                    {i + 1}
                  </span>

                  <div className={`flex items-center gap-3 text-xs font-medium uppercase tracking-widest ${tagClass}`}>
                    <span>{p.timeline}</span>
                    <span className={`h-1 w-1 rounded-full ${isLight ? "bg-base-400" : "bg-base-350"}`} />
                    <span>{p.tag}</span>
                  </div>

                  <div className="mt-auto">
                    <h3 className={`text-2xl font-bold ${titleClass}`}>
                      {p.title}
                    </h3>
                    <p className={`mt-2 text-sm ${descClass}`}>
                      {p.desc}
                    </p>
                  </div>

                  <div
                    className={`absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100 ${arrowClass}`}
                  >
                    →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
