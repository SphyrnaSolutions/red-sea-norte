import Image from 'next/image'
import Link from 'next/link'
import type { RelatedPage } from '@/lib/templates/types'

interface InterlinksSectionProps {
  relatedPages: RelatedPage[]
  title?: string
}

/**
 * Related content section derived from the cluster interlink engine.
 * Renders a responsive grid of content cards linking to related pages.
 * Returns null if no related pages are provided.
 */
export function InterlinksSection({
  relatedPages,
  title = 'Contenido Relacionado',
}: InterlinksSectionProps) {
  if (relatedPages.length === 0) {
    return null
  }

  return (
    <section
      className="w-full px-[120px] py-[90px] max-lg:px-[48px] max-md:px-[24px] max-md:py-[56px]"
      style={{ backgroundColor: 'rgba(10,37,64,0.03)' }}
    >
      <h2
        className="mb-10 max-md:text-3xl"
        style={{
          color: 'var(--color-ocean-midnight)',
          fontSize: 'var(--font-size-h2)',
          fontWeight: 800,
          lineHeight: 1.08,
          fontFamily: 'var(--font-sans)',
        }}
      >
        {title}
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {relatedPages.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.contentType}/${page.slug}`}
            className="group flex flex-col rounded-[22px] border border-[#D7E8EF] bg-white overflow-hidden shadow-[0_12px_32px_rgba(10,37,64,0.06)] transition-transform hover:-translate-y-1"
          >
            {/* Thumbnail */}
            <div className="relative h-[200px] max-md:h-[160px]">
              <Image
                src={page.heroImage}
                alt={page.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3
                className="group-hover:text-[#0C8DA1] transition-colors"
                style={{
                  color: 'var(--color-ocean-midnight)',
                  fontSize: 'var(--font-size-body-lg)',
                  fontWeight: 800,
                  lineHeight: 1.3,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {page.title}
              </h3>
              <p
                className="mt-2 line-clamp-2"
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--font-size-body-sm)',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {page.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
