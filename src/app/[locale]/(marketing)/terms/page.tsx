import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service — Voatomy",
  description:
    "Terms and conditions governing your use of Voatomy's AI Product Operating System.",
  path: "/terms",
});

export default function Page() {
  return <PageContent />;
}
