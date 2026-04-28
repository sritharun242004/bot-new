"use client";

import { useEffect, useRef, useState, Fragment } from "react";

type Stat = {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { target: 20, suffix: "+", label: "Clients served" },
  { target: 100, suffix: "%", label: "AI-powered solutions" },
  { target: 6, label: "Phase build loop" },
  { target: 2, prefix: "<", suffix: "wk", label: "To first deployment" },
];

function StatItem({ stat, triggered }: { stat: Stat; triggered: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(stat.target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [triggered, stat.target]);

  return (
    <div className="group relative flex flex-col items-center gap-2">
      <span className="mb-2 h-1.5 w-1.5 rounded-full bg-base-300 transition-colors duration-300 group-hover:bg-base-100" />
      <h2 className="text-[clamp(3rem,6vw,5rem)] font-[550] tracking-[-3px] text-base-100 transition-colors duration-300 group-hover:text-base-100">
        {stat.prefix ?? ""}{count}{stat.suffix ?? ""}
      </h2>
      <p className="mt-1 text-sm uppercase tracking-widest text-base-350">
        {stat.label}
      </p>
    </div>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-base-400/20 bg-base-500 px-12 py-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {stats.map((stat, i) => (
          <Fragment key={stat.label}>
            <StatItem stat={stat} triggered={triggered} />
            {i < stats.length - 1 && <div className="h-16 w-px bg-base-400/40" />}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
