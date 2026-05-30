import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "DRIFT — Design System Sync",
  description: "Keep Figma designs and code components in permanent sync. Real-time drift detection, token sync, and revenue-aware design suggestions.",
  path: "/products/drift",
});

export default function Page() {
  return <PageContent />;
}
