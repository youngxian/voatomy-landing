import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "PHANTOM — Tech Debt Radar",
  description: "Tech debt visible in dollars for leadership — not jargon. Continuous codebase scanning, debt hotspot mapping, and executive remediation dashboards.",
  path: "/products/phantom",
});

export default function Page() {
  return <PageContent />;
}
