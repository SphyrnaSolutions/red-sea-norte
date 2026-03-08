import Image from "next/image"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { getAllBlogPostSlugsData, getBlogPostData } from "@/lib/data"
import { JsonLd } from "@/components/seo/JsonLd"
import { Breadcrumbs, buildBreadcrumbItems } from "@/components/seo/Breadcrumbs"
import { RelatedContent } from "@/components/seo/RelatedContent"
import { resolveCluster, computeInterlinks } from "@/lib/seo"
import { buildArticleSchema } from "@/lib/seo/schema"
import { getRawPageBySlug } from "@/lib/wagtail/fetchers"
import type { WagtailBlogPostPage } from "@/lib/wagtail/types"
import { BlockRenderer } from "@/components/blocks"
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostData(slug)

  if (!post) {
    return {
      title: 'Post no encontrado | Red Sea Diving',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

  return {
    title: `${post.title} | Red Sea Diving Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.hero.image,
          width: 1200,
          height: 630,
          alt: post.hero.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.hero.image],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
  }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPostSlugsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// ISR Configuration - revalidate every hour
// Render on demand, fetch-level caching in client.ts handles ISR
export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const { isEnabled } = await draftMode()

  // Fetch post from data layer (handles API + fallback)
  const post = await getBlogPostData(slug)

  if (!post) {
    notFound()
  }

  // Base URL for structured data
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://buceoenelmarrojo.com'

  // Resolve cluster for interlinks (uses raw Wagtail page data)
  const rawPage = await getRawPageBySlug('blog.BlogPostPage', slug, {
    tags: ['blog', `blog-${slug}`],
  })
  const cluster = rawPage ? await resolveCluster(rawPage) : null
  const interlinks = computeInterlinks(cluster, slug)

  // JSON-LD structured data via centralized builder -- uses URL slug, not CMS slug
  const jsonLd = rawPage
    ? buildArticleSchema(rawPage as WagtailBlogPostPage, BASE_URL, slug)
    : {
        '@context': 'https://schema.org' as const,
        '@type': 'BlogPosting' as const,
        headline: post.title,
        description: post.excerpt,
        image: post.hero?.image ? (post.hero.image.startsWith('http') ? post.hero.image : `${BASE_URL}${post.hero.image}`) : `${BASE_URL}/images/og-default.jpg`,
        author: { '@type': 'Person' as const, name: 'Karlos Simon' },
        datePublished: post.publishedAt,
        mainEntityOfPage: { '@type': 'WebPage' as const, '@id': `${BASE_URL}/blog/${slug}` },
      }

  return (
    <div className="pt-20">
      <JsonLd data={jsonLd} />
      {/* Draft Mode Banner */}
      {isEnabled && (
        <div className="fixed top-20 left-0 right-0 z-50 bg-yellow-400 text-black px-6 py-3 text-center font-semibold shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <span>🚧 MODO PREVIEW - Viendo cambios no publicados</span>
            <a
              href="/api/disable-draft"
              className="underline hover:no-underline"
            >
              Salir del preview
            </a>
          </div>
        </div>
      )}

      <Breadcrumbs items={buildBreadcrumbItems('blog', post.title, slug)} />

      {/* Hero Section */}
      <section className="relative h-[600px] max-md:h-[500px] w-full">
        <Image
          src={post.hero.image}
          alt={post.hero.alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)'
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end container-custom px-[120px] pb-[80px] max-lg:px-[48px] max-md:px-[24px] max-md:pb-[60px]">
          {/* Category Badge */}
          <div
            className="inline-flex self-start rounded-lg mb-4"
            style={{
              backgroundColor: post.category.color,
              padding: '8px 16px'
            }}
          >
            <span className="text-white text-xs font-bold uppercase tracking-wider">
              {post.category.name}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white mb-4 max-md:text-4xl"
            style={{
              fontSize: '64px',
              fontWeight: 900,
              lineHeight: 1.1,
              fontFamily: 'var(--font-sans)'
            }}
          >
            {post.title}
          </h1>

          {/* Meta Info */}
          <div
            className="flex gap-6 text-white text-base max-md:text-sm"
            style={{ opacity: 0.9 }}
          >
            <span>Por {post.author.name}</span>
            <span>{post.readTime} • {post.publishedAt}</span>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section
        className="w-full"
        style={{
          background: 'linear-gradient(180deg, #E8F1F8 0%, #FFFFFF 30%, #FFFFFF 70%, #E8F1F8 100%)'
        }}
      >
        <div className="py-[80px] max-md:py-[48px]">
          <div className="flex flex-col items-center">
            {post.body.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </div>
        </div>
      </section>

      <RelatedContent interlinks={interlinks} />
    </div>
  )
}
