import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank You - QuoteLinker',
  description: 'Thank you for your interest in our insurance services. We\'ll be in touch shortly.',
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Thank You for Your Interest
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            We've received your information and will be in touch shortly to discuss your insurance needs.
          </p>
        </div>

        <div className="mt-12 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What Happens Next
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-blue-600 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Quick Response</h3>
                <p className="text-gray-600">
                  Our licensed insurance experts will review your information and contact you within 24 hours.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-blue-600 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Personalized Consultation</h3>
                <p className="text-gray-600">
                  We'll schedule a call to discuss your specific needs and provide tailored insurance solutions.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-blue-600 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Email Confirmation</h3>
                <p className="text-gray-600">
                  You'll receive an email confirmation with your quote request details and next steps.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Why Choose QuoteLinker
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <p className="text-gray-600">Licensed Agents</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/contact">
            <Button variant="outline" className="mr-4">
              Contact Us
            </Button>
          </Link>
          <Link href="/">
            <Button>
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
} 