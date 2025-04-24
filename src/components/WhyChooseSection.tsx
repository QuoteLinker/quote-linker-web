import React from 'react';

interface BenefitProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Benefit = ({ title, description, icon }: BenefitProps) => (
  <div className="bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
    <div className="flex justify-center mb-6">
      <div className="text-[#00F6FF] w-12 h-12 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">{title}</h3>
    <p className="text-[#1A1A1A] opacity-75 leading-relaxed">{description}</p>
  </div>
);

export default function WhyChooseSection() {
  const benefits = [
    {
      title: "Licensed Agents",
      description: "Connect with vetted, licensed insurance professionals in your area who understand your specific needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Personalized Quotes",
      description: "Get tailored insurance quotes that perfectly match your coverage needs and budget requirements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: "Fast & Easy",
      description: "Our streamlined process takes minutes, not hours. Get matched with the right insurance coverage quickly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-[#F9FBFC] to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-5"></div>
      <div className="container relative mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-6">
            Why Choose QuoteLinker?
          </h2>
          <p className="text-xl text-[#1A1A1A] opacity-80 max-w-2xl mx-auto">
            We make insurance simple, personal, and hassle-free
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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