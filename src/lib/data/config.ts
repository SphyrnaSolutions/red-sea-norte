export type FallbackMode = 'full' | 'critical' | 'emergency' | 'none'

export const FALLBACK_CONFIG = {
  mode: (process.env.FALLBACK_MODE as FallbackMode) || 'full',
  logErrors: true,
  retryAttempts: 2,
}

export function shouldUseFallback(error: unknown, contentType: string): boolean {
  const { mode } = FALLBACK_CONFIG
  if (mode === 'none') return false
  if (mode === 'emergency') return true
  if (mode === 'critical') {
    return ['homepage', 'blog'].includes(contentType)
  }
  return true // mode === 'full'
}

export function logDataError(error: unknown, context: string) {
  if (FALLBACK_CONFIG.logErrors) {
    console.error(`[Data Layer Error] ${context}:`, error)
  }
}
