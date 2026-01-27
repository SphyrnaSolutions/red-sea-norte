/**
 * Red Sea Diving - Typography Scale
 * Font sizes, weights, and line heights
 */

export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
  },

  fontSize: {
    display: '92px',
    h1: '72px',
    h2: '52px',
    h3: '42px',
    h4: '32px',
    h5: '28px',
    h6: '24px',
    bodyLg: '20px',
    body: '18px',
    bodySm: '16px',
    small: '14px',
    xs: '12px',
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  lineHeight: {
    tight: '1.1',
    snug: '1.2',
    normal: '1.3',
    relaxed: '1.6',
    loose: '1.7',
  },
} as const

export type Typography = typeof typography
