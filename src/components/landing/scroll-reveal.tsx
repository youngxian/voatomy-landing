"use client";

import { cn } from "@/lib/utils";
import {
  useScrollAnimation,
  type ScrollAnimationDirection,
} from "@/hooks/use-scroll-animation";

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: ScrollAnimationDirection;
  delayMs?: number;
}) {
  const { ref, animationClass } = useScrollAnimation(0.12, direction);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        animationClass,
        className,
      )}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
