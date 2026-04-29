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
import { SectionBackgroundDecor } from "@/components/marketing/section-background-decor";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation();
  const sectionRef = useSectionTracker("cta-final", "Final CTA Section");
  const { isLoggedIn, dashboardUrl } = useSession();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden bg-teal dark-section px-4 py-16 sm:py-24 transition-colors duration-300"
    >
      <SectionBackgroundDecor tone="dark" />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-teal-dark/50 to-transparent"
        aria-hidden
      />

      <div
        ref={ref}
        className={cn(
          "relative z-[3] mx-auto max-w-container transition-all duration-700",
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
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Work email"
                  aria-label="Work email for early access"
                  className="h-12 min-h-[48px] w-full flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/50 focus:border-accent-lime/50 focus:outline-none focus:ring-2 focus:ring-accent-lime/30 transition-colors duration-300"
                  onFocus={() => trackFormEvent("cta-email", "focus", "email")}
                  onBlur={(e) => trackFormEvent("cta-email", "blur", "email", { hasValue: !!e.target.value })}
                  onChange={(e) => {
                    if (e.target.value.length === 1) trackFormEvent("cta-email", "change", "email", { valueLength: 1 });
                  }}
                />
              )}
              <Button variant="primary" size="lg" className="h-12 min-h-[48px] w-full gap-2 rounded-full bg-accent-lime text-[15px] text-teal hover:bg-accent-lime/90 sm:w-auto" asChild>
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
            <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-2xl ring-1 ring-accent-lime/15">
              <Image
                src={MARKETING_IMAGES.ctaWorkspace}
                alt="Modern product workspace"
                width={800}
                height={600}
                className="h-64 w-80 object-cover"
                sizes="320px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-teal-dark/50 via-transparent to-[#f16e2c]/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
