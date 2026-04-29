import { FAQ_ITEMS } from "@/lib/constants";
import { ScrollReveal } from "./scroll-reveal";
import { FAQAccordion } from "./faq-accordion";
import { MessageCircle } from "lucide-react";

export function FAQSection() {
  return (
    <section className="bg-white px-4 py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-container">
        <ScrollReveal>
          {/* Two-column: left header + right accordion */}
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left: sticky header */}
            <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal/15 bg-teal/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal">
                FAQ
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
                Got questions? We&apos;ve got answers.
              </h2>
              <p className="mt-3 text-sm text-charcoal/50">
                Everything you need to know about ATLAS and the Voatomy platform.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-charcoal/10 bg-cream p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10">
                  <MessageCircle className="h-5 w-5 text-teal" />
                </span>
                <div>
                  <p className="text-sm font-medium text-charcoal">Still have questions?</p>
                  <button
                    type="button"
                    className="text-sm font-medium text-teal hover:underline"
                  >
                    Email us at hello@voatomy.com &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Right: accordion */}
            <div className="lg:col-span-3">
              <FAQAccordion items={FAQ_ITEMS} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
