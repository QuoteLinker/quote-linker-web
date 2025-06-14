import { Metadata } from 'next';
import { SUPPORT } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the QuoteLinker team for support and inquiries.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose prose-lg prose-blue mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        
        <div className="bg-gray-50 rounded-lg p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <a href={`mailto:${SUPPORT.email}`} className="text-blue-600 hover:text-blue-800">
              {SUPPORT.email}
            </a>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <a href={`tel:${SUPPORT.phone}`} className="text-blue-600 hover:text-blue-800">
              {SUPPORT.phone}
            </a>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Address</h3>
            <p className="text-gray-700">{SUPPORT.address.legal}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mailing Address</h3>
            <p className="text-gray-700">{SUPPORT.address.mailing}</p>
          </div>
        </div>
      </article>
    </div>
  );
}