import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { CASE_STUDIES } from "@/lib/case-studies";
import PageContent from "./page-content";

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];
  if (!study) {
    return { title: "Case Study Not Found — Voatomy" };
  }
  const url = `${SITE_CONFIG.url}/customers/${slug}`;
  return {
    title: `${study.company} Case Study — Voatomy`,
    description: `${study.headline}. See how ${study.company} uses Voatomy to transform engineering delivery.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${study.company} — ${study.headline}`,
      description: study.overview,
      url,
      siteName: SITE_CONFIG.name,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PageContent slug={slug} />;
}
