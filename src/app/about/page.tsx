import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About QuoteLinker',
  description: 'Learn more about QuoteLinker LLC, a SaaS lead generation platform connecting insurance seekers to local agents.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose prose-lg prose-blue mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About QuoteLinker</h1>
        
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          QuoteLinker LLC is a SaaS lead generation platform connecting insurance seekers to local agents via automated funnels and calendar booking. We charge agents per lead at the time of purchase.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Business Details</h2>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center">
              <span className="font-medium text-gray-900 w-32">Legal name:</span>
              <span className="text-gray-700">QuoteLinker LLC</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900 w-32">EIN:</span>
              <span className="text-gray-700">33-4667800</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900 w-32">Industry:</span>
              <span className="text-gray-700">Lead generation</span>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
} 