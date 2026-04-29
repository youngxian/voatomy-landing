import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Careers — Join the Voatomy Team",
  description: "Join a small, focused team solving a massive problem. Remote-first, equity-heavy, and obsessed with building tools engineers love.",
  path: "/careers",
});

export default function Page() {
  return <PageContent />;
}
