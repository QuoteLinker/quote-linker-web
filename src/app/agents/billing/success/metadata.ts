import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription Confirmed - QuoteLinker Agent Portal',
  description: 'Your subscription to QuoteLinker Agent Portal has been successfully processed. Start accessing exclusive insurance leads right away.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Subscription Confirmed - QuoteLinker Agent Portal',
    description: 'Your subscription to QuoteLinker Agent Portal has been successfully processed. Start accessing exclusive insurance leads right away.',
    images: [{ 
      url: '/images/agents-og-image.png', 
      width: 1200, 
      height: 630,
      alt: 'QuoteLinker Agent Portal - Subscription Success'
    }],
    type: 'website',
  }
};
