import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs, buildBreadcrumbItems } from '@/components/seo/Breadcrumbs'
import { InlineLeadSection } from '@/components/organisms/InlineLeadSection'
import { ArticleHero } from './ArticleHero'
import { ArticleBody } from './ArticleBody'
import { InterlinksSection } from './InterlinksSection'
import { ClusterNavigation } from './ClusterNavigation'
import { TableOfContents } from './TableOfContents'
import type { SEOArticlePageData } from '@/lib/templates/types'
import { BASE_URL } from '@/lib/seo/metadata'

/**
 * Default lead capture configuration for articles.
 * Each article gets a contextual CTA at the bottom.
 */
const DEFAULT_LEAD_CONFIG = {
  sectionId: 'article-lead',
  eyebrow: 'PLANIFICA TU INMERSION',
  title: 'Reserva tu Safari de Buceo',
  subtitle:
    'Cuentanos tu experiencia y te ayudamos a elegir la ruta perfecta para ti.',
  highlights: [
    'Respuesta en menos de 24h',
    'Itinerarios personalizados',
    'Precio directo sin intermediarios',
  ],
  fields: [
    {
      name: 'nombre',
      type: 'text' as const,
      placeholder: 'Tu nombre',
      required: true,
    },
    {
      name: 'email',
      type: 'email' as const,
      placeholder: 'Tu email',
      required: true,
    },
    {
      name: 'mensaje',
      type: 'textarea' as const,
      placeholder: 'Cuentanos sobre tu experiencia de buceo y que buscas...',
      required: false,
    },
  ],
  submitButton: 'Solicitar informacion',
  privacyText:
    'Tus datos seran tratados para responder a tu consulta. Puedes ejercer tus derechos en cualquier momento.',
  successMessage: 'Recibido. Te contactamos pronto.',
}

/**
 * Build a basic Article JSON-LD schema from page data.
 * When Phase 2's schema-dts generator is fully connected,
 * this can be replaced with the typed generator.
 */
function buildArticleJsonLd(page: SEOArticlePageData) {
  return {
    '@context': 'https://schema.org',
    '@type': page.schemaType || 'Article',
    headline: page.title,
    description: page.metaDescription || page.excerpt,
    image: page.heroImage?.startsWith('http')
      ? page.heroImage
      : `${BASE_URL}${page.heroImage}`,
    ...(page.publishedAt ? { datePublished: page.publishedAt } : {}),
    ...(page.updatedAt ? { dateModified: page.updatedAt } : {}),
    author: page.author
      ? { '@type': 'Person', name: page.author.name }
      : { '@type': 'Organization', name: 'Red Sea Norte' },
    publisher: {
      '@type': 'Organization',
      name: 'Red Sea Norte',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': page.canonicalUrl || `${BASE_URL}/${page.contentType}/${page.slug}`,
    },
  }
}

/**
 * Reusable SEO article template.
 *
 * Any Wagtail content page that provides SEOArticlePageData can render
 * through this template with zero custom frontend code.
 *
 * Composition order:
 * 1. JSON-LD Schema
 * 2. Breadcrumbs
 * 3. ArticleHero (H1 title)
 * 4. Two-column layout: TableOfContents (sticky left) + ArticleBody (main right)
 * 5. InterlinksSection
 * 6. ClusterNavigation
 * 7. Lead capture CTA
 */
export function SEOArticleTemplate({ page }: { page: SEOArticlePageData }) {
  const jsonLd = buildArticleJsonLd(page)

  return (
    <article className="pt-20">
      <JsonLd data={jsonLd} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={buildBreadcrumbItems(page.contentType, page.title, page.slug)}
      />

      {/* Hero with server-rendered H1 */}
      <ArticleHero
        title={page.title}
        heroImage={page.heroImage}
        heroAlt={page.heroAlt}
        excerpt={page.excerpt}
        publishedAt={page.publishedAt}
        author={page.author}
      />

      {/* Two-column layout: ToC + Body */}
      <div
        className="w-full"
        style={{
          background:
            'linear-gradient(180deg, #E8F1F8 0%, #FFFFFF 30%, #FFFFFF 70%, #E8F1F8 100%)',
        }}
      >
        <div className="flex flex-col lg:flex-row gap-12 px-[120px] max-lg:px-[48px] max-md:px-[24px] py-[80px] max-md:py-[48px]">
          {/* Table of Contents - sticky sidebar on desktop */}
          <div className="lg:w-[240px] lg:shrink-0">
            <TableOfContents blocks={page.body} />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <ArticleBody blocks={page.body} />
          </div>
        </div>
      </div>

      {/* Interlinks Section */}
      <InterlinksSection
        relatedPages={page.relatedPages}
        title="Contenido Relacionado"
      />

      {/* Cluster Navigation */}
      <ClusterNavigation
        clusterId={page.clusterId}
        currentSlug={page.slug}
        clusterRole={page.clusterRole}
        pillarSlug={page.pillarSlug}
      />

      {/* Lead capture CTA */}
      <section>
        <InlineLeadSection {...DEFAULT_LEAD_CONFIG} />
      </section>
    </article>
  )
}
