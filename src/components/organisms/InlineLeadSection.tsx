"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useModalStore } from "@/stores/useModalStore"

interface FormField {
  name: string
  type: "text" | "email" | "tel" | "select" | "textarea"
  placeholder: string
  required: boolean
  options?: Array<{ value: string; label: string }>
}

interface InlineLeadSectionProps {
  sectionId: string
  eyebrow: string
  title: string
  subtitle: string
  highlights: string[]
  fields: FormField[]
  submitButton: string
  privacyText: string
  successMessage: string
  consentText?: string
  privacyLinkText?: string
  privacyLinkHref?: string
  showModalCta?: boolean
  secondaryPrompt?: string
}

export function InlineLeadSection({
  sectionId,
  eyebrow,
  title,
  subtitle,
  highlights,
  fields,
  submitButton,
  privacyText,
  successMessage,
  consentText,
  privacyLinkText,
  privacyLinkHref,
  showModalCta = true,
  secondaryPrompt = "Si aun no quieres enviar el formulario, puedes abrir el modal y dejarnos una duda mas concreta.",
}: InlineLeadSectionProps) {
  const { openModal } = useModalStore()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [whatsappConsent, setWhatsappConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = "El nombre es obligatorio"
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email no valido"
    }

    if (!formData.phone || !/^\+?\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Telefono no valido"
    }

    if (!whatsappConsent) {
      newErrors.whatsappConsent = "Debes aceptar el consentimiento de WhatsApp"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          certification: formData.certification || undefined,
          preferredMonth: formData.preferredMonth || undefined,
          whatsappConsent: whatsappConsent,
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || "Error al enviar el formulario")
      }
      setShowSuccess(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Error inesperado. Intentalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id={sectionId} className="w-full bg-[#F7FBFD] py-20 md:py-28">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="rounded-[30px] bg-[#071E2D] p-8 text-white md:p-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#5CE1E6]">
              {eyebrow}
            </p>
            <h2
              className="mb-5 text-4xl font-bold leading-tight md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h2>
            <p className="mb-8 text-lg leading-8 text-white/78">{subtitle}</p>

            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-white/88">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#F57415]" />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>

            {showModalCta && (
              <div className="mt-10 rounded-[24px] border border-white/10 bg-white/5 p-6">
                <p className="text-sm leading-7 text-white/70">{secondaryPrompt}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="mt-5 w-full border-white/30 bg-transparent text-white hover:bg-white hover:text-[#071E2D]"
                  onClick={openModal}
                >
                  Abrir formulario ampliado
                </Button>
              </div>
            )}
          </div>

          <div className="rounded-[30px] bg-white p-8 shadow-[0_24px_80px_rgba(10,37,64,0.12)] md:p-10">
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <span className="text-3xl text-green-600">&#10003;</span>
                </div>
                <p className="text-xl font-bold text-green-800 mb-2">{successMessage}</p>
                <p className="text-green-700">Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {fields.map((field) => (
                  <div key={field.name}>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full rounded-[18px] border border-[#D7E8EF] px-5 py-4 text-[#0A2540] outline-none transition focus:border-[#00A8B5] focus:ring-4 focus:ring-[#00A8B5]/10"
                      >
                        <option value="" disabled>
                          {field.placeholder}
                        </option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full rounded-[18px] border border-[#D7E8EF] px-5 py-4 text-[#0A2540] outline-none transition focus:border-[#00A8B5] focus:ring-4 focus:ring-[#00A8B5]/10"
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full rounded-[18px] border border-[#D7E8EF] px-5 py-4 text-[#0A2540] outline-none transition focus:border-[#00A8B5] focus:ring-4 focus:ring-[#00A8B5]/10"
                      />
                    )}
                    {errors[field.name] && (
                      <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                ))}

                {consentText && (
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={whatsappConsent}
                        onChange={(e) => {
                          setWhatsappConsent(e.target.checked)
                          if (errors.whatsappConsent) {
                            setErrors((prev) => {
                              const next = { ...prev }
                              delete next.whatsappConsent
                              return next
                            })
                          }
                        }}
                        className="mt-1 h-5 w-5 rounded border-gray-300 accent-current shrink-0"
                      />
                      <span className="text-sm leading-6 text-[#4A5568]">
                        {consentText}{" "}
                        {privacyLinkHref && privacyLinkText && (
                          <a
                            href={privacyLinkHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:no-underline"
                          >
                            {privacyLinkText}
                          </a>
                        )}
                      </span>
                    </label>
                    {errors.whatsappConsent && (
                      <p className="text-red-500 text-xs mt-1">{errors.whatsappConsent}</p>
                    )}
                  </div>
                )}

                {privacyText && (
                  <p className="text-sm leading-7 text-[#4A5568]">{privacyText}</p>
                )}

                {submitError && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                    {submitError}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#F57415] text-white hover:bg-[#DA630C]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Enviando...
                    </span>
                  ) : (
                    submitButton
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
