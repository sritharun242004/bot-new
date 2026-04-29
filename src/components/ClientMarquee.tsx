"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

const clients = [
  { name: "Road Runner Tribe", logo: "/logos/rrt-logo.png" },
  { name: "Wynza Corp", logo: "/logos/wynza-logo.png", size: "h-24" },
  { name: "Inai Community", logo: "/logos/inai-logo.png", size: "h-24", forceBlackInLight: true },
  { name: "Keenstack Media", logo: "/logos/keenstack.png" },
  { name: "Pata Silks", logo: "/logos/patasilks-log0.png", size: "h-24" },
  { name: "St James Court", logo: "/logos/stjamescourt-logo.png", size: "h-24" },
  { name: "Matthew Arts", logo: "/logos/mathewarts.png", size: "h-24", forceWhiteInDark: true, forceBlackInLight: true },
  {
    name: "Become",
    logo: "/logos/become.webp",
    forceWhiteInDark: true,
    forceBlackInLight: true
  },
  {
    name: "Belsterns",
    logo: "/logos/belsterns.png",
    forceWhiteInDark: true,
    forceBlackInLight: true
  },
  {
    name: "MentorCloud",
    logo: "/logos/mentor-cloud.png",
    lightLogo: "/logos/mentor-cloud-text-black.png"
  },
  { name: "Printrove", logo: "/logos/printrove.webp", forceBlackInLight: true },
  { name: "Silver Crafts", logo: "/logos/silvercrafts.png", forceBlackInLight: true },
  { name: "SPI Edge", logo: "/logos/spi-edge.png", forceBlackInLight: true },
  {
    name: "Whoamama",
    logo: "/logos/whoamama.webp",
    lightLogo: "/logos/whoamama-dark.png",
    forceWhiteInDark: true,
    forceBlackInLight: true
  },
  { name: "Maa Ilay", logo: "/logos/maa-ilay.png" },
  { name: "RWK Media", logo: "/logos/rwk.png" },
  {
    name: "Icemail",
    logo: "/logos/icemail-alt.png",
    lightLogo: "/logos/icemail-alt-text-black.png"
  },
  {
    name: "Happy Cars",
    logo: "/logos/happy-cars.png",
    lightLogo: "/logos/happy-cars-dark.png"
  },
  { name: "Tamil Business Tribe", logo: "/logos/tbt.webp", size: "h-24", forceVisibility: true },
];

function recolourLogo(src: string, toWhite: boolean, removeWhiteBg = false): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      const target = toWhite ? 255 : 0;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
        if (removeWhiteBg && r > 180 && g > 180 && b > 180) {
          d[i + 3] = 0;
        } else if (a > 0 && r < 80 && g < 80 && b < 80) {
          d[i] = target;
          d[i + 1] = target;
          d[i + 2] = target;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = src;
  });
}

const SPEED = 90; // px per second

export function ClientMarquee() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [wynzaUrl, setWynzaUrl] = useState("/logos/wynza-logo.png");
  const [keenstackUrl, setKeenstackUrl] = useState("/logos/keenstack.png");
  const [pataUrl, setPataUrl] = useState("/logos/patasilks-log0.png");
  const doubled = [...clients, ...clients];

  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const xRef = useRef(0);
  const pausedRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkTheme(root.dataset.theme !== "light");
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isDarkTheme) {
      setWynzaUrl("/logos/wynza-logo.png");
      setKeenstackUrl("/logos/keenstack.png");
      setPataUrl("/logos/patasilks-log0.png");
      return;
    }
    recolourLogo("/logos/wynza-logo.png", true).then(setWynzaUrl);
    recolourLogo("/logos/keenstack.png", true).then(setKeenstackUrl);
    recolourLogo("/logos/patasilks-log0.png", true, true).then(setPataUrl);
  }, [isDarkTheme]);

  // RAF-driven scroll — no CSS animation reset, always smooth
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = (time: number) => {
      if (!pausedRef.current) {
        const delta = lastTimeRef.current !== null ? time - lastTimeRef.current : 0;
        lastTimeRef.current = time;
        xRef.current -= (SPEED * delta) / 1000;
        const halfWidth = track.scrollWidth / 2;
        if (xRef.current <= -halfWidth) xRef.current += halfWidth;
        track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      } else {
        lastTimeRef.current = null;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const pause = useCallback(() => { pausedRef.current = true; }, []);
  const resume = useCallback(() => { pausedRef.current = false; }, []);

  return (
    <section className="overflow-hidden py-20 border-y border-base-400/30">
      <p className="mb-12 text-center text-base font-medium uppercase tracking-wider text-base-350">
        Trusted by teams building the future
      </p>
      <div
        className="relative flex overflow-hidden"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          ref={trackRef}
          className="flex shrink-0 items-center gap-12 md:gap-16 lg:gap-20"
          style={{ willChange: "transform" }}
        >
          {doubled.map((client, i) => (
            <Image
              key={i}
              src={
                client.name === "Wynza Corp"
                  ? wynzaUrl
                  : client.name === "Keenstack Media"
                  ? keenstackUrl
                  : client.name === "Pata Silks"
                  ? pataUrl
                  : (!isDarkTheme && (client as any).lightLogo ? (client as any).lightLogo : client.logo)
              }
              alt={client.name}
              width={220}
              height={80}
              unoptimized
              className={`client-logo w-auto object-contain transition-all duration-300 ${(client as any).size ?? "h-16"}`}
              style={{
                opacity: 1,
                filter:
                  client.name === "Wynza Corp" ||
                  client.name === "Keenstack Media" ||
                  client.name === "Pata Silks"
                    ? "none"
                    : isDarkTheme
                    ? (client as any).forceWhiteInDark
                      ? "brightness(0) invert(1)"
                      : (client as any).forceVisibility
                      ? "drop-shadow(0 0 4px rgba(255,255,255,0.4))"
                      : "none"
                    : (client as any).forceBlackInLight
                    ? "brightness(0)"
                    : (client as any).forceVisibility
                    ? "drop-shadow(0 0 1px rgba(0,0,0,0.8)) drop-shadow(0 0 4px rgba(0,0,0,0.2)) contrast(1.2) brightness(0.9)"
                    : "contrast(1.1) brightness(0.95)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
