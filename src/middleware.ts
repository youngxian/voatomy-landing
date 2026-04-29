import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/onboard", "/onboarding", "/settings"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!isProtected) return NextResponse.next();

  const session = request.cookies.get("session");

  if (session?.value) return NextResponse.next();

  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/onboard/:path*", "/onboarding/:path*", "/settings/:path*"],
};
