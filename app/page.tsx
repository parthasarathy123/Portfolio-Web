import Image from "next/image";
import Link from "next/link";
import { Pill, ProjectCard, SectionLink, StoryCard } from "@/components/Cards";
import { site } from "@/content/site";

export default function HomePage() {
  const home = site.home;

  return (
    <>
      <section className="relative overflow-hidden py-20 pb-24">
        <div className="hero-glow-a" />
        <div className="hero-glow-b" />
        <div className="relative z-10">
          <div className="mb-16 grid items-center gap-[60px] min-[769px]:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-7">
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

              <h1 className="mb-1.5 font-display text-[clamp(42px,5.5vw,80px)] font-bold leading-[1.02] tracking-[-0.038em]">
                {home.headline.map((word) => (
                  <span key={word} className="mr-[0.26em] inline-block" style={{ color: "var(--text)" }}>
                    {word}
                  </span>
                ))}
                <br />
                <span className="gold-gradient inline-block">{home.highlightedHeadline}</span>
              </h1>

              <p className="mb-9 mt-5 max-w-xl font-sans text-base leading-[1.82]" style={{ color: "var(--text-muted)" }}>
                {home.subhead}
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={home.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-7 py-[13px] font-mono text-xs font-bold tracking-[0.03em] shadow-[0_4px_24px_rgba(201,150,59,0.25)]"
                  style={{ background: "var(--gold)", color: "var(--bg)" }}
                >
                  {home.primaryCta.label} -&gt;
                </a>
                {home.secondaryCtas.map((cta, index) =>
                  index < 2 ? (
                    <SectionLink key={cta.label} href={cta.href}>
                      {cta.label}
                    </SectionLink>
                  ) : (
                    <Link key={cta.label} href={cta.href} className="font-mono text-xs tracking-[0.03em]" style={{ color: "var(--text-dim)" }}>
                      {cta.label}
                    </Link>
                  ),
                )}
              </div>
            </div>

            <div className="flex items-center justify-center max-[768px]:order-first">
              <div className="relative">
                <div className="absolute inset-[-24px] rounded-full bg-[radial-gradient(circle,rgba(201,150,59,0.2)_0%,rgba(201,150,59,0.06)_50%,transparent_70%)]" />
                <div className="absolute inset-[-6px] z-[1] rounded-full border" style={{ borderColor: "var(--gold-border)" }} />
                <div className="relative z-[2] h-[360px] w-[360px] overflow-hidden rounded-full shadow-[0_8px_60px_rgba(201,150,59,0.2),0_0_0_3px_rgba(201,150,59,0.25)] max-[768px]:h-[220px] max-[768px]:w-[220px]">
                  <Image src={site.identity.headshot} alt={site.identity.name} width={360} height={360} className="h-full w-full object-cover" priority />
                </div>
              </div>
            </div>
          </div>

          <div className="grid-4col">
            {home.stats.map((stat) => (
              <div key={stat.label} className="px-[26px] py-[22px]" style={{ background: "var(--surface)" }}>
                <div className="font-display text-[32px] font-bold leading-none tracking-[-0.02em]" style={{ color: "var(--text)" }}>
                  {stat.value}
                </div>
                <div className="mt-1.5 font-mono text-[10px] tracking-[0.05em]" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="pb-16">
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
        <div className="grid-2col gap-3">
          {home.capabilities.map((item) => (
            <ProjectCard key={item.title} item={item} />
          ))}
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
                className="mb-2 flex items-center gap-3.5 rounded-lg border px-4 py-3 text-[13px]"
                style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                <span className="w-7 text-center font-mono text-[10px]" style={{ color: "var(--gold)" }}>
                  {item.short}
                </span>
                <span>
                  <span className="block font-mono text-[10px]" style={{ color: "var(--text-dim)" }}>
                    {item.label}
                  </span>
                  <span className="font-sans text-[13px]">{item.href.replace("mailto:", "")}</span>
                </span>
              </a>
            ))}
          </div>
          <form className="flex flex-col gap-3">
            <label className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "var(--text-dim)" }}>
              NAME
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "var(--text-dim)" }}>
              COMPANY
              <input type="text" name="company" placeholder="Your company" />
            </label>
            <label className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "var(--text-dim)" }}>
              EMAIL
              <input type="email" name="email" placeholder="your@company.com" />
            </label>
            <label className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "var(--text-dim)" }}>
              WHAT DO YOU NEED?
              <textarea name="message" placeholder="Tell me about your GTM challenge..." className="min-h-[110px]" />
            </label>
            <button type="button" className="rounded-lg px-6 py-3 text-left font-mono text-xs font-semibold" style={{ background: "var(--gold)", color: "var(--bg)" }}>
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
