import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Logo from '@/components/Logo';
import StickyCTA from '@/components/StickyCTA';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'QuoteLinker - Find Your Perfect Insurance Match',
    template: '%s | QuoteLinker Insurance Quotes'
  },
  description: 'Connect with licensed insurance agents in Minnesota and get personalized quotes for auto, home, life, health, and disability insurance.',
  keywords: ['insurance quotes', 'auto insurance', 'home insurance', 'life insurance', 'health insurance', 'disability insurance', 'Minnesota insurance', 'licensed insurance agent'],
  authors: [{ name: 'QuoteLinker' }],
  creator: 'QuoteLinker',
  publisher: 'QuoteLinker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/ql.png',
    apple: '/ql.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <GoogleAnalytics />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <link rel="icon" href="/ql.png" />
      </head>
      <body className="font-sans bg-white min-h-screen">
        <div className="min-h-full flex flex-col">
          <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <a href="/" className="flex items-center hover:opacity-90 transition-opacity">
                  <Logo />
                </a>
                <div className="hidden md:flex space-x-8">
                  <a href="/auto" className="text-gray-600 hover:text-[#00e8ff] transition-colors">
                    Auto Insurance
                  </a>
                  <a href="/home" className="text-gray-600 hover:text-[#00e8ff] transition-colors">
                    Home Insurance
                  </a>
                  <a href="/life" className="text-gray-600 hover:text-[#00e8ff] transition-colors">
                    Life Insurance
                  </a>
                  <a href="/disability" className="text-gray-600 hover:text-[#00e8ff] transition-colors">
                    Disability Insurance
                  </a>
                </div>
                <a
                  href="/#quote-form"
                  className="inline-flex bg-[#00e8ff] hover:bg-[#00cce6] text-black font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                  data-gtm-event="header_cta_click"
                >
                  Get a Quote
                </a>
              </div>
            </nav>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          <Footer />
          <StickyCTA />
        </div>
      </body>
    </html>
  );
} 