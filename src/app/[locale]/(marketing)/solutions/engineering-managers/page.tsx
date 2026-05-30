import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "For Engineering Managers",
  description: "AI-driven sprint plans, accurate estimates, and tech debt visibility. Stop guessing complexity — let AI read the code and generate data-backed estimates.",
  path: "/solutions/engineering-managers",
});

export default function Page() {
  return <PageContent />;
}
