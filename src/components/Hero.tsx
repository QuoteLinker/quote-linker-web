import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-brand-background overflow-hidden">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-headline leading-tight">
              Find the Perfect Insurance Coverage for Your Needs with a Licensed Agent, Powered by AI
            </h1>
            <p className="text-lg md:text-xl text-brand-body">
              Compare coverage options from top insurance providers and save money. Get started in minutes with our easy-to-use platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#quote-form"
                className="inline-flex justify-center items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary-dark transition-colors"
              >
                Get Your Free Quote
              </Link>
              <Link
                href="/about"
                className="inline-flex justify-center items-center px-8 py-4 bg-brand-card text-brand-headline font-semibold rounded-xl hover:bg-brand-card-hover transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/images/hero-image.jpg"
              alt="Insurance coverage illustration"
              fill
              className="object-cover rounded-2xl shadow-brand"
              priority
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-background to-transparent" />
    </section>
  );
} 