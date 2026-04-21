"use client";

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
  { name: "OpenAI", category: "LLM PROVIDER" },
  { name: "LangChain", category: "ORCHESTRATION" },
  { name: "Next.js", category: "FRONTEND" },
  { name: "Python", category: "AI & BACKEND" },
  { name: "AWS", category: "CLOUD INFRA" },
  { name: "Pinecone", category: "VECTOR SEARCH" },
];

export function AboutContent() {
  const whoRef = useReveal();
  const journeyRef = useReveal();
  const toolsRef = useReveal();

  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[80vh] items-end bg-base-500 px-6 pb-20 pt-32 md:px-12">
        <div className="mx-auto max-w-6xl">
          <RevealText
            text={"We build bots\nthat think."}
            as="h1"
            className="text-[clamp(3rem,7vw,5rem)] font-medium leading-[1.05] tracking-[-4px] text-base-100"
          />
          <div className="mt-8 max-w-xl">
            <p className="text-base font-medium leading-relaxed text-base-200">
              Not another consulting deck. Not a proof-of-concept that dies on the vine.
              We build AI that runs in production, fits your workflows, and keeps getting better.
            </p>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section ref={whoRef} className="bg-base-500 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="reveal-up text-base font-medium text-base-350">Who we are</p>
          <RevealText
            text={
              "We're the AI partner that sticks.\nWhile others hand you a deck and\ndisappear, we find opportunities,\nbuild the systems, and stay on to\nmake sure they actually work."
            }
            as="h3"
            className="mt-6 text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-[-1.2px] text-base-100"
          />
        </div>
      </section>

      {/* The full AI journey */}
      <section className="bg-base-500 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-wider text-base-350">
            How we help
          </p>
          <RevealText
            text="The full AI journey"
            as="h2"
            className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[550] tracking-[-2.4px] text-base-200"
          />
          <p className="mt-4 max-w-lg text-base font-medium text-base-300">
            From figuring out where AI fits to building it and keeping it running — we cover the whole path.
          </p>

          <div ref={journeyRef} className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {journey.map((item, i) => (
              <div
                key={item.title}
                className="reveal-up rounded-3xl bg-base-450 p-8"
                data-delay={i}
              >
                <h3 className="text-2xl font-medium tracking-[-1.2px] text-base-100">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-base-250">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech toolkit */}
      <section className="bg-base-500 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-wider text-base-350">
            Our AI toolkit
          </p>
          <RevealText
            text="Built on proven tech"
            as="h2"
            className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[550] tracking-[-2.4px] text-base-200"
          />
          <p className="mt-4 max-w-lg text-base font-medium text-base-300">
            The tools we use daily to build AI systems that are stable, secure, and easy to improve over time.
          </p>

          <div ref={toolsRef} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {tools.map((tool, i) => (
              <div
                key={tool.name}
                className="reveal-up rounded-3xl bg-base-450 p-6"
                data-delay={Math.min(i, 4)}
              >
                <div className="mb-4 h-24 rounded-2xl bg-base-500/50" />
                <h3 className="text-xl font-medium text-base-100">{tool.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-base-350">
                  {tool.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
