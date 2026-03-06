"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useModalStore } from "@/lib/stores/useModalStore"

interface FormField {
  name: string
  type: "text" | "email" | "tel" | "select" | "textarea"
  placeholder: string
  required: boolean
  options?: Array<{ value: string; label: string }>
}

interface LeadFormModalProps {
  title: string
  subtitle: string
  fields: FormField[]
  submitButton: string
  privacyText: string
  successMessage: string
  consentText?: string
  privacyLinkText?: string
  privacyLinkHref?: string
}

export function LeadFormModal({
  title,
  subtitle,
  fields,
  submitButton,
  privacyText,
  successMessage,
  consentText,
  privacyLinkText,
  privacyLinkHref,
}: LeadFormModalProps) {
  const { isOpen, closeModal } = useModalStore()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [whatsappConsent, setWhatsappConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    setFormData({})
    setWhatsappConsent(false)
    setErrors({})
    setSubmitError(null)
    setShowSuccess(false)
    setIsSubmitting(false)
    closeModal()
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
          message: formData.message || undefined,
          whatsappConsent: whatsappConsent,
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || "Error al enviar el formulario")
      }
      setShowSuccess(true)

      // Close modal after 3 seconds
      closeTimeoutRef.current = setTimeout(() => {
        handleClose()
      }, 3000)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Error inesperado. Intentalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, closeModal])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-white rounded-2xl p-8 md:p-12 shadow-2xl pointer-events-auto relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Badge */}
              <div className="inline-block bg-[#FF5722]/10 text-[#FF5722] px-4 py-2 rounded-full text-sm font-bold mb-6">
                Plazas Limitadas
              </div>

              {/* Title */}
              <h2
                className="text-4xl md:text-[42px] font-bold text-[#0A2540] mb-4 leading-tight pr-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h2>

              {/* Subtitle */}
              <p className="text-lg text-[#4A5568] mb-8">{subtitle}</p>

              {/* Success Message */}
              {showSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center"
                >
                  <div className="text-5xl mb-4">&#10003;</div>
                  <p className="text-xl font-bold text-green-800 mb-2">
                    {successMessage}
                  </p>
                  <p className="text-green-700">
                    Nos pondremos en contacto contigo pronto.
                  </p>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {fields.map((field) => (
                    <div key={field.name}>
                      {field.type === "select" ? (
                        <select
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/20 outline-none transition-all text-[#2C3E50] bg-white"
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
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/20 outline-none transition-all text-[#2C3E50] resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/20 outline-none transition-all text-[#2C3E50]"
                        />
                      )}
                      {errors[field.name] && (
                        <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                      )}
                    </div>
                  ))}

                  {/* WhatsApp Consent Checkbox */}
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
                        <span className="text-sm leading-6 text-gray-600">
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

                  {/* Privacy Text (legacy fallback) */}
                  {privacyText && (
                    <p className="text-sm text-gray-600">{privacyText}</p>
                  )}

                  {/* Submit Error */}
                  {submitError && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF5722] text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-[#F4511E] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Enviando...
                      </span>
                    ) : (
                      submitButton
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
