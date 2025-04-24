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
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} bg-brand-background text-brand-body min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-brand-card shadow-brand sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="/" className="flex items-center">
                      <Logo />
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <a
                    href="/agents"
                    className="ml-8 inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-xl text-sm font-semibold text-brand-headline bg-brand-primary hover:bg-brand-secondary transform hover:scale-105 transition-all duration-200 shadow-brand hover:shadow-brand-lg"
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