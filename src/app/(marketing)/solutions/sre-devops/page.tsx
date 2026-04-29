import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "For SRE & DevOps Teams",
  description: "Revenue-aware incidents, alert intelligence, and severity-to-velocity mapping. Translate production incidents into business impact.",
  path: "/solutions/sre-devops",
});

export default function Page() {
  return <PageContent />;
}
