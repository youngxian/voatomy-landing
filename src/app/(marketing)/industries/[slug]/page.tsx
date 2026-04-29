import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import {
  INDUSTRY_PAGE_BY_SLUG,
  MARKETING_INDUSTRY_SLUGS,
  isMarketingIndustrySlug,
} from "@/lib/industry-pages";
import PageContent from "./page-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return MARKETING_INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isMarketingIndustrySlug(slug)) {
    return { title: "Industry — Voatomy" };
  }
  const page = INDUSTRY_PAGE_BY_SLUG[slug];
  const url = `${SITE_CONFIG.url}/industries/${slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isMarketingIndustrySlug(slug)) {
    notFound();
  }
  return <PageContent slug={slug} />;
}
