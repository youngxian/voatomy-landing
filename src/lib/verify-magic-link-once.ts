import { verifyMagicLink, type VerifyMagicLinkResult } from "@/lib/api";

/** One in-flight verify per token (survives React Strict Mode remounts). */
const inflight = new Map<string, Promise<VerifyMagicLinkResult>>();

export function verifyMagicLinkOnce(token: string): Promise<VerifyMagicLinkResult> {
  const key = token.trim();
  let pending = inflight.get(key);
  if (!pending) {
    pending = verifyMagicLink(key).finally(() => {
      inflight.delete(key);
    });
    inflight.set(key, pending);
  }
  return pending;
}
