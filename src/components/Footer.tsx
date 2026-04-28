"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const footerLines = ["THE BOT", "COMPANY"];

function FooterRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const letters = container.querySelectorAll<HTMLSpanElement>(".footer-letter");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            letters.forEach((letter, i) => {
              setTimeout(() => {
                letter.style.transform = "translateY(0%)";
                letter.style.opacity = "1";
              }, i * 35);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  let letterIndex = 0;

  return (
    <div ref={containerRef} className="mt-16 overflow-hidden">
      {footerLines.map((line, lineIdx) => (
        <h1
          key={lineIdx}
          className="text-[clamp(2.5rem,10vw,12rem)] font-black tracking-[-2px] leading-none text-base-100 uppercase"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          aria-label={line}
        >
          {line.split("").map((char) => {
            const idx = letterIndex++;
            return (
              <span key={idx} className="inline-block overflow-hidden py-1">
                <span
                  className="footer-letter inline-block"
                  style={{
                    transform: "translateY(120%)",
                    opacity: 0,
                    transition: `transform 0.6s cubic-bezier(0.075, 0.82, 0.165, 1), opacity 0.6s cubic-bezier(0.075, 0.82, 0.165, 1)`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            );
          })}
        </h1>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-base-500 px-6 pt-20 pb-8 md:px-12">
      {/* Top section */}
      <div className="flex flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-1.2px] text-base-100">
            The Bot Company
          </h3>
          <h2 className="mt-2 text-[clamp(2rem,4vw,3.5rem)] font-[550] leading-tight tracking-[-2.4px] text-base-300">
            Bots that think.
            <br />
            Systems that scale.
          </h2>
        </div>

        <nav className="flex flex-col items-start gap-1 md:items-end">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-1.2px] text-base-200 transition-colors duration-300 hover:text-base-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Social + tagline */}
      <div className="mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-base-400 text-base-200 transition-colors hover:bg-base-400 hover:text-base-100"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <p className="max-w-sm text-right text-base font-medium text-base-300">
          Breaking impossibilities. AI should earn its place in your workflow,
          not just fill a slide deck.
        </p>
      </div>

      {/* Bottom bar — animated text reveal */}
      <FooterRevealText />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-base-350">
        <span>&copy; {new Date().getFullYear()} The Bot Company</span>
        <span>Available worldwide</span>
        <span>your AI partner</span>
      </div>
    </footer>
  );
}
