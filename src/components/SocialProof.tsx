'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    id: 1,
    quote: "QuoteLinker made finding the right insurance policy incredibly easy. Their agents were knowledgeable and helped me save over $500 annually!",
    author: "Sarah M.",
    role: "Homeowner",
  },
  {
    id: 2,
    quote: "I was impressed by how quickly I received quotes from multiple reputable insurance providers. The process was seamless and transparent.",
    author: "Michael R.",
    role: "Business Owner",
  },
  {
    id: 3,
    quote: "The personalized service I received was outstanding. They took the time to understand my needs and found me the perfect coverage.",
    author: "Jennifer L.",
    role: "First-time Insurance Buyer",
  },
];

const partnerLogos = [
  { id: 1, name: "Insurance Partner 1", logo: "/logos/partner1.svg" },
  { id: 2, name: "Insurance Partner 2", logo: "/logos/partner2.svg" },
  { id: 3, name: "Insurance Partner 3", logo: "/logos/partner3.svg" },
  { id: 4, name: "Insurance Partner 4", logo: "/logos/partner4.svg" },
];

export default function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-brand-card">
      <div className="container mx-auto px-6">
        {/* Partner Logos */}
        <div className="mb-16">
          <h3 className="text-center text-xl font-semibold text-brand-headline mb-8">
            Trusted by Leading Insurance Providers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {partnerLogos.map((partner) => (
              <div key={partner.id} className="w-32 h-16 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-xl font-semibold text-brand-headline mb-12">
            What Our Customers Say
          </h3>
          <div className="relative">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 text-brand-body hover:text-brand-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="text-center px-16">
              <blockquote className="text-xl text-brand-body mb-6">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <cite className="not-italic">
                <span className="font-semibold text-brand-headline">
                  {testimonials[currentTestimonial].author}
                </span>
                <span className="text-brand-body ml-2">
                  {testimonials[currentTestimonial].role}
                </span>
              </cite>
            </div>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 text-brand-body hover:text-brand-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 