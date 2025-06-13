import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'QuoteLinker Terms of Service - Read about the terms and conditions for using our services.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose prose-lg prose-blue mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <p className="text-gray-600 mb-8">
          This page contains placeholder content for the QuoteLinker Terms of Service.
          Please update this content with your actual terms and conditions.
        </p>
        
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Agreement</h2>
          <p className="text-gray-600">Placeholder content for service agreement terms.</p>
        </section>
        
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Responsibilities</h2>
          <p className="text-gray-600">Placeholder content for user responsibilities and obligations.</p>
        </section>
        
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
          <p className="text-gray-600">Placeholder content for liability limitations and disclaimers.</p>
        </section>
      </article>
    </div>
  );
} 