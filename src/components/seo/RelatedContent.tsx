import Link from 'next/link'
import type { InterlinkResult } from '@/lib/seo/interlink-engine'

interface RelatedContentProps {
  interlinks: InterlinkResult
}

/**
 * Related content block derived from cluster topology.
 * Renders pillar link prominently + related page cards in a responsive grid.
 */
export function RelatedContent({ interlinks }: RelatedContentProps) {
  const hasContent =
    interlinks.relatedPages.length > 0 || interlinks.pillarLink !== null

  if (!hasContent) {
    return null
  }

  return (
    <section className="w-full bg-[#F7FBFD] px-[120px] py-[90px] max-lg:px-[48px] max-md:px-[24px] max-md:py-[56px]">
      <div className="mb-10 max-w-[760px]">
        <span
          className="text-[11px] font-bold uppercase"
          style={{ color: '#FF6B35', letterSpacing: '4px' }}
        >
          TE PUEDE INTERESAR
        </span>
        <h2
          className="mt-4 max-md:text-3xl"
          style={{
            color: '#0D3A5D',
            fontSize: '48px',
            fontWeight: 800,
            lineHeight: 1.08,
            fontFamily: 'var(--font-sans)',
          }}
        >
          Contenido relacionado
        </h2>
      </div>

      {/* Pillar link - prominent if current page is satellite */}
      {interlinks.pillarLink && (
        <Link
          href={interlinks.pillarLink.url}
          className="mb-8 block rounded-[22px] border-2 border-[#0D3A5D] bg-white p-7 shadow-[0_12px_32px_rgba(10,37,64,0.08)] transition-transform hover:-translate-y-1"
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[3px]"
            style={{ color: '#FF6B35' }}
          >
            PILAR DEL CLUSTER
          </span>
          <h3
            className="mt-3"
            style={{
              color: '#0D3A5D',
              fontSize: '28px',
              fontWeight: 800,
              lineHeight: 1.2,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {interlinks.pillarLink.title}
          </h3>
        </Link>
      )}

      {/* Related pages grid */}
      {interlinks.relatedPages.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interlinks.relatedPages.map((page) => (
            <Link
              key={page.slug}
              href={page.url}
              className="group rounded-[22px] border border-[#D7E8EF] bg-[#FBFDFF] p-7 shadow-[0_12px_32px_rgba(10,37,64,0.06)] transition-transform hover:-translate-y-1"
            >
              <span
                className="inline-flex rounded-full bg-[#EAF7FA] px-3 py-1 text-[10px] font-bold uppercase tracking-[2px]"
                style={{ color: '#0C8DA1' }}
              >
                {page.role === 'pillar' ? 'Pilar' : 'Relacionado'}
              </span>
              <h3
                className="mt-4 group-hover:text-[#0C8DA1]"
                style={{
                  color: '#0D3A5D',
                  fontSize: '22px',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {page.title}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
