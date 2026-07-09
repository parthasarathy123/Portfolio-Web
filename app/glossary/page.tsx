import { GlossaryExplorer } from "@/components/GlossaryExplorer";
import { site } from "@/content/site";

export default function GlossaryPage() {
  const glossary = site.glossary;

  return (
    <>
      <section className="py-20 pb-12">
        <div className="section-label">{glossary.label}</div>
        <h1 className="mb-4 font-display text-[clamp(40px,6vw,72px)] font-bold leading-[1.06] tracking-[-0.035em]" style={{ color: "var(--text)" }}>
          {glossary.headline}
          <br />
          <span style={{ color: "var(--gold)" }}>{glossary.highlighted}</span>
        </h1>
        <p className="max-w-[520px] font-sans text-base leading-[1.8]" style={{ color: "var(--text-muted)" }}>
          {glossary.intro} {glossary.terms.length} terms and counting.
        </p>
      </section>
      <GlossaryExplorer categories={glossary.categories} terms={glossary.terms} />
    </>
  );
}
