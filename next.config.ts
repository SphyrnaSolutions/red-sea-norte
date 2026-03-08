import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

const nextConfig: NextConfig = {
  output: 'standalone', // Para Docker
  serverExternalPackages: ['xmlrpc'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      { source: '/blog/giannis-d-abu-nuhas', destination: '/blog/abu-nuhas-cementerio-de-barcos', permanent: true },
      { source: '/blog/dunraven-mar-rojo', destination: '/blog/abu-nuhas-cementerio-de-barcos', permanent: true },
      { source: '/blog/carnatic-abu-nuhas', destination: '/blog/abu-nuhas-cementerio-de-barcos', permanent: true },
      { source: '/blog/camarotes-comida-wifi-liveaboard', destination: '/blog/como-es-un-vida-a-bordo-mar-rojo', permanent: true },
      { source: '/blog/shark-yolanda-reef-mar-rojo', destination: '/blog/ras-mohammed-guia-completa', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'back.redsea.sphyrnasolutions.com',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [75, 90],
  },
};

export default nextConfig;
