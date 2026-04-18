import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, LOCALES, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import SmoothScroll from "@/components/system/SmoothScroll";
import CursorGlow from "@/components/system/CursorGlow";
import OceanBackdrop from "@/components/canvas/OceanBackdrop";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        sv: "/sv",
        en: "/en",
        "x-default": "/sv",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "sv" ? "sv_SE" : "en_GB",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const typedLocale = locale as Locale;

  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ivory focus:text-abyss focus:px-3 focus:py-2 focus:text-sm"
      >
        {dict.aria.skipToContent}
      </a>
      <OceanBackdrop />
      <Nav dict={dict} locale={typedLocale} />
      <CursorGlow />
      <main id="main" lang={typedLocale}>
        {children}
      </main>
      <Footer dict={dict} locale={typedLocale} />
    </SmoothScroll>
  );
}
