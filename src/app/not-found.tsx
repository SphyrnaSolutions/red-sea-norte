import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Pagina no encontrada | Red Sea Norte',
  description: 'La pagina que buscas no existe o ha sido movida. Vuelve a la superficie con Red Sea Norte.',
}

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-ocean">
      {/* Animated bubbles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large bubble */}
        <div
          className="absolute w-16 h-16 rounded-full bg-white/5 animate-float"
          style={{ left: '10%', bottom: '20%', animationDelay: '0s', animationDuration: '4s' }}
        />
        {/* Medium bubbles */}
        <div
          className="absolute w-10 h-10 rounded-full bg-white/5 animate-float"
          style={{ left: '25%', bottom: '30%', animationDelay: '0.5s', animationDuration: '3.5s' }}
        />
        <div
          className="absolute w-12 h-12 rounded-full bg-white/5 animate-float"
          style={{ left: '70%', bottom: '15%', animationDelay: '1s', animationDuration: '4.5s' }}
        />
        <div
          className="absolute w-8 h-8 rounded-full bg-white/5 animate-float"
          style={{ left: '85%', bottom: '40%', animationDelay: '0.3s', animationDuration: '3s' }}
        />
        {/* Small bubbles */}
        <div
          className="absolute w-4 h-4 rounded-full bg-white/10 animate-float"
          style={{ left: '40%', bottom: '25%', animationDelay: '0.8s', animationDuration: '2.5s' }}
        />
        <div
          className="absolute w-6 h-6 rounded-full bg-white/5 animate-float"
          style={{ left: '55%', bottom: '35%', animationDelay: '1.2s', animationDuration: '3.2s' }}
        />
      </div>

      {/* Subtle wave overlay at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 206, 209, 0.3) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 flex flex-col items-center text-center">

        {/* Diving mask/submarine icon */}
        <div className="mb-6 animate-fadeInUp">
          <div className="text-8xl md:text-9xl" role="img" aria-label="Mascara de buceo">
            🤿
          </div>
        </div>

        {/* 404 Number */}
        <h1
          className="text-[120px] md:text-[180px] leading-none font-bold text-white/90 animate-fadeInUp delay-100"
          style={{
            fontFamily: 'var(--font-display)',
            textShadow: '0 4px 32px rgba(0, 206, 209, 0.4), 0 8px 64px rgba(0, 0, 0, 0.6)',
            letterSpacing: '-0.02em',
          }}
        >
          404
        </h1>

        {/* Title */}
        <h2
          className="text-3xl md:text-4xl font-semibold text-white mt-2 animate-fadeInUp delay-200"
          style={{
            fontFamily: 'var(--font-display-alt)',
            textShadow: '0 2px 16px rgba(0, 0, 0, 0.4)',
          }}
        >
          Pagina no encontrada
        </h2>

        {/* Description */}
        <p
          className="text-white/80 text-lg md:text-xl mt-6 max-w-lg animate-fadeInUp delay-300"
          style={{
            fontFamily: 'var(--font-sans)',
            lineHeight: '1.7',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          Parece que esta pagina se ha sumergido demasiado profundo en el Mar Rojo.
          No podemos encontrarla en nuestras aguas.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#FF5722] hover:bg-[#F4511E] text-white font-semibold text-lg rounded-lg shadow-[0_4px_24px_rgba(255,87,34,0.4)] hover:shadow-[0_8px_32px_rgba(255,87,34,0.6)] hover:scale-[1.03] transition-all duration-300 animate-fadeInUp delay-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rotate-180"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          Volver a la superficie
        </Link>

        {/* Additional helpful links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/60 text-sm animate-fadeInUp delay-500">
          <span>Tambien puedes explorar:</span>
          <Link
            href="/cursos"
            className="text-[#00CED1] hover:text-white transition-colors duration-200 underline underline-offset-2"
          >
            Cursos de buceo
          </Link>
          <span className="text-white/30">|</span>
          <Link
            href="/rutas"
            className="text-[#00CED1] hover:text-white transition-colors duration-200 underline underline-offset-2"
          >
            Rutas
          </Link>
          <span className="text-white/30">|</span>
          <Link
            href="/ofertas"
            className="text-[#00CED1] hover:text-white transition-colors duration-200 underline underline-offset-2"
          >
            Ofertas
          </Link>
        </div>
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat'
        }}
      />
    </section>
  )
}
