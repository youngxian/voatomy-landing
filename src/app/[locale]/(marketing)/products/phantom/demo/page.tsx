import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "PHANTOM — Demo",
  description:
    "See PHANTOM in action. Surface hidden tech debt, quantify its cost, and prioritize remediation intelligently.",
  path: "/products/phantom/demo",
});

export default function Page() {
  return <PageContent />;
}
