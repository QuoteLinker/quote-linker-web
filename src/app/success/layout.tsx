import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You | QuoteLinker',
  description: 'Thank you for submitting your insurance quote request. A licensed agent will contact you shortly.',
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cool-gray">
      {children}
    </div>
  );
} 