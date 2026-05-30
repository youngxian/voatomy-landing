import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  isValidLocale,
  localeFromAcceptLanguage,
  locales,
  type Locale,
} from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

const EXCLUDED_PREFIXES = ["/auth", "/onboard", "/invite", "/api", "/_next"];

function isExcluded(pathname: string): boolean {
  if (pathname.includes(".") && !pathname.endsWith("/")) {
    const ext = pathname.split(".").pop() ?? "";
    if (ext.length <= 5 && ext !== "html") return true;
  }
  return EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function resolveLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isValidLocale(cookie)) return cookie;

  return localeFromAcceptLanguage(request.headers.get("accept-language"));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isExcluded(pathname)) {
    return NextResponse.next();
  }

  if (pathnameHasLocale(pathname)) {
    const segment = pathname.split("/")[1];
    if (segment && isValidLocale(segment)) {
      const response = NextResponse.next();
      response.cookies.set(LOCALE_COOKIE, segment, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
      return response;
    }
    return NextResponse.next();
  }

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|images|.*\\..*).*)"],
};
