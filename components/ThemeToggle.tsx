"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    setTheme(stored === "light" ? "light" : "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      window.localStorage.setItem("theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
      window.localStorage.setItem("theme", "dark");
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border px-[13px] py-1.5 font-mono text-[11px] font-semibold leading-none tracking-[0.04em] transition"
      style={{
        background: "var(--surface-2)",
        borderColor: "var(--gold-border)",
        color: "var(--gold)",
      }}
    >
      <span>{theme === "light" ? "moon" : "sun"}</span>
      <span className="hidden sm:inline">{theme === "light" ? "dark" : "light"}</span>
    </button>
  );
}
