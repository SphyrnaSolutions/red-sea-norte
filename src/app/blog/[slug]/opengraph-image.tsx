import { ImageResponse } from 'next/og'
import { getBlogPostData } from '@/lib/data'

export const runtime = 'edge'
export const alt = 'Red Sea Norte Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostData(slug)

  if (!post) {
    return new ImageResponse(
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #000428, #004E92)',
        color: 'white',
        fontSize: 48,
      }}>
        Red Sea Norte - Blog
      </div>
    )
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'
  const imageUrl = post.hero?.image
    ? (post.hero.image.startsWith('http') ? post.hero.image : `${BASE_URL}${post.hero.image}`)
    : null

  return new ImageResponse(
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 60,
      position: 'relative',
    }}>
      {/* Background image */}
      {imageUrl && (
        <img
          src={imageUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      }}>
        <div style={{
          fontSize: 28,
          color: '#00CED1',
          marginBottom: 16,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}>
          Blog
        </div>
        <div style={{
          fontSize: 56,
          fontWeight: 'bold',
          lineHeight: 1.2,
          maxWidth: '90%',
        }}>
          {post.title}
        </div>
        <div style={{
          fontSize: 24,
          marginTop: 24,
          opacity: 0.9,
        }}>
          Red Sea Norte
        </div>
      </div>
    </div>,
    { ...size }
  )
}
