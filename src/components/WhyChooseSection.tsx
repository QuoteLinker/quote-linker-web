import React from 'react';

export default function WhyChooseSection() {
  const features = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Licensed Professionals', 
      desc: 'Every agent in our network is fully licensed and vetted to ensure you receive expert guidance.' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast & Free Quotes', 
      desc: 'Get multiple quotes quickly with no obligation, saving you time and money on your insurance needs.' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: 'Top Rated Carriers', 
      desc: 'We partner with only the most trusted insurance providers to ensure you get the best coverage options.' 
    },
  ]
  
  return (
    <section className="py-24 bg-brand-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-5"></div>
      
      <div className="container relative mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-headline mb-6">
            Why Choose QuoteLinker
          </h2>
          <p className="text-xl text-brand-body opacity-80 max-w-2xl mx-auto">
            We're committed to making insurance simple, transparent, and accessible for everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-brand-card p-8 rounded-2xl shadow-brand hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-brand-primary">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-brand-headline">
                {feature.title}
              </h3>
              <p className="mt-2 text-brand-body opacity-75">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 