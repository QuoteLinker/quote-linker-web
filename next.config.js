/** @type {import('next').NextConfig} */

// Import the required packages
var bundleAnalyzer = require('@next/bundle-analyzer');
var nextMDX = require('@next/mdx');

var withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

var withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // remarkPlugins: [],
    // rehypePlugins: [],
    // Remove providerImportSource as it's not needed with Next.js App Router
  },
});

var nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimize production builds
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  
  // Enable image optimization
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
  headers: function() {
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