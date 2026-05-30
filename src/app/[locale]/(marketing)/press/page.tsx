import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Press — News and Media Kit",
  description: "Voatomy press releases, brand assets, and media resources. Get the latest news about the AI Product Operating System.",
  path: "/press",
});

export default function Page() {
  return <PageContent />;
}
