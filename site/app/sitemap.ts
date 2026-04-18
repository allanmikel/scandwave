import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://scandwave.com";
  const now = new Date();
  return [
    {
      url: `${base}/sv`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { sv: `${base}/sv`, en: `${base}/en` } },
    },
    {
      url: `${base}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { sv: `${base}/sv`, en: `${base}/en` } },
    },
  ];
}
