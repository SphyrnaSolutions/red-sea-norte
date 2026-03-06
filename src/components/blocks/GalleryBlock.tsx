import Image from 'next/image'
import type { Block, GalleryValue } from './types'

export function GalleryBlock({ block }: { block: Block }) {
  const value = block.value as Partial<GalleryValue>
  if (!value?.images?.length) return null

  return (
    <div className="w-full max-w-[1200px] my-20 max-md:my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {value.images.map((image, idx) => (
          <div
            key={idx}
            className="relative h-[380px] max-md:h-[280px] rounded-[16px] overflow-hidden group cursor-pointer"
          >
            <Image
              src={image.url}
              alt={image.alt || `Gallery image ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
