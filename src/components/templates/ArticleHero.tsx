import Image from 'next/image'
import type { AuthorData } from '@/lib/templates/types'

interface ArticleHeroProps {
  title: string
  heroImage: string
  heroAlt: string
  excerpt: string
  publishedAt?: string
  author?: AuthorData
}

/**
 * Server-rendered article hero with H1 title.
 * The H1 is critical for SEO -- this component must NOT have "use client".
 */
export function ArticleHero({
  title,
  heroImage,
  heroAlt,
  excerpt,
  publishedAt,
  author,
}: ArticleHeroProps) {
  return (
    <header className="relative w-full">
      {/* Hero Image */}
      <div className="relative h-[600px] max-md:h-[400px] w-full">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,37,64,0.2) 0%, rgba(10,37,64,0.85) 100%)',
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-[120px] pb-[80px] max-lg:px-[48px] max-md:px-[24px] max-md:pb-[48px]">
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--font-size-h1)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#FFFFFF',
            textShadow: '0 4px 32px rgba(0,0,0,0.6)',
          }}
          className="max-md:text-4xl mb-4"
        >
          {title}
        </h1>

        <p
          className="max-w-[800px] max-md:text-base"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--font-size-body-lg)',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          {excerpt}
        </p>

        {/* Byline */}
        {(publishedAt || author) && (
          <div
            className="flex items-center gap-4 mt-6"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--font-size-small)',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            {author && <span>Por {author.name}</span>}
            {publishedAt && <span>{publishedAt}</span>}
          </div>
        )}
      </div>
    </header>
  )
}
