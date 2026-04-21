"use client";

import { useReveal } from "@/hooks/useReveal";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

export function RevealText({ text, as: Tag = "h1", className = "" }: RevealTextProps) {
  const ref = useReveal();
  const lines = text.split("\n");

  return (
    <div ref={ref}>
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block line-mask">
            <span className="block line-inner" data-delay={i}>
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
