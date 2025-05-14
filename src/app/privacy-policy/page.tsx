import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - QuoteLinker',
  description: 'Learn about how QuoteLinker protects your privacy and handles your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          <div className="prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              At QuoteLinker, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our website and services.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Insurance-related information</li>
              <li>Demographic information</li>
              <li>Payment information</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process your insurance quote requests</li>
              <li>Connect you with licensed insurance agents</li>
              <li>Improve our website and services</li>
              <li>Communicate with you about your requests</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We may share your information with licensed insurance agents and providers to help you
              find the best insurance coverage. We do not sell your personal information to third parties.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from
              unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@quotelinker.com" className="text-electric-blue hover:text-electric-blue/80">
                privacy@quotelinker.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-electric-blue hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
} 