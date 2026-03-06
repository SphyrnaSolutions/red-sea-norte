import Link from 'next/link'

interface ClusterNavigationProps {
  clusterId: string
  currentSlug: string
  clusterRole: 'pillar' | 'satellite'
  pillarSlug: string
}

/**
 * Cluster navigation component.
 * Shows sibling/satellite pages within the same topic cluster.
 *
 * Currently renders a placeholder shell. When the cluster resolver API
 * is fully connected, this will render dynamic navigation links.
 */
export function ClusterNavigation({
  clusterId,
  currentSlug,
  clusterRole,
  pillarSlug,
}: ClusterNavigationProps) {
  // TODO: Connect to Phase 2 cluster resolver when available
  // The resolver should return sibling pages in the same cluster
  // and the pillar page link for satellite pages.

  if (!clusterId) {
    return null
  }

  return (
    <nav
      aria-label="Navegacion del cluster"
      className="w-full px-[120px] py-[60px] max-lg:px-[48px] max-md:px-[24px] border-t border-[#D7E8EF]"
    >
      <h2
        className="mb-6"
        style={{
          color: 'var(--color-ocean-midnight)',
          fontSize: 'var(--font-size-h5)',
          fontWeight: 800,
          fontFamily: 'var(--font-sans)',
        }}
      >
        Explora esta ruta
      </h2>

      {clusterRole === 'satellite' && pillarSlug && (
        <Link
          href={`/${pillarSlug}`}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
          style={{
            backgroundColor: 'rgba(10,37,64,0.06)',
            color: 'var(--color-ocean-midnight)',
          }}
        >
          Ver guia principal
        </Link>
      )}

      {/* Placeholder for sibling pages -- populated when cluster resolver is connected */}
      {process.env.NODE_ENV === 'development' && (
        <p
          className="mt-4 text-sm"
          style={{
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Cluster: {clusterId} | Rol: {clusterRole} | Slug: {currentSlug}
        </p>
      )}
    </nav>
  )
}
