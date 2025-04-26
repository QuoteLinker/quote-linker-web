import QuoteForm from '@/components/QuoteForm';
import { getProductContent } from '@/utils/insuranceCopy';
import Image from 'next/image';

export default function ShortTermDisabilityInsurance() {
  const product = getProductContent('SHORT_TERM_DISABILITY');

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/images/disability-hero.jpg"
          alt="Short-Term Disability Insurance"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl max-w-2xl text-center">{product.subtitle}</p>
        </div>
      </div>

      {/* Quote Form Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <QuoteForm productType="health" subType="std" />
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Why Choose Short-Term Disability Insurance</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {product.benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 