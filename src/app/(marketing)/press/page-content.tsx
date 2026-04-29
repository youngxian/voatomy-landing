"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Download,
  ExternalLink,
  Globe,
  Mail,
  Newspaper,
  Palette,
  Type,
  Users,
  Building2,
  Rocket,
  DollarSign,
  Package,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Press Release data                                                 */
/* ------------------------------------------------------------------ */

interface PressRelease {
  date: string;
  month: string;
  year: string;
  headline: string;
  summary: string;
  slug: string;
}

const PRESS_RELEASES: PressRelease[] = [
  {
    date: "February 12, 2026",
    month: "Feb",
    year: "2026",
    headline:
      "Voatomy Launches PHANTOM: Making Tech Debt Visible in Dollars",
    summary:
      "PHANTOM scans codebases in real-time, translating technical debt into dollar-denominated business risk. Engineering leaders can now prioritize remediation based on revenue impact rather than gut instinct.",
    slug: "phantom-launch",
  },
  {
    date: "January 8, 2026",
    month: "Jan",
    year: "2026",
    headline:
      "Voatomy Raises Seed Round to Build AI Product Operating System",
    summary:
      "Voatomy closes its seed round to accelerate the development of its AI-native product operating system. The investment will fund expansion of the ATLAS and LOOP platforms across global markets.",
    slug: "seed-round",
  },
  {
    date: "October 22, 2025",
    month: "Oct",
    year: "2025",
    headline:
      "ATLAS 2.0: Sprint Planning That Actually Understands Your Code",
    summary:
      "The second major release of ATLAS introduces deep codebase analysis, Figma design-scope integration, and predictive sprint velocity. Teams report a 40% improvement in estimation accuracy.",
    slug: "atlas-2-0",
  },
  {
    date: "September 5, 2025",
    month: "Sep",
    year: "2025",
    headline:
      "Voatomy Emerges from Stealth with AI Sprint Planner",
    summary:
      "After months of development, Voatomy exits stealth mode with ATLAS, an AI sprint planner that understands code complexity, team capacity, and business priority to generate accurate sprint plans.",
    slug: "voatomy-launch",
  },
];

/* ------------------------------------------------------------------ */
/*  In The News data                                                   */
/* ------------------------------------------------------------------ */

interface MediaMention {
  publication: string;
  title: string;
  date: string;
  url: string;
}

const MEDIA_MENTIONS: MediaMention[] = [
  {
    publication: "TechCrunch",
    title:
      "Voatomy wants to replace your spreadsheet sprint planning with AI that reads your codebase",
    date: "January 15, 2026",
    url: "#",
  },
  {
    publication: "The Verge",
    title:
      "This startup thinks AI can finally fix how software teams estimate work",
    date: "November 3, 2025",
    url: "#",
  },
  {
    publication: "InfoQ",
    title:
      "Inside Voatomy's code-aware approach to sprint planning and tech debt management",
    date: "October 28, 2025",
    url: "#",
  },
];

/* ------------------------------------------------------------------ */
/*  Company facts data                                                 */
/* ------------------------------------------------------------------ */

