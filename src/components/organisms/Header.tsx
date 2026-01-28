"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useModalStore } from "@/lib/stores/useModalStore"

const navLinks = [
  { href: "/rutas/norte-7-dias", label: "Destinos" },
  { href: "/cursos/advanced-open-water", label: "Cursos" },
  { href: "/experiencias/pecios", label: "Experiencias" },
  { href: "/contacto", label: "Contacto" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openModal } = useModalStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 border-b-2 border-[#E5E7EB] ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className={`container-custom flex items-center justify-between ${
        isScrolled ? "py-4" : "py-6"
      }`}>
        {/* Logo */}
        <Link
          href="/"
          className={`text-[#0A2540] font-bold transition-all duration-300 hover:scale-105 tracking-tight ${
            isScrolled ? "text-3xl" : "text-4xl"
          }`}
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.01em"
          }}
        >
          RED SEA DIVING
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#4A5568] text-lg font-semibold hover:text-[#0A2540] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <button
            onClick={openModal}
            className="bg-[#FF5722] rounded-lg px-8 py-3.5 cursor-pointer hover:bg-[#F4511E] hover:shadow-[0_4px_16px_rgba(255,87,34,0.3)] hover:scale-[1.02] transition-all duration-300"
          >
            <span
              className="text-white text-lg font-bold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Reserva Ahora
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-[#0A2540]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="container-custom py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2C3E50] text-lg py-2 hover:text-[#0066CC]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <button
                onClick={openModal}
                className="w-full bg-[#FF6B35] rounded-lg px-7 py-3.5 text-center cursor-pointer"
              >
                <span className="text-white text-base font-semibold">
                  Reserva Ahora
                </span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
