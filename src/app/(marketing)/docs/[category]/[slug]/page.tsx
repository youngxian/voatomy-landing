import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { DOCS_DATA } from "@/lib/docs-content";
import PageContent from "./page-content";

export function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  for (const [category, slugs] of Object.entries(DOCS_DATA)) {
    for (const slug of Object.keys(slugs)) {
      params.push({ category, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const doc = DOCS_DATA[category]?.[slug];
  if (!doc) {
    return { title: "Doc Not Found — Voatomy Docs" };
  }
  const url = `${SITE_CONFIG.url}/docs/${category}/${slug}`;
  return {
    title: `${doc.title} — Voatomy Docs`,
    description: doc.description,
    alternates: { canonical: url },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url,
      siteName: SITE_CONFIG.name,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  return <PageContent category={category} slug={slug} />;
}
