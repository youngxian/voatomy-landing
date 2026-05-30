import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Cookie Policy — Voatomy",
  description:
    "Learn about the cookies Voatomy uses, why we use them, and how to manage your preferences.",
  path: "/cookies",
});

export default function Page() {
  return <PageContent />;
}
