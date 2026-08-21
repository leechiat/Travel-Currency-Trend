export function getMasKeyId(): string {
  return (
    process.env.MAS_API_KEY ||
    process.env.MAS_KEY_ID ||
    process.env.KEY_ID ||
    ""
  );
}

// Move FALLBACK_CURRENCIES (and any shared transform helpers) here from server.ts:
// export const FALLBACK_CURRENCIES = [ ... ];