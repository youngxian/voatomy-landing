"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  FileText,
  UserCheck,
  Server,
  CreditCard,
  Shield,
  Scale,
  XCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";
const BRAND_ORANGE = "#f16e2c";
const EFFECTIVE_DATE = "January 1, 2026";

const ACCOUNT_TERMS = [
  "You must be at least 18 years old to create an account.",
  "You are responsible for maintaining the security of your account credentials.",
  "You must provide accurate, complete, and current information during registration.",
  "One person or legal entity may not maintain more than one free account.",
  "You are responsible for all activity that occurs under your account.",
  "You must notify Voatomy immediately of any unauthorized use of your account.",
];

const SERVICE_FEATURES = [
  {
    icon: Server,
    title: "AI Product Operating System",
    desc: "Access to Voatomy's suite of AI-powered tools for product management, sprint planning, and team collaboration.",
  },
  {
    icon: Shield,
    title: "Data Security",
    desc: "Enterprise-grade encryption, tenant isolation, and compliance controls as described in our Security page.",
  },
  {
    icon: UserCheck,
    title: "Integrations",
    desc: "Connectivity with third-party tools (GitHub, Jira, Linear, Slack) subject to those services' own terms.",
  },
];

const PAYMENT_ITEMS = [
  {
    title: "Billing Cycle",
    desc: "Subscriptions are billed monthly or annually in advance. The billing cycle begins on the date of your initial subscription purchase.",
  },
  {
    title: "Price Changes",
    desc: "We reserve the right to adjust pricing with 30 days' written notice. Price changes will take effect at the start of your next billing cycle.",
  },
  {
    title: "Refunds",
    desc: "Annual plans are eligible for a pro-rata refund within the first 14 days. Monthly plans are non-refundable after the billing cycle begins.",
  },
  {
    title: "Taxes",
    desc: "Prices are exclusive of applicable taxes. You are responsible for all taxes, levies, or duties imposed by taxing authorities in your jurisdiction.",
  },
];

const IP_SECTIONS = [
  {
    title: "Voatomy's Intellectual Property",
    desc: "The Service, including all software, algorithms, designs, documentation, and branding, is and remains the exclusive property of Voatomy, Inc. Nothing in these Terms grants you any right, title, or interest in the Service beyond the limited license to use it.",
  },
  {
    title: "Your Content",
    desc: "You retain all rights to data and content you provide through the Service. By using Voatomy, you grant us a limited license to process your content solely to provide and improve the Service. We will never claim ownership of your data.",
  },
  {
    title: "Feedback",
    desc: "Any suggestions, ideas, or feedback you provide about the Service may be used by Voatomy without obligation or compensation to you. We appreciate your input and it helps us build a better product.",
  },
];

const LIABILITY_LIMITS = [
  "The Service is provided \"as is\" without warranty of any kind, express or implied.",
  "Voatomy shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
  "Our total aggregate liability shall not exceed the amount paid by you in the 12 months preceding the claim.",
  "We do not warrant that the Service will be uninterrupted, secure, or error-free.",
  "You acknowledge that AI-generated outputs may contain inaccuracies and should be reviewed before use.",
];

