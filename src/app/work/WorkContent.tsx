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
      <section className="flex min-h-[60vh] items-end bg-base-500 px-6 pb-16 pt-32 md:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-base-350">
            Work
          </p>
          <RevealText
            text={"AI implementations\nthat work."}
            as="h1"
            className="mt-4 text-[clamp(3rem,7vw,5rem)] font-medium leading-[1.05] tracking-[-4px] text-base-100"
          />
          <p className="mx-auto mt-8 max-w-lg text-base font-medium text-base-200">
            A few examples of how we help businesses put AI to work —
            from strategy through ongoing partnership.
          </p>
        </div>
      </section>

      {/* Project grid */}
      <section className="bg-base-500 px-6 py-8 md:px-12">
        <div ref={gridRef} className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="reveal-up group rounded-3xl bg-base-450 p-8 transition-colors hover:bg-base-450/80"
              data-delay={Math.min(i, 4)}
            >
              <div className="mb-4 h-48 rounded-2xl bg-base-500/50" />
              <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-base-350">
                <span>{p.timeline}</span>
                <span className="h-1 w-1 rounded-full bg-base-350" />
                <span>{p.tag}</span>
              </div>
              <h3 className="mt-3 text-2xl font-medium tracking-[-1.2px] text-base-100">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-base-250">
                {p.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Experimental */}
      <section className="bg-base-500 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-wider text-base-350">
            Experimental Builds
          </p>
          <RevealText
            text="Small ideas, shipped fast."
            as="h2"
            className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-[550] tracking-[-2.4px] text-base-200"
          />
          <p className="mt-4 max-w-lg text-base font-medium text-base-300">
            Quick prototypes that prove a concept, test an interaction, or explore new workflows.
          </p>

          <div ref={expRef} className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {experimental.map((p, i) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="reveal-up rounded-3xl bg-base-450 p-8"
                data-delay={i}
              >
                <div className="mb-4 h-36 rounded-2xl bg-base-500/50" />
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-base-350">
                  <span>{p.timeline}</span>
                  <span className="h-1 w-1 rounded-full bg-base-350" />
                  <span>{p.tag}</span>
                </div>
                <h3 className="mt-3 text-xl font-medium tracking-[-1.2px] text-base-100">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-base-250">
                  {p.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
