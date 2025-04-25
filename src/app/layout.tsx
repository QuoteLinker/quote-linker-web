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
                {/* Mobile menu button */}
                <button
                  type="button"
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={() => {
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu) {
                      mobileMenu.classList.toggle('hidden');
                    }
                  }}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
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
                  className="hidden md:inline-flex bg-[#00e8ff] hover:bg-[#00cce6] text-black font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                  data-gtm-event="header_cta_click"
                >
                  Get a Quote
                </a>
              </div>
              {/* Mobile menu */}
              <div className="hidden md:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <a href="/auto" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#00e8ff] hover:bg-gray-50">
                    Auto Insurance
                  </a>
                  <a href="/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#00e8ff] hover:bg-gray-50">
                    Home Insurance
                  </a>
                  <a href="/life" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#00e8ff] hover:bg-gray-50">
                    Life Insurance
                  </a>
                  <a href="/disability" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#00e8ff] hover:bg-gray-50">
                    Disability Insurance
                  </a>
                  <a
                    href="/#quote-form"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-[#00e8ff] text-black hover:bg-[#00cce6]"
                    data-gtm-event="mobile_header_cta_click"
                  >
                    Get a Quote
                  </a>
                </div>
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