/**
 * Red Sea Diving - Image paths
 * Local real photos organized by semantic purpose
 */

export const images = {
  // Hero backgrounds
  heroSSI: '/images/underwater/underwater-diver-pink-soft-coral.jpg',
  heroRutaNorte: '/images/underwater/underwater-coral-reef-anthias-fish.jpg',
  heroPecios: '/images/wrecks/underwater-wreck-bow-shipwreck.jpg',
  heroAdvancedOW: '/images/underwater/underwater-dolphins-pod-surface.jpg',
  heroBlogListing: '/images/boat/boat-aerial-anchored-reef.jpg',

  // Feature cards
  divingSchool: '/images/underwater/underwater-diver-pink-soft-coral.jpg',
  reefExploration: '/images/underwater/underwater-coral-reef-anthias-fish.jpg',
  wreckDiving: '/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg',
  advancedCourses: '/images/deck/deck-dive-station-gear-rack.jpg',

  // Blog post images
  thistlegorm: '/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg',
  rassMohammed: '/images/underwater/underwater-coral-reef-anthias-fish.jpg',
  safetyGuide: '/images/deck/deck-dive-station-gear-rack.jpg',

  // Logos (unchanged)
  logo: '/logo.svg',
  logoWhite: '/logo-white.svg',

  // --- Boat ---
  boatExterior: '/images/boat/boat-exterior-side-profile.jpg',
  boatAerial: '/images/boat/boat-aerial-anchored-reef.jpg',

  // --- Deck ---
  deckAftLounge: '/images/deck/deck-aft-lounge-divers-fleet-flag.jpg',
  deckDiveStation: '/images/deck/deck-dive-station-gear-rack.jpg',
  deckLounge: '/images/deck/deck-lounge-beanbags-seating.jpg',
  deckSwimPlatform: '/images/deck/deck-swim-platform-sea-access.jpg',
  sundeckJacuzzi: '/images/deck/sundeck-jacuzzi-sea-view.jpg',
  sundeckLoungers: '/images/deck/sundeck-loungers-glass-railing.jpg',
  sundeckUpperLounge: '/images/deck/sundeck-upper-lounge-sofas.jpg',

  // --- Dining ---
  diningBuffet: '/images/dining/dining-buffet-seafood-spread.jpg',
  diningRoomDark: '/images/dining/dining-room-dark-tablecloths-chafing.jpg',
  diningRoomTable: '/images/dining/dining-room-table-setting.jpg',

  // --- Cabins ---
  cabinDoubleOcean: '/images/cabins/cabin-double-bed-ocean-window.jpg',
  cabinDoublePortholes: '/images/cabins/cabin-double-bed-portholes-white.jpg',
  cabinSingle: '/images/cabins/cabin-single-bed-desk-bathroom.jpg',
  cabinTwinBathroom: '/images/cabins/cabin-twin-beds-bathroom-ensuite.jpg',
  cabinTwinMirror: '/images/cabins/cabin-twin-beds-mirror.jpg',
  cabinTwinWhite: '/images/cabins/cabin-twin-white-ambient-lighting.jpg',

  // --- Underwater ---
  stingray: '/images/underwater/underwater-blue-spotted-stingray.jpg',
  coralReefAnthias: '/images/underwater/underwater-coral-reef-anthias-fish.jpg',
  diverPinkCoral: '/images/underwater/underwater-diver-pink-soft-coral.jpg',
  dolphinsPodReef: '/images/underwater/underwater-dolphins-pod-reef.jpg',
  dolphinsPodSurface: '/images/underwater/underwater-dolphins-pod-surface.jpg',
  hammerheadSharks: '/images/underwater/underwater-hammerhead-sharks-pair.jpg',
  whitetipSharkBelow: '/images/underwater/underwater-oceanic-whitetip-shark-below.jpg',
  whitetipSharkPilotfish: '/images/underwater/underwater-oceanic-whitetip-shark-pilotfish.jpg',
  seaTurtleFishSchool: '/images/underwater/underwater-sea-turtle-fish-school.jpg',

  // --- Wrecks ---
  wreckBowShipwreck: '/images/wrecks/underwater-wreck-bow-shipwreck.jpg',
  wreckMotorcycleThistlegorm: '/images/wrecks/underwater-wreck-motorcycle-thistlegorm.jpg',

  // --- Landmarks ---
  brothersLighthouse: '/images/landmarks/landmark-brothers-island-lighthouse.jpg',
  daedalusLighthouse: '/images/landmarks/landmark-daedalus-reef-lighthouse.jpg',

  // --- Salon ---
  salonLounge: '/images/salon/salon-lounge-sofas-pillows.jpg',

  // --- Equipment ---
  zodiacDinghies: '/images/equipment/boat-zodiac-dinghies-aerial.jpg',
} as const

export type Images = typeof images
