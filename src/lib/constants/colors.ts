/**
 * Red Sea Diving - Color Palette
 * All colors from the design system
 */

export const colors = {
  // Primary
  primaryBlue: '#0066CC',
  primaryOrange: '#FF6B35',

  // Secondary
  secondaryDark: '#0D3A5D',
  secondaryCyan: '#3DABC2',
  cyanLight: '#00CED1',
  electricBlue: '#004E92',

  // Text
  textPrimary: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',
  textHeading: '#0D3A5D',

  // Backgrounds
  bgBeige: '#F5E6D3',
  bgGray: '#F5F5F5',
  bgMint: '#ECFDF5',
  bgWhite: '#FFFFFF',

  // Gradients
  gradients: {
    ocean: 'linear-gradient(135deg, #000428 0%, #004E92 100%)',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%)',
    overlayLight: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
    cta: 'linear-gradient(135deg, #0066CC 0%, #004E92 100%)',
  }
} as const

export type Colors = typeof colors
