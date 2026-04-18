import "server-only";
import type { Dict, Locale } from "./i18n";

const dictionaries: Record<Locale, () => Promise<Dict>> = {
  sv: () => import("@/dictionaries/sv.json").then((m) => m.default as Dict),
  en: () => import("@/dictionaries/en.json").then((m) => m.default as Dict),
};

export const getDictionary = async (locale: Locale): Promise<Dict> =>
  dictionaries[locale]();
