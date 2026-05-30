import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Integrations — Connect Your Full Stack",
  description: "Connect GitHub, Jira, Slack, Salesforce, Datadog, Figma, and 30+ tools. Real-time sync into ATLAS, LOOP, and SIGNAL — OAuth secure, no lock-in.",
  path: "/integrations",
});

export default function Page() {
  return <PageContent />;
}
