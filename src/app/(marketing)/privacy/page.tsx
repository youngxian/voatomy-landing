import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy — Voatomy",
  description:
    "How Voatomy collects, uses, and protects your personal data. GDPR and CCPA compliant.",
  path: "/privacy",
});

export default function Page() {
  return <PageContent />;
}
