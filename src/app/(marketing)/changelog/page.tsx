import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Changelog — Latest Updates and Version History",
  description: "Stay up to date with the latest Voatomy features, improvements, and platform updates.",
  path: "/changelog",
});

export default function Page() {
  return <PageContent />;
}
