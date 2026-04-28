"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

const STAGES = [
  {
    num: "01",
    title: "Listen",
    desc: "We dig into your workflows, data, and goals. What's working, what's frustrating, where AI might help.",
  },
  {
    num: "02",
    title: "Design",
    desc: "We sketch the system, the flow, the touchpoints. What's worth automating, what's worth keeping, what's worth rethinking.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We ship the tools, the integrations, the dashboards. Fast, secure, ready for your team on day one.",
  },
  {
    num: "04",
    title: "Automate",
    desc: "We wire up the pipelines, the triggers, the handoffs. Work that used to run on people now runs itself.",
  },
  {
    num: "05",
    title: "Scale",
    desc: "We roll it out across teams, regions, departments. Training, docs, and support until it actually sticks.",
  },
  {
    num: "06",
    title: "Evolve",
    desc: "We watch the data, the usage, the feedback. What to refine, what to expand, what to build next.",
  },
];

// Scaled segments
const OFFSETS = [
  { dx: 0, dy: 600 },   // S1: DOWN (Stage 01)
  { dx: 450, dy: 0 },   // S2: RIGHT (Stage 02)
  { dx: 0, dy: -1400 },  // S3: UP (Stage 03)
  { dx: 450, dy: 0 },   // S4: RIGHT (Stage 04)
  { dx: 0, dy: 520 },   // S5: DOWN (Stage 05)
  { dx: 520, dy: 0 },   // S6: RIGHT (Stage 06)
];

const START_X = 500;
const START_Y = 500;

// Dynamic cumulative lengths for accurate timing
const SEGMENT_LENGTHS = OFFSETS.map(o => Math.abs(o.dx) + Math.abs(o.dy));
const TOTAL_LENGTH = SEGMENT_LENGTHS.reduce((a, b) => a + b, 0);
const MILESTONES = SEGMENT_LENGTHS.reduce((acc, len, i) => [...acc, acc[i] + len], [0]);

// Camera ViewBox dimensions
const V_WIDTH = 4200;
const V_HEIGHT = 3000;

