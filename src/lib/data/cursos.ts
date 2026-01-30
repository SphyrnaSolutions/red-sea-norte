import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getAllCursos, getCurso } from '@/lib/wagtail/fetchers'
import { getAllCursos as getAllMockCursos, getCurso as getMockCurso } from '@/lib/mock-data/cursos'
import { shouldUseFallback, logDataError } from './config'

async function fetchAllCursosInternal() {
  try {
    const data = await getAllCursos()
    if (!data || data.length === 0) throw new Error('No cursos received from API')
    return data
  } catch (error) {
    logDataError(error, 'fetchAllCursos')
    if (shouldUseFallback(error, 'cursos')) {
      console.warn('[Data Layer] Using mock data fallback for cursos')
      return getAllMockCursos()
    }
    throw error
  }
}

async function fetchCursoInternal(slug: string) {
  try {
    const data = await getCurso(slug)
    if (!data) {
      const mockCurso = getMockCurso(slug)
      if (mockCurso) return mockCurso
      // Return null instead of throwing - let the page handle notFound()
      return null
    }
    return data
  } catch (error) {
    logDataError(error, `fetchCurso(${slug})`)
    if (shouldUseFallback(error, 'cursos')) {
      const mockCurso = getMockCurso(slug)
      if (mockCurso) {
        console.warn(`[Data Layer] Using mock data fallback for curso: ${slug}`)
        return mockCurso
      }
    }
    // Return null on error instead of throwing
    return null
  }
}

export async function getAllCursosData() {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchAllCursosInternal()

  const getCachedCursos = unstable_cache(
    fetchAllCursosInternal,
    ['cursos'],
    { tags: ['cursos', 'cursos-list'], revalidate: 3600 }
  )
  return getCachedCursos()
}

export async function getCursoData(slug: string) {
  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) return fetchCursoInternal(slug)

  const getCachedCurso = unstable_cache(
    () => fetchCursoInternal(slug),
    ['curso', slug],
    { tags: ['cursos', `curso-${slug}`], revalidate: 3600 }
  )
  return getCachedCurso()
}

/**
 * Get all curso slugs for generateStaticParams
 * This function does NOT use draftMode since it runs at build time
 */
export async function getAllCursosSlugsData() {
  return fetchAllCursosInternal()
}
