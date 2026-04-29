import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "For CTOs & VP Engineering",
  description:
    "Board-ready engineering metrics, velocity justification, and cross-team visibility. Make data-driven decisions at the organizational level.",
  path: "/solutions/cto-vp-engineering",
});

export default function Page() {
  return <PageContent />;
}
