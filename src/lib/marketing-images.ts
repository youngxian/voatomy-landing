/**
 * Curated Unsplash sources — use with next/image (see next.config remotePatterns).
 * Keep q=80–85 and fixed dimensions for stable LCP.
 */
export const MARKETING_IMAGES = {
  /** Landing hero — team collaboration */
  heroTeam:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&h=1100&fit=crop&auto=format&q=85",
  /** Final CTA / workspace */
  ctaWorkspace:
    "https://images.unsplash.com/photo-1497215842964-222b820dc9ea?w=1600&h=1200&fit=crop&auto=format&q=85",
  /** Demo / code & screen */
  codeScreen:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&h=1000&fit=crop&auto=format&q=85",
  /** Benefits / collaboration */
  collaboration:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=1200&fit=crop&auto=format&q=85",
  /** Services / analytics dashboard mood */
  dashboardMood:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=1000&fit=crop&auto=format&q=85",
  /** Testimonials / meeting */
  meeting:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=1000&fit=crop&auto=format&q=85",
} as const;

export type MarketingImageKey = keyof typeof MARKETING_IMAGES;
