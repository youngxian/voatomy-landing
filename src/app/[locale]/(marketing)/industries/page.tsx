import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Industries — Voatomy by Vertical",
  description:
    "See how Voatomy adapts the AI Product Operating System for SaaS, fintech, healthtech, enterprise, e‑commerce, devtools, and AI/ML teams.",
  path: "/industries",
});

export default function Page() {
  return <PageContent />;
}
