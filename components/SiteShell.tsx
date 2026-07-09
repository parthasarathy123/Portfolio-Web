import Link from "next/link";
import { site } from "@/content/site";
import { Nav } from "./Nav";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed left-0 top-0 z-[99999] h-[5px] w-[5px] rounded-full" style={{ background: "var(--gold)" }} />
      <div className="announce">
        <span>
          // {site.announcement.text} - <Link href="/#contact">reach out -&gt;</Link>
        </span>
        <span style={{ color: "var(--text-dim)", fontSize: 18, lineHeight: 1 }}>x</span>
      </div>
      <Nav />
      <aside className="right-rail fixed right-5 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1.5 rounded-full border px-2 py-2.5 backdrop-blur">
        {site.social.map((item) => (
          <a
            key={item.label}
            href={item.href}
            title={item.label}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="flex h-9 w-9 items-center justify-center rounded-full font-mono text-[11px] font-semibold tracking-[0.04em] transition hover:bg-[var(--gold-bg)] hover:text-[var(--gold)]"
            style={{ color: "var(--text-muted)" }}
          >
            {item.short}
          </a>
        ))}
      </aside>
      <main className="site-main">{children}</main>
      <footer className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-5 px-10 py-6 font-mono text-[11px]" style={{ color: "var(--text-dim)" }}>
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
