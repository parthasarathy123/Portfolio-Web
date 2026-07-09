import { Pill } from "@/components/Cards";
import { site } from "@/content/site";

export default function CaseStudiesPage() {
  const page = site.caseStudies;

  return (
    <>
      <section className="py-20 pb-[60px]">
        <div className="section-label">{page.label}</div>
        <h1 className="mb-5 font-display text-[clamp(40px,6vw,72px)] font-bold leading-[1.06] tracking-[-0.035em]" style={{ color: "var(--text)" }}>
          {page.headline}
          <br />
          <span style={{ color: "var(--gold)" }}>{page.highlighted}</span>
        </h1>
        <p className="mb-4 max-w-[520px] font-sans text-base leading-[1.8]" style={{ color: "var(--text-muted)" }}>
          {page.intro}
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px]" style={{ color: "var(--gold)", background: "var(--gold-bg)", borderColor: "var(--gold-border)" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)" }} />
          {page.badge}
        </div>
      </section>

      <div className="divider" />

      <section className="flex flex-col gap-0.5 py-[60px] pb-20">
        {page.studies.map((study) => (
          <article key={study.title} className="rounded-[14px] border px-7 py-8 opacity-80" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
            <div className="mb-4 flex items-start justify-between gap-5">
              <div>
                <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: "var(--text-dim)" }}>
                  {study.category}
                </div>
                <h2 className="font-display text-xl font-bold tracking-[-0.02em]" style={{ color: "var(--text)" }}>
                  {study.title}
                </h2>
              </div>
              <span className="shrink-0 rounded-full border px-3 py-1 font-mono text-[9px]" style={{ color: "var(--text-dim)", background: "var(--surface)", borderColor: "var(--border)" }}>
                METRICS PENDING
              </span>
            </div>
            <p className="mb-5 max-w-[680px] font-sans text-sm leading-[1.75]" style={{ color: "var(--text-muted)" }}>
              {study.description}
            </p>
            <div className="mb-5 grid grid-cols-3 gap-2.5 max-sm:grid-cols-1">
              {study.metrics.map((metric) => (
                <div key={metric} className="rounded-lg border px-4 py-3.5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                  <div className="mb-1 font-display text-[22px] font-bold" style={{ color: "var(--text-dim)" }}>
                    -
                  </div>
                  <div className="font-mono text-[10px] leading-[1.4]" style={{ color: "var(--text-dim)" }}>
                    {metric}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {study.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
