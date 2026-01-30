'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // TODO: Replace with Sentry integration
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16 bg-[var(--color-bg-sand)]">
      {/* Wave/Ocean decorative element */}
      <div className="relative mb-8">
        <div className="text-7xl animate-float">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[var(--color-ocean-deep)]"
          >
            <path
              d="M3 15C5.5 15 5.5 13 8 13C10.5 13 10.5 15 13 15C15.5 15 15.5 13 18 13C20.5 13 20.5 15 21 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 19C5.5 19 5.5 17 8 17C10.5 17 10.5 19 13 19C15.5 19 15.5 17 18 17C20.5 17 20.5 19 21 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="7"
              r="4"
              stroke="var(--color-coral-fire)"
              strokeWidth="2"
              fill="none"
            />
            <line
              x1="12"
              y1="3"
              x2="12"
              y2="1"
              stroke="var(--color-coral-fire)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Error message */}
      <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--color-text-heading)] mb-4 text-center">
        Algo salió mal
      </h2>

      <p className="text-[var(--color-text-secondary)] text-center max-w-md mb-2 text-lg">
        Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
      </p>

      {/* Error digest for debugging (only show in development) */}
      {error.digest && (
        <p className="text-[var(--color-text-muted)] text-sm mb-8">
          Código de error: {error.digest}
        </p>
      )}

      {/* Reset button */}
      <button
        onClick={() => reset()}
        className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-3 bg-[var(--color-ocean-deep)] text-white font-semibold rounded-[var(--radius-button)] shadow-md hover:bg-[var(--color-ocean-midnight)] hover:shadow-lg transition-all duration-300"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4V10H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.51 15C4.15 16.98 5.42 18.67 7.15 19.79C8.88 20.91 10.93 21.39 12.96 21.15C14.99 20.91 16.87 19.97 18.28 18.49C19.69 17.01 20.54 15.09 20.69 13.05C20.84 11.01 20.28 8.98 19.09 7.29C17.9 5.6 16.16 4.36 14.17 3.77C12.18 3.18 10.06 3.27 8.13 4.02C6.2 4.77 4.58 6.14 3.51 7.91"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Intentar de nuevo
      </button>

      {/* Back to home link */}
      <a
        href="/"
        className="mt-4 text-[var(--color-ocean-deep)] hover:text-[var(--color-coral-fire)] font-medium transition-colors duration-200 underline underline-offset-4"
      >
        Volver al inicio
      </a>
    </div>
  )
}
