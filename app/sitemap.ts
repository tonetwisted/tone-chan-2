import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tonechanadventures.com";

  return [
    { url: base,                    lastModified: new Date(), priority: 1.0,  changeFrequency: "weekly" },
    { url: `${base}/play`,          lastModified: new Date(), priority: 0.9,  changeFrequency: "monthly" },
    { url: `${base}/community`,     lastModified: new Date(), priority: 0.8,  changeFrequency: "weekly" },
    { url: `${base}/about`,         lastModified: new Date(), priority: 0.7,  changeFrequency: "monthly" },
    { url: `${base}/gallery`,       lastModified: new Date(), priority: 0.6,  changeFrequency: "monthly" },
    { url: `${base}/press`,         lastModified: new Date(), priority: 0.4,  changeFrequency: "monthly" },
    { url: `${base}/privacy`,       lastModified: new Date(), priority: 0.2,  changeFrequency: "yearly" },
    { url: `${base}/terms`,         lastModified: new Date(), priority: 0.2,  changeFrequency: "yearly" },
  ];
}
