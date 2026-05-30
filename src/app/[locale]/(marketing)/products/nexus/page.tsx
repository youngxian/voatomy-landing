import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "NEXUS — The Full AI Platform",
  description: "All Voatomy products unified into one AI organizational nerve center. Cross-team visibility, org-level KPIs, and executive dashboards.",
  path: "/products/nexus",
});

export default function Page() {
  return <PageContent />;
}
