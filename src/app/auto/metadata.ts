import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Insurance Quotes | Compare & Save | QuoteLinker',
  description: 'Compare personalized auto insurance quotes from top-rated providers. Save up to 30% on premiums by working with trusted local agents.',
  openGraph: {
    title: 'Auto Insurance Quotes | Compare & Save | QuoteLinker',
    description: 'Compare personalized auto insurance quotes from top-rated providers. Save up to 30% on premiums by working with trusted local agents.',
    images: [{ 
      url: '/images/auto-og-image.png', 
      width: 1200, 
      height: 630,
      alt: 'Auto Insurance Quotes | QuoteLinker'
    }],
    type: 'website',
    locale: 'en_US',
    siteName: 'QuoteLinker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Insurance Quotes | Compare & Save | QuoteLinker',
    description: 'Compare personalized auto insurance quotes from top-rated providers. Save up to 30% on premiums by working with trusted local agents.',
    images: [{ 
      url: '/images/auto-twitter-image.png', 
      width: 1200, 
      height: 628,
      alt: 'Auto Insurance Quotes | QuoteLinker'
    }],
  },
  alternates: {
    canonical: 'https://quotelinker.com/auto',
  },
};