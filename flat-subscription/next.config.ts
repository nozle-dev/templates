import type { NextConfig } from 'next'

const basePath = process.env.BASE_PATH || ''

const nextConfig: NextConfig = {
  output: 'standalone',
  basePath,
  assetPrefix: basePath,
  images: {
    path: `${basePath}/_next/image`,
  },
  env: {
    NEXT_PUBLIC_DEMO_MODE: process.env.DEMO_MODE ?? 'true',
    NEXT_PUBLIC_NOZLE_API_KEY: process.env.NOZLE_API_KEY?.replace(/^sk_/, 'pk_') ?? '',
  },
}

export default nextConfig
