"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useSectionTracker } from "@/hooks/use-analytics";
import { useSession } from "@/hooks/use-session";
import { trackConversion, trackFormEvent } from "@/lib/analytics";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation();
  const sectionRef = useSectionTracker("cta-final", "Final CTA Section");
  const { isLoggedIn, dashboardUrl } = useSession();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden bg-teal dark-section px-4 py-16 sm:py-24 transition-colors duration-300"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-teal-dark/50 to-transparent"
        aria-hidden
      />

      <div
        ref={ref}
        className={cn(
          "relative z-[1] mx-auto max-w-container transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
          {/* Left: CTA content */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-heading-1">
              Stop guessing. Start shipping.
            </h2>
            <p className="mx-auto mt-4 max-w-[500px] text-body-lg text-white/80 lg:mx-0">
              Join 1,200+ engineering leaders on the ATLAS waitlist. Free to get
              started — no credit card needed.
            </p>

            <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row lg:mx-0">
              {!isLoggedIn && (
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/50 focus:border-accent-lime/50 focus:outline-none focus:ring-2 focus:ring-accent-lime/30 transition-colors duration-300"
                  onFocus={() => trackFormEvent("cta-email", "focus", "email")}
                  onBlur={(e) => trackFormEvent("cta-email", "blur", "email", { hasValue: !!e.target.value })}
                  onChange={(e) => {
                    if (e.target.value.length === 1) trackFormEvent("cta-email", "change", "email", { valueLength: 1 });
                  }}
                />
              )}
              <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-full bg-accent-lime text-teal hover:bg-accent-lime/90 gap-2" asChild>
                <Link
                  href={isLoggedIn ? dashboardUrl : "/auth/signup"}
                  data-track-cta={isLoggedIn ? "cta-final-dashboard" : "cta-final-signup"}
                  data-track-cta-text={isLoggedIn ? "Go to Dashboard" : "Get Early Access"}
                  data-track-cta-location="final-cta"
                  onClick={() => !isLoggedIn && trackConversion("signup_start", { source: "final-cta" })}
                >
                  {isLoggedIn ? "Go to Dashboard" : "Get Early Access"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-sm text-white/60 lg:text-left">
              Free forever tier &middot; No credit card &middot; Setup in 5 minutes
            </p>
          </div>

          {/* Right: Image */}
          <div className="hidden lg:col-span-2 lg:flex lg:justify-end">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <Image
                src="/images/landing/workspace.jpg"
                alt="Modern workspace"
                width={400}
                height={300}
                className="h-64 w-80 object-cover opacity-85"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
