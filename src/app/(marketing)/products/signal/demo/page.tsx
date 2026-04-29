import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "SIGNAL — Demo",
  description:
    "See SIGNAL in action. Revenue-aware incident management that correlates outages with business impact.",
  path: "/products/signal/demo",
});

export default function Page() {
  return <PageContent />;
}
