"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  Cookie,
  Settings,
  BarChart3,
  Sliders,
  Globe,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  Shield,
} from "lucide-react";
import { BRAND_GREEN } from "@/lib/marketing-visual";


const BRAND_ORANGE = "#f16e2c";
const EFFECTIVE_DATE = "January 1, 2026";

const COOKIE_TYPES = [
  {
    icon: Shield,
    title: "Essential Cookies",
    required: true,
    dotColor: BRAND_GREEN,
    desc: "Required for the Service to function. These cookies enable core functionality such as authentication, security, and session management. They cannot be disabled.",
    examples: [
      "Session authentication tokens",
      "CSRF protection tokens",
      "Load balancer session affinity",
      "Cookie consent preferences",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics Cookies",
    required: false,
    dotColor: "#f59e0b",
    desc: "Help us understand how visitors interact with the Service so we can measure and improve performance. All analytics data is aggregated and anonymized.",
    examples: [
      "Page view and navigation tracking",
      "Feature usage patterns",
      "Performance and load time metrics",
      "Error and crash reporting",
    ],
  },
  {
    icon: Sliders,
    title: "Preference Cookies",
    required: false,
    dotColor: "#8b5cf6",
    desc: "Remember your settings and personalization choices to provide a tailored experience. Disabling these may result in a less personalized experience.",
    examples: [
      "Theme and display preferences",
      "Language and locale settings",
      "Dashboard layout customization",
      "Notification preferences",
    ],
  },
];

const BROWSER_INSTRUCTIONS = [
  {
    browser: "Chrome",
    path: "Settings → Privacy and Security → Cookies and other site data",
  },
  {
    browser: "Firefox",
    path: "Settings → Privacy & Security → Cookies and Site Data",
  },
  {
    browser: "Safari",
    path: "Preferences → Privacy → Manage Website Data",
  },
  {
    browser: "Edge",
    path: "Settings → Cookies and site permissions → Manage and delete cookies",
  },
];

const THIRD_PARTY_COOKIES = [
  {
    name: "Stripe",
    purpose: "Payment processing and fraud prevention",
    link: "https://stripe.com/privacy",
  },
  {
    name: "Vercel Analytics",
    purpose: "Privacy-focused web analytics",
    link: "https://vercel.com/docs/analytics/privacy-policy",
  },
  {
    name: "Intercom",
    purpose: "Customer support and messaging",
    link: "https://www.intercom.com/legal/cookie-policy",
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

export default function CookiePolicyPage() {
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
            <Cookie className="h-8 w-8 text-white" />
          </div>

          <h1
            className={cn(
              "text-display-2 lg:text-display-1 text-white mb-6 transition-all duration-700 delay-100",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            Cookie Policy
          </h1>

          <p
            className={cn(
              "text-body-lg text-white/80 max-w-2xl mx-auto mb-6 transition-all duration-700 delay-200",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            Learn about the cookies Voatomy uses, why we use them, and how you
            can manage your preferences. We believe in transparency and your
            right to choose.
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
              <Settings className="h-3.5 w-3.5" />
              Configurable Preferences
            </span>
          </div>
        </div>
      </Section>

      {/* What Are Cookies */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Overview
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            What are <span className="text-brand">cookies</span>?
          </h2>
        </div>

        <div className="max-w-3xl mx-auto animate-on-scroll stagger-1">
          <Card variant="dark">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_GREEN}12` }}
              >
                <Cookie className="h-5 w-5 text-brand" />
              </div>
              <div className="space-y-3">
                <p className="text-sm text-theme-s leading-relaxed">
                  Cookies are small text files placed on your device when you
                  visit a website. They are widely used to make websites work
                  efficiently, provide information to site owners, and improve
                  the user experience.
                </p>
                <p className="text-sm text-theme-s leading-relaxed">
                  Voatomy uses cookies and similar technologies (such as local
                  storage and session storage) to authenticate users, remember
                  preferences, analyze traffic, and improve our Service. This
                  policy explains what cookies we use and how you can control
                  them.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Types We Use */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Cookie Types
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Types we <span className="text-brand">use</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            We use three categories of cookies, each serving a distinct purpose.
            Only essential cookies are strictly required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {COOKIE_TYPES.map((type, i) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.title}
                variant="dark"
                className={cn(
                  "animate-on-scroll group hover:border-theme-h relative overflow-hidden",
                  `stagger-${i + 1}`,
                )}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${type.dotColor}15` }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color: type.dotColor }}
                      />
                    </div>
                    <Chip
                      dotColor={type.dotColor}
                      className="text-xs"
                    >
                      {type.required ? "Required" : "Optional"}
                    </Chip>
                  </div>

                  <h3 className="text-heading-3 text-theme mb-3">
                    {type.title}
                  </h3>
                  <p className="text-sm text-theme-s leading-relaxed mb-4">
                    {type.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-theme">
                    {type.examples.map((example) => (
                      <div
                        key={example}
                        className="flex items-start gap-2 text-xs text-theme-m"
                      >
                        <CheckCircle2
                          className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                          style={{ color: type.dotColor }}
                        />
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                  style={{ background: type.dotColor }}
                />
              </Card>
            );
          })}
        </div>
      </Section>

      {/* How to Manage Cookies */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Your Control
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            How to <span className="text-brand">manage</span> cookies
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            You have full control over which optional cookies you accept. Here
            are your options for managing cookie preferences.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <Card
            variant="dark"
            className="animate-on-scroll stagger-1"
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_GREEN}12` }}
              >
                <Settings className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="text-heading-3 text-theme mb-2">
                  Cookie Consent Banner
                </h3>
                <p className="text-sm text-theme-s leading-relaxed">
                  When you first visit Voatomy, a consent banner lets you accept
                  or reject optional cookies. You can change your preferences at
                  any time through your account settings or by clearing your
                  cookies and revisiting the site.
                </p>
              </div>
            </div>
          </Card>

          <Card
            variant="dark"
            className="animate-on-scroll stagger-2"
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_GREEN}12` }}
              >
                <Globe className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="text-heading-3 text-theme mb-2">
                  Browser Settings
                </h3>
                <p className="text-sm text-theme-s leading-relaxed mb-4">
                  Most browsers allow you to control cookies through their
                  settings. Note that blocking essential cookies may prevent the
                  Service from functioning correctly.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {BROWSER_INSTRUCTIONS.map((item) => (
                    <div
                      key={item.browser}
                      className="flex items-start gap-2 px-3 py-2.5 rounded-lg border border-theme bg-theme-s/5"
                    >
                      <div className="text-xs">
                        <span className="font-semibold text-theme">
                          {item.browser}
                        </span>
                        <p className="text-theme-m mt-0.5">{item.path}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Third-Party Cookies */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Third Parties
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Third-party <span className="text-brand">cookies</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Some of our trusted partners may set cookies on your device. These
            are governed by the respective third party&apos;s privacy policy.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {THIRD_PARTY_COOKIES.map((partner, i) => (
            <Card
              key={partner.name}
              variant="dark"
              className={cn(
                "animate-on-scroll hover:border-theme-h",
                `stagger-${i + 1}`,
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${BRAND_GREEN}10` }}
                  >
                    <Globe className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-theme">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-theme-s">{partner.purpose}</p>
                  </div>
                </div>
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand font-medium hover:underline flex-shrink-0"
                >
                  Privacy Policy →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Updates to Policy */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Updates
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Updates to this <span className="text-brand">policy</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto animate-on-scroll stagger-1">
          <Card variant="dark">
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BRAND_GREEN}12` }}
              >
                <RefreshCw className="h-5 w-5 text-brand" />
              </div>
              <div className="space-y-3">
                <p className="text-sm text-theme-s leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect
                  changes in our practices, technologies, or legal requirements.
                  When we make material changes, we will notify you by updating
                  the effective date at the top of this page and, where
                  appropriate, through an in-app notification or email.
                </p>
                <p className="text-sm text-theme-s leading-relaxed">
                  We encourage you to review this policy periodically to stay
                  informed about how we use cookies. Your continued use of the
                  Service after changes are posted constitutes acceptance of the
                  updated policy.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Contact CTA */}
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
              Questions about cookies?
            </h2>

            <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">
              If you have questions about our use of cookies or want help
              managing your preferences, our team is here to assist.
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
            Voatomy, Inc. · privacy@voatomy.global · Last updated:{" "}
            {EFFECTIVE_DATE}
          </p>
        </div>
      </Section>
    </div>
  );
}
