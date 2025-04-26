import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { ReactNode } from 'react'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

// GTM ID validation
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
if (!GTM_ID) {
  console.warn('Google Tag Manager ID is not set. Analytics will not be tracked.');
}

export const metadata: Metadata = {
  title: 'QuoteLinker',
  description: 'Connect with a local and licensed insurance agent',
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
  children: ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Google Tag Manager */}
        {GTM_ID && (
          <>
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');
                `,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}
      </head>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
} 