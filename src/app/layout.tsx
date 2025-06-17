import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";
import { generateOrganizationSchema, generateInsuranceProductSchema } from "@/utils/schema";
import Script from "next/script";

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
    legalName: 'QuoteLinker Insurance Services, LLC',
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
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics />
        )}
        <Toaster position="top-center" />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
