import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Roadmap — What We're Building Next",
  description: "See what's coming to Voatomy. Our public roadmap shows planned features, in-progress work, and recently shipped updates across all six products.",
  path: "/roadmap",
});

export default function Page() {
  return <PageContent />;
}
