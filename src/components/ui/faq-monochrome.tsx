"use client";

import React, { useEffect, useMemo, useState } from "react";

const INTRO_STYLE_ID = "faq1-animations";

const faqs = [
  {
    question: "How do I know if AI is right for my business?",
    answer: "If you have repetitive tasks, unstructured data to process, or customer questions that could be answered faster — AI probably has a role. We start with a discovery session to find out where the real opportunities are.",
    meta: "Discovery",
  },
  {
    question: "What does 'AI partner' actually mean?",
    answer: "It means we don't just build and leave. We stay on to monitor, improve, and expand your AI systems. Think of us as your ongoing AI team — not a one-time vendor.",
    meta: "Partnership",
  },
  {
    question: "How long until we see results?",
    answer: "Most projects show first results in 2–4 weeks. We prioritize quick wins that prove value fast, then expand from there.",
    meta: "Timeline",
  },
  {
    question: "What about our data privacy?",
    answer: "Your data stays private. We never send it to public training sets, and we build on infrastructure you control. Enterprise-grade security is built into every layer.",
    meta: "Security",
  },
  {
    question: "Do we need a technical team?",
    answer: "No. We handle the entire technical side — from strategy to deployment. Your team just needs to show up and tell us what's frustrating them.",
    meta: "Teams",
  },
  {
    question: "What if AI doesn't work for our use case?",
    answer: "We'll tell you honestly. Part of our job is knowing when NOT to use AI. If a simpler solution works better, we'll recommend that instead.",
    meta: "Honesty",
  },
  {
    question: "How do you charge?",
    answer: "We work on project-based pricing with clear milestones. No hourly billing surprises. For ongoing partnerships, we offer monthly retainers.",
    meta: "Pricing",
  },
  {
    question: "Can you work with our existing tech stack?",
    answer: "Yes. We integrate with whatever you're already using — CRMs, databases, APIs, cloud platforms. No rip-and-replace required.",
    meta: "Systems",
  },
  {
    question: "What makes you different from other AI agencies?",
    answer: "We stay. Most agencies build and leave. We build, monitor, improve, and expand. We're honest about what's worth building and what isn't.",
    meta: "Difference",
  },
  {
    question: "What types of bots do you build?",
    answer: "AI agents, custom GPTs, chat systems, automation bots, data processing pipelines, and intelligent internal tools. If it can think, we can build it.",
    meta: "Services",
  },
];

const palettes = {
  dark: {
    surface: "bg-neutral-950 text-neutral-100",
    panel: "bg-neutral-900/50",
    border: "border-white/10",
    heading: "text-white",
    muted: "text-neutral-400",
    iconRing: "border-white/20",
    iconSurface: "bg-white/5",
    icon: "text-white",
    toggle: "border-white/20 text-white",
    toggleSurface: "bg-white/10",
    glow: "rgba(255, 255, 255, 0.08)",
    aurora: "radial-gradient(ellipse 50% 100% at 10% 0%, rgba(226, 232, 240, 0.15), transparent 65%), #000000",
    shadow: "shadow-[0_36px_140px_-60px_rgba(10,10,10,0.95)]",
    overlay: "linear-gradient(130deg, rgba(255,255,255,0.04) 0%, transparent 65%)",
  },
  light: {
    surface: "bg-slate-100 text-neutral-900",
    panel: "bg-white/70",
    border: "border-neutral-200",
    heading: "text-neutral-900",
    muted: "text-neutral-600",
    iconRing: "border-neutral-300",
    iconSurface: "bg-neutral-900/5",
    icon: "text-neutral-900",
    toggle: "border-neutral-200 text-neutral-900",
    toggleSurface: "bg-white",
    glow: "rgba(15, 15, 15, 0.08)",
    aurora: "radial-gradient(ellipse 50% 100% at 10% 0%, rgba(15, 23, 42, 0.08), rgba(255, 255, 255, 0.95) 70%)",
    shadow: "shadow-[0_36px_120px_-70px_rgba(15,15,15,0.18)]",
    overlay: "linear-gradient(130deg, rgba(15,23,42,0.08) 0%, transparent 70%)",
  },
};

