import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import PageContent from "./page-content";

export const metadata: Metadata = createPageMetadata({
  title: "SaaS & Engineering Glossary — Voatomy",
  description: "Clear definitions for every term in modern software delivery: sprint planning, velocity, tech debt, OKRs, DORA metrics, CI/CD, and more.",
  path: "/glossary",
});

export default function Page() {
  return <PageContent />;
}
