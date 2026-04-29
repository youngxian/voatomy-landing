import type { Metadata } from "next";
import { SITE_CONFIG, INTEGRATION_CATALOG } from "@/lib/constants";
import { INTEGRATION_META } from "@/lib/integration-meta";
import PageContent from "./page-content";

export function generateStaticParams() {
  return INTEGRATION_CATALOG.map((i) => ({ slug: i.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = INTEGRATION_META[slug];
  const integration = INTEGRATION_CATALOG.find((i) => i.key === slug);
  if (!meta || !integration) {
    return { title: "Integration Not Found — Voatomy" };
  }
  const url = `${SITE_CONFIG.url}/integrations/${slug}`;
  return {
    title: `${meta.headline} — Voatomy Integrations`,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.headline,
      description: meta.description,
      url,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PageContent slug={slug} />;
}
