"use client";

import * as React from "react";

export type ScrollAnimationDirection = "up" | "down" | "left" | "right" | "none";

const HIDDEN: Record<ScrollAnimationDirection, string> = {
  up: "opacity-0 translate-y-10",
  down: "opacity-0 -translate-y-10",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  none: "opacity-0",
};

const VISIBLE = "opacity-100 translate-x-0 translate-y-0";

export function useScrollAnimation(
  threshold = 0.12,
  direction: ScrollAnimationDirection = "up",
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animationClass = isVisible ? VISIBLE : HIDDEN[direction];

  return { ref, isVisible, animationClass };
}
