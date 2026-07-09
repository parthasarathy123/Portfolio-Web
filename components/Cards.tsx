import Link from "next/link";

export type TagCardItem = {
  title: string;
  eyebrow?: string;
  description: string;
  tags?: string[];
  href?: string;
  cta?: string;
  status?: string;
  metric?: string;
};

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full border px-2.5 py-[3px] font-mono text-[10px]"
      style={{
        color: "var(--text-muted)",
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {children}
    </span>
  );
}

export function ProjectCard({ item }: { item: TagCardItem }) {
  const body = (
    <div
      className="h-full rounded-2xl border p-7 transition hover:border-[var(--gold-border)]"
      style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="font-display text-lg font-bold tracking-[-0.02em]" style={{ color: "var(--text)" }}>
          {item.title}
        </div>
        {item.status ? (
          <span className="shrink-0 rounded-full border px-2.5 py-[3px] font-mono text-[9px]" style={{ color: "var(--gold)", background: "var(--gold-bg)", borderColor: "var(--gold-border)" }}>
            {item.status}
          </span>
        ) : null}
      </div>
      {item.metric ? (
        <div className="mb-2 font-mono text-[11px] tracking-[0.05em]" style={{ color: "var(--gold)" }}>
          {item.metric}
        </div>
      ) : null}
      <p className="mb-4 font-sans text-[13px] leading-[1.75]" style={{ color: "var(--text-muted)" }}>
        {item.description}
      </p>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {item.tags?.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>
      {item.cta ? (
        <div className="font-mono text-[11px]" style={{ color: "var(--gold)" }}>
          {item.cta}
        </div>
      ) : null}
    </div>
  );

  if (item.href) {
    const external = item.href.startsWith("http");
    return (
      <a href={item.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="block h-full">
        {body}
      </a>
    );
  }

  return body;
}

export function StoryCard({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div
      className="rounded-[14px] border px-6 py-[26px]"
      style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
    >
      <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: "var(--text-dim)" }}>
        {eyebrow}
      </div>
      <div className="mb-2.5 font-display text-[15px] font-semibold leading-[1.4] tracking-[-0.01em]" style={{ color: "var(--text)" }}>
        {title}
      </div>
      <div className="font-mono text-xs leading-[1.7]" style={{ color: "var(--text-muted)" }}>
        {description}
      </div>
    </div>
  );
}

export function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg border px-7 py-[13px] font-mono text-xs tracking-[0.03em]"
      style={{ color: "var(--text-muted)", borderColor: "var(--border-2)" }}
    >
      {children}
    </Link>
  );
}
