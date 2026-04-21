"use client";

import { useEffect, useState } from "react";

const darkTheme = {
  "--base-100": "#FFFFFF",
  "--base-200": "#D4D4D4",
  "--base-250": "#A3A3A3",
  "--base-300": "#787878",
  "--base-350": "#525252",
  "--base-400": "#333333",
  "--base-450": "#171717",
  "--base-500": "#000000",
  "--selection-bg": "rgba(255, 255, 255, 0.15)",
  "--logo-brightness": "1.8",
  "--logo-contrast": "1",
  "--logo-blend": "screen",
};

const lightTheme = {
  "--base-100": "#000000",
  "--base-200": "#1A1A1A",
  "--base-250": "#404040",
  "--base-300": "#606060",
  "--base-350": "#808080",
  "--base-400": "#D4D4D4",
  "--base-450": "#F0F0F0",
  "--base-500": "#FFFFFF",
  "--selection-bg": "rgba(0, 0, 0, 0.15)",
  "--logo-brightness": "0.6",
  "--logo-contrast": "1",
  "--logo-blend": "multiply",
};

function applyTheme(theme: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDark(false);
      applyTheme(lightTheme);
      document.documentElement.style.setProperty("--map-filter", "contrast(1.3) brightness(1.1)");
      document.documentElement.style.setProperty("--map-blend", "multiply");
    } else {
      document.documentElement.style.setProperty("--map-filter", "invert(1) contrast(1.5) brightness(1.2)");
      document.documentElement.style.setProperty("--map-blend", "screen");
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next ? darkTheme : lightTheme);
    // Map filter: invert in dark mode so dark lines become light
    document.documentElement.style.setProperty(
      "--map-filter",
      next ? "invert(1) contrast(1.5) brightness(1.2)" : "contrast(1.3) brightness(1.1)"
    );
    document.documentElement.style.setProperty(
      "--map-blend",
      next ? "screen" : "multiply"
    );
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-base-400 bg-base-450 transition-colors hover:bg-base-400"
      aria-label="Toggle theme"
    >
      {isDark ? (
        /* Sun icon — click to go light */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-base-100"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        /* Moon icon — click to go dark */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-base-100"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
