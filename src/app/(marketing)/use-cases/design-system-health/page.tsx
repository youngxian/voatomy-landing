import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Design System Health — Design-Code Sync Monitoring",
  description:
    "DRIFT continuously monitors your design system for drift between Figma and code. Catch inconsistencies before they ship.",
  path: "/use-cases/design-system-health",
});

export default function Page() {
  return <PageContent />;
}
