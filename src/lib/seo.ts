import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";
import { locales, type Locale } from "@/i18n/config";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
  locale?: Locale;
}

export function createPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  noIndex,
  locale,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    const suffix = path.replace(/^\/(en|de)/, "") || "";
    languages[l] = `${SITE_CONFIG.url}/${l}${suffix === "/" ? "" : suffix}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: SITE_CONFIG.name }],
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [SITE_CONFIG.ogImage],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
