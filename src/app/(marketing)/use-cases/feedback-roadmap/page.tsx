import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Feedback to Roadmap — Customer Demand to Sprint Priorities",
  description: "Turn customer feedback, support tickets, and sales objections into revenue-weighted sprint priorities with LOOP.",
  path: "/use-cases/feedback-roadmap",
});

export default function Page() {
  return <PageContent />;
}
