"use client";

import Image from "next/image";

const clients = [
  { name: "Road Runner Tribe", logo: "/logos/rrt-logo.png" },
  { name: "Wynza Corp", logo: "/logos/wynza-logo.png", size: "h-14" },
  { name: "Inai Community", logo: "/logos/inai-logo.png", size: "h-14" },
  { name: "Keenstack Media", logo: "/logos/keenstack.png" },
  { name: "Pata Silks", logo: "/logos/patasilks-log0.png", size: "h-20" },
  { name: "St James Court", logo: "/logos/stjamescourt-logo.png", size: "h-20" },
  { name: "Matthew Arts", logo: "/logos/mathewarts.png", size: "h-14" },
  { name: "Become", logo: "/logos/become.webp" },
  { name: "Belsterns", logo: "/logos/belsterns.png" },
  { name: "MentorCloud", logo: "/logos/mentorcloud.png" },
  { name: "Printrove", logo: "/logos/printrove.webp" },
  { name: "Silver Crafts", logo: "/logos/silvercrafts.png", extra: "contrast-150" },
  { name: "SPI Edge", logo: "/logos/spi-edge.png" },
  { name: "Whoamama", logo: "/logos/whoamama.webp" },
  { name: "Maa Ilay", logo: "/logos/maa-ilay.png" },
  { name: "RWK Media", logo: "/logos/rwk.png" },
  { name: "Icemail", logo: "/logos/icemail.jpeg" },
  { name: "Happy Cars", logo: "/logos/happy-cars.png" },
  { name: "Tamil Business Tribe", logo: "/logos/tbt.webp" },
];

export function ClientMarquee() {
  const doubled = [...clients, ...clients];

  return (
    <section className="overflow-hidden py-12 border-y border-base-400/30">
      <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-base-350">
        Trusted by teams building the future
      </p>
      <div className="relative flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-16">
          {doubled.map((client, i) => (
            <Image
              key={i}
              src={client.logo}
              alt={client.name}
              width={160}
              height={56}
              unoptimized
              className={`client-logo w-auto object-contain opacity-80 hover:opacity-100 transition-opacity ${client.size ?? "h-10"} ${client.extra ?? ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
