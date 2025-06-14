import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Get Your Insurance Quote',
  description: 'Start your free insurance quote process with QuoteLinker. We connect you with trusted local agents for the best rates.',
};

export default function GetQuotePage() {
  return (
    <div className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
          Ready to Find Your Perfect Policy?
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 mb-12">
          Getting an insurance quote is quick and easy. We&apos;ll connect you with experienced agents who can help you find the best coverage for your needs, whether it&apos;s life, auto, home, or health insurance.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/quote?type=life" // Updated to direct to the quote funnel
            className="rounded-md bg-cyan-500 px-6 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-colors"
          >
            Get Your Free Life Insurance Quote
          </Link>
        </div>
        <p className="mt-10 text-md text-gray-500">
          Need a different type of insurance? Explore all our options on the <Link href="/" className="font-semibold text-cyan-600 hover:text-cyan-500">homepage</Link>.
        </p>
      </div>
    </div>
  );
}