import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing — Plans for Every Team Size",
  description: "Simple, transparent pricing for AI-powered sprint planning. Start free, scale as you grow. No hidden fees.",
  path: "/pricing",
});

export default function Page() {
  return <PageContent />;
}
