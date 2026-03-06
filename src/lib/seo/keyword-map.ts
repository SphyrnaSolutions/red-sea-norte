import type { WagtailPage, WagtailAPIResponse } from '@/lib/wagtail/client'
import { wagtailFetch } from '@/lib/wagtail/client'

const BATCH_SIZE = 20
const MAX_ITERATIONS = 50

export interface KeywordMapEntry {
  keyword: string
  slug: string
  title: string
  url: string
}

/**
 * Fetch all pages with primary_keyword from Wagtail API.
 * Returns a keyword-to-URL map for cannibalization detection.
 * Uses paginated wagtailFetch to avoid hard limits.
 */
export async function getKeywordMap(): Promise<KeywordMapEntry[]> {
  const fields = 'title,primary_keyword,cluster_id'
  let allItems: WagtailPage[] = []
  let offset = 0

  try {
    for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
      const response = await wagtailFetch<WagtailAPIResponse<WagtailPage>>(
        '/pages/',
        {
          fields,
          limit: String(BATCH_SIZE),
          offset: String(offset),
        },
        {
          revalidate: 3600,
          tags: ['keyword-map'],
        }
      )

      allItems = [...allItems, ...response.items]

      if (response.items.length === 0 || allItems.length >= response.meta.total_count) {
        break
      }
      offset += BATCH_SIZE
    }

    return allItems
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
