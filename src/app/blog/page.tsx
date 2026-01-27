import Link from "next/link"
import Image from "next/image"
import { HeroSection } from "@/components/organisms/HeroSection"
import { Badge } from "@/components/ui/badge"
import { blogListingData } from "@/lib/mock-data/blog-posts"
import { Clock, User } from "lucide-react"

export default function BlogListingPage() {
  const { hero, featuredPost, posts } = blogListingData

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={hero.backgroundImage}
        title={hero.title}
        subtitle={hero.subtitle}
        minHeight="min-h-[400px]"
        overlay="gradient"
      />

      {/* Blog Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Featured Post */}
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="block mb-12 group"
          >
            <div className="relative h-[520px] rounded-[var(--radius-card-lg)] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <Image
                src={featuredPost.hero.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-overlay" />

              {/* Content */}
              <div className="absolute inset-0 p-12 flex flex-col justify-end z-10">
                <div className="mb-4">
                  <Badge
                    variant="secondary"
                    className="mb-4"
                  >
                    {featuredPost.category.name}
                  </Badge>
                </div>

                <h2 className="text-white mb-4 text-shadow-lg group-hover:translate-x-2 transition-transform">
                  {featuredPost.title}
                </h2>

                <p className="text-white/90 text-lg mb-6 max-w-3xl text-shadow">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Blog Grid - Masonry Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div
                  className={`relative rounded-[var(--radius-card)] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ${
                    index === 0 ? "h-[380px]" : "h-[320px]"
                  }`}
                >
                  <Image
                    src={post.hero.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-overlay" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                    <Badge
                      variant="secondary"
                      size="sm"
                      className="mb-3 self-start"
                    >
                      {post.category.name}
                    </Badge>

                    <h3 className="text-white text-xl font-bold mb-2 text-shadow group-hover:translate-y-0 translate-y-1 transition-transform">
                      {post.title}
                    </h3>

                    <p className="text-white/80 text-sm mb-3 text-shadow line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-white/70 text-xs">
                      <span>{post.author.name}</span>
                      {post.readTime && (
                        <>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
