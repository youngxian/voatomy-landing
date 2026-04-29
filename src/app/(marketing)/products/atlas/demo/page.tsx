import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "ATLAS — Demo",
  description:
    "See ATLAS in action. AI sprint planning that understands code complexity, team capacity, and business priority.",
  path: "/products/atlas/demo",
});

export default function Page() {
  return <PageContent />;
}
