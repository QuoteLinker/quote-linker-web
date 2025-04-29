'use client';

import React, { useEffect, Suspense } from 'react';
import { InsuranceType } from '@/utils/insuranceCopy';
import QuoteForm from './QuoteForm';
import {
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  HomeIcon,
  TruckIcon,
  SparklesIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

interface ProductPageProps {
  insuranceType: InsuranceType;
}

function ProductPageContent({ insuranceType }: ProductPageProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if we should scroll to the form
    if (searchParams?.get('quote') === 'true') {
      const formElement = document.getElementById('quote-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [searchParams]);

  const getProductConfig = () => {
    switch (insuranceType) {
      case 'AUTO':
        return {
          heroTitle: 'Auto Insurance Made Simple',
          heroSubtitle: 'Get comprehensive coverage at competitive rates',
          ctaText: 'Get Your Auto Quote',
          iconItems: [
            { icon: ShieldCheckIcon, text: 'Comprehensive Coverage' },
            { icon: CurrencyDollarIcon, text: 'Competitive Rates' },
            { icon: ClockIcon, text: 'Quick Claims Process' },
          ],
          benefits: [
            'Liability Coverage - Protects you if you cause injury or property damage',
            'Collision Coverage - Repairs your car after an accident',
            'Comprehensive Coverage - Protection against theft, vandalism, and natural disasters',
            'Uninsured/Underinsured Motorist - Covers you if the other driver lacks insurance',
            'Personal Injury Protection - Medical expenses for you and your passengers',
            'Roadside Assistance - 24/7 help when you need it most',
          ],
          eligibility: [
            'Valid driver\'s license',
            'Registered vehicle',
            'Clean driving record preferred',
            'Must be at least 16 years old',
          ],
          coverage: {
            minimum: '$15,000',
            recommended: '$100,000',
            maximum: '$500,000'
          }
        };
      case 'HOME':
        return {
          heroTitle: 'Protect Your Home',
          heroSubtitle: 'Comprehensive home insurance coverage for your peace of mind',
          ctaText: 'Get Your Home Quote',
          iconItems: [
            { icon: HomeIcon, text: 'Property Protection' },
            { icon: ShieldCheckIcon, text: 'Liability Coverage' },
            { icon: SparklesIcon, text: 'Additional Coverage Options' },
          ],
          benefits: [
            'Dwelling Coverage - Protects your home\'s structure',
            'Personal Property Coverage - Protects your belongings',
            'Liability Protection - Coverage for accidents on your property',
            'Additional Living Expenses - Covers temporary housing if needed',
            'Medical Payments - For injuries to guests on your property',
            'Natural Disaster Coverage - Protection against specified perils',
          ],
          eligibility: [
            'Home ownership or pending purchase',
            'Property meets safety standards',
            'Located in an insurable area',
            'No recent major claims'
          ],
          coverage: {
            minimum: '$100,000',
            recommended: '$300,000',
            maximum: '$1,000,000+'
          }
        };
      case 'LIFE_TERM':
        return {
          heroTitle: 'Term Life Insurance',
          heroSubtitle: 'Affordable protection for your loved ones when they need it most',
          ctaText: 'Get Your Term Life Quote',
          iconItems: [
            { icon: HeartIcon, text: 'Family Protection' },
            { icon: CurrencyDollarIcon, text: 'Affordable Premiums' },
            { icon: ClockIcon, text: 'Fixed Term Coverage' },
          ],
          benefits: [
            'Level Premiums - Fixed rates for your chosen term',
            'Death Benefit - Tax-free payout to your beneficiaries',
            'Flexible Terms - Choose 10, 20, or 30-year coverage',
            'Convertible Options - Convert to permanent coverage later',
            'No Medical Exam Options - Available for qualifying applicants',
            'Family Protection - Income replacement and debt coverage',
          ],
          eligibility: [
            'Age 18-65 for most terms',
            'No terminal illnesses',
            'U.S. resident',
            'Meets health requirements'
          ],
          coverage: {
            minimum: '$100,000',
            recommended: '$500,000',
            maximum: '$2,000,000+'
          }
        };
      case 'LIFE_PERMANENT':
        return {
          heroTitle: 'Permanent Life Insurance',
          heroSubtitle: 'Lifetime protection with cash value growth potential',
          ctaText: 'Get Your Permanent Life Quote',
          iconItems: [
            { icon: HeartIcon, text: 'Lifetime Coverage' },
            { icon: CurrencyDollarIcon, text: 'Cash Value Growth' },
            { icon: SparklesIcon, text: 'Living Benefits' },
          ],
          benefits: [
            'Lifetime Coverage - Protection that never expires',
            'Cash Value Growth - Tax-deferred accumulation',
            'Fixed Premiums - Rates never increase',
            'Policy Loans - Access to cash value when needed',
            'Living Benefits - Use for retirement or emergencies',
            'Estate Planning - Tax-efficient wealth transfer',
          ],
          eligibility: [
            'Age 18-75',
            'No terminal illnesses',
            'U.S. resident',
            'Meets financial requirements'
          ],
          coverage: {
            minimum: '$25,000',
            recommended: '$250,000',
            maximum: '$5,000,000+'
          }
        };
      case 'HEALTH_SHORT_TERM_DISABILITY':
        return {
          heroTitle: 'Short Term Disability Insurance',
          heroSubtitle: 'Protect your income during recovery',
          ctaText: 'Get Your Disability Quote',
          iconItems: [
            { icon: UserGroupIcon, text: 'Income Protection' },
            { icon: ClockIcon, text: 'Quick Coverage' },
            { icon: CurrencyDollarIcon, text: 'Affordable Premiums' },
          ],
          benefits: [
            'Income Replacement - Up to 60% of your salary',
            'Quick Benefits - Payments start after short waiting period',
            'Flexible Coverage - Choose 3, 6, or 12-month terms',
            'Guaranteed Renewable - Cannot be cancelled if you pay premiums',
            'Coverage for Most Disabilities - Illness and injury',
            'Easy Claims Process - Streamlined documentation',
          ],
          eligibility: [
            'Employed full-time',
            'Age 18-65',
            'U.S. resident',
            'No pre-existing conditions'
          ],
          coverage: {
            minimum: '$500/month',
            recommended: '60% of income',
            maximum: '$5,000/month'
          }
        };
      case 'HEALTH_SUPPLEMENTAL':
        return {
          heroTitle: 'Supplemental Health Insurance',
          heroSubtitle: 'Extra protection for unexpected medical expenses',
          ctaText: 'Get Your Health Quote',
          iconItems: [
            { icon: HeartIcon, text: 'Medical Coverage' },
            { icon: CurrencyDollarIcon, text: 'Fixed Benefits' },
            { icon: ShieldCheckIcon, text: 'Guaranteed Acceptance' },
          ],
          benefits: [
            'Fixed Cash Benefits - Paid directly to you',
            'No Network Restrictions - Use any provider',
            'Guaranteed Renewable - Keep your coverage',
            'Critical Illness Coverage - Lump sum payments',
            'Accident Coverage - Emergency and follow-up care',
            'Hospital Benefits - Daily cash payments',
          ],
          eligibility: [
            'Age 18-65',
            'U.S. resident',
            'No similar coverage',
            'Primary insurance required'
          ],
          coverage: {
            minimum: '$5,000',
            recommended: '$15,000',
            maximum: '$50,000'
          }
        };
      default:
        return {
          heroTitle: 'Insurance Coverage',
          heroSubtitle: 'Get the coverage you need',
          ctaText: 'Get Your Quote',
          iconItems: [
            { icon: ShieldCheckIcon, text: 'Protection' },
            { icon: CurrencyDollarIcon, text: 'Affordable' },
            { icon: ClockIcon, text: 'Quick Process' },
          ],
          benefits: [
            'Comprehensive Coverage',
            'Competitive Rates',
            'Easy Application',
            'Quick Approval',
            'Expert Support',
            'Flexible Options',
          ],
          eligibility: [
            'Varies by product',
            'Contact us for details'
          ],
          coverage: {
            minimum: 'Varies',
            recommended: 'Varies',
            maximum: 'Varies'
          }
        };
    }
  };

  const config = getProductConfig();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">{config.heroTitle}</span>
                  <span className="block text-[#00EEFD]">{config.heroSubtitle}</span>
                </h1>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#quote-form"
                      onClick={(e) => {
                        e.preventDefault();
                        const formElement = document.getElementById('quote-form');
                        if (formElement) {
                          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#00EEFD] hover:bg-[#00D4E5] md:py-4 md:text-lg md:px-10"
                    >
                      {config.ctaText}
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-[#00EEFD] font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Our {insuranceType.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')} Insurance
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 justify-items-center">
              {config.iconItems.map((item, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#00EEFD] text-white">
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Get Your Free Quote Today
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Fill out the form below to get started with your personalized quote.
            </p>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div id="quote-form">
                <QuoteForm insuranceType={insuranceType} />
              </div>
              <div className="space-y-8">
                {/* Coverage Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 text-center mb-4">Coverage Options</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Minimum:</span>
                      <span className="font-medium">{config.coverage.minimum}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Recommended:</span>
                      <span className="font-medium text-[#00EEFD]">{config.coverage.recommended}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Maximum:</span>
                      <span className="font-medium">{config.coverage.maximum}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 text-center mb-4">What's Included</h3>
                  <ul className="space-y-4">
                    {config.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <ShieldCheckIcon className="h-6 w-6 text-[#00EEFD]" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-gray-500">{benefit}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 text-center mb-4">Eligibility Requirements</h3>
                  <ul className="space-y-4">
                    {config.eligibility.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-[#00EEFD]" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-gray-500">{requirement}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage(props: ProductPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPageContent {...props} />
    </Suspense>
  );
} 