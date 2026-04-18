import BrandMark from "./BrandMark";
import type { Dict, Locale } from "@/lib/i18n";
import LocaleToggle from "./LocaleToggle";

export default function Footer({ dict, locale }: { dict: Dict; locale: Locale }) {
  return (
    <footer className="relative mt-32 border-t border-ivory/8 bg-abyss">
      <div className="mx-auto max-w-[1480px] px-6 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandMark className="text-ivory" />
            <p className="mt-5 max-w-sm text-sm text-ivory-dim/80">
              {dict.meta.description}
            </p>
          </div>
          <div className="md:col-span-4">
            <p className="mono-label">{dict.footer.company}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-ivory-dim/70">
              <li>{dict.footer.orgno}</li>
              <li>{dict.footer.address}</li>
              <li className="text-mute">{dict.footer.sector}</li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="mono-label">{dict.nav.contact}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li>
                <a
                  href="mailto:sargon@orahim.io"
                  className="text-ivory-dim transition-colors hover:text-cyan"
                >
                  sargon@orahim.io
                </a>
              </li>
              <li>
                <a
                  href="tel:+46704971576"
                  className="text-ivory-dim transition-colors hover:text-cyan"
                >
                  +46 70 497 15 76
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ivory/8 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-mute">{dict.footer.legal}</p>
          <LocaleToggle locale={locale} ariaLabel={dict.aria.toggleLang} compact />
        </div>
      </div>
    </footer>
  );
}
