"use client";

import { useReveal } from "@/hooks/useReveal";
import { ReactNode } from "react";

interface RevealTextProps {
  text?: string;
  lines?: (string | ReactNode)[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

export function RevealText({ text, lines: linesProp, as: Tag = "h1", className = "" }: RevealTextProps) {
  const ref = useReveal();
  
  // Determine lines to render
  const lines = linesProp || (typeof text === "string" ? text.split("\n") : [text]);

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
