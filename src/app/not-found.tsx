import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Page not found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for. Please check the URL or return to our homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-2 bg-electric-blue text-white rounded-lg hover:bg-[#00D4E5] transition-colors shadow-brand hover:shadow-lg"
          >
            Return home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
} 