const TERMINATION_REASONS = [
  {
    title: "By You",
    desc: "You may terminate your account at any time through account settings. Upon termination, your data will be retained for 30 days before permanent deletion.",
  },
  {
    title: "By Voatomy",
    desc: "We may suspend or terminate your access if you violate these Terms, engage in abusive behavior, fail to pay fees, or if required by law.",
  },
  {
    title: "Effect of Termination",
    desc: "Upon termination, your right to access the Service ceases immediately. Provisions that by their nature should survive termination will remain in effect.",
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

export default function TermsOfServicePage() {
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
            <FileText className="h-8 w-8 text-white" />
          </div>

          <h1
            className={cn(
              "text-display-2 lg:text-display-1 text-white mb-6 transition-all duration-700 delay-100",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            Terms of Service
          </h1>

          <p
            className={cn(
              "text-body-lg text-white/80 max-w-2xl mx-auto mb-6 transition-all duration-700 delay-200",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            The terms and conditions governing your use of Voatomy&apos;s AI
            Product Operating System. Please read these terms carefully before
            using our services.
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
              <FileText className="h-3.5 w-3.5" />
              Voatomy, Inc.
            </span>
          </div>
        </div>
      </Section>

      {/* Acceptance of Terms */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Agreement
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Acceptance of <span className="text-brand">terms</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto animate-on-scroll stagger-1">
          <Card variant="dark">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_GREEN}12` }}
              >
                <Scale className="h-5 w-5 text-brand" />
              </div>
              <div className="space-y-3">
                <p className="text-sm text-theme-s leading-relaxed">
                  By accessing or using Voatomy (&quot;the Service&quot;), you
                  agree to be bound by these Terms of Service (&quot;Terms&quot;)
                  and our Privacy Policy. If you are using the Service on behalf
                  of an organization, you represent that you have authority to
                  bind that organization to these Terms.
                </p>
                <p className="text-sm text-theme-s leading-relaxed">
                  If you do not agree to these Terms, you may not access or use
                  the Service. We reserve the right to update these Terms at any
                  time. Continued use of the Service after changes constitutes
                  acceptance of the revised Terms.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Account Terms */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Your Account
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Account <span className="text-brand">terms</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Your responsibilities when creating and maintaining a Voatomy
            account.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card variant="dark" className="animate-on-scroll">
            <div className="space-y-3">
              {ACCOUNT_TERMS.map((term, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-theme-s leading-relaxed">
                    {term}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Service Description */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            The Service
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Service <span className="text-brand">description</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Voatomy provides an AI-powered Product Operating System designed to
            help engineering and product teams build better software, faster.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICE_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                variant="dark"
                className={cn(
                  "animate-on-scroll group hover:border-theme-h relative overflow-hidden",
                  `stagger-${i + 1}`,
                )}
              >
                <div className="relative z-10">
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${BRAND_GREEN}15` }}
                  >
                    <Icon className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="text-heading-3 text-theme mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-theme-s leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                  style={{ background: BRAND_GREEN }}
                />
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Payment Terms */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Billing
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Payment <span className="text-brand">terms</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Billing, pricing, refunds, and your financial obligations when using
            Voatomy.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
          {PAYMENT_ITEMS.map((item, i) => (
            <Card
              key={item.title}
              variant="dark"
              className={cn(
                "animate-on-scroll hover:border-theme-h group",
                `stagger-${i + 1}`,
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${BRAND_GREEN}10` }}
                >
                  <CreditCard className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-theme mb-1">
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

      {/* Intellectual Property */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            IP Rights
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Intellectual <span className="text-brand">property</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Ownership rights for the Service and the content you provide through
            it.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {IP_SECTIONS.map((section, i) => (
            <Card
              key={section.title}
              variant="dark"
              className={cn(
                "animate-on-scroll hover:border-theme-h",
                `stagger-${i + 1}`,
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${BRAND_GREEN}12` }}
                >
                  <Shield className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="text-heading-3 text-theme mb-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-theme-s leading-relaxed">
                    {section.desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Limitations of Liability */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Liability
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Limitations of <span className="text-brand">liability</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Important limitations on Voatomy&apos;s liability to you under these
            Terms.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card variant="dark" className="animate-on-scroll">
            <div className="space-y-3">
              {LIABILITY_LIMITS.map((limit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Scale className="h-4 w-4 text-brand flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-theme-s leading-relaxed">
                    {limit}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Termination */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Termination
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Account <span className="text-brand">termination</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            How either party may terminate the agreement and the effects of
            termination.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {TERMINATION_REASONS.map((reason, i) => (
            <Card
              key={reason.title}
              variant="dark"
              className={cn(
                "animate-on-scroll hover:border-theme-h",
                `stagger-${i + 1}`,
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${BRAND_GREEN}12` }}
                >
                  <XCircle className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="text-heading-3 text-theme mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-theme-s leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section
        variant="sky"
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
              Questions about these terms?
            </h2>

            <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">
              Our legal team is happy to clarify any part of these Terms. Reach
              out and we&apos;ll get back to you promptly.
            </p>
          </div>

          <div className="animate-on-scroll stagger-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
          </div>

          <p className="text-xs text-theme-m mt-8 animate-on-scroll stagger-3">
            Voatomy, Inc. · legal@voatomy.global · Last updated:{" "}
            {EFFECTIVE_DATE}
          </p>
        </div>
      </Section>
    </div>
  );
}
