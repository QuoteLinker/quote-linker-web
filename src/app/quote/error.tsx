'use client';
import Link from 'next/link';

interface QuoteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function QuoteError({ error, reset }: QuoteErrorProps) {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-bold">Oops—something went wrong loading this page.</h1>
      <p className="mt-4">
        Our team has been notified. Please{' '}
        <button onClick={reset} className="underline">try again</button> or{' '}
        <Link href="/" className="underline">return home</Link>.
      </p>
    </div>
  );
} 