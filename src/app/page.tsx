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
        Your Fast and Free Link for Shopping Insurance.
      </h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-700"> {/* Ensured high contrast for paragraph */}
        Select an insurance type to get free, no-obligation quotes from a licensed local agent.
      </p>
      <div className="mt-12 text-center">
        <Link href="/get-quote" passHref>
          <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700">
            Get Your Free Quote
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
      <div className="group block text-center p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"> {/* Added shadow-lg, hover:shadow-2xl, transform, hover:-translate-y-1 */}
        <div className="flex justify-center items-center w-16 h-16 md:w-20 md:h-20 bg-cyan-100 rounded-full mx-auto mb-4 md:mb-6 group-hover:bg-cyan-500 transition-colors duration-300"> {/* Adjusted size and margin */}
          {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 md:w-10 md:h-10 text-cyan-600 group-hover:text-white transition-colors duration-300", strokeWidth: 1.5 })} {/* Adjusted icon size */}
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors duration-300">{title}</h3>
      </div>
    </Link>
  );
};

// This is a new "How It Works" section to build trust
const HowItWorks = () => (
  <section className="py-16 md:py-24 bg-white"> {/* Changed background to white for alternation */}
      <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 md:mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center max-w-6xl mx-auto"> {/* Increased gap and max-width */}
              <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg shadow-md"> {/* Added padding, bg, rounded, shadow */}
                  <div className="flex items-center justify-center w-16 h-16 bg-cyan-500 text-white rounded-full text-3xl font-bold mb-6">1</div> {/* Changed bg to cyan-500 and text to white */}
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Answer a Few Questions</h3>
                  <p className="text-gray-600 leading-relaxed">Provide basic information about your insurance needs. It only takes a few minutes!</p>
              </div>
               <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg shadow-md"> {/* Added padding, bg, rounded, shadow */}
                  <div className="flex items-center justify-center w-16 h-16 bg-cyan-500 text-white rounded-full text-3xl font-bold mb-6">2</div> {/* Changed bg to cyan-500 and text to white */}
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">We Match You With a Licensed Agent</h3>
                  <p className="text-gray-600 leading-relaxed">Our smart system instantly connects you with licensed and local agents ready to help.</p>
              </div>
               <div className="flex flex-col items-center p-6 bg-slate-50 rounded-lg shadow-md"> {/* Added padding, bg, rounded, shadow */}
                  <div className="flex items-center justify-center w-16 h-16 bg-cyan-500 text-white rounded-full text-3xl font-bold mb-6">3</div> {/* Changed bg to cyan-500 and text to white */}
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">Receive Your Quotes</h3>
                  <p className="text-gray-600 leading-relaxed">Compare personalized quotes and choose the best policy for you. No pressure, no obligation.</p>
              </div>
          </div>
          <div className="mt-12 md:mt-16 text-center">
            <Link href="/get-quote" passHref>
              <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700">
                Get Your Free Quote
              </button>
            </Link>
          </div>
      </div>
  </section>
);


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Ensure footer is at bottom if content is short */}
      <SimpleHero />
      {/* Section for Insurance Cards with a specific background */}
      <section className="bg-slate-100 py-16 md:py-20"> {/* Added section wrapper with bg-slate-100 and padding */}
        <div className="container mx-auto px-6">
          {/* Optional: Title for this section if desired, e.g., "Choose Your Insurance Type" */}
          {/* <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore Insurance Options</h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"> {/* Adjusted gap */}
              <InsuranceCard icon={<Car size={64} strokeWidth={1.5} />} title="Auto" href="/get-quote?type=auto" />
              <InsuranceCard icon={<Home size={64} strokeWidth={1.5} />} title="Home" href="/get-quote?type=home" />
              <InsuranceCard icon={<HeartHandshake size={64} strokeWidth={1.5} />} title="Life" href="/get-quote?type=life" />
              <InsuranceCard icon={<ShieldCheck size={64} strokeWidth={1.5} />} title="Health" href="/get-quote?type=health" />
          </div>
        </div>
      </section>
      <HowItWorks />
      {/* Placeholder for other sections like Testimonials, Blog Highlights, etc. */}
      {/* <section className="py-16 md:py-24 bg-slate-50"> */}
      {/*   <div className="container mx-auto px-6 text-center"> */}
      {/*     <h2 className="text-3xl font-bold text-gray-900">More Content Here</h2> */}
      {/*   </div> */}
      {/* </section> */}
    </div>
  );
}