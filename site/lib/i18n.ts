import type svDict from "@/dictionaries/sv.json";

export type Locale = "sv" | "en";
export type Dict = typeof svDict;

export const LOCALES: readonly Locale[] = ["sv", "en"] as const;
export const DEFAULT_LOCALE: Locale = "sv";

export const hasLocale = (locale: string): locale is Locale =>
  (LOCALES as readonly string[]).includes(locale);

export const alternateLocale = (l: Locale): Locale => (l === "sv" ? "en" : "sv");
