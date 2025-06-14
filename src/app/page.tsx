import Link from 'next/link';
import { Car, Home, HeartHandshake, ShieldCheck } from 'lucide-react';
import React from 'react';

// This is a new, simplified Hero section built directly into the page
const SimpleHero = () => (
  <div className="relative bg-slate-50 text-gray-800 py-20 md:py-32 overflow-hidden"> {/* Changed background and text color */}
    <div className="absolute inset-0 opacity-50">
      {/* Optional: Light background pattern or illustration can go here */}
    </div>
    <div className="relative z-10 container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900"> {/* Ensured high contrast for heading */}
        The Fast, Free, and Easy Way to Shop for Insurance.
      </h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-700"> {/* Ensured high contrast for paragraph */}
        Select a policy type to get free, no-obligation quotes from top-rated local agents.
      </p>
      <div className="mt-12 text-center">
        <Link href="/get-quote" passHref>
          <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700">
            Get Your Free Quotes
          </button>
        </Link>
      </div>
    </div>
  </div>
);

// This is a new, reusable component for the insurance cards
interface InsuranceTypeCardProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

const InsuranceCard: React.FC<InsuranceTypeCardProps> = ({ icon, title, href }) => {
  return (
    <Link href={href} passHref>
      {/* Removed border-gray-200, changed hover effect */}
      <div className="group block text-center p-8 bg-white rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="flex justify-center items-center w-16 h-16 bg-cyan-100 rounded-full mx-auto mb-6 group-hover:bg-cyan-500 transition-colors duration-300">
          {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-cyan-600 group-hover:text-white transition-colors duration-300", strokeWidth: 1.5 })}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors duration-300">{title}</h3>
        {/* <p className="mt-2 text-sm text-gray-600">{description}</p> */}
      </div>
    </Link>
  );
};

// This is a new "How It Works" section to build trust
const HowItWorks = () => (
  <section className="py-20 md:py-24 bg-slate-50"> {/* Changed background to bg-slate-50 */}
      <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
              <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full text-cyan-600 text-3xl font-bold mb-4">1</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Answer a Few Questions</h3>
                  <p className="text-gray-600">Provide basic information about your insurance needs. It only takes a few minutes!</p>
              </div>
               <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full text-cyan-600 text-3xl font-bold mb-4">2</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">We Match You With Agents</h3>
                  <p className="text-gray-600">Our smart system instantly connects you with qualified local agents ready to help.</p>
              </div>
               <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full text-cyan-600 text-3xl font-bold mb-4">3</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Receive Your Quotes</h3>
                  <p className="text-gray-600">Compare personalized quotes and choose the best policy for you. No pressure, no obligation.</p>
              </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/get-quote" passHref>
              <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700">
                Get Your Free Quotes
              </button>
            </Link>
          </div>
      </div>
  </section>
);


export default function HomePage() {
  return (
    <>
      <SimpleHero />
      <div className="container mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <InsuranceCard icon={<Car size={64} strokeWidth={1.5} className="text-cyan-600" />} title="Auto" href="/get-quote?type=auto" />
            <InsuranceCard icon={<Home size={64} strokeWidth={1.5} className="text-cyan-600" />} title="Home" href="/get-quote?type=home" />
            <InsuranceCard icon={<HeartHandshake size={64} strokeWidth={1.5} className="text-cyan-600" />} title="Life" href="/get-quote?type=life" />
            <InsuranceCard icon={<ShieldCheck size={64} strokeWidth={1.5} className="text-cyan-600" />} title="Health" href="/get-quote?type=health" />
        </div>
      </div>
      <HowItWorks />
    </>
  );
}