import { ImageResponse } from 'next/og'
import { getCursoData } from '@/lib/data'

export const runtime = 'edge'
export const alt = 'Red Sea Norte Curso'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const curso = await getCursoData(slug)

  if (!curso) {
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
        Red Sea Norte - Cursos
      </div>
    )
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

  // Get the hero image URL
  const imageUrl = curso.hero.image
    ? (curso.hero.image.startsWith('http') ? curso.hero.image : `${BASE_URL}${curso.hero.image}`)
    : null

  // Extract level from infoBars if available
  const levelBar = curso.infoBars.find(bar => bar.label.toLowerCase().includes('nivel'))
  const level = levelBar?.value

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

      {/* Fallback gradient background if no image */}
      {!imageUrl && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom right, #000428, #004E92)',
        }} />
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
        {/* Badge / Category */}
        <div style={{
          fontSize: 28,
          color: '#00CED1',
          marginBottom: 16,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}>
          Curso de Buceo
        </div>

        {/* Title */}
        <div style={{
          fontSize: 56,
          fontWeight: 'bold',
          lineHeight: 1.2,
          maxWidth: '90%',
        }}>
          {curso.title}
        </div>

        {/* Level badge if available */}
        {level && (
          <div style={{
            display: 'flex',
            marginTop: 20,
          }}>
            <div style={{
              backgroundColor: '#FF5722',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 20,
              fontWeight: 'bold',
            }}>
              {level}
            </div>
          </div>
        )}

        {/* Branding */}
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
