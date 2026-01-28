"use client"

import { useState, useEffect } from "react"
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
}

export function LeadFormModal({
  title,
  subtitle,
  fields,
  submitButton,
  privacyText,
  successMessage,
}: LeadFormModalProps) {
  const { isOpen, closeModal } = useModalStore()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({})
      setShowSuccess(false)
    }
  }, [isOpen])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setShowSuccess(true)

    // Close modal after 2 seconds
    setTimeout(() => {
      closeModal()
    }, 2000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
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
            onClick={closeModal}
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
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Badge */}
              <div className="inline-block bg-[#FF5722]/10 text-[#FF5722] px-4 py-2 rounded-full text-sm font-bold mb-6">
                🔥 Plazas Limitadas
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
                  <div className="text-5xl mb-4">✓</div>
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
                          required={field.required}
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
                          required={field.required}
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
                          required={field.required}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/20 outline-none transition-all text-[#2C3E50]"
                        />
                      )}
                    </div>
                  ))}

                  {/* Privacy Text */}
                  <p className="text-sm text-gray-600">{privacyText}</p>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF5722] text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-[#F4511E] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : submitButton}
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
