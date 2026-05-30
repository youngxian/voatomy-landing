"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/i18n/locale-provider";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/** Prefixes internal paths with the active locale (/en, /de). */
export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { localizedPath } = useLocale();
  return <Link href={localizedPath(href)} {...props} />;
}