interface CompanyFact {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const COMPANY_FACTS: CompanyFact[] = [
  {
    label: "Founded",
    value: "2025",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    label: "HQ",
    value: "Remote-first",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    label: "Team Size",
    value: "12",
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: "Products",
    value: "6",
    icon: <Package className="h-4 w-4" />,
  },
  {
    label: "Funding",
    value: "Seed",
    icon: <DollarSign className="h-4 w-4" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Brand colors data                                                  */
/* ------------------------------------------------------------------ */

interface BrandColor {
  name: string;
  hex: string;
  swatch: string;
}

const BRAND_COLORS: BrandColor[] = [
  { name: "Brand Green", hex: "#0d9488", swatch: "#0d9488" },
  { name: "Brand Dark", hex: "#0a0a0a", swatch: "#0a0a0a" },
];

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function PressPage() {
  return (
    <div className="bg-theme">
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <Section variant="white" className="pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <Chip dotColor="#0d9488" className="mb-6">
            Press & Media
          </Chip>

          <h1 className="text-3xl font-semibold tracking-tight text-theme sm:text-5xl lg:text-display-2">
            Press & Media
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-theme-s sm:text-body-lg">
            Get the latest news about Voatomy, download brand assets, and find
            press contacts.
          </p>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  PRESS RELEASES                                              */}
      {/* ============================================================ */}
      <Section variant="rose" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
              <Newspaper className="h-5 w-5 text-brand" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
              Press Releases
            </h2>
          </div>

          <div className="space-y-4">
            {PRESS_RELEASES.map((release) => (
              <Card
                key={release.slug}
                variant="light"
                className="group relative overflow-hidden"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                  {/* Date badge */}
                  <div className="flex shrink-0 flex-col items-center rounded-xl bg-brand/10 px-4 py-3 text-center sm:min-w-[80px]">
                    <span className="text-xs font-medium uppercase tracking-wider text-brand">
                      {release.month}
                    </span>
                    <span className="text-lg font-bold text-theme">
                      {release.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="mb-1 text-xs text-theme-m">
                      {release.date}
                    </p>
                    <h3 className="text-base font-semibold text-theme sm:text-lg">
                      {release.headline}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-theme-s">
                      {release.summary}
                    </p>
                    <Link
                      href={`/press/${release.slug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand/80"
                    >
                      Read more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  IN THE NEWS                                                 */}
      {/* ============================================================ */}
      <Section variant="white" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
              <ExternalLink className="h-5 w-5 text-brand" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
              In The News
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {MEDIA_MENTIONS.map((mention) => (
              <Card
                key={mention.title}
                variant="light"
                className="group flex flex-col justify-between"
              >
                {/* Publication name */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand">
                      {mention.publication}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-theme-m transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </div>

                  <h3 className="text-sm font-semibold leading-snug text-theme sm:text-base">
                    {mention.title}
                  </h3>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-theme pt-4">
                  <span className="text-xs text-theme-m">{mention.date}</span>
                  <a
                    href={mention.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-brand transition-colors hover:text-brand/80"
                  >
                    Read article
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  BRAND ASSETS                                                */}
      {/* ============================================================ */}
      <Section variant="rose" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
              <Palette className="h-5 w-5 text-brand" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
              Brand Assets
            </h2>
          </div>

          <Card variant="light" className="overflow-hidden">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Logo placeholder */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-theme bg-theme-subtle p-8">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
                    <span className="text-lg font-bold text-[#0a0a0a]">V</span>
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-theme">
                    voatomy
                  </span>
                </div>
                <p className="mt-3 text-xs text-theme-m">
                  Primary Logo Mark
                </p>
              </div>

              {/* Brand colors */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-theme">
                  <Palette className="h-4 w-4 text-theme-m" />
                  Brand Colors
                </h3>
                <div className="space-y-3">
                  {BRAND_COLORS.map((color) => (
                    <div key={color.hex} className="flex items-center gap-3">
                      <span
                        className="h-8 w-8 shrink-0 rounded-lg border border-theme"
                        style={{ backgroundColor: color.swatch }}
                      />
                      <div>
                        <p className="text-sm font-medium text-theme">
                          {color.name}
                        </p>
                        <p className="font-mono text-xs text-theme-m">
                          {color.hex}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-theme">
                  <Type className="h-4 w-4 text-theme-m" />
                  Typography
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-semibold text-theme">
                      Plus Jakarta Sans
                    </p>
                    <p className="text-xs text-theme-m">
                      Primary typeface for all brand communications
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-sm font-bold text-theme">Bold</p>
                      <p className="text-xs text-theme-m">Headlines</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-theme">
                        Semibold
                      </p>
                      <p className="text-xs text-theme-m">Subheadings</p>
                    </div>
                    <div>
                      <p className="text-sm font-normal text-theme">
                        Regular
                      </p>
                      <p className="text-xs text-theme-m">Body text</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download button */}
            <div className="mt-8 border-t border-theme pt-6 text-center">
              <Button variant="primary" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Brand Kit
              </Button>
              <p className="mt-3 text-xs text-theme-m">
                Includes logos (SVG, PNG), color palette, typography guidelines,
                and usage rules.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  COMPANY FACTS                                               */}
      {/* ============================================================ */}
      <Section variant="white" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
              <Building2 className="h-5 w-5 text-brand" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
              Company Facts
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {COMPANY_FACTS.map((fact) => (
              <Card key={fact.label} variant="light" className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  {fact.icon}
                </div>
                <p className="text-2xl font-bold tracking-tight text-theme">
                  {fact.value}
                </p>
                <p className="mt-1 text-xs font-medium text-theme-m">
                  {fact.label}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  PRESS CONTACT                                               */}
      {/* ============================================================ */}
      <Section variant="rose" className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10">
            <Mail className="h-6 w-6 text-brand" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Press Contact
          </h2>

          <p className="mt-3 text-base text-theme-s sm:text-body-lg">
            For press inquiries, interview requests, or media-related questions,
            reach out directly to our communications team.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-theme bg-theme-card px-6 py-4">
            <Mail className="h-5 w-5 shrink-0 text-brand" />
            <a
              href="mailto:press@voatomy.global"
              className="text-base font-semibold text-theme transition-colors hover:text-brand sm:text-lg"
            >
              press@voatomy.global
            </a>
          </div>

          <p className="mt-4 text-xs text-theme-m">
            We typically respond to press inquiries within 24 hours.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="primary" size="lg" asChild>
              <a href="mailto:press@voatomy.global">
                Contact Press Team
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
