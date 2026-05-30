"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { MARKETING_IMAGES } from "@/lib/marketing-images";
import {
  FynkDisplayHeading,
  FynkGradientBackdrop,
  FynkHeadingUnderlineAccent,
  FynkStepPill,
  FynkReveal,
} from "@/components/marketing/fynk-primitives";
import { useDictionary, useLocale } from "@/i18n/locale-provider";

const STEP_IMAGES = [
  MARKETING_IMAGES.collaboration,
  MARKETING_IMAGES.dashboardMood,
  MARKETING_IMAGES.codeScreen,
] as const;

export function ProblemSection() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const t = useDictionary().workflow;
  const { localizedPath } = useLocale();
  const step = t.steps[activeStep];

  return (
    <section className="light-surface-typography relative overflow-hidden bg-fynk-surface-alt px-4 py-20 sm:py-28">
      <FynkGradientBackdrop intensity="soft" />

      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <FynkReveal visible={isVisible} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-fynk-orange">
            {t.subtitle}
          </p>
          <FynkDisplayHeading as="h2" align="center" className="mt-3">
            {t.titleLead}
            <br />
            <FynkHeadingUnderlineAccent variant="amber">{t.titleAccent}</FynkHeadingUnderlineAccent>
          </FynkDisplayHeading>
          <p className="mt-5 text-lg leading-relaxed text-fynk-muted">{t.intro}</p>
        </FynkReveal>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {t.steps.map((s, i) => (
            <FynkStepPill
              key={s.step}
              step={s.step}
              label={s.title}
              active={activeStep === i}
              onClick={() => setActiveStep(i)}
            />
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <FynkReveal visible={isVisible} direction="left" className="space-y-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-fynk-border bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-fynk-orange shadow-sm">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-fynk-orange text-[10px] text-white">
                  {activeStep + 1}
                </span>
                {step.step}
              </div>
              <h3 className="mt-5 text-[clamp(1.65rem,2.5vw,2.25rem)] font-bold leading-tight tracking-[-0.025em] text-fynk-ink">
                {step.subtitle}
              </h3>
              <p className="mt-4 text-body-lg leading-relaxed text-fynk-muted">
                {step.desc}
              </p>
            </div>
            <Link
              href={localizedPath("/demo")}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-fynk-orange transition-colors hover:text-fynk-orange-hover"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FynkReveal>

          {/* fynk-style: floating image with back card + soft shadow stack */}
          <div className="relative">
            {/* Back accent card */}
            <div
              aria-hidden
              className="absolute -left-4 -top-4 hidden h-full w-full rounded-3xl border border-fynk-border bg-white/70 sm:block animate-fynk-card-drift"
            />
            {/* Floating accent card behind */}
            <div
              aria-hidden
              className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-3xl border border-fynk-orange/10 bg-fynk-orange-light/40 sm:block animate-fynk-card-drift-alt"
            />
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl border border-fynk-border bg-white shadow-xl shadow-fynk-ink/[0.06] transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              <Image
                key={activeStep}
                src={STEP_IMAGES[activeStep]}
                alt={step.subtitle}
                width={1600}
                height={1000}
                className="aspect-[4/3] w-full object-cover animate-fade-in"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              {/* subtle bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-fynk-ink/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
