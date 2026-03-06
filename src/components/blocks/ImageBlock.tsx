import Image from 'next/image'
import type { Block, ImageValue } from './types'

export function ImageBlock({ block }: { block: Block }) {
  const value = block.value as Partial<ImageValue>
  if (!value?.url) return null

  return (
    <div className="w-full max-w-[1200px] mb-10">
      <div className="relative h-[600px] max-md:h-[400px] rounded-[20px] overflow-hidden">
        <Image
          src={value.url}
          alt={value.alt || ''}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {value.caption && (
        <p
          className="text-center mt-3 mb-10 italic"
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '15px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {value.caption}
        </p>
      )}
    </div>
  )
}
