import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import { TrustProvider } from '@/components/trust/TrustProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: {
    default: 'QuoteLinker - Turn Old Leads Into New Premium',
    template: '%s | QuoteLinker',
  },
  description:
    'Connect with qualified insurance leads and grow your business with our AI-powered platform. Trusted by agents nationwide.',
  metadataBase: new URL('https://www.quotelinker.com'),
  keywords: [
    'insurance leads',
    'lead generation',
    'insurance agents',
    'lead management',
    'insurance sales',
    'lead conversion',
    'insurance marketing',
    'lead nurturing',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'QuoteLinker - Turn Old Leads Into New Premium',
    description: 'Connect with qualified insurance leads and grow your business with our AI-powered platform. Trusted by agents nationwide.',
    url: 'https://www.quotelinker.com',
    siteName: 'QuoteLinker',
    images: [
      {
        url: '/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QuoteLinker - Insurance Lead Generation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuoteLinker - Turn Old Leads Into New Premium',
    description: 'Connect with qualified insurance leads and grow your business with our AI-powered platform.',
    images: ['/icons/og-image.png'],
    creator: '@quotelinker',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://www.quotelinker.com',
  },
};

export const viewport: Viewport = {
  themeColor: '#00EEFD',
};

// GTM functions
function GoogleTagManagerHead() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) return null;

  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  );
}

function GoogleTagManagerBody() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

function OrganizationSchema() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'QuoteLinker',
          url: 'https://www.quotelinker.com',
          logo: 'https://www.quotelinker.com/quotelinker_logo.png',
          sameAs: [
            'https://www.facebook.com/quotelinker',
            'https://twitter.com/quotelinker',
            'https://www.linkedin.com/company/quotelinker',
          ],
        }),
      }}
    />
  );
}

function BreadcrumbSchema() {
  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.quotelinker.com',
            },
          ],
        }),
      }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#00EEFD" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="QuoteLinker - Turn Old Leads Into New Premium" />
        <meta
          property="og:description"
          content="Connect with qualified insurance leads and grow your business with our AI-powered platform. Trusted by agents nationwide."
        />
        <meta property="og:image" content="https://www.quotelinker.com/icons/og-image.png" />
        <meta property="og:url" content="https://www.quotelinker.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <GoogleTagManagerHead />
        <OrganizationSchema />
        <BreadcrumbSchema />
      </head>
      <body className={inter.className}>
        <GoogleTagManagerBody />
        <ErrorBoundary>
          <TrustProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary>
                <Header />
              </ErrorBoundary>
              <PageTransition>
                <main className="min-h-screen bg-gray-50">
                  <ErrorBoundary>
                    {children}
                  </ErrorBoundary>
                </main>
              </PageTransition>
              <BackToTop />
              <ErrorBoundary>
                <Footer />
              </ErrorBoundary>
            </Suspense>
          </TrustProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
