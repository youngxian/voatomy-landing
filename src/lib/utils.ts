import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PERSONAL_EMAIL_DOMAINS = new Set([
  // "gmail.com",
  "googlemail.com",
  // "yahoo.com",
  "yahoo.co.uk",
  "yahoo.co.in",
  "ymail.com",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "outlook.co.uk",
  "live.com",
  "live.co.uk",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "mail.com",
  "zoho.com",
  "protonmail.com",
  "proton.me",
  "pm.me",
  "tutanota.com",
  "tutamail.com",
  "tuta.io",
  "gmx.com",
  "gmx.net",
  "web.de",
  "yandex.com",
  "yandex.ru",
  "mail.ru",
  "inbox.com",
  "fastmail.com",
  "hey.com",
  "rocketmail.com",
  "att.net",
  "sbcglobal.net",
  "comcast.net",
  "verizon.net",
  "cox.net",
  "charter.net",
  "earthlink.net",
  "qq.com",
  "163.com",
  "126.com",
  "naver.com",
  "daum.net",
  "hanmail.net",
  "rediffmail.com",
]);

export function isWorkEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !PERSONAL_EMAIL_DOMAINS.has(domain);
}

export function validateWorkEmail(email: string): string | null {
  if (!email.includes("@")) return "Please enter a valid email address";
  if (!isWorkEmail(email)) return "Please use your work email (e.g. jane@yourcompany.com)";
  return null;
}