function FAQ1() {
  const getRootTheme = (): "dark" | "light" => {
    if (typeof document === "undefined") return "dark";
    const dataTheme = document.documentElement.dataset.theme;
    if (dataTheme === "light") return "light";
    if (dataTheme === "dark") return "dark";
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "light") return "light";
    if (saved === "dark") return "dark";
    if (document.documentElement.classList.contains("dark")) return "dark";
    if (document.documentElement.classList.contains("light")) return "light";
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  };

  const [theme, setTheme] = useState<"dark" | "light">(getRootTheme);
  const [introReady, setIntroReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(INTRO_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = INTRO_STYLE_ID;
    style.innerHTML = `
      @keyframes faq1-fade-up {
        0% { transform: translate3d(0, 20px, 0); opacity: 0; filter: blur(6px); }
        60% { filter: blur(0); }
        100% { transform: translate3d(0, 0, 0); opacity: 1; filter: blur(0); }
      }
      @keyframes faq1-beam-spin {
        0% { transform: rotate(0deg) scale(1); }
        100% { transform: rotate(360deg) scale(1); }
      }
      @keyframes faq1-pulse {
        0% { transform: scale(0.7); opacity: 0.55; }
        60% { opacity: 0.1; }
        100% { transform: scale(1.25); opacity: 0; }
      }
      @keyframes faq1-meter {
        0%, 20% { transform: scaleX(0); transform-origin: left; }
        45%, 60% { transform: scaleX(1); transform-origin: left; }
        80%, 100% { transform: scaleX(0); transform-origin: right; }
      }
      @keyframes faq1-tick {
        0%, 30% { transform: translateX(-6px); opacity: 0.4; }
        50% { transform: translateX(2px); opacity: 1; }
        100% { transform: translateX(20px); opacity: 0; }
      }
      .faq1-intro {
        position: relative; display: flex; align-items: center; gap: 0.85rem;
        padding: 0.85rem 1.4rem; border-radius: 9999px; overflow: hidden;
        border: 1px solid rgba(255,255,255,0.12); background: rgba(12,12,12,0.42);
        color: rgba(248,250,252,0.92); text-transform: uppercase; letter-spacing: 0.35em;
        font-size: 0.65rem; width: 100%; max-width: 24rem; margin: 0 auto;
        mix-blend-mode: screen; opacity: 0; transform: translate3d(0,12px,0);
        filter: blur(8px); transition: opacity 720ms ease, transform 720ms ease, filter 720ms ease;
        isolation: isolate;
      }
      .faq1-intro--light { border-color: rgba(17,17,17,0.12); background: rgba(248,250,252,0.88); color: rgba(15,23,42,0.78); mix-blend-mode: multiply; }
      .faq1-intro--active { opacity: 1; transform: translate3d(0,0,0); filter: blur(0); }
      .faq1-intro__beam, .faq1-intro__pulse { position: absolute; inset: -110%; pointer-events: none; border-radius: 50%; }
      .faq1-intro__beam { background: conic-gradient(from 160deg, rgba(226,232,240,0.25), transparent 32%, rgba(148,163,184,0.22) 58%, transparent 78%, rgba(148,163,184,0.18)); animation: faq1-beam-spin 18s linear infinite; opacity: 0.55; }
      .faq1-intro--light .faq1-intro__beam { background: conic-gradient(from 180deg, rgba(15,23,42,0.18), transparent 30%, rgba(71,85,105,0.18) 58%, transparent 80%, rgba(15,23,42,0.14)); }
      .faq1-intro__pulse { border: 1px solid currentColor; opacity: 0.25; animation: faq1-pulse 3.4s ease-out infinite; }
      .faq1-intro__label { position: relative; z-index: 1; font-weight: 600; letter-spacing: 0.4em; }
      .faq1-intro__meter { position: relative; z-index: 1; flex: 1 1 auto; height: 1px; background: linear-gradient(90deg, transparent, currentColor 35%, transparent 85%); transform: scaleX(0); transform-origin: left; animation: faq1-meter 5.8s ease-in-out infinite; opacity: 0.7; }
      .faq1-intro__tick { position: relative; z-index: 1; width: 0.55rem; height: 0.55rem; border-radius: 9999px; background: currentColor; box-shadow: 0 0 0 4px rgba(255,255,255,0.1); animation: faq1-tick 3.2s ease-in-out infinite; }
      .faq1-intro--light .faq1-intro__tick { box-shadow: 0 0 0 4px rgba(15,15,15,0.08); }
      .faq1-fade { opacity: 0; transform: translate3d(0,24px,0); filter: blur(12px); transition: opacity 700ms ease, transform 700ms ease, filter 700ms ease; }
      .faq1-fade--ready { animation: faq1-fade-up 860ms cubic-bezier(0.22,0.68,0,1) forwards; }
    `;
    document.head.appendChild(style);
    return () => { if (style.parentNode) style.remove(); };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") { setIntroReady(true); return; }
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const applyThemeFromRoot = () => setTheme(getRootTheme());
    applyThemeFromRoot();
    const observer = new MutationObserver(applyThemeFromRoot);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    const handleStorage = (event: StorageEvent) => { if (event.key === "bento-theme") applyThemeFromRoot(); };
    window.addEventListener("storage", handleStorage);
    return () => { observer.disconnect(); window.removeEventListener("storage", handleStorage); };
  }, []);

  const palette = useMemo(() => palettes[theme], [theme]);

  const siteThemeVars: Record<string, Record<string, string>> = {
    dark: {
      "--base-100": "#FFFFFF", "--base-200": "#D4D4D4", "--base-250": "#A3A3A3",
      "--base-300": "#787878", "--base-350": "#525252", "--base-400": "#333333",
      "--base-450": "#171717", "--base-500": "#000000",
      "--selection-bg": "rgba(255,255,255,0.15)",
    },
    light: {
      "--base-100": "#000000", "--base-200": "#1A1A1A", "--base-250": "#404040",
      "--base-300": "#606060", "--base-350": "#808080", "--base-400": "#D4D4D4",
      "--base-450": "#F0F0F0", "--base-500": "#FFFFFF",
      "--selection-bg": "rgba(0,0,0,0.15)",
    },
  };

  const toggleTheme = () => {
    if (typeof document === "undefined") return;
    const next: "dark" | "light" = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.dataset.theme = next;
    Object.entries(siteThemeVars[next]).forEach(([k, v]) => root.style.setProperty(k, v));
    setTheme(next);
    try { window.localStorage?.setItem("theme", next); } catch (_err) { /* ignore */ }
  };

  const toggleQuestion = (index: number) => setActiveIndex((prev) => (prev === index ? -1 : index));

  useEffect(() => {
    if (typeof window === "undefined") { setHasEntered(true); return; }
    let timeout: ReturnType<typeof globalThis.setTimeout>;
    const onLoad = () => { timeout = globalThis.setTimeout(() => setHasEntered(true), 120); };
    if (document.readyState === "complete") { onLoad(); }
    else { window.addEventListener("load", onLoad, { once: true }); }
    return () => { window.removeEventListener("load", onLoad); window.clearTimeout(timeout); };
  }, []);

  const setCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--faq-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--faq-y", `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    target.style.removeProperty("--faq-x");
    target.style.removeProperty("--faq-y");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-base-500 transition-colors duration-300">

      <section className={`relative z-10 mx-auto flex max-w-4xl flex-col gap-12 px-6 py-24 lg:max-w-5xl lg:px-12 ${hasEntered ? "faq1-fade--ready" : "faq1-fade"}`}>
        <header className="flex flex-col gap-4">
          <p className={`text-xs uppercase tracking-[0.35em] ${palette.muted}`}>Questions</p>
          <h1 className={`text-4xl font-semibold leading-tight md:text-5xl ${palette.heading}`}>
            Got questions? We have answers.
          </h1>
          <p className={`max-w-xl text-base ${palette.muted}`}>
            Everything you need to know about how we build, timelines, security, and ownership.
          </p>
        </header>

        <ul className="space-y-4">
          {faqs.map((item, index) => {
            const open = activeIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-trigger-${index}`;
            return (
              <li
                key={item.question}
                className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 focus-within:-translate-y-0.5 ${palette.border} ${palette.panel} ${palette.shadow}`}
                onMouseMove={setCardGlow}
                onMouseLeave={clearCardGlow}
              >
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  style={{ background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), ${palette.glow}, transparent 70%)` }}
                />
                <button
                  type="button"
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={open}
                  onClick={() => toggleQuestion(index)}
                  className="relative flex w-full items-start gap-6 px-8 py-7 text-left transition-colors duration-300"
                  style={{ ["--faq-outline" as string]: theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(17,17,17,0.25)" }}
                >
                  <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-105 ${palette.iconRing} ${palette.iconSurface}`}>
                    <span className={`pointer-events-none absolute inset-0 rounded-full border opacity-30 ${palette.iconRing} ${open ? "animate-ping" : ""}`} />
                    <svg className={`relative h-5 w-5 transition-transform duration-500 ${palette.icon} ${open ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <h2 className={`text-lg font-medium leading-tight sm:text-xl ${palette.heading}`}>{item.question}</h2>
                      {item.meta && (
                        <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.35em] transition-opacity duration-300 sm:ml-auto ${palette.border} ${palette.muted}`}>
                          {item.meta}
                        </span>
                      )}
                    </div>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`overflow-hidden text-sm leading-relaxed transition-[max-height] duration-500 ease-out ${open ? "max-h-64" : "max-h-0"} ${palette.muted}`}
                    >
                      <p className="pr-2">{item.answer}</p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default FAQ1;
export { FAQ1 };
