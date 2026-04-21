"use client";

import Link from "next/link";
import { RevealText } from "@/components/RevealText";
import { useReveal } from "@/hooks/useReveal";
import { CTAButton } from "@/components/CTAButton";
import type { Project } from "@/data/projects";

export function CaseStudyContent({ project }: { project: Project }) {
  const infoRef = useReveal();
  const challengeRef = useReveal();
  const approachRef = useReveal();
  const solutionRef = useReveal();
  const resultsRef = useReveal();
  const techRef = useReveal();
  const testimonialRef = useReveal();
  const ctaRef = useReveal();

  const { caseStudy } = project;

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[60vh] items-end bg-base-500 px-6 pb-16 pt-32 md:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div ref={infoRef}>
            <Link
              href="/work"
              className="reveal-up inline-flex items-center gap-2 text-sm font-medium text-base-350 transition-colors hover:text-base-100"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="rotate-180"
              >
                <path d="M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z" />
              </svg>
              Back to Work
            </Link>
            <div className="reveal-up mt-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-base-350" data-delay="1">
              <span>{project.tag}</span>
              <span className="h-1 w-1 rounded-full bg-base-350" />
              <span>{project.timeline}</span>
            </div>
          </div>
          <RevealText
            text={project.title}
            as="h1"
            className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.05] tracking-[-4px] text-base-100"
          />
          <div ref={useReveal()}>
            <p className="reveal-up mt-6 max-w-2xl text-lg font-medium leading-relaxed text-base-200">
              {project.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Image placeholder */}
      <section className="bg-base-500 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="h-64 rounded-3xl bg-base-450 md:h-96" />
        </div>
      </section>

      {/* Challenge */}
      <section className="bg-base-500 px-6 py-24 md:px-12">
        <div ref={challengeRef} className="mx-auto max-w-6xl">
          <p className="reveal-up text-sm font-medium uppercase tracking-wider text-base-350">
            The Challenge
          </p>
          <h2 className="reveal-up mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-[550] tracking-[-2.4px] text-base-200" data-delay="1">
            What we were solving
          </h2>
          <p className="reveal-up mt-6 max-w-3xl text-base font-medium leading-relaxed text-base-250" data-delay="2">
            {caseStudy.challenge}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-base-500 px-6 pb-24 md:px-12">
        <div ref={approachRef} className="mx-auto max-w-6xl">
          <p className="reveal-up text-sm font-medium uppercase tracking-wider text-base-350">
            Our Approach
          </p>
          <h2 className="reveal-up mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-[550] tracking-[-2.4px] text-base-200" data-delay="1">
            How we tackled it
          </h2>
          <p className="reveal-up mt-6 max-w-3xl text-base font-medium leading-relaxed text-base-250" data-delay="2">
            {caseStudy.approach}
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-base-500 px-6 pb-24 md:px-12">
        <div ref={solutionRef} className="mx-auto max-w-6xl">
          <p className="reveal-up text-sm font-medium uppercase tracking-wider text-base-350">
            The Solution
          </p>
          <h2 className="reveal-up mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-[550] tracking-[-2.4px] text-base-200" data-delay="1">
            What we delivered
          </h2>
          <p className="reveal-up mt-6 max-w-3xl text-base font-medium leading-relaxed text-base-250" data-delay="2">
            {caseStudy.solution}
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="bg-base-500 px-6 pb-24 md:px-12">
        <div ref={resultsRef} className="mx-auto max-w-6xl">
          <p className="reveal-up text-sm font-medium uppercase tracking-wider text-base-350">
            Results
          </p>
          <h2 className="reveal-up mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-[550] tracking-[-2.4px] text-base-200" data-delay="1">
            The impact
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {caseStudy.results.map((result, i) => (
              <div
                key={i}
                className="reveal-up rounded-2xl bg-base-450 p-6"
                data-delay={Math.min(i + 2, 5)}
              >
                <p className="text-base font-medium text-base-100">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-base-500 px-6 pb-24 md:px-12">
        <div ref={techRef} className="mx-auto max-w-6xl">
          <p className="reveal-up text-sm font-medium uppercase tracking-wider text-base-350">
            Tech Stack
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {caseStudy.techStack.map((tech, i) => (
              <span
                key={tech}
                className="reveal-up rounded-full border border-base-400 px-4 py-2 text-sm font-medium text-base-200"
                data-delay={Math.min(i + 1, 5)}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="bg-base-500 px-6 pb-24 md:px-12">
          <div ref={testimonialRef} className="mx-auto max-w-6xl">
            <div className="reveal-up rounded-3xl bg-base-450 p-8 md:p-12">
              <blockquote className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-relaxed tracking-[-0.5px] text-base-100">
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <p className="text-base font-semibold text-base-100">
                  {caseStudy.testimonial.author}
                </p>
                <p className="text-sm font-medium text-base-350">
                  {caseStudy.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-base-500 px-6 pb-24 md:px-12">
        <div ref={ctaRef} className="mx-auto max-w-6xl text-center">
          <RevealText
            text={"Ready to build\nsomething similar?"}
            as="h2"
            className="text-[clamp(2rem,4vw,3.5rem)] font-[550] leading-tight tracking-[-2.4px] text-base-200"
          />
          <div className="reveal-up mt-8 flex justify-center">
            <CTAButton href="/contact" label="Get in touch" />
          </div>
        </div>
      </section>
    </>
  );
}
