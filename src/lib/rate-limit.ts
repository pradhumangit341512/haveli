import { NextRequest } from "next/server";

// Lightweight in-memory sliding-window rate limiter keyed by client IP.
//
// NOTE: This is a per-instance limiter. On multi-instance/serverless hosting it
// only bounds abuse within a single warm instance, not globally. It is a
// reasonable baseline against naive floods; for strong guarantees back it with a
// shared store (e.g. Upstash Redis / Vercel KV).
type Hit = { count: number; resetAt: number };

const buckets = new Map<string, Hit>();

// Bound memory: opportunistically drop expired buckets when the map grows.
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, hit] of buckets) {
    if (hit.resetAt <= now) buckets.delete(key);
  }
}

export function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

/**
 * Returns true if the request is allowed, false if the limit is exceeded.
 * @param key   unique bucket key (e.g. `booking:${ip}`)
 * @param limit max requests allowed within the window
 * @param windowMs window length in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);

  const hit = buckets.get(key);
  if (!hit || hit.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (hit.count >= limit) return false;
  hit.count += 1;
  return true;
}
