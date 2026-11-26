"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/content/company";
export default function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);
  function close() {
    setOpen(false);
    button.current?.focus();
  }
  return (
    <header
      className="header"
      onKeyDown={(e) => {
        if (open && e.key === "Escape") {
          e.preventDefault();
          close();
        }
      }}
    >
      <Link
        href="/"
        className="brand"
        aria-label="MNDW 홈"
        onClick={() => setOpen(false)}
      >
        <span>MNDW</span>
      </Link>
      <nav className="desktop-nav" aria-label="주 메뉴">
        {navigation.map((n) => (
          <Link
            key={n.slug}
            href={`/${n.slug}`}
            aria-current={
              pathname.startsWith(`/${n.slug}`) ? "page" : undefined
            }
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <span className="language" lang="en">
        KR
      </span>
      <button
        ref={button}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => (open ? close() : setOpen(true))}
      >
        {open ? "닫기" : "메뉴"}
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          ref={panel}
          aria-label="모바일 주 메뉴"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              close();
            }
            if (e.key === "Tab") {
              const links = panel.current?.querySelectorAll("a");
              if (!links) return;
              if (
                !e.shiftKey &&
                document.activeElement === links[links.length - 1]
              ) {
                e.preventDefault();
                button.current?.focus();
              }
            }
          }}
        >
          {navigation.map((n) => (
            <Link
              key={n.slug}
              href={`/${n.slug}`}
              onNavigate={() => setOpen(false)}
            >
              <span>{n.label}</span>
              <small lang="en">{n.english}</small>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
