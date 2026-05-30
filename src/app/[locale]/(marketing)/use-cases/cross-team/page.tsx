import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Cross-Team Alignment — Connect Engineering, Design, Product, and Sales",
  description: "Break silos between engineering, product, design, and sales. NEXUS provides cross-team dependency mapping and shared execution graphs.",
  path: "/use-cases/cross-team",
});

export default function Page() {
  return <PageContent />;
}
