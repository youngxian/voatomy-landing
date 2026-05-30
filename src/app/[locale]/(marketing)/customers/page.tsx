import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Customers — See How Teams Ship Smarter with Voatomy",
  description: "Case studies and success stories from engineering teams using Voatomy to improve sprint accuracy, reduce tech debt, and align product delivery with revenue.",
  path: "/customers",
});

export default function Page() {
  return <PageContent />;
}
