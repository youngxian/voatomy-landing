"use client";

import { useEffect } from "react";
import type { Locale } from "./config";
import { localeHtmlLang } from "./config";

export function LocaleHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = localeHtmlLang[locale];
  }, [locale]);

  return null;
}
