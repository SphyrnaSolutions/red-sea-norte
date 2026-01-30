export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[var(--color-bg-sand)]">
      {/* Diving bubbles animation container */}
      <div className="relative w-24 h-24 mb-6">
        {/* Central spinner - diving mask style */}
        <div
          className="absolute inset-0 rounded-full border-4 border-[var(--color-ocean-deep)]/20 border-t-[var(--color-ocean-deep)] animate-spin"
          style={{ animationDuration: '1s' }}
        />

        {/* Inner ring */}
        <div
          className="absolute inset-3 rounded-full border-4 border-[var(--color-cyan-light)]/20 border-t-[var(--color-cyan-light)] animate-spin"
          style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
        />

        {/* Center dot - diver icon placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[var(--color-coral-fire)] animate-pulse" />
        </div>

        {/* Floating bubbles */}
        <div
          className="absolute -top-2 left-1/4 w-2 h-2 rounded-full bg-[var(--color-cyan-light)]/60 animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute -top-4 right-1/4 w-1.5 h-1.5 rounded-full bg-[var(--color-cyan-light)]/40 animate-float"
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className="absolute -top-1 right-1/3 w-1 h-1 rounded-full bg-[var(--color-cyan-light)]/50 animate-float"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Loading text */}
      <p
        className="text-[var(--color-text-secondary)] text-lg font-medium animate-pulse"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        Cargando...
      </p>

      {/* Subtle subtext */}
      <p
        className="mt-2 text-[var(--color-text-muted)] text-sm"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        Preparando tu inmersion
      </p>
    </div>
  )
}
