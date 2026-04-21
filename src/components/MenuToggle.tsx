"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function MenuToggle() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [linksReady, setLinksReady] = useState(false);
  const [footerReady, setFooterReady] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const linksTimer = setTimeout(() => setLinksReady(true), 200);
      const footerTimer = setTimeout(() => setFooterReady(true), 500);
      return () => {
        clearTimeout(linksTimer);
        clearTimeout(footerTimer);
      };
    } else {
      setLinksReady(false);
      setFooterReady(false);
      const hideTimer = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(hideTimer);
    }
  }, [open]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !overlayRef.current) return;

    const focusableSelector =
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

    // Focus first link after overlay animates in
    const focusTimer = setTimeout(() => {
      const firstFocusable = overlayRef.current?.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    }, 300);

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !overlayRef.current) return;

      const focusableElements = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      // Include the toggle button in the trap
      if (toggleRef.current) focusableElements.push(toggleRef.current);

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleTab);
    };
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <>
      {/* Full-screen overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 transition-[clip-path] duration-700 ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: open
            ? "circle(150% at 40px 45px)"
            : "circle(0% at 40px 45px)",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="absolute inset-4 rounded-[32px] bg-base-450">
          <div className="flex h-full flex-col justify-between p-8 md:p-12">
            {/* Nav links — staggered slide up */}
            <nav className="flex flex-col gap-1 pt-8">
              {navLinks.map((link, i) => (
                <div
                  key={link.href}
                  className="overflow-hidden"
                >
                  <Link
                    href={link.href}
                    onClick={handleClose}
                    className="block text-[clamp(2.5rem,5vw,4rem)] font-[550] leading-tight tracking-[-2.4px] text-base-300 transition-all duration-300 hover:text-base-100 hover:translate-x-3"
                    style={{
                      transform: linksReady
                        ? "translateY(0%)"
                        : "translateY(110%)",
                      opacity: linksReady ? 1 : 0,
                      transition: `transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms, opacity 0.5s ease ${i * 60}ms, color 0.3s`,
                    }}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Footer info — fade up */}
            <div
              className="flex flex-wrap gap-x-16 gap-y-6 text-base"
              style={{
                transform: footerReady ? "translateY(0px)" : "translateY(20px)",
                opacity: footerReady ? 1 : 0,
                transition:
                  "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
              }}
            >
              <div>
                <p className="mb-2 font-medium text-base-400">Let&apos;s talk</p>
                <p className="font-medium text-base-100">official@thebotcompany.in</p>
              </div>
              <div>
                <p className="mb-2 font-medium text-base-400">What we do</p>
                <p className="font-medium text-base-100">AI Agents</p>
                <p className="font-medium text-base-100">Automation</p>
                <p className="font-medium text-base-100">Bot Development</p>
              </div>
              <div>
                <p className="mb-2 font-medium text-base-400">Social</p>
                <p className="font-medium text-base-100">LinkedIn</p>
                <p className="font-medium text-base-100">Instagram</p>
                <p className="font-medium text-base-100">X</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating toggle button */}
      <button
        ref={toggleRef}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className={`menu-toggle fixed top-5 left-5 z-50 flex h-[53px] items-center rounded-full bg-base-100/75 backdrop-blur-[10px] w-[130px] ${open ? "menu-open" : ""}`}
      >
        {/* Icon circle */}
        <span className="absolute left-[2.5px] top-[2.5px] flex h-12 w-12 items-center justify-center rounded-full bg-base-450">
          <span className="relative flex h-[30px] w-[30px] items-center justify-center">
            <span
              className={`menu-bar absolute h-[1.5px] w-[15px] bg-base-100 ${
                open ? "menu-bar-top" : "-translate-y-[3px]"
              }`}
            />
            <span
              className={`menu-bar absolute h-[1.5px] w-[15px] bg-base-100 ${
                open ? "menu-bar-bottom" : "translate-y-[3px]"
              }`}
            />
          </span>
        </span>
        {/* Label */}
        <span className="ml-auto mr-6 text-[0.9rem] font-semibold text-base-500">
          Menu
        </span>
      </button>
    </>
  );
}
