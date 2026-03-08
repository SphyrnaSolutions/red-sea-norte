import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

export const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/satoshi-variable.woff2',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi-variable-italic.woff2',
      style: 'italic',
    },
  ],
  weight: '300 900',
  variable: '--font-sans',
  display: 'swap',
})

export const clashDisplay = localFont({
  src: '../../public/fonts/clash-display-variable.woff2',
  weight: '200 700',
  variable: '--font-display',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
})
