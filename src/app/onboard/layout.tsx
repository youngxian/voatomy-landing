import type { Metadata } from "next";
import { cookies } from "next/headers";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LocaleProvider } from "@/i18n/locale-provider";
import { LocaleHtmlLang } from "@/i18n/locale-html-lang";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Set up your Voatomy workspace and generate your first AI sprint plan in under 3 minutes.",
};

export default async function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const raw = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = (raw && isValidLocale(raw) ? raw : defaultLocale) as Locale;
  const dictionary = getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dictionary={dictionary}>
      <LocaleHtmlLang locale={locale} />
      {children}
    </LocaleProvider>
  );
}
