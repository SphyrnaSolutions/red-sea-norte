import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getHomepage } from '@/lib/wagtail/fetchers'
import { homepageData as mockData } from '@/lib/mock-data/homepage'
import { shouldUseFallback, logDataError } from './config'

async function fetchHomePageInternal() {
  try {
    const data = await getHomepage()
    if (!data) throw new Error('No homepage data received from API')
    return data
  } catch (error) {
    logDataError(error, 'fetchHomePage')
    if (shouldUseFallback(error, 'homepage')) {
      console.warn('[Data Layer] Using mock data fallback for homepage')
      return mockData
    }
    throw error
  }
}

export async function getHomePageData() {
  const { isEnabled: isDraft } = await draftMode()

  if (isDraft) {
    return fetchHomePageInternal()
  }

  const getCachedHomePage = unstable_cache(
    fetchHomePageInternal,
    ['homepage'],
    {
      tags: ['homepage'],
      revalidate: 600,
    }
  )

  return getCachedHomePage()
}
