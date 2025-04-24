import React from 'react';

interface BenefitProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Benefit = ({ title, description, icon }: BenefitProps) => (
  <div className="bg-brand-card shadow-brand p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-200">
    <div className="flex justify-center mb-4">
      <div className="text-brand-primary w-12 h-12">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold text-brand-headline mb-2">{title}</h3>
    <p className="text-brand-body opacity-80">{description}</p>
  </div>
);

export default function WhyChooseSection() {
  const benefits = [
    {
      title: "Local Expertise",
      description: "Connect with licensed agents in your area who understand your specific needs and local requirements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Personalized Quotes",
      description: "Get tailored insurance quotes that match your specific coverage needs and budget.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: "Fast & Easy",
      description: "Simple process that takes minutes, not hours. Get matched with the right insurance quickly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-headline mb-4">
            Why Choose QuoteLinker
          </h2>
          <p className="text-lg text-brand-body opacity-80 max-w-2xl mx-auto">
            We make insurance simple, personal, and hassle-free
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <Benefit
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 