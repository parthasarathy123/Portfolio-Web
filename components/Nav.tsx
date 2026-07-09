"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-[100] flex h-14 items-center justify-between border-b px-10 backdrop-blur-[14px]"
      style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}
    >
      <Link
        href="/"
        className="font-display text-[15px] font-bold tracking-[-0.01em]"
        style={{ color: "var(--text)" }}
      >
        {site.identity.handle}
      </Link>

      <ul className="desktop-links flex list-none gap-1">
        {site.nav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-lg border px-[13px] py-1.5 font-mono text-xs tracking-[0.01em] transition"
                style={{
                  color: active ? "var(--bg)" : "var(--text-muted)",
                  background: active ? "var(--gold)" : "transparent",
                  borderColor: active ? "var(--gold)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          href="/#contact"
          className="nav-cta rounded-lg px-[18px] py-[7px] font-mono text-xs font-semibold tracking-[0.02em]"
          style={{ background: "var(--gold)", color: "var(--bg)" }}
        >
          let's talk -&gt;
        </Link>
        <Link
          href="/#contact"
          className="rounded-lg border px-3 py-2 font-mono text-[15px] leading-none transition min-[901px]:hidden"
          style={{
            background: "var(--surface-2)",
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
          aria-label="Contact"
        >
          @
        </Link>
      </div>
    </nav>
  );
}
