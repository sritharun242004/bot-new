"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const darkMonochromeStyle = {
  filter: "grayscale(1) brightness(0) contrast(1.1)",
};

const darkThemeLogoStyle = {
  filter: "grayscale(1) brightness(0) invert(1) contrast(1.15)",
};

const clients = [
  { name: "Road Runner Tribe", logo: "/logos/rrt-logo.png" },
  { name: "Wynza Corp", logo: "/logos/wynza-logo.png", size: "h-14" },
  {
    name: "Inai Community",
    logo: "/logos/inai-logo.png",
    size: "h-14",
    style: darkMonochromeStyle,
  },
  { name: "Keenstack Media", logo: "/logos/keenstack.png" },
  { name: "Pata Silks", logo: "/logos/patasilks-log0.png", size: "h-20" },
  { name: "St James Court", logo: "/logos/stjamescourt-logo.png", size: "h-20" },
  {
    name: "Matthew Arts",
    logo: "/logos/mathewarts.png",
    size: "h-14",
    style: darkMonochromeStyle,
  },
  { name: "Become", logo: "/logos/become-dark.png" },
  { name: "Belsterns", logo: "/logos/belsterns-dark.png" },
  { name: "MentorCloud", logo: "/logos/mentor-cloud-text-black.png" },
  { name: "Printrove", logo: "/logos/printrove.webp", style: darkMonochromeStyle },
  { name: "Silver Crafts", logo: "/logos/silvercrafts.png", style: darkMonochromeStyle },
  { name: "SPI Edge", logo: "/logos/spi-edge.png", style: darkMonochromeStyle },
  { name: "Whoamama", logo: "/logos/whoamama-dark.png" },
  { name: "Maa Ilay", logo: "/logos/maa-ilay.png" },
  { name: "RWK Media", logo: "/logos/rwk.png" },
  { name: "Icemail", logo: "/logos/icemail-alt-text-black.png" },
  { name: "Happy Cars", logo: "/logos/herologo.jpg" },
  { name: "Tamil Business Tribe", logo: "/logos/tbt.webp", style: darkMonochromeStyle },
];

export function ClientMarquee() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const doubled = [...clients, ...clients];

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => {
      setIsDarkTheme(root.dataset.theme !== "light");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="overflow-hidden py-12 border-y border-base-400/30">
      <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-base-350">
        Trusted by teams building the future
      </p>
      <div className="marquee-region relative flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-16 md:gap-[4.5rem] lg:gap-20">
          {doubled.map((client, i) => (
            <Image
              key={i}
              src={client.logo}
              alt={client.name}
              width={160}
              height={56}
              unoptimized
              style={isDarkTheme ? darkThemeLogoStyle : client.style}
              className={`client-logo w-auto object-contain opacity-80 hover:opacity-100 transition-opacity ${client.size ?? "h-10"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
