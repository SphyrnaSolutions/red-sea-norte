export type RateLimitConfig = {
  windowMs: number
  maxRequests: number
}

export type RateLimitResult = {
  allowed: boolean
  remaining: number
  resetAt: number
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60_000,
  maxRequests: 5,
}

const store = new Map<string, number[]>()

const CLEANUP_INTERVAL_MS = 5 * 60 * 1000

let cleanupTimer: ReturnType<typeof setInterval> | null = null

function startCleanup(windowMs: number): void {
  if (cleanupTimer !== null) return

  cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [ip, timestamps] of store) {
      const recent = timestamps.filter((t) => now - t < windowMs)
      if (recent.length === 0) {
        store.delete(ip)
      } else {
        store.set(ip, recent)
      }
    }
  }, CLEANUP_INTERVAL_MS)

  if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref()
  }
}

export function rateLimit(
  ip: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): RateLimitResult {
  const { windowMs, maxRequests } = config
  const now = Date.now()

  startCleanup(windowMs)

  const timestamps = store.get(ip) ?? []
  const recent = timestamps.filter((t) => now - t < windowMs)

  if (recent.length >= maxRequests) {
    const oldest = recent[0]
    return {
      allowed: false,
      remaining: 0,
      resetAt: oldest + windowMs,
    }
  }

  recent.push(now)
  store.set(ip, recent)

  return {
    allowed: true,
    remaining: maxRequests - recent.length,
    resetAt: now + windowMs,
  }
}

export function _resetStore(): void {
  store.clear()
  if (cleanupTimer !== null) {
    clearInterval(cleanupTimer)
    cleanupTimer = null
  }
}
