import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { COMPETITORS } from "@/lib/compare-competitors";
import PageContent from "./page-content";

export function generateStaticParams() {
  return Object.keys(COMPETITORS).map((competitor) => ({ competitor }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor } = await params;
  const comp = COMPETITORS[competitor];
  if (!comp) {
    return { title: "Comparison Not Found — Voatomy" };
  }
  const url = `${SITE_CONFIG.url}/compare/${competitor}`;
  return {
    title: `Voatomy vs ${comp.name} — Feature Comparison`,
    description: comp.description,
    alternates: { canonical: url },
    openGraph: {
      title: `Voatomy vs ${comp.name}`,
      description: comp.description,
      url,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ competitor: string }> }) {
  const { competitor } = await params;
  return <PageContent competitor={competitor} />;
}
