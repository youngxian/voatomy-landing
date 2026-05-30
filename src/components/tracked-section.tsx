"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSectionTracker } from "@/hooks/use-analytics";
import {
  useScrollAnimation,
  type ScrollAnimationDirection,
} from "@/hooks/use-scroll-animation";

interface TrackedSectionProps {
  id: string;
  name: string;
  children: React.ReactNode;
  threshold?: number;
  /** Scroll-reveal animation when section enters viewport */
  animate?: boolean;
  direction?: ScrollAnimationDirection;
  delayMs?: number;
}

export function TrackedSection({
  id,
  name,
  children,
  threshold = 0.12,
  animate = false,
  direction = "up",
  delayMs = 0,
}: TrackedSectionProps) {
  const trackRef = useSectionTracker(id, name, threshold);
  const { ref: animRef, animationClass } = useScrollAnimation(threshold, direction);

  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      (trackRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (animRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [trackRef, animRef],
  );

  return (
    <div
      ref={setRef}
      data-section-id={id}
      className={cn(
        animate && "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        animate && animationClass,
      )}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
