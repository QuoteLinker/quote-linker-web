import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Toaster } from "react-hot-toast";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";
import { generateOrganizationSchema, generateInsuranceProductSchema } from "@/utils/schema";
import Script from "next/script";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | QuoteLinker',
    default: 'QuoteLinker - Your Link to Smarter Insurance',
  },
  description: "Compare insurance quotes for auto, home, life, and health from trusted local agents. Get personalized rates in minutes.",
  keywords: "insurance quotes, auto insurance, home insurance, life insurance, health insurance, insurance comparison, local agents",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'QuoteLinker - Your Link to Smarter Insurance',
    description: 'Compare personalized insurance quotes for auto, home, life, and health from trusted local agents. Save up to 30% on coverage.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com',
    siteName: 'QuoteLinker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QuoteLinker - Your Link to Smarter Insurance',
        type: 'image/png',
        secureUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/og-image.png`,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuoteLinker - Your Link to Smarter Insurance',
    description: 'Compare personalized insurance quotes for auto, home, life, and health from trusted local agents. Save up to 30% on coverage.',
    images: [
      {
        url: '/twitter-image.png',
        width: 1200,
        height: 628,
        alt: 'QuoteLinker - Your Link to Smarter Insurance',
      }
    ],
    creator: '@QuoteLinker',
    site: '@QuoteLinker',
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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate organization schema
  const organizationSchema = generateOrganizationSchema({
    name: 'QuoteLinker',
    legalName: 'QuoteLinker LLC',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/logo.svg`,
    description: 'QuoteLinker connects consumers with trusted insurance agents for auto, home, life, and health insurance quotes.',
    sameAs: [
      'https://www.facebook.com/quotelinker',
      'https://twitter.com/quotelinker',
      'https://www.linkedin.com/company/quotelinker'
    ]
  });

  // Generate insurance products schema
  const productsSchema = generateInsuranceProductSchema([
    {
      name: 'Auto Insurance',
      description: 'Compare auto insurance quotes from multiple carriers to find the best coverage at the best price.',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/auto`,
      image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/images/auto-insurance.jpg`
    },
    {
      name: 'Home Insurance',
      description: 'Protect your home with the right coverage. Compare home insurance quotes from trusted providers.',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/home`,
      image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/images/home-insurance.jpg`
    },
    {
      name: 'Life Insurance',
      description: 'Find affordable life insurance coverage to protect your loved ones. Compare quotes from top-rated carriers.',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/life`,
      image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/images/life-insurance.jpg`
    },
    {
      name: 'Health Insurance',
      description: 'Get the health coverage you need at a price you can afford. Compare health insurance quotes now.',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/health`,
      image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/images/health-insurance.jpg`
    }
  ]);

  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Mobile viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Open Graph meta tags */}
        <meta property="og:title" content="QuoteLinker - Your Link to Smarter Insurance" />
        <meta property="og:description" content="Compare insurance quotes for auto, home, life, and health from trusted local agents. Get personalized rates in minutes." />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/og-image.png`} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'} />
        <meta property="og:type" content="website" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="QuoteLinker - Your Link to Smarter Insurance" />
        <meta name="twitter:description" content="Compare insurance quotes for auto, home, life, and health from trusted local agents. Get personalized rates in minutes." />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://quotelinker.com'}/twitter-image.png`} />
        <meta name="twitter:site" content="@QuoteLinker" />
        <meta name="twitter:creator" content="@QuoteLinker" />
        {/* Preload critical font */}
        <link rel="preload" href="/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Structured Data */}
        <Script id="ld-org" type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "QuoteLinker",
            "url": "https://www.quotelinker.com",
            "logo": "https://www.quotelinker.com/quotelinker_logo.png",
            "sameAs": ["https://www.facebook.com/quotelinker","https://twitter.com/quotelinker"]
          }`}
        </Script>
        <Script id="ld-breadcrumb" type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": []
          }`}
        </Script>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationSchema }}
        />
        <Script
          id="products-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: productsSchema }}
        />
      </head>
      <body className={`${inter.className} bg-background-primary flex flex-col min-h-screen text-text-body`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics />
        )}
        <Toaster position="top-center" />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
