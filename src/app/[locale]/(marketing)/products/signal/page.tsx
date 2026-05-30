import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "SIGNAL — Incident Intelligence",
  description: "Translate incidents into revenue impact for SRE and DevOps teams. Intelligent routing, business context, and post-incident analysis.",
  path: "/products/signal",
});

export default function Page() {
  return <PageContent />;
}
