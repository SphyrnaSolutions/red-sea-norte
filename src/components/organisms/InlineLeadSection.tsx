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
  successMessage: _successMessage,
  showModalCta = true,
  secondaryPrompt = "Si aun no quieres enviar el formulario, puedes abrir el modal y dejarnos una duda mas concreta.",
}: InlineLeadSectionProps) {
  const { openModal } = useModalStore()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: Connect to a real API endpoint when available
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
            <form className="space-y-5" onSubmit={handleSubmit}>
                {fields.map((field) => (
                  <div key={field.name}>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        required={field.required}
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
                        required={field.required}
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
                        required={field.required}
                        className="w-full rounded-[18px] border border-[#D7E8EF] px-5 py-4 text-[#0A2540] outline-none transition focus:border-[#00A8B5] focus:ring-4 focus:ring-[#00A8B5]/10"
                      />
                    )}
                  </div>
                ))}

                <p className="text-sm leading-7 text-[#4A5568]">{privacyText}</p>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#F57415] text-white hover:bg-[#DA630C]"
                  disabled
                  title="Proximamente"
                >
                  {submitButton} (proximamente)
                </Button>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}
