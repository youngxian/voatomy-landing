import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Documentation — Setup Guides and API Docs",
  description: "Everything you need to get started with Voatomy. Integration guides, API reference, and best practices.",
  path: "/docs",
});

export default function Page() {
  return <PageContent />;
}
