import type { Block, InfoCardsValue } from './types'

export function InfoCardsBlock({ block }: { block: Block }) {
  const value = block.value as InfoCardsValue

  return (
    <div className="w-full flex justify-center my-10">
      <div className="flex gap-6 flex-wrap justify-center max-w-[900px]">
        {value.cards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-3 rounded-[16px] p-8 min-w-[260px] max-md:min-w-full"
            style={{ backgroundColor: card.color }}
          >
            {/* Icon Circle */}
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                backgroundColor: 'rgba(0,0,0,0.15)',
                width: '56px',
                height: '56px',
              }}
            >
              <span className="text-white text-2xl">{card.icon}</span>
            </div>

            {/* Value */}
            <p
              className="text-white"
              style={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 900,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {card.value}
            </p>

            {/* Label */}
            <p
              className="text-white text-center"
              style={{
                fontSize: 'var(--font-size-body-sm)',
                opacity: 0.9,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
