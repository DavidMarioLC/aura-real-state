/**
 * What is left after the content moved to the CMS: the two format helpers the
 * property components share. Both are locale-independent on purpose — the
 * price reads the same under `/en` and `/es`, and the buckets are filter keys.
 */

export const CURRENCY = "USD" as const;

export function fmtPrice(n: number, currency: string = CURRENCY): string {
  if (currency === "MXN") {
    const v = Math.round(n * 18.5);
    return `MX$${v.toLocaleString("es-MX")}`;
  }
  return `$${n.toLocaleString("en-US")} USD`;
}

export function bucketOf(price: number): "b1" | "b2" | "b3" | "b4" {
  if (price <= 900000) return "b1";
  if (price <= 1500000) return "b2";
  if (price <= 2500000) return "b3";
  return "b4";
}
