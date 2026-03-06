import type { ClusterContext } from './cluster-resolver'

export interface InterlinkResult {
  relatedPages: Array<{
    title: string
    slug: string
    url: string
    role: string
  }>
  pillarLink: { title: string; url: string } | null
  contextualLinks: Array<{ title: string; url: string; anchor: string }>
}

const EMPTY_RESULT: InterlinkResult = {
  relatedPages: [],
  pillarLink: null,
  contextualLinks: [],
}

/**
 * Compute interlinks from cluster topology.
 * Returns related pages, pillar link, and contextual link suggestions.
 */
export function computeInterlinks(
  clusterContext: ClusterContext | null,
  currentSlug: string
): InterlinkResult {
  if (!clusterContext) {
    return EMPTY_RESULT
  }

  // Related pages: siblings excluding current, sorted by role (pillar first)
  const relatedPages = clusterContext.siblings
    .filter((s) => s.slug !== currentSlug)
    .sort((a, b) => {
      if (a.role === 'pillar' && b.role !== 'pillar') return -1
      if (a.role !== 'pillar' && b.role === 'pillar') return 1
      return 0
    })
    .slice(0, 6)

  // Pillar link: only if current page is a satellite
  const pillarLink =
    clusterContext.role === 'satellite'
      ? { title: clusterContext.pillar.title, url: clusterContext.pillar.url }
      : null

  // Contextual links: up to 3 sibling pages for inline content links
  const contextualLinks = clusterContext.siblings
    .filter((s) => s.slug !== currentSlug)
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      url: s.url,
      anchor: s.title,
    }))

  return {
    relatedPages,
    pillarLink,
    contextualLinks,
  }
}
