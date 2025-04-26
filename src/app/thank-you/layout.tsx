import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You - QuoteLinker',
  description: 'Thank you for your interest in QuoteLinker. We will contact you shortly.',
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 