import { describe, it, expect, vi, beforeEach } from "vitest"
import { _resetStore } from "@/lib/rate-limit"

vi.mock("@/lib/odoo/client", () => ({
  createLead: vi.fn().mockResolvedValue(42),
  searchOrCreateUtmSource: vi.fn().mockResolvedValue(7),
}))

import { createLead, searchOrCreateUtmSource } from "@/lib/odoo/client"

const mockedCreateLead = vi.mocked(createLead)
const mockedSearchOrCreateUtmSource = vi.mocked(searchOrCreateUtmSource)

function makeRequest(body: unknown, headers?: Record<string, string>) {
  const headersMap = new Headers({
    "content-type": "application/json",
    "x-forwarded-for": "127.0.0.1",
    ...headers,
  })

  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: headersMap,
    body: typeof body === "string" ? body : JSON.stringify(body),
  })
}

function validPayload(overrides?: Record<string, unknown>) {
  return {
    name: "Juan Garcia",
    email: "juan@example.com",
    phone: "+34612345678",
    whatsappConsent: true,
    certification: "Open Water",
    preferredMonth: "Marzo",
    ...overrides,
  }
}

describe("POST /api/lead", () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    _resetStore()
    mockedCreateLead.mockResolvedValue(42)
    mockedSearchOrCreateUtmSource.mockResolvedValue(7)
  })

  async function callPost(req: Request) {
    // Dynamic import to get fresh module state with mocks applied
    const { POST } = await import("@/app/api/lead/route")
    // NextRequest can wrap a standard Request
    const { NextRequest } = await import("next/server")
    const nextReq = new NextRequest(req)
    return POST(nextReq)
  }

  it("returns 201 with valid submission", async () => {
    const res = await callPost(makeRequest(validPayload()))
    const json = await res.json()

    expect(res.status).toBe(201)
    expect(json.success).toBe(true)
    expect(json.message).toBe("Solicitud recibida correctamente")
  })

  it("calls createLead with correct field mapping", async () => {
    await callPost(makeRequest(validPayload()))

    expect(mockedSearchOrCreateUtmSource).toHaveBeenCalledWith(
      "Web buceoenelmarrojo.com"
    )
    expect(mockedCreateLead).toHaveBeenCalledOnce()

    const leadArg = mockedCreateLead.mock.calls[0][0]
    expect(leadArg.name).toBe("Lead Web - Juan Garcia")
    expect(leadArg.contact_name).toBe("Juan Garcia")
    expect(leadArg.email_from).toBe("juan@example.com")
    expect(leadArg.phone).toBe("+34612345678")
    expect(leadArg.source_id).toBe(7)
    expect(leadArg.website).toBe("https://buceoenelmarrojo.com")
    expect(leadArg.description).toContain("Certificacion: Open Water")
    expect(leadArg.description).toContain("Mes preferido: Marzo")
    expect(leadArg.description).toContain("Consentimiento WhatsApp")
    expect(leadArg.description).toContain("Acepto recibir comunicaciones por WhatsApp: Si")
    expect(leadArg.description).toMatch(/Fecha de consentimiento: \d{4}-\d{2}-\d{2}T/)
  })

  it("returns 400 when email is missing", async () => {
    const payload = validPayload()
    delete (payload as Record<string, unknown>).email

    const res = await callPost(makeRequest(payload))
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBe("Datos invalidos")
    expect(json.fields.email).toBeDefined()
  })

  it("returns 400 for invalid email", async () => {
    const res = await callPost(makeRequest(validPayload({ email: "not-an-email" })))
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.fields.email).toBeDefined()
  })

  it("returns 400 for invalid phone", async () => {
    const res = await callPost(makeRequest(validPayload({ phone: "abc" })))
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.fields.phone).toBeDefined()
  })

  it("returns 400 when whatsappConsent is false", async () => {
    const res = await callPost(makeRequest(validPayload({ whatsappConsent: false })))
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.fields.whatsappConsent).toBeDefined()
  })

  it("returns 400 for malformed JSON", async () => {
    const req = new Request("http://localhost/api/lead", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "127.0.0.1",
      },
      body: "not valid json {{{",
    })

    const res = await callPost(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toContain("JSON")
  })

  it("returns 500 when Odoo createLead throws", async () => {
    mockedCreateLead.mockRejectedValueOnce(new Error("Odoo connection timeout"))

    const res = await callPost(makeRequest(validPayload()))
    const json = await res.json()

    expect(res.status).toBe(500)
    expect(json.error).toBe("Error al procesar la solicitud. Intente mas tarde.")
    expect(JSON.stringify(json)).not.toContain("Odoo connection timeout")
  })

  it("returns 429 after 5 requests from same IP", async () => {
    for (let i = 0; i < 5; i++) {
      const res = await callPost(makeRequest(validPayload()))
      expect(res.status).toBe(201)
    }

    const res = await callPost(makeRequest(validPayload()))
    const json = await res.json()

    expect(res.status).toBe(429)
    expect(json.error).toContain("Demasiadas solicitudes")
    expect(res.headers.get("Retry-After")).toBeDefined()
  })

  it("extracts IP from x-forwarded-for header", async () => {
    // Use a unique IP to not conflict with other tests
    const res = await callPost(
      makeRequest(validPayload(), { "x-forwarded-for": "203.0.113.50, 10.0.0.1" })
    )
    expect(res.status).toBe(201)
  })
})
