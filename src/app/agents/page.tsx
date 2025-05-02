import { Card, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Insurance Agent Portal | Exclusive Leads | QuoteLinker',
  description: 'Join QuoteLinker\'s exclusive network of insurance agents. Get access to high-intent leads with ZIP code exclusivity and Stripe-powered billing.',
  openGraph: {
    title: 'Insurance Agent Portal | QuoteLinker',
    description: 'Join our exclusive network of top-performing agents. Get high-intent leads with ZIP code exclusivity.',
    images: [{ url: '/images/agent-portal-og.png', width: 1200, height: 630 }],
  },
};

function AgentPageSchema() {
  return (
    <Script
      id="agent-page-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': 'https://www.quotelinker.com/#organization',
              name: 'QuoteLinker',
              url: 'https://www.quotelinker.com',
              description: 'Insurance lead generation platform connecting high-intent buyers with licensed agents.',
              logo: 'https://www.quotelinker.com/logo.png',
            },
            {
              '@type': 'Service',
              '@id': 'https://www.quotelinker.com/agents#service',
              name: 'QuoteLinker Agent Network',
              provider: {
                '@id': 'https://www.quotelinker.com/#organization'
              },
              description: 'Exclusive insurance lead generation service for licensed agents with ZIP code exclusivity.',
              areaServed: 'US',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Insurance Lead Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Exclusive Insurance Leads',
                      description: 'High-intent insurance leads with ZIP code exclusivity'
                    },
                    priceSpecification: {
                      '@type': 'PriceSpecification',
                      price: '0',
                      priceCurrency: 'USD',
                      description: 'Pay per lead pricing'
                    }
                  }
                ]
              }
            }
          ]
        })
      }}
    />
  );
}

export default function AgentsPage() {
  return (
    <>
      <AgentPageSchema />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Grow Your Agency with Exclusive, High-Intent Leads
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our exclusive network of top-performing agents and get access to premium, high-converting leads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <h3 className="text-2xl font-bold text-gray-900">100% Exclusive</h3>
                <p className="text-gray-600">
                  Your leads are never shared — guaranteed exclusive by ZIP code.
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <h3 className="text-2xl font-bold text-gray-900">Better Conversions</h3>
                <p className="text-gray-600">
                  Connect with pre-qualified leads that match your expertise.
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <h3 className="text-2xl font-bold text-gray-900">Built for Scale</h3>
                <p className="text-gray-600">
                  Pay per lead with Stripe-powered billing — no contracts required.
                </p>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner with QuoteLinker?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Leads</h3>
                <p className="text-gray-600">
                  Connect with insurance buyers who are actively seeking coverage and ready to make a
                  decision.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching</h3>
                <p className="text-gray-600">
                  Our AI matches you with leads that align with your expertise and target market.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Integration</h3>
                <p className="text-gray-600">
                  Seamlessly integrate our lead system with your existing workflow and CRM.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join QuoteLinker today and start receiving high-quality leads that convert.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/agents/apply"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#00EEFD] hover:bg-[#00D4E5] transition-colors duration-200"
                >
                  Apply for Access
                </Link>
                <Link
                  href="https://calendly.com/quotelinker/agent-consultation"
                  className="inline-flex items-center px-6 py-3 border border-[#00EEFD] text-base font-medium rounded-lg text-[#00EEFD] hover:bg-[#00EEFD] hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
