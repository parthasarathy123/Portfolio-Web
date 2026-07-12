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
  return <span className="pill">{children}</span>;
}

export function MetricGrid({ stats }: { stats: ReadonlyArray<{ value: string; label: string }> }) {
  return (
    <dl className="metrics-grid" aria-label="Career highlights">
      {stats.map((stat) => (
        <div key={stat.label} className="metric-item">
          <dd>{stat.value}</dd>
          <dt>{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}

export function ProjectCard({ item, headingLevel = 3 }: { item: TagCardItem; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 4 ? "h4" : "h3";
  const body = (
    <article className={`project-card${item.href ? " project-card-interactive" : ""}`}>
      <div className="project-card-heading">
        <Heading>{item.title}</Heading>
        {item.status ? <span className="project-status">{item.status}</span> : null}
      </div>
      {item.metric ? <p className="project-metric">{item.metric}</p> : null}
      <p className="project-description">{item.description}</p>
      {item.tags?.length ? (
        <div className="tag-list" aria-label="Tools and methods">
          {item.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}
        </div>
      ) : null}
      {item.cta ? <span className="project-cta">{item.cta}</span> : null}
    </article>
  );

  if (!item.href) return body;

  const external = item.href.startsWith("http");
  return (
    <a href={item.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="project-card-link">
      {body}
    </a>
  );
}

export function StoryCard({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <article className="story-card">
      <p className="story-eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="button-secondary">{children}</Link>;
}
