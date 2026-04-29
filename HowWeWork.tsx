"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

const OFFSETS = [
  { dx: 0, dy: 600 },    // S1: DOWN  (Stage 01)
  { dx: 450, dy: 0 },    // S2: RIGHT (Stage 02)
  { dx: 0, dy: -1400 },  // S3: UP    (Stage 03)
  { dx: 450, dy: 0 },    // S4: RIGHT (Stage 04)
  { dx: 0, dy: 520 },    // S5: DOWN  (Stage 05)
  { dx: 600, dy: 0 },    // S6: RIGHT (Stage 06)
];

const START_X = 500;
const START_Y = 500;

// Camera ViewBox dimensions
const V_WIDTH = 4200;
const V_HEIGHT = 3000;

// Last horizontal segment: (1400, 220) → (1920, 220). Midpoint x = 1660.
// Ball is placed in the open space above the segment (y < 135 = line top edge).
// At y=-200: ball bottom = -55 (190-unit gap above line). No upper path at x=1660.
const STATIC_BALL_X = 1780;
const STATIC_BALL_Y = -200;

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
  const staticBallRef = useRef<SVGCircleElement>(null);
  // Right panel — GSAP fades + slides this out during Phase 2
  const labelsPanelRef = useRef<HTMLDivElement>(null);
  const startTextRef = useRef<HTMLDivElement>(null);
  const totalLengthRef = useRef(0);

  const [activeLabelIdx, setActiveLabelIdx] = useState(0);

  useEffect(() => {
    let requestRef: number;

    // Cache total path length and set dasharray once
    if (pathRef.current) {
      totalLengthRef.current = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${totalLengthRef.current}`;
    }

    // ── Phase 2 GSAP timeline (paused; driven manually by scroll progress) ──
    // Section is h-[900vh] = 9×VH. Phase 1 covers the original 750vh
    // equivalent (6.5×VH of scrollable range). Phase 2 covers the remaining
    // 1.5×VH = 150vh. The timeline is scrubbed via tl.progress(p2).
    const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

    // Zoom IN: shrink the viewBox so the path fills more of the screen.
    // Phase 1 ends with viewBox centred on ball (1920,220) → "-180 -1280 4200 3000".
    // Target is centred on the full-path centre (1210,400) with a tight frame
    // → "110 -500 2200 1800", giving ≈1.9× larger appearance.
    tl.fromTo(svgRef.current!,
      { attr: { viewBox: "-180 -1280 4200 3000" }, x: 0 },
      { attr: { viewBox: "-300 -900 3200 2400" }, x: -2 },
      0,
    );


    // ── Camera + ball update (Phase 1) ──────────────────────────────────────
    const updateCameraAndBall = (x: number, y: number) => {
      if (!svgRef.current || !ballRef.current) return;
      if (typeof x !== "number" || typeof y !== "number" || isNaN(x) || isNaN(y)) return;
      const vX = x - V_WIDTH / 2;
      const vY = y - V_HEIGHT / 2;
      svgRef.current.setAttribute("viewBox", `${vX} ${vY} ${V_WIDTH} ${V_HEIGHT}`);
      ballRef.current.setAttribute("cx", x.toString());
      ballRef.current.setAttribute("cy", y.toString());
    };

    const handleScroll = () => {
      if (!sectionRef.current || !svgRef.current || !pathRef.current || !ballRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const VH = window.innerHeight;


      // Phase 1: 6.5 × VH — path draws + camera follows
      // Phase 2 zoom: 1.0 × VH — zoom-in animation (was 0.1 VH, now 10× slower)
      // Phase 2 hold: 0.5 × VH — hold zoomed state before section exits
      // Total: 8 VH scrollable → section h-[900vh] (9 VH tall, sticky = 1 VH)
      const phase1Range = 6.5 * VH;
      const phase2ZoomRange = 0.3 * VH;
      const scrolled = Math.max(0, -rect.top);

      // ── Phase 2: user has scrolled past 06 Evolve ────────────────────────
      if (scrolled >= phase1Range) {
        // Hold path fully drawn, lock camera at path end
        pathRef.current.style.strokeDashoffset = "0";
        setActiveLabelIdx(5);
        // Instantly swap balls and hide labels — immediate on scroll entry
        ballRef.current.style.opacity = "0";
        if (labelsPanelRef.current) labelsPanelRef.current.style.opacity = "0";
        const p2 = Math.max(0, Math.min(1, (scrolled - phase1Range) / phase2ZoomRange));
        if (staticBallRef.current) {
          staticBallRef.current.style.opacity = "1";
          staticBallRef.current.style.fill = p2 > 0 ? "var(--base-100)" : "#9a9a9a";
          staticBallRef.current.style.stroke = p2 > 0 ? "var(--base-100)" : "#7a7a7a";
        }
        if (startTextRef.current) startTextRef.current.style.opacity = p2.toString();
        tl.progress(p2);
        return;
      }

      // Snap Phase 2 back to zero and restore all elements when re-entering Phase 1
      if (tl.progress() > 0) tl.progress(0);
      ballRef.current.style.opacity = "1";
      if (staticBallRef.current) {
        staticBallRef.current.style.opacity = "0";
        staticBallRef.current.style.fill = "#9a9a9a";
        staticBallRef.current.style.stroke = "#7a7a7a";
      }
      if (labelsPanelRef.current) labelsPanelRef.current.style.opacity = "1";
      if (startTextRef.current) startTextRef.current.style.opacity = "0";

      // ── Phase 1: path drawing + camera follow ────────────────────────────
      const progress = Math.max(0, Math.min(1, scrolled / phase1Range));

      const stageFloat = progress * 6;
      const currentIdx = Math.min(Math.floor(stageFloat), 5);
      setActiveLabelIdx(currentIdx);

      const totalLength = totalLengthRef.current;
      if (!totalLength || isNaN(totalLength)) return;

      const drawnLength = progress * totalLength;
      if (!isFinite(drawnLength)) return;

      pathRef.current.style.strokeDashoffset = `${totalLength - drawnLength}`;

      const point = pathRef.current.getPointAtLength(drawnLength);
      if (!point || typeof point.x !== "number" || typeof point.y !== "number") return;
      updateCameraAndBall(point.x, point.y);
    };

    const onScroll = () => {
      cancelAnimationFrame(requestRef);
      requestRef = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(requestRef);
      tl.revert();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      className="relative h-[900vh] w-full bg-base-500"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 overflow-hidden gap-6 md:gap-[24px]">

        {/* Left: SVG path animation */}
        <div className="w-full md:w-[68%] h-[58%] md:h-full flex items-center justify-center overflow-hidden">
          <div className="w-full h-full max-w-[110vw] max-h-[130vh] min-w-[90vw] min-h-[105vh] flex items-center justify-center overflow-hidden md:translate-x-40 md:-translate-y-12">
            <svg
              ref={svgRef}
              viewBox={`${START_X - V_WIDTH / 2} ${START_Y - V_HEIGHT / 2} ${V_WIDTH} ${V_HEIGHT}`}
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
                style={{ strokeDasharray: "999999", strokeDashoffset: "999999" }}
              />

              {/* Tracking ball — follows the path tip during Phase 1 */}
              <circle
                ref={ballRef}
                cx={START_X}
                cy={START_Y}
                r="145"
                fill="#9a9a9a"
                stroke="#7a7a7a"
                strokeWidth="3"
                style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,.4))" }}
              />

              {/* Static ball — appears at midpoint of last horizontal segment in Phase 2 */}
              <circle
                ref={staticBallRef}
                cx={STATIC_BALL_X}
                cy={STATIC_BALL_Y}
                r="145"
                strokeWidth="3"
                style={{ opacity: 0, fill: "#9a9a9a", stroke: "#7a7a7a", filter: "drop-shadow(0 4px 12px rgba(0,0,0,.4))", transition: "fill 0.05s ease, stroke 0.05s ease" }}
              />
            </svg>
          </div>
        </div>

        {/* Right: stage labels + phase-2 CTA — both share the same column */}
        <div className="relative w-full md:w-[30%] h-[42%] md:h-full flex items-center">

          {/* Stage labels — hidden in Phase 2 */}
          <div
            ref={labelsPanelRef}
            className="absolute inset-0 flex items-center"
          >
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

          {/* Phase 2 CTA — fades in as stage labels fade out */}
          <div
            ref={startTextRef}
            className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <p
              className="text-[clamp(3rem,5.5vw,6.5rem)] font-[900] uppercase leading-[0.92] tracking-[-0.02em] text-base-100"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              SO SHALL<br />WE<br />START
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
