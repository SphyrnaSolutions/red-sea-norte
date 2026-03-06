import { describe, it, expect, beforeEach } from "vitest"
import { rateLimit, _resetStore } from "@/lib/rate-limit"

describe("rateLimit", () => {
  beforeEach(() => {
    _resetStore()
  })

  it("allows the first 5 requests from the same IP", () => {
    for (let i = 0; i < 5; i++) {
      const result = rateLimit("192.168.1.1")
      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(4 - i)
    }
  })

  it("blocks the 6th request within the window", () => {
    for (let i = 0; i < 5; i++) {
      rateLimit("192.168.1.1")
    }

    const result = rateLimit("192.168.1.1")
    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
    expect(result.resetAt).toBeGreaterThan(Date.now())
  })

  it("treats different IPs independently", () => {
    for (let i = 0; i < 5; i++) {
      rateLimit("10.0.0.1")
    }

    const blocked = rateLimit("10.0.0.1")
    expect(blocked.allowed).toBe(false)

    const allowed = rateLimit("10.0.0.2")
    expect(allowed.allowed).toBe(true)
    expect(allowed.remaining).toBe(4)
  })

  it("allows requests again after window expires", async () => {
    const config = { windowMs: 100, maxRequests: 2 }

    rateLimit("10.0.0.3", config)
    rateLimit("10.0.0.3", config)

    const blocked = rateLimit("10.0.0.3", config)
    expect(blocked.allowed).toBe(false)

    await new Promise((r) => setTimeout(r, 150))

    const allowed = rateLimit("10.0.0.3", config)
    expect(allowed.allowed).toBe(true)
  })

  it("returns correct resetAt timestamp", () => {
    const before = Date.now()
    const result = rateLimit("10.0.0.4")
    const after = Date.now()

    expect(result.resetAt).toBeGreaterThanOrEqual(before + 60_000)
    expect(result.resetAt).toBeLessThanOrEqual(after + 60_000)
  })
})
