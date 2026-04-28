"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position for the small dot (follows mouse exactly)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Position for the outer ring (adds trailing effect with spring)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = () => setIsHovered(true);
    const handleUnhover = () => setIsHovered(false);

    window.addEventListener("mousemove", moveMouse);

    // Track clickable elements for the scale effect
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .group'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleUnhover);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Outer ring */}
      <motion.div
        className="absolute h-24 w-24 rounded-full border border-base-100/30 bg-base-100/5 backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute h-4 w-4 rounded-full bg-base-100"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
