"use client";

import { useEffect, useRef } from "react";

export function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver | null = null;

    const timer = setTimeout(() => {
      // For line-mask parents: observe the mask, reveal the inner child
      const masks = el.querySelectorAll(".line-mask");
      // For reveal-up: observe directly
      const revealUps = el.querySelectorAll(".reveal-up");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target;
              if (target.classList.contains("line-mask")) {
                // Reveal the child .line-inner
                const inner = target.querySelector(".line-inner");
                if (inner) inner.classList.add("revealed");
              } else {
                target.classList.add("revealed");
              }
              observer?.unobserve(target);
            }
          });
        },
        { threshold }
      );

      masks.forEach((m) => observer!.observe(m));
      revealUps.forEach((r) => observer!.observe(r));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [threshold]);

  return ref;
}
