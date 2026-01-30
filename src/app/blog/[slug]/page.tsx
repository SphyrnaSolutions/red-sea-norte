import React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { getAllBlogPostSlugsData, getBlogPostData } from "@/lib/data"
import type { Block } from "@/lib/mock-data/types"
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

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
export const revalidate = 3600

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const { isEnabled } = await draftMode()

  // Fetch post from data layer (handles API + fallback)
  const post = await getBlogPostData(slug)

  if (!post) {
    notFound()
  }

  // Base URL for structured data
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.hero?.image ? (post.hero.image.startsWith('http') ? post.hero.image : `${BASE_URL}${post.hero.image}`) : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Red Sea Norte',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Red Sea Norte',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  }

  return (
    <div className="pt-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

      {/* Hero Section */}
      <section className="relative h-[600px] max-md:h-[500px] w-full">
        <Image
          src={post.hero.image}
          alt={post.hero.alt}
          fill
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
              fontFamily: 'Inter, sans-serif'
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
            {post.body.map((block, index) => (
              <BlockRenderer key={block.id} block={block} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/* ===========================
   Block Renderer
   =========================== */

function BlockRenderer({ block, index }: { block: Block; index: number }) {
  switch (block.type) {
    case 'rich_text':
      return <RichTextBlock block={block} index={index} />
    case 'heading':
      return <HeadingBlock block={block} index={index} />
    case 'image':
      return <ImageBlock block={block} index={index} />
    case 'quote':
      return <QuoteBlock block={block} index={index} />
    case 'info_cards':
      return <InfoCardsBlock block={block} index={index} />
    case 'gallery':
      return <GalleryBlock block={block} index={index} />
    case 'two_column':
      return <TwoColumnBlock block={block} index={index} />
    case 'cta':
      return <CTABlock block={block} index={index} />
    default:
      return null
  }
}

/* ===========================
   Block Components
   =========================== */

function RichTextBlock({ block, index }: { block: Block; index: number }) {
  return (
    <div className="w-full max-w-[800px] mb-10">
      <div
        className="prose prose-lg max-w-none"
        style={{
          color: '#333333',
          fontSize: '20px',
          lineHeight: 1.7,
          fontFamily: 'Inter, sans-serif'
        }}
        dangerouslySetInnerHTML={{ __html: block.value.content }}
      />
    </div>
  )
}

function HeadingBlock({ block, index }: { block: Block; index: number }) {
  const HeadingTag = `h${block.value.level}` as keyof React.JSX.IntrinsicElements

  return (
    <div
      className="w-full max-w-[800px] py-10 max-md:py-8"
    >
      <HeadingTag
        style={{
          color: '#0D3A5D',
          fontSize: block.value.level === 2 ? '42px' : '32px',
          fontWeight: 900,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.2
        }}
        className="max-md:text-3xl"
      >
        {block.value.text}
      </HeadingTag>
    </div>
  )
}

function ImageBlock({ block, index }: { block: Block; index: number }) {
  return (
    <div
      className="w-full max-w-[1200px] mb-10"
    >
      <div className="relative h-[600px] max-md:h-[400px] rounded-[20px] overflow-hidden">
        <Image
          src={block.value.url}
          alt={block.value.alt || ''}
          fill
          className="object-cover"
        />
      </div>
      {block.value.caption && (
        <p
          className="text-center mt-3 mb-10 italic"
          style={{
            color: '#666666',
            fontSize: '15px',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {block.value.caption}
        </p>
      )}
    </div>
  )
}

function QuoteBlock({ block, index }: { block: Block; index: number }) {
  return (
    <div
      className="w-full max-w-[900px] my-10"
    >
      <div
        className="rounded-[20px] p-[80px] max-md:p-[40px] flex flex-col gap-5"
        style={{ backgroundColor: '#F5F5F5' }}
      >
        {/* Quote Icon */}
        <span
          style={{
            color: '#FF6B35',
            fontSize: '72px',
            fontWeight: 900,
            lineHeight: 0.8,
            fontFamily: 'Georgia, serif'
          }}
        >
          "
        </span>

        {/* Quote Text */}
        <p
          className="italic max-md:text-2xl"
          style={{
            color: '#0D3A5D',
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: 1.5,
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {block.value.text}
        </p>

        {/* Author */}
        <p
          style={{
            color: '#666666',
            fontSize: '18px',
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif'
          }}
        >
          — {block.value.author}
          {block.value.role && `, ${block.value.role}`}
        </p>
      </div>
    </div>
  )
}

function InfoCardsBlock({ block, index }: { block: Block; index: number }) {
  return (
    <div
      className="w-full flex justify-center my-10"
    >
      <div className="flex gap-6 flex-wrap justify-center max-w-[900px]">
        {block.value.cards.map((card: any, idx: number) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-3 rounded-[16px] p-8 min-w-[260px] max-md:min-w-full"
            style={{ backgroundColor: card.color }}
          >
            {/* Icon Circle */}
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                backgroundColor: 'rgba(0,0,0,0.15)',
                width: '56px',
                height: '56px'
              }}
            >
              <span className="text-white text-2xl">{card.icon}</span>
            </div>

            {/* Value */}
            <p
              className="text-white"
              style={{
                fontSize: '32px',
                fontWeight: 900,
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {card.value}
            </p>

            {/* Label */}
            <p
              className="text-white text-center"
              style={{
                fontSize: '16px',
                opacity: 0.9,
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function GalleryBlock({ block, index }: { block: Block; index: number }) {
  return (
    <div
      className="w-full max-w-[1200px] my-20 max-md:my-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {block.value.images.map((image: any, idx: number) => (
          <div
            key={idx}
            className="relative h-[380px] max-md:h-[280px] rounded-[16px] overflow-hidden group cursor-pointer"
          >
            <Image
              src={image.url}
              alt={image.alt || `Gallery image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function TwoColumnBlock({ block, index }: { block: Block; index: number }) {
  return (
    <div
      className="w-full max-w-[1200px] my-20 max-md:my-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-[60px] max-md:gap-8">
        {/* Left Column - Image */}
        <div className="relative h-[420px] max-md:h-[300px] rounded-[16px] overflow-hidden">
          <Image
            src={block.value.leftColumn.image}
            alt={block.value.leftColumn.alt || ''}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col justify-center gap-5">
          <p
            style={{
              color: '#333333',
              fontSize: '18px',
              fontWeight: 600,
              lineHeight: 1.7,
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {block.value.rightColumn.title}
          </p>

          <div
            className="prose prose-lg max-w-none"
            style={{
              color: '#333333',
              fontSize: '18px',
              lineHeight: 1.7,
              fontFamily: 'Inter, sans-serif'
            }}
            dangerouslySetInnerHTML={{ __html: block.value.rightColumn.content }}
          />
        </div>
      </div>
    </div>
  )
}

function CTABlock({ block, index }: { block: Block; index: number }) {
  return (
    <div
      className="w-full max-w-[1000px] my-20 max-md:my-10"
    >
      <div
        className="rounded-[24px] p-[80px] max-md:p-[40px] flex flex-col items-center gap-6 text-center"
        style={{
          background: 'linear-gradient(135deg, #0D3A5D 0%, #0066CC 100%)'
        }}
      >
        {/* Title */}
        <h3
          className="text-white max-md:text-2xl"
          style={{
            fontSize: '36px',
            fontWeight: 900,
            lineHeight: 1.2,
            fontFamily: 'Inter, sans-serif',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {block.value.title}
        </h3>

        {/* Description */}
        <p
          className="text-white max-w-[700px] max-md:text-base"
          style={{
            fontSize: '18px',
            lineHeight: 1.6,
            fontFamily: 'Inter, sans-serif',
            textShadow: '0 1px 4px rgba(0,0,0,0.15)'
          }}
        >
          {block.value.description}
        </p>

        {/* CTA Button */}
        <Link
          href={block.value.primaryCTA.href}
          className="flex items-center justify-center rounded-[30px] transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: '#FF6B35',
            height: '60px',
            width: '280px'
          }}
        >
          <span
            className="text-white uppercase tracking-wider"
            style={{
              fontSize: '18px',
              fontWeight: 800,
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {block.value.primaryCTA.text}
          </span>
        </Link>
      </div>
    </div>
  )
}
