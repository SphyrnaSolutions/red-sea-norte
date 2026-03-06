import { NextRequest, NextResponse } from "next/server"
import { validateLeadData } from "@/lib/validation/lead"
import { createLead, searchOrCreateUtmSource } from "@/lib/odoo/client"
import { rateLimit } from "@/lib/rate-limit"
import type { LeadCreateData } from "@/lib/odoo/types"

export const dynamic = "force-dynamic"

function extractClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0].trim()
    if (first) return first
  }

  const realIp = request.headers.get("x-real-ip")
  if (realIp) return realIp.trim()

  return "unknown"
}

function buildDescription(data: {
  certification?: string
  preferredMonth?: string
}): string {
  const timestamp = new Date().toISOString()

  return [
    `Certificacion: ${data.certification ?? "No especificada"}`,
    `Mes preferido: ${data.preferredMonth ?? "No especificado"}`,
    "",
    "--- Consentimiento WhatsApp ---",
    "Acepto recibir comunicaciones por WhatsApp: Si",
    `Fecha de consentimiento: ${timestamp}`,
  ].join("\n")
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = extractClientIp(request)

  const rateLimitResult = rateLimit(ip)
  if (!rateLimitResult.allowed) {
    const retryAfter = Math.ceil(
      (rateLimitResult.resetAt - Date.now()) / 1000
    )
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intente de nuevo en un minuto." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.max(retryAfter, 1)) },
      }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Cuerpo de la solicitud no es JSON valido" },
      { status: 400 }
    )
  }

  const validation = validateLeadData(body)
  if (!validation.success) {
    return NextResponse.json(
      { error: "Datos invalidos", fields: validation.errors },
      { status: 400 }
    )
  }

  const { data } = validation

  try {
    const sourceId = await searchOrCreateUtmSource("Web buceoenelmarrojo.com")

    const leadData: LeadCreateData = {
      name: `Lead Web - ${data.name}`,
      contact_name: data.name,
      email_from: data.email,
      phone: data.phone,
      description: buildDescription({
        certification: data.certification,
        preferredMonth: data.preferredMonth,
      }),
      source_id: sourceId,
      website: "https://buceoenelmarrojo.com",
    }

    await createLead(leadData)

    return NextResponse.json(
      { success: true, message: "Solicitud recibida correctamente" },
      { status: 201 }
    )
  } catch (error) {
    console.error(
      "[API Lead]",
      error instanceof Error ? error.message : String(error)
    )
    return NextResponse.json(
      { error: "Error al procesar la solicitud. Intente mas tarde." },
      { status: 500 }
    )
  }
}
