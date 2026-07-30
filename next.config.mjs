/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: process.env.NODE_ENV === 'development' ? 0 : 86400,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  async headers() {
    const isDev = process.env.NODE_ENV === 'development'
    const longCache = isDev
      ? []
      : [
          {
            source: '/_next/static/:path*',
            headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
          },
          {
            source: '/fonts/:path*',
            headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
          },
          {
            source: '/images/:path*',
            headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
          },
        ]
    return [
      ...longCache,
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ]
  },
}

export default nextConfig
