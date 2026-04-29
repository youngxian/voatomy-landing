import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "DRIFT — Demo",
  description:
    "See DRIFT in action. Keep Figma designs and code components in permanent sync with real-time drift detection.",
  path: "/products/drift/demo",
});

export default function Page() {
  return <PageContent />;
}
