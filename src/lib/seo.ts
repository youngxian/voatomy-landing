import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  noIndex,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: SITE_CONFIG.name }],
      type: "website",
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
