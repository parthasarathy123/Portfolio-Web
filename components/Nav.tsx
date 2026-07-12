"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="site-container site-nav-inner">
        <Link href="/" className="brand-link" aria-label={`${site.identity.name}, home`}>
          {site.identity.handle}
        </Link>

        <ul className="desktop-links" aria-label="Main sections">
          {site.nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link href={item.href} className="nav-link" aria-current={active ? "page" : undefined} data-active={active || undefined}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/#contact" className="nav-cta">let&apos;s talk <span aria-hidden="true">-&gt;</span></Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">{menuOpen ? "x" : "menu"}</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id="mobile-navigation" className="mobile-navigation">
          <div className="site-container mobile-navigation-inner">
            <ul>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeMenu}>{item.label}</Link>
                </li>
              ))}
              <li>
                <a href={site.social[0].href} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                  LinkedIn <span aria-hidden="true">-&gt;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
