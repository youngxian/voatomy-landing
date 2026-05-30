import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "About Voatomy — Our Mission and Team",
  description: "Voatomy exists to eliminate gut-feel decisions in software delivery. Meet the team building the AI Product Operating System.",
  path: "/about",
});

export default function Page() {
  return <PageContent />;
}
