"use client";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isDark, setIsDark] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Only show on devices with a fine pointer (mouse), not touch screens
    const isFine = window.matchMedia("(pointer: fine)").matches;
    setIsTouch(!isFine);

    if (isFine) document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);

    const syncTheme = () => setIsDark(document.documentElement.dataset.theme !== "light");
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (isTouch) return null;

  const fill = isDark ? "#ffffff" : "#111111";
  const shadowColor = isDark ? "#000000" : "#888888";

  return (
    <div className="hidden md:block">
    <div
      className="fixed pointer-events-none z-[99999]"
      style={{ left: pos.x, top: pos.y, transform: "translate(0px, 0px)" }}
    >
      <svg
        width="72"
        height="72"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="edgeBlur" />
            <feFlood floodColor={fill} floodOpacity="0.35" result="color" />
            <feComposite in="color" in2="edgeBlur" operator="in" result="softEdge" />
            <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor={shadowColor} floodOpacity="0.3" result="dropshadow" />
            <feMerge>
              <feMergeNode in="dropshadow" />
              <feMergeNode in="softEdge" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Soft bloom layer */}
        <path
          d="M10 10 L85 42 Q88 44 85 47 L58 58 L47 85 Q44 88 42 85 L10 10 Z"
          fill={fill}
          opacity="0.18"
          filter="url(#shadow)"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Main shape */}
        <path
          d="M10 10 L85 42 Q88 44 85 47 L58 58 L47 85 Q44 88 42 85 L10 10 Z"
          fill={fill}
          filter="url(#shadow)"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
    </div>
  );
}
