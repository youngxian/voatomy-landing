"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      data-visible={isVisible}
      className={cn(
        "group/reveal transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
