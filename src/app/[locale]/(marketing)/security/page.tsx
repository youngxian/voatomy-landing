import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Security — Enterprise-Grade Protection",
  description: "Voatomy never stores source code. TLS 1.3, AES-256 encryption, tenant isolation, and SOC 2 readiness from day one.",
  path: "/security",
});

export default function Page() {
  return <PageContent />;
}
