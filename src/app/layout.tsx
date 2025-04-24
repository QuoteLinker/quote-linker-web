import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Logo from '@/components/Logo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuoteLinker - Find Your Perfect Insurance Match',
  description: 'Connect with licensed insurance agents and get personalized quotes for auto, home, and life insurance.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} bg-brand-background min-h-screen`}>
        <div className="min-h-full flex flex-col">
          <header className="sticky top-0 z-50 bg-brand-card shadow-sm">
            <nav className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <a href="/" className="text-brand-primary font-bold text-xl">
                  QuoteLinker
                </a>
                <div className="hidden md:flex space-x-8">
                  <a href="/auto" className="text-brand-body hover:text-brand-primary transition-colors">
                    Auto Insurance
                  </a>
                  <a href="/home" className="text-brand-body hover:text-brand-primary transition-colors">
                    Home Insurance
                  </a>
                  <a href="/life" className="text-brand-body hover:text-brand-primary transition-colors">
                    Life Insurance
                  </a>
                </div>
                <a
                  href="#quote-form"
                  className="bg-brand-primary hover:bg-brand-secondary text-black px-6 py-2 rounded-lg shadow-brand transition-all duration-200 transform hover:scale-105"
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
        </div>
      </body>
    </html>
  );
} 