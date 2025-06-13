import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'QuoteLinker Privacy Policy - Learn how we protect and handle your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose prose-lg prose-blue mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <p className="text-gray-600 mb-8">
          This page contains placeholder content for the QuoteLinker Privacy Policy.
          Please update this content with your actual privacy policy terms and conditions.
        </p>
        
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Collection</h2>
          <p className="text-gray-600">Placeholder content for information collection policies.</p>
        </section>
        
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Usage</h2>
          <p className="text-gray-600">Placeholder content for data usage policies.</p>
        </section>
        
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <p className="text-gray-600">Placeholder content for contact information related to privacy concerns.</p>
        </section>
      </article>
    </div>
  );
} 