import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us — Get in Touch",
  description: "Talk to the Voatomy team about pricing, partnerships, or enterprise deployment. We respond within 24 hours.",
  path: "/contact",
});

export default function Page() {
  return <PageContent />;
}
