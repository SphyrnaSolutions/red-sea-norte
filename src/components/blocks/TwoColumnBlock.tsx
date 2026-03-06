import Image from 'next/image'
import type { Block, TwoColumnValue } from './types'

export function TwoColumnBlock({ block }: { block: Block }) {
  const value = block.value as TwoColumnValue

  return (
    <div className="w-full max-w-[1200px] my-20 max-md:my-10">
      <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-[60px] max-md:gap-8">
        {/* Left Column - Image */}
        <div className="relative h-[420px] max-md:h-[300px] rounded-[16px] overflow-hidden">
          <Image
            src={value.leftColumn.image}
            alt={value.leftColumn.alt || ''}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col justify-center gap-5">
          <p
            style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-body)',
              fontWeight: 600,
              lineHeight: 1.7,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {value.rightColumn.title}
          </p>

          <div
            className="prose prose-lg max-w-none"
            style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-body)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-sans)',
            }}
            dangerouslySetInnerHTML={{ __html: value.rightColumn.content }}
          />
        </div>
      </div>
    </div>
  )
}
