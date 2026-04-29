import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Sprint Planning — Replace Gut-Feel with Data-Driven Estimation",
  description: "ATLAS analyzes code complexity, team capacity, tech debt, and business priority to generate sprint plans backed by data — not gut feel.",
  path: "/use-cases/sprint-planning",
});

export default function Page() {
  return <PageContent />;
}
