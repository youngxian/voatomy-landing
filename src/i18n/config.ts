export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};

export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  de: "DE",
};

/** BCP-47 tags for html lang and hreflang */
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  de: "de",
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Prefer German for DACH; English otherwise (fynk.com pattern). */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const parts = header
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: qPart ? parseFloat(qPart) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of parts) {
    if (tag.startsWith("de")) return "de";
    if (tag.startsWith("en")) return "en";
  }

  return defaultLocale;
}

export function stripLocaleFromPathname(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }
  return pathname;
}

/** App routes that live outside `[locale]` — do not prefix with /en or /de */
const NON_LOCALIZED_PREFIXES = [
  "/auth",
  "/invite",
  "/demo",
  "/settings",
  "/onboarding",
  "/onboard",
] as const;

function isNonLocalizedPath(pathname: string): boolean {
  return NON_LOCALIZED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export { isNonLocalizedPath };

export function localizedPath(path: string, locale: Locale): string {
  if (!path || path.startsWith("http") || path.startsWith("#") || path.startsWith("mailto:")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const [pathOnly, query = ""] = normalized.split("?");
  const suffix = query ? `?${query}` : "";

  if (isNonLocalizedPath(pathOnly)) {
    return `${pathOnly}${suffix}`;
  }

  const withoutLocale = stripLocaleFromPathname(pathOnly);

  if (withoutLocale === "/") return `/${locale}${suffix}`;
  return `/${locale}${withoutLocale}${suffix}`;
}
