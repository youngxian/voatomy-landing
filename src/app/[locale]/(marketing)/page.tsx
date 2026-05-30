import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustSection } from "@/components/landing/trust-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { ConnectsEveryTeamSection } from "@/components/landing/connects-every-team-section";
import { ProductEcosystemSection } from "@/components/landing/product-ecosystem-section";
import { FeatureBucketsSection } from "@/components/landing/feature-buckets-section";
import { WorkflowsSection } from "@/components/landing/workflows-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { TrackedSection } from "@/components/tracked-section";
import { JsonLd, faqPageJsonLd, testimonialsJsonLd } from "@/components/json-ld";
import { SITE_CONFIG } from "@/lib/constants";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isValidLocale(raw) ? raw : "en") as Locale;
  const dict = getDictionary(locale);

  return createPageMetadata({
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: dict.meta.siteDescription,
    path: `/${locale}`,
    locale,
  });
}

export default function LandingPage() {
  return (
    <div id="main-content">
      <JsonLd data={faqPageJsonLd()} />
      <JsonLd data={testimonialsJsonLd()} />

      <HeroSection />

      <TrackedSection id="trust" name="Trust Strip">
        <TrustSection />
      </TrackedSection>

      <TrackedSection id="benefits" name="Why Voatomy">
        <BenefitsSection />
      </TrackedSection>

      <TrackedSection id="testimonials" name="Testimonials">
        <TestimonialsSection />
      </TrackedSection>

      <TrackedSection id="workflow" name="Three-Step Workflow">
        <ProblemSection />
      </TrackedSection>

      <TrackedSection id="solutions" name="Solutions">
        <ConnectsEveryTeamSection />
      </TrackedSection>

      <TrackedSection id="platform" name="Product Ecosystem">
        <ProductEcosystemSection />
      </TrackedSection>

      <TrackedSection id="features" name="Feature Buckets">
        <FeatureBucketsSection />
      </TrackedSection>

      <TrackedSection id="how-it-works" name="How It Works">
        <WorkflowsSection />
      </TrackedSection>

      <TrackedSection id="integrations" name="Integrations">
        <IntegrationsSection />
      </TrackedSection>

      <TrackedSection id="security" name="Security">
        <SecuritySection />
      </TrackedSection>

      <TrackedSection id="faq" name="FAQ">
        <FAQSection />
      </TrackedSection>

      <CTASection />
    </div>
  );
}
