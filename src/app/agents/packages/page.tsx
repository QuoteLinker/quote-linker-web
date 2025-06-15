'use client';

import Link from 'next/link';

export default function AgentPackagesPage() {
  const availablePackages = [
    { id: 'auto_basic', name: 'Auto Leads - Basic', price: 99, interval: 'month', description: '50 exclusive auto leads per month.', features: ['Standard ZIP code targeting', 'Email notifications', 'Basic dashboard access'] },
    { id: 'auto_premium', name: 'Auto Leads - Premium', price: 189, interval: 'month', description: '100 exclusive auto leads, priority matching.', features: ['Precision ZIP+radius targeting', 'SMS & Email notifications', 'Advanced dashboard analytics', 'Dedicated support'], popular: true },
    { id: 'home_basic', name: 'Home Leads - Basic', price: 129, interval: 'month', description: '40 exclusive home leads per month.', features: ['Standard ZIP code targeting', 'Email notifications', 'Basic dashboard access'] },
    { id: 'home_premium', name: 'Home Leads - Premium', price: 229, interval: 'month', description: '80 exclusive home leads, priority matching.', features: ['Precision ZIP+radius targeting', 'SMS & Email notifications', 'Advanced dashboard analytics', 'Dedicated support'] },
    { id: 'life_standard', name: 'Life Leads - Standard', price: 149, interval: 'month', description: '60 exclusive life leads per month.', features: ['State-wide targeting', 'Email notifications', 'Basic dashboard access'] },
    { id: 'life_pro', name: 'Life Leads - Pro', price: 259, interval: 'month', description: '120 exclusive life leads, advanced filtering.', features: ['Target by age & income bracket', 'SMS & Email notifications', 'Advanced dashboard analytics', 'Dedicated support'] },
    { id: 'health_plus', name: 'Health Leads - Plus', price: 169, interval: 'month', description: '70 exclusive health leads per month.', features: ['County-level targeting', 'Email notifications', 'Basic dashboard access'] },
    { id: 'bundle_pro', name: 'Pro Bundle (Auto+Home)', price: 299, interval: 'month', description: '80 Auto + 60 Home leads, best value.', features: ['Premium features for both Auto & Home', '20% bundle discount', 'Dedicated support'], popular: true },
    { id: 'enterprise', name: 'Enterprise Custom', price: "Contact Us", interval: 'year', description: 'Tailored solutions for large agencies & call centers.', features: ['Volume discounts', 'API access', 'Custom integrations', 'Dedicated account manager'] },
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Choose Your Lead Package
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Select from a variety of lead packages designed to fuel your growth. All leads are exclusive to you.
          </p>
          <div className="mt-6">
            <Link href="/agents/dashboard" className="text-sm font-medium text-cyan-600 hover:text-cyan-500">
              &larr; Back to Dashboard
            </Link>
          </div> 
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {availablePackages.map(pkg => (
            <div 
              key={pkg.id} 
              className={`relative flex flex-col rounded-2xl border ${pkg.popular ? 'border-cyan-500 ring-2 ring-cyan-500' : 'border-gray-200'} bg-white shadow-lg p-8 transform hover:scale-105 transition-transform duration-300`}
            >
              {pkg.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 transform">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-semibold bg-cyan-500 text-white">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-gray-900 text-center">{pkg.name}</h3>
                
                <div className="mt-4 text-center">
                  <span className={`text-4xl font-extrabold text-gray-900 ${typeof pkg.price === 'number' ? '' : 'text-3xl'}`}>
                    {typeof pkg.price === 'number' ? `$${pkg.price}` : pkg.price}
                  </span>
                  {typeof pkg.price === 'number' && <span className="text-base font-medium text-gray-500">/{pkg.interval}</span>}
                </div>
                <p className="mt-4 text-sm text-gray-600 text-center h-16">{pkg.description}</p>
                
                <ul role="list" className="mt-6 space-y-4">
                  {pkg.features.map(feature => (
                    <li key={feature} className="flex space-x-3">
                      <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => alert(pkg.price === "Contact Us" ? `Contacting sales for ${pkg.name} (placeholder)` : `Subscribing to ${pkg.name} (placeholder)`)}
                  className={`w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${pkg.popular ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-cyan-600 hover:bg-cyan-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500`}
                >
                  {pkg.price === "Contact Us" ? "Contact Sales" : "Choose Plan"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
            <p className="text-gray-600">Need a custom solution or have questions? <Link href="/contact" className="font-medium text-cyan-600 hover:text-cyan-500">Contact our team</Link>.</p>
        </div>
      </main>
    </div>
  );
}
