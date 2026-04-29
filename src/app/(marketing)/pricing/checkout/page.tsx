import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Checkout — Complete Your Purchase",
  description: "Complete your Voatomy subscription and start AI-powered sprint planning today.",
  path: "/pricing/checkout",
  noIndex: true,
});

export default function Page() {
  return <PageContent />;
}
