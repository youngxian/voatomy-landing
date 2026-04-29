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
  BookOpen,
  ChevronDown,
  DollarSign,
  ExternalLink,
  Github,
  Globe,
  HelpCircle,
  HeadphonesIcon,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  Twitter,
  User,
  Building2,
  Activity,
} from "lucide-react";
import { SubpageHeroAtmosphere } from "@/components/marketing/subpage-hero-atmosphere";

/* ------------------------------------------------------------------ */
/*  Contact options data                                               */
/* ------------------------------------------------------------------ */

interface ContactOption {
  title: string;
  description: string;
  email: string;
  cta: string;
  icon: React.ReactNode;
  color: string;
}

const CONTACT_OPTIONS: ContactOption[] = [
  {
    title: "Sales",
    description:
      "Talk to our sales team about enterprise plans, custom integrations, and volume pricing.",
    email: "sales@voatomy.global",
    cta: "Contact Sales",
    icon: <DollarSign className="h-5 w-5" />,
    color: "#0d9488",
  },
  {
    title: "Support",
    description:
      "Need help with your account? Our support team is here to assist you with any issues.",
    email: "support@voatomy.global",
    cta: "Get Support",
    icon: <HeadphonesIcon className="h-5 w-5" />,
    color: "#6366F1",
  },
  {
    title: "General",
    description:
      "Everything else. Partnerships, press inquiries, feedback, or just saying hello.",
    email: "hello@voatomy.global",
    cta: "Send Message",
    icon: <Mail className="h-5 w-5" />,
    color: "#f16e2c",
  },
];

/* ------------------------------------------------------------------ */
/*  Subject options                                                    */
/* ------------------------------------------------------------------ */

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Sales",
  "Support",
  "Partnership",
  "Press",
] as const;

/* ------------------------------------------------------------------ */
/*  Social links data                                                  */
/* ------------------------------------------------------------------ */

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Twitter / X",
    href: "https://twitter.com/voatomy",
    icon: <Twitter className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/voatomy",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/voatomy",
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: "Discord",
    href: "https://discord.gg/voatomy",
    icon: <MessageCircle className="h-5 w-5" />,
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ quick links data                                               */
/* ------------------------------------------------------------------ */

