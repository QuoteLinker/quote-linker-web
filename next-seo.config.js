/** @type {import('next-seo').DefaultSeoProps} */
var defaultSEOConfig = {
  titleTemplate: '%s | QuoteLinker',
  defaultTitle: 'QuoteLinker – Instant, Exclusive Insurance Quotes',
  description: 'Get real-time, local insurance quotes tailored for you.',
  openGraph: { 
    type: 'website', 
    locale: 'en_US', 
    url: process.env.NEXT_PUBLIC_SITE_URL, 
    site_name: 'QuoteLinker' 
  },
  twitter: { 
    handle: '@QuoteLinker', 
    site: '@QuoteLinker', 
    cardType: 'summary_large_image' 
  }
};

module.exports = defaultSEOConfig;
