"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";
import LocaleToggle from "./LocaleToggle";
import type { Dict, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function Nav({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections: { href: string; label: string }[] = [
    { href: "#concept", label: dict.nav.about },
    { href: "#research", label: dict.nav.research },
    { href: "#phase", label: dict.nav.roadmap },
    { href: "#partnership", label: dict.nav.partnership },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "backdrop-blur-md" : ""
      )}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          scrolled ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,7,13,0.72) 0%, rgba(3,7,13,0) 100%)",
        }}
      />
      <nav className="relative mx-auto flex max-w-[1480px] items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <Link
          href={`/${locale}`}
          className="text-ivory transition-opacity hover:opacity-80"
          aria-label="ScandWave Energy"
        >
          <BrandMark />
        </Link>
        <ul className="hidden items-center gap-8 lg:flex">
          {sections.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-foam transition-colors hover:text-ivory"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 md:gap-6">
          <LocaleToggle locale={locale} ariaLabel={dict.aria.toggleLang} />
          <a
            href="#contact"
            className="hidden items-center gap-2 border border-ivory/15 px-3.5 py-2 font-mono text-[11px] tracking-[0.2em] uppercase text-ivory transition-all hover:border-cyan hover:text-cyan md:inline-flex"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan pulse-dot" />
            {dict.nav.contact}
          </a>
        </div>
      </nav>
    </header>
  );
}
