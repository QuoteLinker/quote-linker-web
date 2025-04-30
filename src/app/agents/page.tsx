import { Card, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Network of Insurance Agents
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with high-intent insurance buyers and grow your business with QuoteLinker.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <h3 className="text-2xl font-bold text-gray-900">More Leads</h3>
              <p className="text-gray-600">
                Access our network of insurance buyers actively seeking coverage.
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
              <h3 className="text-2xl font-bold text-gray-900">Grow Your Business</h3>
              <p className="text-gray-600">
                Scale your agency with a steady stream of quality leads.
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
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#00EEFD] hover:bg-[#00D4E5] transition-colors duration-200"
            >
              Get Started Now
            </Link>
          </div>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <h3 className="text-2xl font-bold text-gray-900">Earn More</h3>
            <p className="text-gray-600">
              Access our network of insurance carriers and earn higher commissions with our
              competitive rates.
            </p>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
