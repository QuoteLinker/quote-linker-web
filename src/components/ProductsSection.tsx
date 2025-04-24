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
    className="block bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
  >
    <div className="flex justify-center mb-6">
      <div className="text-[#00F6FF] w-14 h-14 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">{title}</h3>
    <p className="text-[#1A1A1A] opacity-75 leading-relaxed mb-6">{description}</p>
    <div className="flex items-center justify-center text-[#00F6FF] font-semibold group/link">
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
      title: "Auto Insurance",
      description: "Protect your vehicle with comprehensive coverage tailored to your needs. Get competitive rates and flexible payment options.",
      href: "/auto",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h9a2 2 0 012 2v2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "Home Insurance",
      description: "Safeguard your home and belongings with comprehensive property coverage. Protect what matters most to you.",
      href: "/home",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "Life Insurance",
      description: "Ensure your family's financial security with a life insurance policy that fits your needs and provides peace of mind.",
      href: "/life",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white to-[#F9FBFC] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-5"></div>
      <div className="container relative mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-6">
            Our Insurance Products
          </h2>
          <p className="text-xl text-[#1A1A1A] opacity-80 max-w-2xl mx-auto">
            Find the perfect coverage for every aspect of your life
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description={product.description}
              icon={product.icon}
              href={product.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 