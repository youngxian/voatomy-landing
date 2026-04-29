import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "Integrations — Connect Your Full Stack",
  description: "Voatomy integrates with GitHub, Jira, Linear, Figma, Slack, Salesforce, Datadog, and 10+ more tools your team already uses.",
  path: "/integrations",
});

export default function Page() {
  return <PageContent />;
}
