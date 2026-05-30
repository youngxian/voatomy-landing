import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Incident Intelligence — Revenue-Aware Incident Response",
  description:
    "SIGNAL correlates incidents with revenue impact in real time. Route, triage, and resolve based on business context — not just severity levels.",
  path: "/use-cases/incident-intelligence",
});

export default function Page() {
  return <PageContent />;
}
