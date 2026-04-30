"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Logo = {
  src: string;
  alt: string;
  href: string;
  width?: number;
  height?: number;
  className?: string;
  darkFilter?: string;
  lightFilter?: string;
  lightLogo?: string;
  canvas?: true;
};

const logos: Logo[] = [
  { src: "/logos/become.webp",      alt: "Become",       href: "https://www.become.team/",            darkFilter: "brightness(0) invert(1)", lightFilter: "brightness(0)", width: 190, height: 65 },
  { src: "/logos/mentor-cloud.png", alt: "Mentor Cloud", href: "https://mentorcloud.com",             lightLogo: "/logos/mentor-cloud-text-black.png", className: "h-14 md:h-16", width: 220, height: 75 },
  { src: "/logos/icemail-alt.png",  alt: "Icemail",      href: "https://www.icemail.ai/",             lightLogo: "/logos/icemail-alt-text-black.png", width: 200, height: 65 },
  { src: "/logos/belsterns.png",    alt: "Belsterns",    href: "https://belsterns.com/",              darkFilter: "brightness(0) invert(1)", lightFilter: "brightness(0)" },
  { src: "/logos/printrove.webp",   alt: "Printrove",    href: "https://printrove.com/",              lightFilter: "brightness(0)" },
  { src: "/logos/happy-cars.png",   alt: "Happy Cars",   href: "https://happycars.in",                lightLogo: "/logos/happy-cars-dark.png", width: 190, height: 65 },
  { src: "/logos/spi-edge.png",     alt: "SPI Edge",     href: "https://spiedge.com",                 lightFilter: "brightness(0)", width: 220, height: 75, className: "h-14 md:h-16" },
  { src: "/logos/inai-logo.png",    alt: "Inai Logo",    href: "https://inaicommunity.com/",          lightFilter: "brightness(0)", width: 220, height: 75, className: "h-14 md:h-16" },
  { src: "/logos/keenstack.png",    alt: "Keenstack",    href: "https://keenstackmedia.com/",         canvas: true, width: 220, height: 75, className: "h-14 md:h-16" },
  { src: "/logos/maa-ilay.png",     alt: "Maa Ilay",     href: "https://maailay.com/",                width: 220, height: 75, className: "h-14 md:h-16" },
  { src: "/logos/mathewarts.png",   alt: "Mathew Arts",  href: "https://mathewarts.com",              darkFilter: "brightness(0) invert(1)", lightFilter: "brightness(0)", width: 220, height: 75, className: "h-14 md:h-16" },
  { src: "/logos/BJP%20Logo.png",   alt: "BJP Logo",     href: "https://bjp.org",                     width: 220, height: 75, className: "h-14 md:h-16" },
];

const doubled = [...logos, ...logos];
const SPEED = 80;

// Dark mode: dark pixels → white. Light mode: light/white pixels → black. Coloured pixels untouched.
function recolourLogo(src: string, toWhite: boolean): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = data.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
        if (a > 0) {
          if (toWhite && r < 80 && g < 80 && b < 80) {
            d[i] = 255; d[i + 1] = 255; d[i + 2] = 255;
          } else if (!toWhite && r > 200 && g > 200 && b > 200) {
            d[i] = 0; d[i + 1] = 0; d[i + 2] = 0;
          }
        }
      }
      ctx.putImageData(data, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = src;
  });
}

function LogoImage({
  logo,
  isDark,
  keenstackUrl,
}: {
  logo: Logo;
  isDark: boolean;
  keenstackUrl: string;
}) {
  const w = logo.width ?? 160;
  const h = logo.height ?? 60;
  const cls = logo.className ?? "h-12";

  const src = logo.canvas
    ? keenstackUrl
    : !isDark && logo.lightLogo
    ? logo.lightLogo
    : logo.src;

  const filter = logo.canvas
    ? "none"
    : isDark
    ? (logo.darkFilter ?? "none")
    : (logo.lightFilter ?? "none");

  return (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
      style={{ width: `${w}px`, height: `${h}px` }}
      aria-label={`Visit ${logo.alt}`}
    >
      <Image
        src={src}
        alt={logo.alt}
        width={w}
        height={h}
        unoptimized
        className={`${cls} w-auto object-contain transition-all duration-300`}
        style={{ filter }}
      />
    </a>
  );
}

export function LogoGrid() {
  const [isDark, setIsDark] = useState(true);
  const [keenstackUrl, setKeenstackUrl] = useState("/logos/keenstack.png");

  const containerRef  = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const animRef       = useRef<number>(0);
  const xRef          = useRef(0);
  const pausedRef     = useRef(false);
  const visibleRef    = useRef(false);
  const halfWidthRef  = useRef(0);
  const lastTimeRef   = useRef<number | null>(null);

  // Theme detection via MutationObserver — same pattern as ClientMarquee
  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.dataset.theme !== "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Canvas recolouring for Keenstack (mixed-colour logo — CSS invert would corrupt colours)
  useEffect(() => {
    recolourLogo("/logos/keenstack.png", isDark).then(setKeenstackUrl);
  }, [isDark]);

  // Cache halfWidth on mount and on resize — never reads scrollWidth inside the RAF loop
  useEffect(() => {
    const measure = () => {
      const sw = trackRef.current?.scrollWidth ?? 0;
      if (sw > 0) halfWidthRef.current = sw / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Pause RAF when section is off-screen or hidden (e.g. desktop viewport)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting && halfWidthRef.current === 0) {
        const sw = trackRef.current?.scrollWidth ?? 0;
        if (sw > 0) halfWidthRef.current = sw / 2;
      }
    }, { threshold: 0 });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // RAF loop — delta-time based, no CSS animation reset
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = (time: number) => {
      if (!pausedRef.current && visibleRef.current && halfWidthRef.current > 0) {
        const delta = lastTimeRef.current !== null ? time - lastTimeRef.current : 0;
        lastTimeRef.current = time;
        xRef.current -= (SPEED * delta) / 1000;
        if (xRef.current <= -halfWidthRef.current) xRef.current += halfWidthRef.current;
        track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      } else {
        lastTimeRef.current = null;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section className="bg-base-500 px-6 flex flex-col justify-center transition-colors duration-300 py-16 md:py-28">
      <div className="w-full mx-auto max-w-[88rem]">
        {/* Desktop: two rows — 7 logos then 5 logos centered */}
        <div className="hidden md:flex flex-col items-center gap-y-20 mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-x-16">
            {logos.slice(0, 7).map(logo => (
              <LogoImage key={logo.src} logo={logo} isDark={isDark} keenstackUrl={keenstackUrl} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-x-16">
            {logos.slice(7).map(logo => (
              <LogoImage key={logo.src} logo={logo} isDark={isDark} keenstackUrl={keenstackUrl} />
            ))}
          </div>
        </div>

        {/* Mobile: RAF-driven infinite marquee */}
        <div
          ref={containerRef}
          className="md:hidden overflow-hidden w-full"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          <div
            ref={trackRef}
            className="flex gap-16 items-center"
            style={{ willChange: "transform" }}
          >
            {doubled.map((logo, idx) => (
              <div key={idx} className="flex-shrink-0">
                <LogoImage logo={logo} isDark={isDark} keenstackUrl={keenstackUrl} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
