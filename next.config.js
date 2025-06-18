/** @type {import('next').NextConfig} */
const bundleAnalyzer = require('@next/bundle-analyzer');
const nextMDX = require('@next/mdx');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // remarkPlugins: [],
    // rehypePlugins: [],
    // providerImportSource: "@mdx-js/react",
  },
});

const nextConfig = {
  // --- ADD THIS LINE FOR GOOGLE CLOUD RUN ---
  output: 'standalone',
  // -----------------------------------------

  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // Add 'md' and 'mdx'
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'www.quotelinker.com', 'assets.quotelinker.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  env: {
    SENTRY_DSN_CLIENT: process.env.SENTRY_DSN_CLIENT,
    SENTRY_DSN_SERVER: process.env.SENTRY_DSN_SERVER,
  },
  // integrate next-sitemap plugin
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'lodash'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

// Apply MDX and Bundle Analyzer to the Next.js config
module.exports = withBundleAnalyzer(withMDX(nextConfig));