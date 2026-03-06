import type { WagtailPageWithSEO } from '@/lib/wagtail/types'
import type { WagtailPage, WagtailAPIResponse, FetchConfig } from '@/lib/wagtail/client'
import { wagtailFetch } from '@/lib/wagtail/client'

const BATCH_SIZE = 20
const MAX_ITERATIONS = 50

export interface ClusterContext {
  clusterId: string
  role: 'pillar' | 'satellite'
  pillar: { slug: string; title: string; url: string }
  siblings: Array<{ slug: string; title: string; url: string; role: string }>
}

/**
 * Fetch all pages with cluster fields from Wagtail API.
 * Uses paginated wagtailFetch across all content types.
 */
async function getClusterPages(
  config: FetchConfig = {}
): Promise<WagtailPageWithSEO[]> {
  const fields = 'title,cluster_id,cluster_role,pillar_slug,schema_type,primary_keyword'
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
        config
      )

      allItems = [...allItems, ...response.items]

      if (response.items.length === 0 || allItems.length >= response.meta.total_count) {
        break
      }
      offset += BATCH_SIZE
    }

    return allItems as WagtailPageWithSEO[]
  } catch {
    return []
  }
}

/**
 * Derive the URL path for a page based on its meta.type and slug.
 */
function buildPageUrl(page: WagtailPageWithSEO): string {
  const typeMap: Record<string, string> = {
    'rutas.RutaPage': 'rutas',
    'blog.BlogPostPage': 'blog',
    'experiencias.ExperienciaPage': 'experiencias',
    'cursos.CursoPage': 'cursos',
    'ofertas.OfertaPage': 'ofertas',
    'home.HomePage': '',
  }

  const contentType = typeMap[page.meta.type] ?? ''
  return contentType ? `/${contentType}/${page.meta.slug}` : '/'
}

/**
 * Resolve the cluster context for a page.
 * Returns null if the page has no cluster_id or if the cluster is invalid.
 */
export async function resolveCluster(
  page: WagtailPageWithSEO
): Promise<ClusterContext | null> {
  if (!page.cluster_id) {
    return null
  }

  try {
    const allPages = await getClusterPages({
      tags: ['cluster', page.cluster_id],
    })

    const clusterPages = allPages.filter(
      (p) => p.cluster_id === page.cluster_id
    )

    if (clusterPages.length === 0) {
      return null
    }

    const pillarPage = clusterPages.find((p) => p.cluster_role === 'pillar')

    // If no pillar exists and current page is not a pillar, cluster is invalid
    if (!pillarPage && page.cluster_role !== 'pillar') {
      return null
    }

    const effectivePillar = pillarPage || page
    const pillar = {
      slug: effectivePillar.meta.slug,
      title: effectivePillar.title,
      url: buildPageUrl(effectivePillar as WagtailPageWithSEO),
    }

    const siblings = clusterPages
      .filter((p) => p.meta.slug !== page.meta.slug)
      .map((p) => ({
        slug: p.meta.slug,
        title: p.title,
        url: buildPageUrl(p as WagtailPageWithSEO),
        role: (p.cluster_role as string) || 'satellite',
      }))

    return {
      clusterId: page.cluster_id,
      role: (page.cluster_role as 'pillar' | 'satellite') || 'satellite',
      pillar,
      siblings,
    }
  } catch {
    return null
  }
}
