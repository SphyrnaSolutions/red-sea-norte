'use client'

import type { Block, NewsletterValue } from './types'

export function NewsletterBlock({ block }: { block: Block }) {
  const value = block.value as NewsletterValue

  return (
    <div className="w-full max-w-[1000px] my-20 max-md:my-10">
      <div
        className="rounded-[24px] p-[80px] max-md:p-[40px] flex flex-col items-center gap-6 text-center"
        style={{ backgroundColor: 'var(--color-coral-fire)' }}
      >
        <h3
          className="max-md:text-2xl"
          style={{
            color: 'var(--color-ocean-deep)',
            fontSize: '36px',
            fontWeight: 900,
            lineHeight: 1.2,
            fontFamily: 'var(--font-sans)',
          }}
        >
          {value.title}
        </h3>

        <p
          className="max-w-[720px] max-md:text-base"
          style={{
            color: 'var(--color-ocean-deep)',
            fontSize: 'var(--font-size-body)',
            lineHeight: 1.6,
            fontFamily: 'var(--font-sans)',
          }}
        >
          {value.description}
        </p>

        <div className="flex w-full max-w-[560px] flex-col gap-4 md:flex-row">
          <input
            type="email"
            placeholder="Tu email"
            className="h-[56px] flex-1 rounded-full border-0 px-6 outline-none"
            style={{ color: 'var(--color-ocean-midnight)' }}
          />
          <button
            className="h-[56px] rounded-full px-8 font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: 'var(--color-ocean-midnight)' }}
          >
            {value.buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}
