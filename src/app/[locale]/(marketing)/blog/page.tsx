import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Blog — Engineering Insights and Product Updates",
  description: "Engineering insights, product updates, and best practices for AI-powered sprint planning and cross-team alignment.",
  path: "/blog",
});

export default function Page() {
  return <PageContent />;
}
