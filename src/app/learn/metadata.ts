import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insurance Education Hub | Learn About Coverage | QuoteLinker',
  description:
    'Learn everything you need to know about insurance coverage. Compare products, understand policy types, and make informed decisions for your family.',
  openGraph: {
    title: 'Insurance Learning Hub | QuoteLinker',
    description: 'Learn about insurance coverage, compare products, and make informed decisions with expert guides and resources.',
    images: [{ url: '/images/learn-og-image.png', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_US',
    siteName: 'QuoteLinker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insurance Learning Hub | QuoteLinker',
    description: 'Learn about insurance coverage, compare products, and make informed decisions with expert guides and resources.',
    images: [{ 
      url: '/images/learn-twitter-image.png', 
      width: 1200, 
      height: 628,
      alt: 'Insurance Learning Hub | QuoteLinker'
    }],
  },
  alternates: {
    canonical: 'https://www.quotelinker.com/learn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}; 