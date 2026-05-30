import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "For Design Teams",
  description: "Design system governance, code sync, and UX analytics. Keep Figma designs and production code in permanent sync with DRIFT.",
  path: "/solutions/design-teams",
});

export default function Page() {
  return <PageContent />;
}
