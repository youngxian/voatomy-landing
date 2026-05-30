"use client";

import * as React from "react";
import type { Locale } from "./config";
import { localizedPath as buildLocalizedPath } from "./config";
import type { Dictionary } from "./types";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  localizedPath: (path: string) => string;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = React.useMemo(
    () => ({
      locale,
      dictionary,
      localizedPath: (path: string) => buildLocalizedPath(path, locale),
    }),
    [locale, dictionary],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useDictionary() {
  return useLocale().dictionary;
}

/** Returns locale context when inside LocaleProvider, otherwise null. */
export function useOptionalLocale() {
  return React.useContext(LocaleContext);
}
