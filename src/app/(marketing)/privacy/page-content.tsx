"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  Shield,
  Eye,
  Database,
  Users,
  Lock,
  Clock,
  Mail,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";
const BRAND_ORANGE = "#f16e2c";
const EFFECTIVE_DATE = "January 1, 2026";

const DATA_WE_COLLECT = [
  {
    icon: Users,
    title: "Account Information",
    items: [
      "Name and email address",
      "Company name and role",
      "Billing and payment details",
      "Authentication credentials (hashed)",
    ],
  },
  {
    icon: Database,
    title: "Usage Data",
    items: [
      "Feature usage and interaction patterns",
      "Device type, browser, and OS",
      "IP address and approximate location",
      "Performance and error logs",
    ],
  },
  {
    icon: Eye,
    title: "Integration Data",
    items: [
      "Repository metadata (no source code)",
      "Project management ticket metadata",
      "Connected third-party account identifiers",
      "Webhook event payloads (anonymized)",
    ],
  },
];

const HOW_WE_USE = [
  { icon: Shield, label: "Provide and improve our services" },
  { icon: Lock, label: "Ensure platform security and prevent fraud" },
  { icon: Mail, label: "Send service updates and (optional) marketing" },
  { icon: Database, label: "Generate aggregated, anonymized analytics" },
  { icon: Users, label: "Deliver customer support" },
  { icon: FileText, label: "Comply with legal obligations" },
];

const YOUR_RIGHTS = [
  {
    title: "Access & Portability",
    desc: "Request a copy of all personal data we hold about you in a machine-readable format.",
  },
  {
    title: "Rectification",
    desc: "Correct inaccurate or incomplete personal data at any time through your account settings.",
  },
  {
    title: "Erasure",
    desc: "Request deletion of your personal data, subject to legal retention requirements.",
  },
  {
    title: "Restrict Processing",
    desc: "Limit how we process your data while a dispute or request is being resolved.",
  },
  {
    title: "Object to Processing",
    desc: "Opt out of data processing for direct marketing or legitimate interest purposes.",
  },
  {
    title: "Withdraw Consent",
    desc: "Revoke consent at any time where processing is based on your consent.",
  },
];

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);
}

