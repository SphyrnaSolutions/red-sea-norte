"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/rutas/norte-7-dias", label: "Destinos" },
  { href: "/cursos/advanced-open-water", label: "Cursos" },
  { href: "/experiencias/pecios", label: "Experiencias" },
  { href: "/contacto", label: "Contacto" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="container-custom py-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[#0066CC] text-2xl font-bold transition-transform duration-300 hover:scale-105"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Red Sea Diving
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#2C3E50] text-base font-medium hover:text-[#0066CC] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <div className="bg-[#FF6B35] rounded-lg px-7 py-3.5 cursor-pointer hover:bg-[#F57415] hover:shadow-lg hover:scale-105 transition-all duration-300">
            <span className="text-white text-base font-semibold">
              Reserva Ahora
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-[#2C3E50]"
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
              <div className="bg-[#FF6B35] rounded-lg px-7 py-3.5 text-center cursor-pointer">
                <span className="text-white text-base font-semibold">
                  Reserva Ahora
                </span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
