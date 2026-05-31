import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustSection } from "@/components/landing/trust-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { ProductsShowcaseSection } from "@/components/landing/products-showcase-section";
import { PlatformConnectSection } from "@/components/landing/platform-connect-section";
import { WorkflowsSection } from "@/components/landing/workflows-section";
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
    <div id="main-content" className="landing-page">
      <JsonLd data={faqPageJsonLd()} />
      <JsonLd data={testimonialsJsonLd()} />

      <HeroSection />

      <TrackedSection id="trust" name="Trust Strip">
        <TrustSection />
      </TrackedSection>

      <TrackedSection id="workflow" name="Three-Step Workflow">
        <ProblemSection />
      </TrackedSection>

      <TrackedSection id="how-it-works" name="How It Works">
        <WorkflowsSection />
      </TrackedSection>

      <TrackedSection id="products" name="Products">
        <ProductsShowcaseSection />
      </TrackedSection>

      <TrackedSection id="platform-connect" name="Platform Connect">
        <PlatformConnectSection />
      </TrackedSection>

      <TrackedSection id="testimonials" name="Testimonials">
        <TestimonialsSection />
      </TrackedSection>

      <TrackedSection id="faq" name="FAQ">
        <FAQSection />
      </TrackedSection>

      <CTASection />
    </div>
  );
}
