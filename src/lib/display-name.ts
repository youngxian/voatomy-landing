/** First token of a display name, title-cased. */
function capitalizeWord(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function emailLocalPart(email: string): string {
  return email.split("@")[0]?.trim().toLowerCase() ?? "";
}

/**
 * Returns a friendly first name for greetings.
 * Avoids using the email local-part (e.g. "youngxian") when no real name is available.
 */
export function getGreetingFirstName(fullName: string, email: string): string | null {
  const trimmed = fullName.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(/\s+/).filter(Boolean);
  const first = parts[0];
  if (!first) return null;

  const local = emailLocalPart(email);

  // Signup-style "First Last" — always prefer the given name
  if (parts.length >= 2) {
    return capitalizeWord(first);
  }

  // Single token that is just the email handle — not a real name
  if (local && first.toLowerCase() === local) return null;
  if (first.includes("@")) return null;

  return capitalizeWord(first);
}
