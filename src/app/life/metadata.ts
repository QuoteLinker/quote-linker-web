import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Life Insurance Quotes | Protect Your Family | QuoteLinker',
  description: "Secure your family's future with affordable life insurance. Compare personalized quotes for term and whole life policies from top-rated carriers.",
  openGraph: {
    title: 'Life Insurance Quotes | Protect Your Family | QuoteLinker',
    description: "Secure your family's future with affordable life insurance. Compare personalized quotes for term and whole life policies from top-rated carriers.",
    images: [{ 
      url: '/images/life-og-image.png', 
      width: 1200, 
      height: 630,
      alt: 'Life Insurance Quotes | QuoteLinker'
    }],
    type: 'website',
    locale: 'en_US',
    siteName: 'QuoteLinker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Insurance Quotes | Protect Your Family | QuoteLinker',
    description: "Secure your family's future with affordable life insurance. Compare personalized quotes for term and whole life policies from top-rated carriers.",
    images: [{ 
      url: '/images/life-twitter-image.png', 
      width: 1200, 
      height: 628,
      alt: 'Life Insurance Quotes | QuoteLinker'
    }],
  },
  alternates: {
    canonical: 'https://quotelinker.com/life',
  },
};