const FULL_PATH_D = (() => {
  let d = `M ${START_X} ${START_Y}`;
  let cx = START_X;
  let cy = START_Y;
  OFFSETS.forEach(o => {
    cx += o.dx;
    cy += o.dy;
    d += ` L ${cx} ${cy}`;
  });
  return d;
})();

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<SVGCircleElement>(null);
  const isPulliActive = useRef(false);
  const isLocked = useRef(false);

  const [activeLabelIdx, setActiveLabelIdx] = useState(0);

  useEffect(() => {
    let requestRef: number;

    const updateCameraAndBall = (x: number, y: number) => {
      // Guard 1: All required refs must exist
      if (!svgRef.current || !ballRef.current) return;

      // Guard 2: x and y must be valid numbers
      if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) return;

      const vX = x - V_WIDTH / 2;
      const vY = y - V_HEIGHT / 2;
      svgRef.current.setAttribute("viewBox", `${vX} ${vY} ${V_WIDTH} ${V_HEIGHT}`);
      ballRef.current.setAttribute("cx", x.toString());
      ballRef.current.setAttribute("cy", y.toString());
    };

    const handleScroll = () => {
      if (!sectionRef.current || !svgRef.current || !pathRef.current || !ballRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - viewportHeight)));

      // If we are scrolling back up, ensure we unlock
      if (progress < 0.98 && isLocked.current) {
        document.body.style.overflow = "";
        isLocked.current = false;
      }

      const totalLength = pathRef.current.getTotalLength();
      // Guard 3: path length must be valid
      if (!totalLength || isNaN(totalLength)) return;

      const drawnLength = progress * totalLength;

      // Sync Path drawing
      pathRef.current.style.strokeDasharray = `${totalLength}`;
      pathRef.current.style.strokeDashoffset = `${totalLength - drawnLength}`;

      // Guard 4: drawnLength must be finite
      if (!isFinite(drawnLength)) return;

      const point = pathRef.current.getPointAtLength(drawnLength);

      // Guard 5: verify point from getPointAtLength
      if (!point || typeof point.x !== 'number' || typeof point.y !== 'number') return;

      const stageFloat = progress * 6;
      const currentIdx = Math.min(Math.floor(stageFloat), 5);

      // Trigger special pulli animation at 100% completion of section 06
      if (currentIdx === 5 && progress > 0.999) {
        if (!isPulliActive.current) {
          isPulliActive.current = true;
          isLocked.current = true;
          document.body.style.overflow = "hidden"; // Lock scroll to force user to see animation

          const bbox = pathRef.current.getBBox();
          const targetX = bbox.x + (bbox.width * 0.72);
          const targetY = bbox.y - 400;

          setTimeout(() => {
            animate({ x: point.x, y: point.y }, { x: targetX, y: targetY }, {
              duration: 2.5,
              ease: [0.16, 1, 0.3, 1], // Smooth in-out easing
              onUpdate: (latest) => {
                if (latest && typeof latest.x === 'number' && typeof latest.y === 'number') {
                  updateCameraAndBall(latest.x, latest.y);
                }
              },
              onComplete: () => {
                // Brief hold then unlock scroll
                setTimeout(() => {
                  document.body.style.overflow = "";
                  isLocked.current = false;
                }, 500);
              }
            });
          }, 100); // Pause for 100ms
        }
      } else {
        if (isPulliActive.current && progress < 0.98) {
          isPulliActive.current = false;

          const bbox = pathRef.current.getBBox();
          const targetX = bbox.x + (bbox.width * 0.72);
          const targetY = bbox.y - 400;

          // Animate back to path tip
          animate({ x: targetX, y: targetY }, { x: point.x, y: point.y }, {
            duration: 0.6,
            onUpdate: (latest) => {
              if (latest && typeof latest.x === 'number' && typeof latest.y === 'number') {
                updateCameraAndBall(latest.x, latest.y);
              }
            }
          });
        } else if (!isPulliActive.current) {
          updateCameraAndBall(point.x, point.y);
        }
      }

      setActiveLabelIdx(currentIdx);
    };

    const onScroll = () => {
      requestRef = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(requestRef);
      document.body.style.overflow = ""; // Safety cleanup
    };
  }, []);

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      className="relative h-[700vh] w-full bg-base-500"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 overflow-hidden gap-6 md:gap-[24px] bg-base-500">

        <div className="w-full md:w-[68%] h-[58%] md:h-full flex items-center justify-center overflow-hidden">
          <div className="w-full h-full max-w-[200vw] max-h-[120vh] min-w-[70vw] min-h-[75vh] flex items-center justify-center overflow-hidden md:translate-x-50 md:-translate-y-12">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${V_WIDTH} ${V_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full"
            >
              <path
                ref={pathRef}
                d={FULL_PATH_D}
                stroke="var(--base-100)"
                strokeWidth="170"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                fill="none"
              />

              <circle
                ref={ballRef}
                r="145"
                fill="#9a9a9a"
                stroke="#7a7a7a"
                strokeWidth="3"
                style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,.4))" }}
              />
            </svg>
          </div>
        </div>

        <div className="relative w-full md:w-[30%] h-[42%] md:h-full flex items-center">
          {STAGES.map((stage, idx) => (
            <div
              key={stage.num}
              className={`absolute inset-0 flex flex-col justify-center transition-opacity duration-500 ease-in-out ${activeLabelIdx === idx ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
              <div className="flex flex-col">
                <span className="text-[80px] md:text-[110px] font-[800] text-base-400 leading-[0.95] select-none tracking-tight">
                  {stage.num}
                </span>
                <h3 className="text-[60px] md:text-[96px] font-[800] text-base-100 leading-[1.0] tracking-tight">
                  {stage.title}
                </h3>
                <p className="mt-10 text-[18px] md:text-[22px] leading-[1.5] text-base-250 max-w-[480px] font-normal">
                  {stage.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
