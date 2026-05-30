import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Tech Debt Management — Debt-to-Dollar Intelligence",
  description:
    "PHANTOM translates tech debt into business impact. Know exactly which debt is costing you money, slowing your team, and blocking your roadmap.",
  path: "/use-cases/tech-debt-management",
});

export default function Page() {
  return <PageContent />;
}
