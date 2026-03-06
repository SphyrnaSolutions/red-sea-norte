export type FallbackMode = 'full' | 'critical' | 'emergency' | 'none'

function getDefaultFallbackMode(): FallbackMode {
  if (process.env.FALLBACK_MODE) {
    return process.env.FALLBACK_MODE as FallbackMode
  }
  return process.env.NODE_ENV === 'production' ? 'none' : 'full'
}

export const FALLBACK_CONFIG = {
  mode: getDefaultFallbackMode(),
  logErrors: true,
  retryAttempts: 2,
}

if (process.env.NODE_ENV === 'development') {
  console.log('[Config] Fallback mode:', FALLBACK_CONFIG.mode)
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
