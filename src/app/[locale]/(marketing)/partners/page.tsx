import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Partner Program — Voatomy",
  description:
    "Join the Voatomy Partner Program. Agency, technology, and reseller tiers with co-marketing, revenue share, and deep product integrations.",
  path: "/partners",
});

export default function Page() {
  return <PageContent />;
}
