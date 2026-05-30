import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "LOOP — Revenue Feedback Engine",
  description: "Close the loop between customer demand and engineering delivery. Revenue-weighted backlogs, churn risk scoring, and deal velocity tracking.",
  path: "/products/loop",
});

export default function Page() {
  return <PageContent />;
}
