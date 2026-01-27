import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/organisms/Header"
import { Footer } from "@/components/organisms/Footer"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Red Sea Diving - Centro de Buceo Certificado SSI en el Mar Rojo",
  description: "Cursos de buceo SSI, rutas por el Mar Rojo Norte y experiencias únicas de buceo en pecios. Certificación profesional con los mejores instructores.",
  keywords: ["buceo", "Mar Rojo", "SSI", "cursos de buceo", "pecios", "Egipto", "diving"],
  authors: [{ name: "Red Sea Diving" }],
  openGraph: {
    title: "Red Sea Diving - Centro de Buceo Certificado SSI",
    description: "Cursos de buceo SSI y rutas por el Mar Rojo",
    type: "website",
    locale: "es_ES",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
