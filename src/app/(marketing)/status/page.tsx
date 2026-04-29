import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "System Status — Real-Time Service Health",
  description: "Monitor Voatomy platform uptime and service health in real time. 99.9% uptime SLA.",
  path: "/status",
});

export default function Page() {
  return <PageContent />;
}
