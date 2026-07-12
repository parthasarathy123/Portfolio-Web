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
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={theme === "light"}
      className="theme-toggle"
      style={{
        background: "var(--surface-2)",
        borderColor: "var(--gold-border)",
        color: "var(--gold)",
      }}
    >
      <span aria-hidden="true">{theme === "light" ? "moon" : "sun"}</span>
      <span className="theme-toggle-label">{theme === "light" ? "dark" : "light"}</span>
    </button>
  );
}
