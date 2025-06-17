import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Insurance Quotes | Protect Your Property | QuoteLinker',
  description: 'Compare home insurance quotes from trusted providers. Protect your property with comprehensive coverage at competitive rates.',
  openGraph: {
    title: 'Home Insurance Quotes | Protect Your Property | QuoteLinker',
    description: 'Compare home insurance quotes from trusted providers. Protect your property with comprehensive coverage at competitive rates.',
    images: [{ 
      url: '/images/home-og-image.png', 
      width: 1200, 
      height: 630,
      alt: 'Home Insurance Quotes | QuoteLinker'
    }],
    type: 'website',
    locale: 'en_US',
    siteName: 'QuoteLinker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Insurance Quotes | Protect Your Property | QuoteLinker',
    description: 'Compare home insurance quotes from trusted providers. Protect your property with comprehensive coverage at competitive rates.',
    images: [{ 
      url: '/images/home-twitter-image.png', 
      width: 1200, 
      height: 628,
      alt: 'Home Insurance Quotes | QuoteLinker'
    }],
  },
  alternates: {
    canonical: 'https://quotelinker.com/home',
  },
};