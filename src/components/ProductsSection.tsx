import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const ProductCard = ({ title, description, icon, href }: ProductCardProps) => (
  <a 
    href={href}
    className="block bg-brand-card p-6 rounded-2xl shadow-brand transition hover:shadow-2xl hover:scale-105 group"
  >
    <div className="flex justify-center mb-6">
      <div className="w-10 h-10 text-brand-primary transform transition-transform group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
    </div>
    <h3 className="text-lg font-semibold text-brand-headline mt-4">{title}</h3>
    <p className="text-sm text-brand-body opacity-75 mt-2 mb-6">{description}</p>
    <div className="flex items-center justify-center text-brand-primary font-semibold group/link">
      Get a Quote
      <svg 
        className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </div>
  </a>
);

export default function ProductsSection() {
  const products = [
    {
      title: 'Auto Insurance',
      description: 'Protect your vehicle with comprehensive coverage tailored to your needs. Get competitive rates and flexible payment options.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h9a2 2 0 012 2v2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      href: '/auto'
    },
    {
      title: 'Home Insurance',
      description: 'Safeguard your home and belongings with comprehensive property coverage. Protect what matters most to you.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      href: '/home'
    },
    {
      title: 'Life Insurance',
      description: 'Ensure your family\'s financial security with a life insurance policy that fits your needs and provides peace of mind.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      href: '/life'
    },
    {
      title: 'Disability Insurance',
      description: 'Protect your income if you become unable to work due to illness or injury. Secure your financial future today.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '/disability'
    },
    {
      title: 'Health Insurance',
      description: 'Access quality healthcare with comprehensive health insurance plans designed to meet your medical needs and budget.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      href: '/health'
    }
  ]
  
  return (
    <section className="py-24 bg-gradient-to-b from-brand-card to-brand-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-5"></div>
      
      <div className="container relative mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-headline mb-6">
            Our Insurance Products
          </h2>
          <p className="text-xl text-brand-body opacity-80 max-w-2xl mx-auto">
            Find the perfect coverage for every aspect of your life
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <a 
              key={product.title}
              href={product.href}
              className="block bg-brand-card p-8 rounded-2xl shadow-brand hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 text-brand-primary transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                  {product.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-brand-headline mt-4">{product.title}</h3>
              <p className="text-brand-body opacity-75 mt-2 mb-6">{product.description}</p>
              <div className="flex items-center justify-center text-brand-primary font-semibold group/link">
                Get a Quote
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
} 