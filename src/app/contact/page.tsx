import { Metadata } from 'next';
import { SUPPORT } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the QuoteLinker team for support and inquiries.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-white min-h-[calc(100vh-var(--header-height,4rem)-var(--footer-height,10rem))]"> {/* Added bg-white and min-height */}
      <article className="prose prose-lg prose-blue mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1> {/* Centered title */}
        
        <div className="bg-gray-50 rounded-lg p-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
            {SUPPORT.email ? (
              <a href={`mailto:${SUPPORT.email}`} className="text-blue-600 hover:text-blue-800 break-all">
                {SUPPORT.email}
              </a>
            ) : (
              <p className="text-gray-500">N/A</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
            {SUPPORT.phone ? (
              <a href={`tel:${SUPPORT.phone}`} className="text-blue-600 hover:text-blue-800">
                {SUPPORT.phone}
              </a>
            ) : (
              <p className="text-gray-500">N/A</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Legal Address</h3>
            <p className="text-gray-700">{SUPPORT.address?.legal || 'N/A'}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Mailing Address</h3>
            <p className="text-gray-700">{SUPPORT.address?.mailing || 'N/A'}</p>
          </div>
        </div>
      </article>
    </div>
  );
}