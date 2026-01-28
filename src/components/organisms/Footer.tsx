import Link from "next/link"
import { Logo } from "@/components/atoms/Logo"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  explora: [
    { label: "Ruta Norte 7 Días", href: "/rutas/norte-7-dias" },
    { label: "Experiencia Pecios", href: "/experiencias/pecios" },
    { label: "Liveaboards", href: "/liveaboards" },
    { label: "Ofertas Especiales", href: "/ofertas/early-bird" },
  ],
  cursos: [
    { label: "Open Water Diver", href: "/cursos/open-water" },
    { label: "Advanced Open Water", href: "/cursos/advanced-open-water" },
    { label: "Rescue Diver", href: "/cursos/rescue-diver" },
    { label: "Especialidades", href: "/cursos/especialidades" },
  ],
  compania: [
    { label: "Sobre Nosotros", href: "/sobre-nosotros" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" },
    { label: "FAQs", href: "/faqs" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
]

const contactInfo = [
  { icon: Mail, text: "info@redseadiving.com" },
  { icon: Phone, text: "+20 123 456 7890" },
  { icon: MapPin, text: "Hurghada, Mar Rojo, Egipto" },
]

export function Footer() {
  return (
    <footer className="bg-[#0A2540] text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo variant="white" />
            <p className="mt-6 text-white/80 text-sm leading-relaxed max-w-md">
              Centro de buceo certificado SSI en el Mar Rojo. Ofrecemos cursos de todos los
              niveles y las mejores experiencias de buceo en pecios y arrecifes.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-center gap-3 text-sm text-white/70">
                    <Icon size={16} />
                    <span>{item.text}</span>
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-orange transition-colors duration-300"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Explora Column */}
          <div>
            <h4 className="font-bold text-lg mb-6">Explora</h4>
            <ul className="space-y-3">
              {footerLinks.explora.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary-orange transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cursos Column */}
          <div>
            <h4 className="font-bold text-lg mb-6">Cursos</h4>
            <ul className="space-y-3">
              {footerLinks.cursos.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary-orange transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compañía Column */}
          <div>
            <h4 className="font-bold text-lg mb-6">Compañía</h4>
            <ul className="space-y-3">
              {footerLinks.compania.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary-orange transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© 2026 Red Sea Diving. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <Link href="/privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
