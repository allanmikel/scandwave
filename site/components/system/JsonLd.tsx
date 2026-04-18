import type { Dict, Locale } from "@/lib/i18n";

export default function JsonLd({ locale, dict }: { locale: Locale; dict: Dict }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Scand Wave Energy AB",
    legalName: "Scand Wave Energy AB",
    url: "https://scandwave.com",
    description: dict.meta.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ängsvägen 17",
      postalCode: "556 33",
      addressLocality: "Jönköping",
      addressCountry: "SE",
    },
    identifier: "559532-7338",
    founder: [{ "@type": "Person", name: "Yako Kabrial" }],
    employee: [{ "@type": "Person", name: "Jakob Kabrial", jobTitle: "CEO" }],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "partnerships",
        email: "sargon@orahim.io",
        name: "Sargon Orahim",
      },
      {
        "@type": "ContactPoint",
        contactType: "executive",
        telephone: "+46704971576",
        name: "Jakob Kabrial",
      },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    name: "A Novel Approach to Wave Energy Conversion Using CFD Technique",
    author: [
      { "@type": "Person", name: "Nawar Abbas" },
      { "@type": "Person", name: "Michel Barbahan" },
      { "@type": "Person", name: "Yako Kabrial" },
      { "@type": "Person", name: "Admoun Kabrial" },
    ],
    isPartOf: {
      "@type": "Periodical",
      name: "Polish Maritime Research",
      volumeNumber: "31",
      issueNumber: "3",
    },
    datePublished: "2024",
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <meta name="language" content={locale} />
    </>
  );
}
