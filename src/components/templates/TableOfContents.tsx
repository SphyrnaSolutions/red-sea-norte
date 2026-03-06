'use client'

import { useState } from 'react'
import type { Block } from '@/components/blocks/types'

interface TableOfContentsProps {
  blocks: Block[]
}

interface TocEntry {
  id: string
  text: string
  level: number
}

/**
 * Slugify a heading text into a URL-safe anchor id.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Auto-generated Table of Contents from heading blocks.
 * Sticky on desktop, collapsible on mobile.
 * Returns null if no headings are found.
 */
export function TableOfContents({ blocks }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const entries: TocEntry[] = blocks
    .filter(
      (block) =>
        block.type === 'heading' &&
        typeof block.value === 'object' &&
        block.value !== null &&
        'level' in block.value &&
        'text' in block.value
    )
    .map((block) => {
      const value = block.value as { level: number; text: string }
      const safeLevel = Math.max(2, Math.min(3, value.level))
      return {
        id: slugify(value.text),
        text: value.text,
        level: safeLevel,
      }
    })

  if (entries.length === 0) {
    return null
  }

  return (
    <aside
      className="lg:sticky lg:top-28 lg:self-start"
      aria-label="Tabla de contenidos"
    >
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden w-full flex items-center justify-between rounded-lg px-4 py-3 mb-4 text-sm font-semibold"
        style={{
          backgroundColor: 'rgba(10,37,64,0.04)',
          color: 'var(--color-ocean-midnight)',
        }}
      >
        <span>Contenido</span>
        <span
          className="transition-transform"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          v
        </span>
      </button>

      <nav className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <p
          className="mb-4 text-xs font-bold uppercase tracking-[3px]"
          style={{
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Contenido
        </p>

        <ol className="flex flex-col gap-2">
          {entries.map((entry) => (
            <li
              key={entry.id}
              style={{ paddingLeft: entry.level === 3 ? '16px' : '0' }}
            >
              <a
                href={`#${entry.id}`}
                className="block text-sm leading-6 transition-colors hover:underline"
                style={{
                  color: 'var(--color-ocean-midnight)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: entry.level === 3 ? '13px' : '14px',
                  opacity: entry.level === 3 ? 0.8 : 1,
                }}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