interface QuickLink {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const QUICK_LINKS: QuickLink[] = [
  {
    label: "Documentation",
    description: "Guides, API references, and tutorials",
    href: "/docs",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    label: "System Status",
    description: "Check uptime and incident history",
    href: "/status",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    label: "Pricing",
    description: "Plans, features, and comparisons",
    href: "/pricing",
    icon: <DollarSign className="h-5 w-5" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Globe locations (simplified world map representation)              */
/* ------------------------------------------------------------------ */

const TEAM_COUNTRIES = [
  "United States",
  "United Kingdom",
  "Germany",
  "Canada",
  "Nigeria",
  "India",
  "Australia",
  "Brazil",
];

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [subjectOpen, setSubjectOpen] = React.useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubjectSelect = (subject: string) => {
    setFormData((prev) => ({ ...prev, subject }));
    setSubjectOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission - no actual submission
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <SubpageHeroAtmosphere />
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <Section variant="white" className="relative z-10 pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <Chip dotColor="#0d9488" className="mb-6">
            Contact
          </Chip>

          <h1 className="text-3xl font-semibold tracking-tight text-theme sm:text-5xl lg:text-display-2">
            Get in Touch
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-theme-s sm:text-body-lg">
            We&apos;d love to hear from you. Whether you have a question about
            our products, pricing, or anything else.
          </p>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  CONTACT OPTIONS                                             */}
      {/* ============================================================ */}
      <Section variant="sky" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {CONTACT_OPTIONS.map((option) => (
              <Card
                key={option.title}
                variant="dark"
                className="group flex flex-col text-center"
              >
                {/* Icon */}
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${option.color}15` }}
                >
                  <span style={{ color: option.color }}>{option.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-theme">
                  {option.title}
                </h3>

                {/* Description */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-theme-s">
                  {option.description}
                </p>

                {/* Email */}
                <a
                  href={`mailto:${option.email}`}
                  className="mt-3 text-sm font-medium text-brand transition-colors hover:text-brand/80"
                >
                  {option.email}
                </a>

                {/* CTA */}
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <a href={`mailto:${option.email}`}>
                      {option.cta}
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  CONTACT FORM                                                */}
      {/* ============================================================ */}
      <Section variant="violet" className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
              <Send className="h-5 w-5 text-brand" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
              Send us a message
            </h2>
            <p className="mt-3 text-base text-theme-s">
              Fill out the form below and we will get back to you within one
              business day.
            </p>
          </div>

          <Card variant="light" className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium text-theme"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-m" />
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-theme bg-theme-input py-2.5 pl-10 pr-4 text-sm text-theme placeholder:text-theme-f outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand/30"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-sm font-medium text-theme"
                >
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-m" />
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-theme bg-theme-input py-2.5 pl-10 pr-4 text-sm text-theme placeholder:text-theme-f outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand/30"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="contact-company"
                  className="mb-1.5 block text-sm font-medium text-theme"
                >
                  Company
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-m" />
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme Inc."
                    className="w-full rounded-xl border border-theme bg-theme-input py-2.5 pl-10 pr-4 text-sm text-theme placeholder:text-theme-f outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand/30"
                  />
                </div>
              </div>

              {/* Subject dropdown mock */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-sm font-medium text-theme"
                >
                  Subject
                </label>
                <div className="relative">
                  <button
                    id="contact-subject"
                    type="button"
                    onClick={() => setSubjectOpen(!subjectOpen)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border border-theme bg-theme-input py-2.5 px-4 text-sm outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand/30",
                      formData.subject ? "text-theme" : "text-theme-f",
                    )}
                  >
                    <span>
                      {formData.subject || "Select a subject"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-theme-m transition-transform duration-200",
                        subjectOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {/* Dropdown menu */}
                  {subjectOpen && (
                    <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-theme bg-theme-card shadow-lg">
                      {SUBJECT_OPTIONS.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => handleSubjectSelect(subject)}
                          className={cn(
                            "flex w-full items-center px-4 py-2.5 text-sm transition-colors hover:bg-theme-subtle",
                            formData.subject === subject
                              ? "text-brand font-medium"
                              : "text-theme-s",
                          )}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-theme"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-xl border border-theme bg-theme-input py-2.5 px-4 text-sm text-theme placeholder:text-theme-f outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand/30"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>

              <p className="text-center text-xs text-theme-m">
                By submitting this form, you agree to our{" "}
                <Link
                  href="/privacy"
                  className="text-brand transition-colors hover:text-brand/80"
                >
                  Privacy Policy
                </Link>
                . We will never share your information with third parties.
              </p>
            </form>
          </Card>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  OFFICE / LOCATION                                           */}
      {/* ============================================================ */}
      <Section variant="amber" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
              <Globe className="h-5 w-5 text-brand" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
              Remote-First, Globally Distributed
            </h2>
            <p className="mt-3 text-base text-theme-s sm:text-body-lg">
              We believe great work happens everywhere. Our team spans multiple
              time zones to deliver round-the-clock innovation.
            </p>
          </div>

          <Card variant="dark" className="mt-10 text-center">
            {/* Globe visual representation */}
            <div className="flex items-center justify-center py-6">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-theme bg-theme-subtle">
                {/* Orbit rings */}
                <div className="absolute h-full w-full rounded-full border border-theme/30" />
                <div className="absolute h-[120%] w-[80%] rounded-full border border-theme/20 rotate-[25deg]" />
                <div className="absolute h-[80%] w-[120%] rounded-full border border-theme/20 rotate-[-15deg]" />
                {/* Center dot */}
                <div className="h-3 w-3 rounded-full bg-brand shadow-[0_0_12px_rgba(18,255,128,0.4)]" />
                {/* Satellite dots */}
                <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand/60" />
                <div className="absolute top-1/4 -right-1 h-2 w-2 rounded-full bg-brand/40" />
                <div className="absolute bottom-1/4 -left-1 h-2 w-2 rounded-full bg-brand/50" />
                <div className="absolute -bottom-1 right-1/3 h-2 w-2 rounded-full bg-brand/30" />
              </div>
            </div>

            <p className="mt-2 text-lg font-semibold text-theme">
              Team members across 8 countries
            </p>

            {/* Country tags */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {TEAM_COUNTRIES.map((country) => (
                <Chip key={country} className="text-xs">
                  {country}
                </Chip>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SOCIAL LINKS                                                */}
      {/* ============================================================ */}
      <Section variant="white" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
              Follow Us
            </h2>
            <p className="mt-3 text-base text-theme-s">
              Stay connected and join the conversation across our social
              channels.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 rounded-2xl border border-theme bg-theme-card p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-[#0a0a0a]">
                  {social.icon}
                </span>
                <span className="text-sm font-medium text-theme">
                  {social.name}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-theme-m transition-colors group-hover:text-brand" />
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  FAQ QUICK LINKS                                             */}
      {/* ============================================================ */}
      <Section variant="coral" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
              <HelpCircle className="h-5 w-5 text-brand" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
              Looking for answers?
            </h2>
            <p className="mt-3 text-base text-theme-s">
              You might find what you need without waiting for a reply.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <Card
                  variant="dark"
                  className="group flex items-start gap-4 transition-all duration-300 hover:border-brand/30"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-[#0a0a0a]">
                    {link.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-theme">
                      {link.label}
                    </h3>
                    <p className="mt-1 text-xs text-theme-m">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-theme-m transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                </Card>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-sm text-theme-s">
              Still have questions?{" "}
              <a
                href="mailto:hello@voatomy.global"
                className="font-medium text-brand transition-colors hover:text-brand/80"
              >
                hello@voatomy.global
              </a>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
