import { NextRequest } from "next/server";

// Lightweight per-process throttling. For multi-instance deployments, enforce an
// equivalent limit at the reverse proxy or with a shared Redis-backed limiter.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_COMMENTS_PER_WINDOW = 5;
const clients = new Map<string, { count: number; resetAt: number }>();

export function getClientKey(request: NextRequest): string {
  // Prefer the platform-provided client IP. Do not trust arbitrary forwarded
  // chains unless the hosting proxy overwrites them.
  return request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown-client";
}

export function isCommentRateLimited(key: string, now = Date.now()): boolean {
  const current = clients.get(key);
  if (!current || current.resetAt <= now) {
    clients.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (current.count >= MAX_COMMENTS_PER_WINDOW) return true;
  current.count += 1;

  // Bound memory use if the service receives many distinct client keys.
  if (clients.size > 10_000) {
    for (const [client, limit] of clients) {
      if (limit.resetAt <= now) clients.delete(client);
    }
  }
  return false;
}

export function isSameOriginRequest(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients may omit Origin
  try {
    return new URL(origin).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}
