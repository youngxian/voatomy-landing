import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "For Sales Leaders",
  description:
    "Stop losing deals to missing features. Get real-time visibility into engineering delivery and enable your team with product intelligence.",
  path: "/solutions/sales-leaders",
});

export default function Page() {
  return <PageContent />;
}
