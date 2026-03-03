'use client'

import { useState, useEffect } from 'react'
import { useModalStore } from '@/lib/stores/useModalStore'

export function MobileCTABar() {
  const { isOpen, openModal } = useModalStore()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible || isOpen) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3">
        <button
          onClick={openModal}
          className="w-full h-12 bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold text-base rounded-xl transition-colors active:scale-[0.98]"
        >
          Reserva Ahora
        </button>
      </div>
    </div>
  )
}
