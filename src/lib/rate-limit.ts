import "server-only";
import { headers } from "next/headers";

// Sliding-window limit per client IP, kept in memory. On Vercel each server instance has
// its own memory, so this slows down a single noisy client rather than enforcing a global
// cap. The launch checklist adds a Vercel Firewall rate-limit rule as the hard limit.
const hits = new Map<string, number[]>();

export async function clientIp() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function rateLimited(
  bucket: string,
  { limit, windowMs }: { limit: number; windowMs: number },
) {
  const key = `${bucket}:${await clientIp()}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing without bound.
  if (hits.size > 5000)
    for (const [k, v] of hits)
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  return recent.length > limit;
}
