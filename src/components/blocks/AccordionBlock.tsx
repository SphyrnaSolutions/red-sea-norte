import DOMPurify from 'isomorphic-dompurify'
import type { Block, AccordionValue } from './types'

export function AccordionBlock({ block }: { block: Block }) {
  const value = block.value as Partial<AccordionValue>
  if (!value?.items?.length) return null

  return (
    <div className="w-full max-w-[900px] my-20 max-md:my-10">
      <div className="flex flex-col gap-4">
        {value.items.map((item) => (
          <details
            key={item.title}
            className="group rounded-[20px] border border-[#D6E8F5] bg-white px-6 py-5 shadow-[0_12px_24px_rgba(10,37,64,0.05)]"
          >
            <summary
              className="cursor-pointer list-none font-bold"
              style={{
                fontSize: 'var(--font-size-body-lg)',
                color: 'var(--color-ocean-midnight)',
              }}
            >
              {item.title}
            </summary>
            <div
              className="prose prose-lg mt-4 max-w-none"
              style={{ color: 'var(--color-text-secondary)' }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}
            />
          </details>
        ))}
      </div>
    </div>
  )
}
