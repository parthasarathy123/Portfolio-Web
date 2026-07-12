import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { MetricGrid, Pill, ProjectCard, SectionLink, StoryCard } from "@/components/Cards";
import { site } from "@/content/site";

export default function HomePage() {
  const home = site.home;
  const work = site.build;
  const techStack = site.techStack;

  return (
    <>
      <section id="home" className="hero-section relative py-20 pb-24">
        <div className="relative z-10">
          <div className="hero-layout mb-16 grid items-center gap-[60px] min-[769px]:grid-cols-[1fr_360px]">
            <div className="hero-copy">
              <div className="hero-intro mb-7">
                <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--text-dim)" }}>
                  <span style={{ color: "var(--gold)" }}>// </span>
                  {home.introLabel}
                </div>
                <div className="mb-[3px] font-display text-[17px] font-semibold" style={{ color: "var(--text)" }}>
                  {site.identity.name}
                </div>
                <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                  <span style={{ color: "var(--gold)" }}>{home.availability.split(" - ")[0]}</span> - {home.availability.split(" - ").slice(1).join(" - ")}
                </div>
              </div>

              <h1 className="hero-headline mb-1.5 font-display font-bold leading-[1.02]">
                {home.headline.map((word, index) => (
                  <span key={word} className="mr-[0.26em] inline-block" style={{ color: "var(--text)" }}>
                    {word}{index < home.headline.length - 1 ? " " : ""}
                  </span>
                ))}
                <br />
                <span className="gold-gradient inline-block">{home.highlightedHeadline}</span>
              </h1>

              <p className="mb-9 mt-5 max-w-xl font-sans text-base leading-[1.82]" style={{ color: "var(--text-muted)" }}>
                {home.subhead}
              </p>

              <div className="hero-actions">
                <Link href={home.primaryCta.href} className="button-primary">
                  {home.primaryCta.label} <span aria-hidden="true">-&gt;</span>
                </Link>
                {home.secondaryCtas.map((cta, index) =>
                  index === 0 ? (
                    <SectionLink key={cta.label} href={cta.href}>
                      {cta.label}
                    </SectionLink>
                  ) : cta.external ? (
                    <a key={cta.label} href={cta.href} target="_blank" rel="noopener noreferrer" className="hero-tertiary-link">
                      {cta.label} <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link key={cta.label} href={cta.href} className="hero-tertiary-link">
                      {cta.label}
                    </Link>
                  ),
                )}
              </div>
            </div>

            <div className="hero-photo-wrap flex items-center justify-center max-[768px]:justify-start">
              <div className="hero-portrait">
                <div className="hero-portrait-inner">
                  <Image src={site.identity.headshot} alt={`Portrait of ${site.identity.name}`} width={360} height={360} sizes="(max-width: 640px) 96px, (max-width: 900px) 260px, 360px" className="h-full w-full object-cover" priority />
                </div>
              </div>
            </div>
          </div>

          <MetricGrid stats={home.stats} />
        </div>
      </section>

      <section id="story" className="pb-16">
        <h2 className="sr-only">Career overview</h2>
        <div className="grid-3col">
          {home.story.map((item) => (
            <StoryCard key={item.eyebrow} {...item} />
          ))}
        </div>
      </section>

      <div className="divider" />

      <section className="py-20">
        <div className="section-label">systems</div>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-bold tracking-[-0.025em]" style={{ color: "var(--text)" }}>
            Revenue infrastructure <span style={{ color: "var(--gold)" }}>I can ship.</span>
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {["AI", "CRM", "Outbound", "Ops"].map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>
        </div>
        <div className="systems-grid">
          {home.capabilities.map((item) => (
            <ProjectCard key={item.title} item={item} headingLevel={3} />
          ))}
        </div>
      </section>

      <div className="divider" />

      <section id="work" className="py-20">
        <div className="section-label">{work.label}</div>
        <h2 className="mb-5 max-w-[780px] font-display text-[clamp(34px,5vw,56px)] font-bold leading-[1.08] tracking-[-0.035em]" style={{ color: "var(--text)" }}>
          {work.headline}
          <br />
          <span style={{ color: "var(--gold)" }}>{work.highlighted}</span>
        </h2>
        <p className="mb-12 max-w-[560px] font-sans text-base leading-[1.8]" style={{ color: "var(--text-muted)" }}>
          {work.intro}
        </p>

        {work.sections.map((section, index) => (
          <div key={section.label} className={index === 0 ? "mb-16" : ""}>
            <div className="work-subsection-heading mb-7 flex flex-wrap items-end justify-between gap-5">
              <div>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--text-dim)" }}>
                  {String(index + 1).padStart(2, "0")} / {section.label}
                </div>
                <h3 className="font-display text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.025em]" style={{ color: "var(--text)" }}>
                  {section.headline.replace(section.highlighted, "")}
                  <span style={{ color: "var(--gold)" }}>{section.highlighted}</span>
                </h3>
              </div>
            </div>
            <div className="grid-3col">
              {section.items.map((item) => (
                <ProjectCard key={item.title} item={item} headingLevel={4} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="divider" />

      <section id="tech-stack" className="py-20">
        <div className="section-label">{techStack.label}</div>
        <div className="mb-10">
          <div className="tech-heading-row">
            <h2 className="mb-5 font-display text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.08] tracking-[-0.032em]" style={{ color: "var(--text)" }}>
              {techStack.headline}
              {" "}<span style={{ color: "var(--gold)" }}>{techStack.highlighted}</span>
            </h2>
            <p className="font-sans text-[15px] leading-[1.85]" style={{ color: "var(--text-muted)" }}>
              {techStack.intro}
            </p>
          </div>
          <div className="tools-cluster">
            {techStack.tools.map((tool) => (
              <div key={tool.name} className="tool-item">
                <span className="tool-logo-frame" aria-hidden="true">
                  {tool.logo ? <Image src={tool.logo} alt="" width={48} height={48} sizes="48px" className="tool-logo" unoptimized /> : <span className="tool-mark">{tool.mark}</span>}
                </span>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="contact" className="py-20">
        <div className="section-label">contact</div>
        <div className="grid-2col">
          <div>
            <h2 className="mb-4 font-display text-[clamp(28px,3.5vw,40px)] font-bold tracking-[-0.025em]" style={{ color: "var(--text)" }}>
              {home.contact.headline.replace("something.", "")}
              <span style={{ color: "var(--gold)" }}>something.</span>
            </h2>
            <p className="mb-7 font-sans text-[15px] leading-[1.85]" style={{ color: "var(--text-muted)" }}>
              {home.contact.body}
            </p>
            {site.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="contact-link"
                aria-label={`${item.label}: ${item.value}${item.external ? ", opens in a new tab" : ""}`}
                style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                <span className="contact-icon" style={{ color: "var(--gold)" }} aria-hidden="true">
                  {item.short}
                </span>
                <span>
                  <span className="block font-mono text-[10px]" style={{ color: "var(--text-dim)" }}>
                    {item.label}
                  </span>
                  <span className="font-sans text-[13px]">{item.value}</span>
                </span>
                <span className="contact-arrow" aria-hidden="true">-&gt;</span>
              </a>
            ))}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
