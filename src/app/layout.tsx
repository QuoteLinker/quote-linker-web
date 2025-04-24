import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Logo from '@/components/Logo';
import StickyCTA from '@/components/StickyCTA';

export const metadata: Metadata = {
  title: 'QuoteLinker - Find Your Perfect Insurance Match',
  description: 'Connect with licensed insurance agents and get personalized quotes for auto, home, and life insurance.',
  icons: {
    icon: '/ql.png',
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
        <link rel="icon" href="/ql.png" />
      </head>
      <body className="font-sans bg-white min-h-screen">
        <div className="min-h-full flex flex-col">
          <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4">
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
                  className="inline-flex bg-[#00e8ff] hover:bg-[#00cce6] text-black font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 w-auto"
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