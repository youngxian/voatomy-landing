import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "ATLAS — AI Sprint Planner",
  description: "Sprint planning that understands code complexity, team capacity, and business priority. Generate confidence-scored sprint plans in minutes.",
  path: "/products/atlas",
});

export default function Page() {
  return <PageContent />;
}
