'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { QuoteForm } from '../components/forms';
import { InsuranceType } from '@/types/insurance';

const InsuranceQuotes: React.FC = () => {
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceType>('LIFE');

  const insuranceTypes = [
    { id: 'LIFE' as InsuranceType, name: 'Life Insurance' },
    { id: 'HEALTH_SHORT_TERM_DISABILITY' as InsuranceType, name: 'Short-Term Disability Insurance' },
    { id: 'HEALTH_SUPPLEMENTAL' as InsuranceType, name: 'Supplemental Health Insurance' },
    { id: 'AUTO' as InsuranceType, name: 'Auto Insurance' },
    { id: 'HOME' as InsuranceType, name: 'Home Insurance' },
  ];

  return (
    <Layout
      title="Insurance Quotes | QuoteLinker"
      description="Get quotes for life, disability, health, auto, and home insurance from top providers."
    >
      <Head>
        <title>Insurance Quotes | QuoteLinker</title>
        <meta name="description" content="Get quotes for life, disability, health, auto, and home insurance from top providers." />
      </Head>

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Insurance Quote Requests
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Fill out the form below to receive quotes from top insurance providers.
            </p>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex flex-wrap justify-center gap-4">
                {insuranceTypes.map((insurance) => (
                  <button
                    key={insurance.id}
                    onClick={() => setSelectedInsurance(insurance.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      selectedInsurance === insurance.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {insurance.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <QuoteForm intent={selectedInsurance} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InsuranceQuotes; 