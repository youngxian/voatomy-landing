import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Revenue Intelligence — Link Customer Feedback to Business Outcomes",
  description: "Connect customer signals to revenue impact. LOOP scores churn risk, tracks deal velocity, and revenue-weights your backlog.",
  path: "/use-cases/revenue-intelligence",
});

export default function Page() {
  return <PageContent />;
}