export default function PrivacyPolicyPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <Section
        variant="coral"
        container={false}
        className="relative min-h-[55vh] flex items-center pt-32 pb-20 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_ORANGE}, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-40" />
        </div>

        <div className="relative mx-auto w-full max-w-container px-4 text-center">
          <div
            className={cn(
              "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-700",
              heroLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90",
            )}
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <Shield className="h-8 w-8 text-white" />
          </div>

          <h1
            className={cn(
              "text-display-2 lg:text-display-1 text-white mb-6 transition-all duration-700 delay-100",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            Privacy Policy
          </h1>

          <p
            className={cn(
              "text-body-lg text-white/80 max-w-2xl mx-auto mb-6 transition-all duration-700 delay-200",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            How Voatomy, Inc. collects, uses, and protects your personal data.
            We are committed to transparency and your right to control your
            information.
          </p>

          <div
            className={cn(
              "flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 transition-all duration-700 delay-300",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Effective: {EFFECTIVE_DATE}
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              GDPR Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              CCPA Compliant
            </span>
          </div>
        </div>
      </Section>

      {/* Data We Collect */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Data Collection
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Data we <span className="text-brand">collect</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            We collect only the minimum data required to deliver and improve
            Voatomy. Here is exactly what we gather and why.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {DATA_WE_COLLECT.map((category, i) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                variant="dark"
                className={cn(
                  "animate-on-scroll group hover:border-theme-h",
                  `stagger-${i + 1}`,
                )}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${BRAND_GREEN}15` }}
                >
                  <Icon className="h-6 w-6 text-brand" />
                </div>
                <h3 className="text-heading-3 text-theme mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2.5">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-theme-s leading-relaxed"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* How We Use Data */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Data Usage
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            How we <span className="text-brand">use</span> your data
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            We process personal data only for legitimate, clearly defined
            purposes. We never sell your data to third parties.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {HOW_WE_USE.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                variant="light"
                className={cn(
                  "animate-on-scroll hover:border-theme-h group",
                  `stagger-${i + 1}`,
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${BRAND_GREEN}10` }}
                  >
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <span className="text-sm font-medium text-theme">
                    {item.label}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Data Sharing */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Data Sharing
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            When we <span className="text-brand">share</span> data
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            We share personal data only in limited, clearly justified
            circumstances. We never sell your data.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              title: "Service Providers",
              desc: "We share data with vetted third-party processors (cloud hosting, payment processing, analytics) who are contractually bound to process data only on our behalf and in accordance with this policy.",
            },
            {
              title: "Legal Requirements",
              desc: "We may disclose data when required by law, regulation, legal process, or enforceable governmental request. We will notify you unless legally prohibited from doing so.",
            },
            {
              title: "Business Transfers",
              desc: "In the event of a merger, acquisition, or asset sale, your personal data may be transferred. We will notify you before your data is transferred and becomes subject to a different privacy policy.",
            },
            {
              title: "With Your Consent",
              desc: "We may share data for purposes not described in this policy only with your explicit, informed consent. You may withdraw consent at any time.",
            },
          ].map((item, i) => (
            <Card
              key={item.title}
              variant="dark"
              className={cn(
                "animate-on-scroll hover:border-theme-h",
                `stagger-${i + 1}`,
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${BRAND_GREEN}10` }}
                >
                  <Users className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="text-heading-3 text-theme mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-theme-s leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Data Retention */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Retention
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Data <span className="text-brand">retention</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            We retain personal data only as long as necessary for the purposes
            described in this policy.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card variant="dark" className="animate-on-scroll">
            <div className="space-y-6">
              {[
                {
                  icon: Database,
                  period: "Active Account",
                  detail:
                    "We retain your data for the duration of your active account. You can request deletion at any time.",
                },
                {
                  icon: Clock,
                  period: "Post-Termination: 30 Days",
                  detail:
                    "After account closure, we retain data for 30 days to allow for reactivation. After this period, data is permanently deleted.",
                },
                {
                  icon: FileText,
                  period: "Legal Obligations: As Required",
                  detail:
                    "Certain data may be retained longer to comply with legal, tax, or regulatory obligations (typically 3–7 years for financial records).",
                },
                {
                  icon: Lock,
                  period: "Anonymized Data: Indefinitely",
                  detail:
                    "Aggregated, anonymized data that cannot be linked to any individual may be retained indefinitely for analytics and service improvement.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={item.period} className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${BRAND_GREEN}12` }}
                    >
                      <Icon className="h-5 w-5 text-brand" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-theme mb-1">
                        {item.period}
                      </h4>
                      <p className="text-sm text-theme-s leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                    {i < 3 && (
                      <div className="hidden" />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </Section>

      {/* Your Rights (GDPR/CCPA) */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Your Rights
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            GDPR & CCPA <span className="text-brand">rights</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Depending on your jurisdiction, you may exercise the following
            rights regarding your personal data.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {YOUR_RIGHTS.map((right, i) => (
            <Card
              key={right.title}
              variant="dark"
              className={cn(
                "animate-on-scroll group hover:border-theme-h relative overflow-hidden",
                `stagger-${i + 1}`,
              )}
            >
              <div className="relative z-10">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${BRAND_GREEN}12` }}
                >
                  <Shield className="h-5 w-5 text-brand" />
                </div>
                <h3 className="text-heading-3 text-theme mb-2">
                  {right.title}
                </h3>
                <p className="text-sm text-theme-s leading-relaxed">
                  {right.desc}
                </p>
              </div>
              <div
                className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                style={{ background: BRAND_GREEN }}
              />
            </Card>
          ))}
        </div>

        <div className="mt-10 animate-on-scroll stagger-7">
          <Card variant="light" className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-theme-s leading-relaxed">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:privacy@voatomy.global"
                className="text-brand font-medium hover:underline"
              >
                privacy@voatomy.global
              </a>
              . We will respond to your request within 30 days. You also have
              the right to lodge a complaint with your local data protection
              authority.
            </p>
          </Card>
        </div>
      </Section>

      {/* Contact Us CTA */}
      <Section
        variant="amber"
        container={false}
        className="relative py-24 sm:py-32 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-[100px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <div className="animate-on-scroll">
            <div
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${BRAND_GREEN}15` }}
            >
              <Mail className="h-7 w-7 text-brand" />
            </div>

            <h2 className="text-heading-1 text-theme mb-4">
              Questions about your privacy?
            </h2>

            <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">
              Our privacy team is here to help. Reach out with any questions
              about how we handle your data or to exercise your rights.
            </p>
          </div>

          <div className="animate-on-scroll stagger-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/security">Security Overview</Link>
            </Button>
          </div>

          <p className="text-xs text-theme-m mt-8 animate-on-scroll stagger-3">
            Voatomy, Inc. · privacy@voatomy.global · Last updated:{" "}
            {EFFECTIVE_DATE}
          </p>
        </div>
      </Section>
    </div>
  );
}
