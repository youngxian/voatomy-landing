import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, isValidLocale, localeHtmlLang, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LocaleProvider } from "@/i18n/locale-provider";
import { LocaleHtmlLang } from "@/i18n/locale-html-lang";
import { SITE_CONFIG } from "@/lib/constants";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${SITE_CONFIG.url}/${locale}`;
  }

  return {
    alternates: {
      canonical: `${SITE_CONFIG.url}/${raw}`,
      languages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();

  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dictionary={dictionary}>
      <LocaleHtmlLang locale={locale} />
      {children}
    </LocaleProvider>
  );
}
