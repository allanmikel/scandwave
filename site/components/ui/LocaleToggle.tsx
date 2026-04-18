"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LocaleToggle({
  locale,
  ariaLabel,
  compact = false,
}: {
  locale: Locale;
  ariaLabel: string;
  compact?: boolean;
}) {
  const pathname = usePathname();
  const other = alternateLocale(locale);
  const target = pathname.replace(/^\/(sv|en)/, `/${other}`) || `/${other}`;

  return (
    <Link
      href={target}
      aria-label={ariaLabel}
      className={cn(
        "group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-foam transition-colors hover:text-ivory",
        compact && "text-[10px] tracking-[0.18em]"
      )}
    >
      <span className={locale === "sv" ? "text-ivory" : "opacity-55"}>SV</span>
      <span className="relative inline-flex h-[1px] w-5 items-center bg-foam/40">
        <span
          className={cn(
            "absolute h-[5px] w-[5px] rounded-full bg-cyan transition-all duration-500",
            locale === "sv" ? "left-0" : "left-[calc(100%-5px)]"
          )}
        />
      </span>
      <span className={locale === "en" ? "text-ivory" : "opacity-55"}>EN</span>
    </Link>
  );
}
