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
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm">
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
                    className="ml-8 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-sm font-semibold text-white bg-brand-primary hover:bg-brand-dark transition-all duration-200 shadow-glow hover:shadow-glow-lg"
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