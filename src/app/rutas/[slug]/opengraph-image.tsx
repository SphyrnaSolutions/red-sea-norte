import { ImageResponse } from 'next/og'
import { getRutaData } from '@/lib/data'

export const runtime = 'edge'
export const alt = 'Red Sea Norte Ruta'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ruta = await getRutaData(slug)

  // Fallback if no data
  if (!ruta) {
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
        fontFamily: 'system-ui, sans-serif',
      }}>
        Red Sea Norte - Rutas
      </div>,
      { ...size }
    )
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'

  // Get the hero image URL
  const imageUrl = ruta.hero?.backgroundImage
    ? (ruta.hero.backgroundImage.startsWith('http') ? ruta.hero.backgroundImage : `${BASE_URL}${ruta.hero.backgroundImage}`)
    : null

  // Extract duration from infoCards if available
  const durationCard = ruta.infoCards?.find(card =>
    card.label.toLowerCase().includes('duración') ||
    card.label.toLowerCase().includes('dias') ||
    card.label.toLowerCase().includes('días')
  )
  const duration = durationCard?.value || ''

  return new ImageResponse(
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 60,
      position: 'relative',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Background image */}
      {imageUrl && (
        // eslint-disable-next-line jsx-a11y/alt-text
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
          background: 'linear-gradient(to bottom, #000428, #004E92)',
        }} />
      )}

      {/* Dark overlay gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      }}>
        {/* Badge */}
        <div style={{
          fontSize: 28,
          color: '#00CED1',
          marginBottom: 16,
          textTransform: 'uppercase',
          letterSpacing: 3,
          fontWeight: 600,
        }}>
          Ruta de Buceo
        </div>

        {/* Title */}
        <div style={{
          fontSize: 56,
          fontWeight: 800,
          lineHeight: 1.2,
          maxWidth: '90%',
          marginBottom: duration ? 16 : 24,
        }}>
          {ruta.hero?.title || ruta.title}
        </div>

        {/* Duration if available */}
        {duration && (
          <div style={{
            fontSize: 28,
            marginBottom: 24,
            opacity: 0.85,
            color: '#FF6B35',
            fontWeight: 600,
          }}>
            {duration}
          </div>
        )}

        {/* Branding */}
        <div style={{
          fontSize: 24,
          opacity: 0.9,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ color: '#3DABC2', fontWeight: 700 }}>Red Sea Norte</span>
          <span style={{ opacity: 0.6 }}> | Buceo en el Mar Rojo</span>
        </div>
      </div>
    </div>,
    { ...size }
  )
}
