import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "For Product Leaders",
  description: "Align every sprint with business outcomes. Revenue-weighted backlogs, customer demand signals, and cross-team visibility for product leaders.",
  path: "/solutions/product-leaders",
});

export default function Page() {
  return <PageContent />;
}
