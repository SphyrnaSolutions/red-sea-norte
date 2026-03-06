import type { WagtailPage, WagtailAPIResponse } from '@/lib/wagtail/client'

const WAGTAIL_API_URL =
  process.env.NEXT_PUBLIC_WAGTAIL_API_URL || 'http://localhost:8000/api/v2'
const SITE_HOSTNAME =
  process.env.NEXT_PUBLIC_SITE_HOSTNAME || 'localhost'

export interface KeywordMapEntry {
  keyword: string
  slug: string
  title: string
  url: string
}

/**
 * Fetch all pages with primary_keyword from Wagtail API.
 * Returns a keyword-to-URL map for cannibalization detection.
 */
export async function getKeywordMap(): Promise<KeywordMapEntry[]> {
  const url = new URL(`${WAGTAIL_API_URL}/pages/`)
  url.searchParams.set('site', SITE_HOSTNAME)
  url.searchParams.set('fields', 'title,primary_keyword,cluster_id')
  url.searchParams.set('limit', '100')

  try {
    const response = await fetch(url.toString(), {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000),
      next: {
        revalidate: 3600,
        tags: ['keyword-map'],
      },
    })

    if (!response.ok) {
      return []
    }

    const data: WagtailAPIResponse<WagtailPage> = await response.json()

    return data.items
      .filter(
        (page) =>
          typeof page.primary_keyword === 'string' &&
          page.primary_keyword.trim() !== ''
      )
      .map((page) => ({
        keyword: page.primary_keyword as string,
        slug: page.meta.slug,
        title: page.title,
        url: `/${page.meta.slug}`,
      }))
  } catch {
    return []
  }
}

/**
 * Check if a keyword is already claimed by another page.
 * Returns the conflicting entry or null.
 * Primary enforcement is the database unique constraint (Plan 01).
 * This is a supplementary build-time/dev-time check.
 */
export async function checkKeywordConflict(
  keyword: string,
  excludeSlug?: string
): Promise<KeywordMapEntry | null> {
  const map = await getKeywordMap()
  const normalizedKeyword = keyword.toLowerCase().trim()

  const conflict = map.find(
    (entry) =>
      entry.keyword.toLowerCase().trim() === normalizedKeyword &&
      entry.slug !== excludeSlug
  )

  return conflict || null
}
