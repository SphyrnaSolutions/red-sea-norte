import Link from 'next/link'
import { JsonLd } from './JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumb'
import { BASE_URL } from '@/lib/seo/metadata'

interface BreadcrumbsProps {
  items: Array<{ name: string; href: string }>
}

const CONTENT_TYPE_LABELS: Record<string, string> = {
  rutas: 'Rutas',
  blog: 'Blog',
  experiencias: 'Experiencias',
  cursos: 'Cursos',
  ofertas: 'Ofertas',
}

/**
 * Build breadcrumb items for a content page.
 * Always starts with Inicio, then content type (or cluster pillar), then current page.
 * The last item carries the page URL for schema accuracy but is rendered non-clickable.
 *
 * When clusterPillar is provided (and the current page is not the pillar itself),
 * the middle crumb becomes the pillar page instead of the content type:
 *   Inicio > [Pillar Title] > [Current Page]
 *
 * Without clusterPillar (or when clusterPillar is null), the original behavior is preserved:
 *   Inicio > Blog > [Current Page]
 */
export function buildBreadcrumbItems(
  contentType: string,
  pageTitle: string,
  pageSlug?: string,
  clusterPillar?: { title: string; url: string } | null
): Array<{ name: string; href: string }> {
  const displayName = CONTENT_TYPE_LABELS[contentType] || contentType
  const pageHref = pageSlug
    ? `/${contentType}/${pageSlug}`
    : `/${contentType}`

  const middleItem = clusterPillar
    ? { name: clusterPillar.title, href: clusterPillar.url }
    : { name: displayName, href: `/${contentType}` }

  return [
    { name: 'Inicio', href: '/' },
    middleItem,
    { name: pageTitle, href: pageHref },
  ]
}

/**
 * Visual breadcrumbs with BreadcrumbList JSON-LD schema.
 * Always renders both visual nav AND structured data together.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null
  }

  // Build schema items with absolute URLs
  const schemaItems = items
    .filter((item) => item.name)
    .map((item) => ({
      name: item.name,
      url: item.href.startsWith('http')
        ? item.href
        : `${BASE_URL}${item.href || '/'}`,
    }))

  const breadcrumbSchema = buildBreadcrumbSchema(schemaItems)

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="w-full px-[120px] py-3 max-lg:px-[48px] max-md:px-[24px]"
      >
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={item.name} className="flex items-center gap-2">
                {index > 0 && (
                  <span
                    className="text-[#4A5568]"
                    style={{ opacity: 0.5 }}
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span
                    className="font-medium"
                    style={{ color: '#0D3A5D' }}
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:underline"
                    style={{ color: '#4A5568' }}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema} />
    </>
  )
}
