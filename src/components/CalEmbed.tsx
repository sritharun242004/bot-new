"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { RevealText } from "./RevealText";

export function CalEmbed() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Detect initial theme
    const saved = localStorage.getItem("theme");
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);

    // Watch for theme changes via localStorage
    const handleStorage = () => {
      const current = localStorage.getItem("theme");
      setTheme(current === "light" ? "light" : "dark");
    };

    // Also watch for CSS variable changes (toggle button sets --base-500)
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.documentElement).getPropertyValue("--base-500").trim();
      setTheme(bg === "#FFFFFF" ? "light" : "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        styles: {
          branding: { brandColor: theme === "dark" ? "#FFFFFF" : "#000000" },
        },
      });
    })();
  }, [theme]);

  return (
    <section className="bg-base-500 px-6 pt-0 pb-0 md:py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <RevealText
          text="Let's talk"
          as="h2"
          className="mb-4 md:mb-8 text-center text-[clamp(2rem,4vw,3.5rem)] font-[550] tracking-[-2.4px] text-base-100"
        />
        <div
          className="overflow-hidden rounded-[2rem] border border-base-400/20 transition-colors duration-300"
          style={{ backgroundColor: theme === "dark" ? "#171717" : "#FFFFFF" }}
        >
          <Cal
            key={theme}
            calLink="thebotcompany/meet-the-bot"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{
              layout: "month_view",
              theme,
            }}
          />
          <style>{`
            [data-cal-namespace] [data-testid="powered-by-cal"],
            [data-cal-namespace] .mt-4.flex.justify-center,
            [data-cal-namespace] a[href*="cal.com"] {
              display: none !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
