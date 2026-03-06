import { z } from "zod"

const CERTIFICATIONS = [
  "No certificado",
  "Open Water",
  "Advanced",
  "Rescue",
  "Divemaster",
  "Instructor",
] as const

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "El nombre debe tener entre 2 y 100 caracteres" })
    .max(100, { message: "El nombre debe tener entre 2 y 100 caracteres" }),
  email: z
    .string()
    .email({ message: "Email no valido" }),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, {
      message:
        "Telefono no valido (7-20 digitos, puede incluir +, espacios, guiones)",
    }),
  certification: z
    .enum(CERTIFICATIONS, {
      message: "Certificacion no valida",
    })
    .optional(),
  preferredMonth: z
    .enum(MONTHS, {
      message: "Mes no valido",
    })
    .optional(),
  whatsappConsent: z
    .literal(true, {
      message: "Debe aceptar recibir comunicaciones por WhatsApp",
    }),
})

export type LeadFormData = z.infer<typeof leadSchema>

type ValidationSuccess = {
  success: true
  data: LeadFormData
}

type ValidationError = {
  success: false
  errors: Record<string, string>
}

export function validateLeadData(
  data: unknown
): ValidationSuccess | ValidationError {
  const result = leadSchema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (typeof field === "string" && !(field in errors)) {
      errors[field] = issue.message
    }
  }

  return { success: false, errors }
}
