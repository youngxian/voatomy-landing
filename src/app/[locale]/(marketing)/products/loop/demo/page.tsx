import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "LOOP — Demo",
  description:
    "See LOOP in action. Close the loop between customer demand and engineering delivery with revenue-weighted backlogs.",
  path: "/products/loop/demo",
});

export default function Page() {
  return <PageContent />;
}
