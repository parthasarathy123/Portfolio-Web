import { site } from "@/content/site";
import { AnnouncementBar } from "./AnnouncementBar";
import { Nav } from "./Nav";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="corner-accent" aria-hidden="true" />
      <header>
        <AnnouncementBar />
      </header>
      <Nav />
      <aside className="right-rail" aria-label="Quick contact links">
        {site.social.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-label={`${item.label}${item.external ? " (opens in a new tab)" : ""}`}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="right-rail-link"
          >
            <span aria-hidden="true">{item.short}</span>
          </a>
        ))}
      </aside>
      <main id="main-content" className="site-main" tabIndex={-1}>{children}</main>
      <footer className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="site-container footer-inner" style={{ color: "var(--text-dim)" }}>
          <span>{site.footer}</span>
          <div className="flex flex-wrap gap-5">
            {site.footerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="transition hover:text-[var(--gold)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
