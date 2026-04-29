"use client";

import * as React from "react";
import { useSectionTracker } from "@/hooks/use-analytics";

/**
 * Lightweight wrapper that auto-tracks when a landing page section
 * enters / exits the viewport via IntersectionObserver.
 *
 * Usage:
 *   <TrackedSection id="pricing" name="Pricing Section">
 *     <PricingSection />
 *   </TrackedSection>
 */
interface TrackedSectionProps {
  id: string;
  name: string;
  children: React.ReactNode;
  threshold?: number;
}

export function TrackedSection({ id, name, children, threshold = 0.2 }: TrackedSectionProps) {
  const ref = useSectionTracker(id, name, threshold);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} data-section-id={id}>
      {children}
    </div>
  );
}
