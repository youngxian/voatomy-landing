"use client";

import { FAQ_ITEMS } from "@/lib/constants";
import { ScrollReveal } from "./scroll-reveal";
import { FAQAccordion } from "./faq-accordion";
import { MessageCircle } from "lucide-react";
import {
  FynkDisplayHeading,
  FynkHeadingUnderlineAccent,
} from "@/components/marketing/fynk-primitives";
import { useDictionary } from "@/i18n/locale-provider";

export function FAQSection() {
  const t = useDictionary().faq;

  return (
    <section className="light-surface-typography relative overflow-hidden bg-white px-4 py-12 sm:py-16 lg:py-24">
      <div className="relative z-[1] mx-auto max-w-container">
        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <FynkDisplayHeading>
                {t.titleLead}
                <br />
                <FynkHeadingUnderlineAccent variant="brand">{t.titleAccent}</FynkHeadingUnderlineAccent>
              </FynkDisplayHeading>
              <p className="mt-2 text-sm text-fynk-muted sm:mt-3 sm:text-base">
                No sales pressure — just honest answers about how Voatomy fits your team, your stack,
                and your security requirements.
              </p>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-fynk-border bg-fynk-surface-alt p-3 sm:mt-6 sm:rounded-2xl sm:p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-fynk-orange-light sm:h-10 sm:w-10 sm:rounded-xl">
                  <MessageCircle className="h-4 w-4 text-fynk-orange sm:h-5 sm:w-5" />
                </span>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-medium text-fynk-ink sm:text-base">Still have questions?</p>
                  <button type="button" className="text-sm font-medium text-fynk-orange hover:underline sm:text-base">
                    Email us at hello@voatomy.com &rarr;
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <FAQAccordion items={FAQ_ITEMS} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
