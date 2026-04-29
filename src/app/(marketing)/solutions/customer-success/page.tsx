import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "For Customer Success Leaders",
  description:
    "Stop learning about outages from your customers. Get proactive visibility into product health, churn signals, and customer impact.",
  path: "/solutions/customer-success",
});

export default function Page() {
  return <PageContent />;
}
