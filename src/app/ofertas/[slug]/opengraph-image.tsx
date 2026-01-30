import { ImageResponse } from 'next/og'
import { getOfertaData } from '@/lib/data'

export const runtime = 'edge'
export const alt = 'Red Sea Norte Oferta'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const oferta = await getOfertaData(slug)

  if (!oferta) {
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
        Red Sea Norte - Ofertas
      </div>
    )
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://redsea.sphyrnasolutions.com'
  const imageUrl = oferta.hero?.backgroundImage
    ? (oferta.hero.backgroundImage.startsWith('http') ? oferta.hero.backgroundImage : `${BASE_URL}${oferta.hero.backgroundImage}`)
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

      {/* Price badge */}
      <div style={{
        position: 'absolute',
        top: 40,
        right: 40,
        background: '#FF5722',
        color: 'white',
        padding: '16px 32px',
        fontSize: 36,
        fontWeight: 'bold',
        borderRadius: 8,
        display: 'flex',
      }}>
        {oferta.precio?.actual}€
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      }}>
        <div style={{
          fontSize: 28,
          color: '#FF5722',
          marginBottom: 16,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}>
          Oferta Especial
        </div>
        <div style={{
          fontSize: 56,
          fontWeight: 'bold',
          lineHeight: 1.2,
          maxWidth: '80%',
        }}>
          {oferta.hero?.title || oferta.badge}
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
