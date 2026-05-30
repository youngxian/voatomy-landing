import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "NEXUS — Demo",
  description:
    "See NEXUS in action. All Voatomy products unified into one AI organizational nerve center.",
  path: "/products/nexus/demo",
});

export default function Page() {
  return <PageContent />;
}
