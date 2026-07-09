"use client";

import { useMemo, useState } from "react";

type Term = {
  term: string;
  category: string;
  definition: string;
};

const categoryStyles: Record<string, { border: string; bg: string; text: string }> = {
  "GTM Fundamentals": { border: "rgba(201,150,59,0.25)", bg: "rgba(201,150,59,0.1)", text: "#c9963b" },
  Outbound: { border: "rgba(96,165,250,0.25)", bg: "rgba(96,165,250,0.1)", text: "#60a5fa" },
  "AI & Automation": { border: "rgba(168,85,247,0.25)", bg: "rgba(168,85,247,0.1)", text: "#a855f7" },
  "Enrichment & Data": { border: "rgba(74,222,128,0.25)", bg: "rgba(74,222,128,0.1)", text: "#4ade80" },
  Tools: { border: "rgba(248,113,113,0.25)", bg: "rgba(248,113,113,0.1)", text: "#f87171" },
};

export function GlossaryExplorer({ categories, terms }: { categories: string[]; terms: Term[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery = !q || item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query, terms]);

  function countFor(name: string) {
    if (name === "All") return terms.length;
    return terms.filter((item) => item.category === name).length;
  }

  return (
    <>
      <div className="sticky top-14 z-50 mb-8 border-b pb-5 pt-3" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
        <input type="text" placeholder="Search terms..." value={query} onChange={(event) => setQuery(event.target.value)} className="mb-3.5 rounded-[10px]" />
        <div className="flex flex-wrap gap-1.5">
          {categories.map((item) => {
            const active = item === category;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className="rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.02em] transition"
                style={{
                  borderColor: active ? "var(--gold)" : "var(--border)",
                  background: active ? "var(--gold)" : "transparent",
                  color: active ? "var(--bg)" : "var(--text-muted)",
                }}
              >
                {item}
                <span className="ml-1 opacity-60">- {countFor(item)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5 font-mono text-[11px] tracking-[0.04em]" style={{ color: "var(--text-dim)" }}>
        // {category.toLowerCase()} {filtered.length} terms
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(480px,1fr))] gap-0.5 pb-20 max-[640px]:grid-cols-1">
        {filtered.map((item) => {
          const style = categoryStyles[item.category] ?? categoryStyles.Tools;
          return (
            <article key={item.term} className="border px-6 py-[22px] transition hover:border-[var(--gold-border)]" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
              <div className="mb-2.5 flex items-start justify-between gap-3">
                <h2 className="font-display text-base font-bold tracking-[-0.01em]" style={{ color: "var(--text)" }}>
                  {item.term}
                </h2>
                <span
                  className="shrink-0 rounded-full border px-2.5 py-[3px] font-mono text-[9px] uppercase tracking-[0.08em]"
                  style={{ borderColor: style.border, background: style.bg, color: style.text }}
                >
                  {item.category}
                </span>
              </div>
              <p className="m-0 font-sans text-[13px] leading-[1.75]" style={{ color: "var(--text-muted)" }}>
                {item.definition}
              </p>
            </article>
          );
        })}
      </div>
    </>
  );
}
