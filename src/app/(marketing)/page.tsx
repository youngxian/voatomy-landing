import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustSection } from "@/components/landing/trust-section";
import { ServicesSection } from "@/components/landing/services-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { WorkflowsSection } from "@/components/landing/workflows-section";
import { DemoSection } from "@/components/landing/demo-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { ConnectsEveryTeamSection } from "@/components/landing/connects-every-team-section";
import { PlatformSection } from "@/components/landing/platform-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { TrackedSection } from "@/components/tracked-section";
import { JsonLd, faqPageJsonLd, testimonialsJsonLd } from "@/components/json-ld";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = createPageMetadata({
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  path: "/",
});

/**
 * Voatomy Landing Page — Section Order (LANDING_PAGE_STRUCTURE.md)
 *
 * 1. Announcement Bar (in layout)
 * 2. Header/Navbar (in layout)
 * 3. Hero — Value prop, risk reducers, proof row, bento (CRO: clarity → credibility)
 * 4. Trust — Logo strip + impact stats + flow orchestrator
 * 5. Problem — Pain point stat cards
 * 6. How It Works — 6-signal convergence
 * 7. Demo — Video/interactive preview
 * 8. Comparison — Old way vs ATLAS way
 * 9. Platform Vision — Timeline, products, flow, journey
 * 10. Integrations — Logo grid
 * 11. Security — Code safety + audit confidence
 * 12. Audience — EM + PM personas
 * 13. Pricing — 4-tier cards
 * 14. Testimonials — Social proof
 * 15. FAQ — Accordion
 * 16. Final CTA — Email capture
 * 17. Footer (in layout)
 */
export default function LandingPage() {
  return (
    <div id="main-content">
      <JsonLd data={faqPageJsonLd()} />
      <JsonLd data={testimonialsJsonLd()} />

      {/* 3 — Hero has its own internal tracking */}
      <HeroSection />

      {/* 4 */}
      <TrackedSection id="trust" name="Trust Strip">
        <TrustSection />
      </TrackedSection>

      {/* 4b */}
      <TrackedSection id="services" name="Services">
        <ServicesSection />
      </TrackedSection>

      {/* 4c */}
      <TrackedSection id="benefits" name="Benefits">
        <BenefitsSection />
      </TrackedSection>

      {/* 5 */}
      <TrackedSection id="problem" name="Problem Section">
        <ProblemSection />
      </TrackedSection>

      {/* 6 */}
      <TrackedSection id="workflows" name="How It Works">
        <WorkflowsSection />
      </TrackedSection>

      {/* 7 */}
      <TrackedSection id="demo" name="Demo Section">
        <DemoSection />
      </TrackedSection>

      {/* 8 */}
      <TrackedSection id="comparison" name="Comparison Section">
        <ComparisonSection />
      </TrackedSection>

      {/* 8b — How Voatomy connects every team (white bg, improved design) */}
      <TrackedSection id="connects-every-team" name="Connects Every Team">
        <ConnectsEveryTeamSection />
      </TrackedSection>

      {/* 9 */}
      <TrackedSection id="platform" name="Platform Vision">
        <PlatformSection />
      </TrackedSection>

      {/* 10 */}
      <TrackedSection id="integrations" name="Integrations">
        <IntegrationsSection />
      </TrackedSection>

      {/* 11 */}
      <TrackedSection id="security" name="Security">
        <SecuritySection />
      </TrackedSection>

      {/* 12 */}
      <TrackedSection id="audience" name="Audience">
        <AudienceSection />
      </TrackedSection>

      {/* 13 */}
      <TrackedSection id="pricing" name="Pricing">
        <PricingSection />
      </TrackedSection>

      {/* 14 */}
      <TrackedSection id="testimonials" name="Testimonials">
        <TestimonialsSection />
      </TrackedSection>

      {/* 15 */}
      <TrackedSection id="faq" name="FAQ">
        <FAQSection />
      </TrackedSection>

      {/* 16 — CTA has its own internal tracking */}
      <CTASection />
    </div>
  );
}
