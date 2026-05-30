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
    <section className="light-surface-typography relative overflow-hidden bg-white px-4 py-16 sm:py-24">
      <div className="relative z-[1] mx-auto max-w-container">
        <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <FynkDisplayHeading>
                {t.titleLead}
                <br />
                <FynkHeadingUnderlineAccent variant="brand">{t.titleAccent}</FynkHeadingUnderlineAccent>
              </FynkDisplayHeading>
              <p className="mt-3 text-base text-fynk-muted">
                No sales pressure — just honest answers about how Voatomy fits your team, your stack,
                and your security requirements.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-fynk-border bg-fynk-surface-alt p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fynk-orange-light">
                  <MessageCircle className="h-5 w-5 text-fynk-orange" />
                </span>
                <div>
                  <p className="text-base font-medium text-fynk-ink">Still have questions?</p>
                  <button type="button" className="text-base font-medium text-fynk-orange hover:underline">
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
