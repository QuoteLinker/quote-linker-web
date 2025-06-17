import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Insurance Quotes | Comprehensive Coverage | QuoteLinker',
  description: 'Find health insurance that fits your needs and budget. Compare quotes for comprehensive, short-term disability, and supplemental coverage.',
  openGraph: {
    title: 'Health Insurance Quotes | Comprehensive Coverage | QuoteLinker',
    description: 'Find health insurance that fits your needs and budget. Compare quotes for comprehensive, short-term disability, and supplemental coverage.',
    images: [{ 
      url: '/images/health-og-image.png', 
      width: 1200, 
      height: 630,
      alt: 'Health Insurance Quotes | QuoteLinker'
    }],
    type: 'website',
    locale: 'en_US',
    siteName: 'QuoteLinker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Insurance Quotes | Comprehensive Coverage | QuoteLinker',
    description: 'Find health insurance that fits your needs and budget. Compare quotes for comprehensive, short-term disability, and supplemental coverage.',
    images: [{ 
      url: '/images/health-twitter-image.png', 
      width: 1200, 
      height: 628,
      alt: 'Health Insurance Quotes | QuoteLinker'
    }],
  },
  alternates: {
    canonical: 'https://quotelinker.com/health',
  },
};