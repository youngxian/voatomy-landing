"use client";

import * as React from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { WorkflowStepIllustration } from "@/components/marketing/landing-illustrations";
import {
  FynkDisplayHeading,
  FynkGradientBackdrop,
  FynkHeadingUnderlineAccent,
  FynkStepPill,
  FynkReveal,
} from "@/components/marketing/fynk-primitives";
import { useDictionary, useLocale } from "@/i18n/locale-provider";

export function ProblemSection() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const t = useDictionary().workflow;
  const { localizedPath } = useLocale();
  const step = t.steps[activeStep];

  return (
    <section className="light-surface-typography relative overflow-hidden bg-fynk-surface-alt px-4 py-12 sm:py-20 lg:py-28">
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
          <p className="mt-4 text-sm leading-relaxed text-fynk-muted sm:mt-5 sm:text-base md:text-lg">{t.intro}</p>
        </FynkReveal>

        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-12">
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

        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <FynkReveal visible={isVisible} direction="left" className="space-y-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-fynk-border bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-fynk-orange shadow-sm">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-fynk-orange text-[10px] text-white">
                  {activeStep + 1}
                </span>
                {step.step}
              </div>
              <h3 className="mt-4 text-xl font-bold leading-tight tracking-[-0.025em] text-fynk-ink sm:mt-5 sm:text-[clamp(1.65rem,2.5vw,2.25rem)]">
                {step.subtitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fynk-muted sm:mt-4 sm:text-body-lg">
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

          <div
            className={cn(
              "relative transition-all duration-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <WorkflowStepIllustration key={activeStep} step={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
