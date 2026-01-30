"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { images } from "@/lib/constants/images"
import type { BlogPost } from "@/lib/mock-data/types"

interface BlogListingClientProps {
  posts: BlogPost[]
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  return (
    <div className="pt-20">
      {/* Hero Section - With Background Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full relative h-[500px] max-md:h-[400px]"
      >
        {/* Background Image */}
        <Image
          src={images.heroBlogListing}
          alt="Blog de Buceo - Mar Rojo"
          fill
          className="object-cover"
          priority
        />

        {/* Dark Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(13, 58, 93, 0.85) 0%, rgba(0, 78, 146, 0.75) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 container-custom h-full flex flex-col items-center justify-center text-center px-[120px] max-lg:px-[48px] max-md:px-[24px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-7xl font-black mb-5 max-md:text-5xl max-lg:text-6xl"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 900,
              lineHeight: 1.2,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)'
            }}
          >
            BLOG DE BUCEO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white text-2xl max-md:text-lg"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            Guías, consejos y experiencias del Mar Rojo
          </motion.p>
        </div>
      </motion.section>

      {/* Masonry Grid Section */}
      <section
        className="w-full"
        style={{ background: 'linear-gradient(180deg, #D6E8F5 0%, #F8FAFC 50%, #D6E8F5 100%)' }}
      >
        <div className="container-custom py-[80px] px-[120px] max-lg:py-[60px] max-lg:px-[48px] max-md:py-[48px] max-md:px-[24px]">

          {/* Row 1: Featured + 2 cards column */}
          <div className="grid grid-cols-1 lg:grid-cols-[750px_1fr] gap-8 mb-8 max-lg:grid-cols-1">
            {/* Featured Card */}
            <div className="h-[520px] max-md:h-[400px]">
              <FeaturedCard post={posts[0]} />
            </div>

            {/* Right column with 2 cards */}
            <div className="flex flex-col gap-8">
              <div className="h-[240px] max-md:h-auto max-md:min-h-[200px]">
                <SolidCard post={posts[2]} />
              </div>
              <div className="flex-1 min-h-[260px] max-md:h-[300px]">
                <ImageCard post={posts[1]} />
              </div>
            </div>
          </div>

          {/* Row 2: Dark card + Image card */}
          <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-8 max-lg:grid-cols-1">
            <div className="h-[380px] max-md:h-auto max-md:min-h-[300px]">
              <DarkCard post={posts[0]} />
            </div>
            <div className="h-[380px] max-md:h-[300px]">
              <ImageCard post={posts[1]} />
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

/* ===========================
   Inline Card Components
   =========================== */

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-[20px] overflow-hidden h-full group cursor-pointer"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full">
          <Image
            src={post.hero.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 750px"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)' }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-10 z-10 max-md:p-6">
            <div
              className="inline-flex self-start rounded-lg mb-4"
              style={{
                backgroundColor: post.category.color || '#FF6B35',
                padding: '8px 16px'
              }}
            >
              <span className="text-white text-xs font-bold uppercase tracking-wider">
                {post.category.name}
              </span>
            </div>

            <h2
              className="text-white mb-4 leading-tight max-md:text-2xl"
              style={{
                fontSize: '32px',
                fontWeight: 900,
                lineHeight: 1.2
              }}
            >
              {post.title}
            </h2>

            <p
              className="text-white text-sm"
              style={{ opacity: 0.8 }}
            >
              {post.readTime} • {post.author.name}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function SolidCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-[20px] overflow-hidden cursor-pointer h-full relative group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full">
          {/* Background Image */}
          <Image
            src={post.hero.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 460px"
          />

          {/* Light Overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(245, 245, 245, 0.88) 100%)'
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-8 flex flex-col justify-center h-full max-md:p-6">
            <div
              className="inline-flex self-start rounded-md mb-3"
              style={{
                backgroundColor: post.category.color || '#0066CC',
                padding: '6px 12px'
              }}
            >
              <span className="text-white text-xs font-bold uppercase tracking-wide">
                {post.category.name}
              </span>
            </div>

            <h3
              className="mb-2 max-md:text-lg"
              style={{
                color: '#0D3A5D',
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: 1.3
              }}
            >
              {post.title}
            </h3>

            <p style={{ color: '#666666', fontSize: '13px' }}>
              {post.readTime} • {post.publishedAt}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function ImageCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-[20px] overflow-hidden h-full group cursor-pointer"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full">
          <Image
            src={post.hero.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
          />

          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)' }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 max-md:p-4">
            <div
              className="inline-flex self-start rounded-md mb-3"
              style={{
                backgroundColor: post.category.color || '#FF6B35',
                padding: '6px 12px'
              }}
            >
              <span className="text-white text-xs font-bold uppercase">
                {post.category.name}
              </span>
            </div>

            <h3
              className="text-white mb-2 max-md:text-lg"
              style={{
                fontSize: '20px',
                fontWeight: 800,
                lineHeight: 1.2
              }}
            >
              {post.title}
            </h3>

            <p className="text-white text-xs" style={{ opacity: 0.7 }}>
              {post.readTime} • {post.publishedAt}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function DarkCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-[20px] overflow-hidden h-full cursor-pointer relative group"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full">
          {/* Background Image */}
          <Image
            src={post.hero.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 460px"
          />

          {/* Dark Blue Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(13, 58, 93, 0.92) 0%, rgba(0, 78, 146, 0.88) 100%)'
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-10 flex flex-col justify-center h-full max-md:p-6">
            <div
              className="inline-flex self-start rounded-md mb-4"
              style={{
                backgroundColor: post.category.color || '#FF6B35',
                padding: '6px 12px'
              }}
            >
              <span className="text-white text-xs font-bold uppercase tracking-wide">
                {post.category.name}
              </span>
            </div>

            <h3
              className="text-white mb-4 max-md:text-xl"
              style={{
                fontSize: '24px',
                fontWeight: 800,
                lineHeight: 1.3
              }}
            >
              {post.title}
            </h3>

            <p
              className="text-white mb-3 max-md:text-sm"
              style={{
                fontSize: '16px',
                lineHeight: 1.5,
                opacity: 0.9
              }}
            >
              {post.excerpt}
            </p>

            <p className="text-white text-xs" style={{ opacity: 0.8 }}>
              {post.readTime} • {post.publishedAt}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
