import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Logo from '@/components/Logo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuoteLinker - Smarter Insurance Starts Here',
  description: 'Get personalized quotes from licensed local agents—faster, easier, and tailored to you',
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
      <body className={`${inter.className} bg-brand-background text-brand-body h-full`}>
        <div className="min-h-full flex flex-col">
          <header className="sticky top-0 z-50 bg-brand-card shadow-brand">
            <nav className="container mx-auto">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <div className="flex-shrink-0">
                  <a href="/" className="flex items-center">
                    <Logo />
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/auto" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-brand-body hover:text-brand-primary border-b-2 border-transparent hover:border-brand-primary transition-colors">
                    Auto Insurance
                  </a>
                  <a href="/home" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-brand-body hover:text-brand-primary border-b-2 border-transparent hover:border-brand-primary transition-colors">
                    Home Insurance
                  </a>
                  <a href="/life" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-brand-body hover:text-brand-primary border-b-2 border-transparent hover:border-brand-primary transition-colors">
                    Life Insurance
                  </a>
                </div>
                <div className="flex items-center">
                  <a
                    href="/agents"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-xl text-brand-headline bg-brand-primary hover:bg-brand-secondary transform hover:scale-105 transition-all duration-200 shadow-brand"
                  >
                    For Agents
                  </a>
                </div>
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