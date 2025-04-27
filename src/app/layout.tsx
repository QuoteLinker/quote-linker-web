import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

// GTM ID validation
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
if (!GTM_ID) {
  console.warn('Google Tag Manager ID is not set. Analytics will not be tracked.');
}

const navigation = [
  { name: 'Auto Insurance', href: '/products/auto' },
  { name: 'Home Insurance', href: '/products/home' },
  { name: 'Life Insurance', href: '/products/life' },
  { name: 'Health Insurance', href: '/products/health' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const metadata: Metadata = {
  title: 'QuoteLinker - Insurance Quotes Made Easy',
  description: 'Get competitive insurance quotes from top providers. Compare rates for auto, home, life, and health insurance.',
  metadataBase: new URL('https://quotelinker.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'QuoteLinker - Fast Insurance Quotes Online',
    description: 'Get fast insurance quotes from local licensed agents. Get the best rates on auto, home, life, and disability insurance.',
    url: 'https://quotelinker.com',
    siteName: 'QuoteLinker',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QuoteLinker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuoteLinker - Fast Insurance Quotes Online',
    description: 'Get fast insurance quotes from local licensed agents. Get the best rates on auto, home, life, and disability insurance.',
    images: ['/twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {GTM_ID && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
          >
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </head>
      <body className={`${inter.className} h-full`}>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Navbar />
        {children}
      </body>
    </html>
  );
}