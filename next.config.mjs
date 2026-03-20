/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // HTTP zu HTTPS redirect
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://xelvetec.com/:path*',
        permanent: true,
      },
      // xelvetec.ch zu xelvetec.com redirect
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'xelvetec.ch' }],
        destination: 'https://xelvetec.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.xelvetec.ch' }],
        destination: 'https://xelvetec.com/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubdomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  productionBrowserSourceMaps: false,
  onDemandEntries: {
    maxInactiveAge: 60000,
    pagesBufferLength: 5,
  },
}

export default nextConfig
