import { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm'; // Import the QuoteForm

export const metadata: Metadata = {
  title: 'Get Your Insurance Quote - QuoteLinker',
  description: 'Start your free insurance quote process with QuoteLinker. We connect you with trusted local agents for the best rates on auto, home, life, and health insurance.',
};

export default function GetQuotePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 md:py-16 bg-slate-50 px-4 sm:px-6 lg:px-8"> {/* Centering classes added */}
      {/* Container for the form itself, which will be centered by the parent flexbox. max-w-3xl can remain to control form width. */}
      {/* The QuoteForm component will handle its own title and layout */}
      {/* It can also pick up the 'type' query param if present */}
      <QuoteForm />
    </div>
  );
}