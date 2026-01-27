/**
 * Red Sea Diving - Image URLs
 * Placeholder images from Unsplash (to be replaced with real assets)
 */

export const images = {
  // Hero backgrounds
  heroSSI: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80',
  heroRutaNorte: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80',
  heroPecios: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1920&q=80',
  heroAdvancedOW: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80',
  heroBlogListing: 'https://images.unsplash.com/photo-1682687220795-796d3f6f7000?w=1920&q=80',

  // Feature cards
  divingSchool: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  reefExploration: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
  wreckDiving: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80',
  advancedCourses: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',

  // Blog post images
  thistlegorm: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&q=80',
  rassMohammed: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&q=80',
  safetyGuide: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',

  // Placeholder logos
  logo: '/logo.svg',
  logoWhite: '/logo-white.svg',
} as const

export type Images = typeof images
