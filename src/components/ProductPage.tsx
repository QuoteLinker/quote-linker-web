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
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            'Liability Coverage',
            'Collision Coverage',
            'Comprehensive Coverage',
            'Uninsured/Underinsured Motorist',
            'Personal Injury Protection',
            'Roadside Assistance',
          ],
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
            'Dwelling Coverage',
            'Personal Property Coverage',
            'Liability Protection',
            'Additional Living Expenses',
            'Medical Payments to Others',
            'Natural Disaster Coverage',
          ],
        };
      case 'LIFE_TERM':
        return {
          heroTitle: 'Term Life Insurance',
          heroSubtitle: 'Affordable protection for your loved ones',
          ctaText: 'Get Your Term Life Quote',
          iconItems: [
            { icon: HeartIcon, text: 'Family Protection' },
            { icon: CurrencyDollarIcon, text: 'Affordable Premiums' },
            { icon: ClockIcon, text: 'Fixed Term Coverage' },
          ],
          benefits: [
            'Death Benefit',
            'Fixed Premiums',
            'Flexible Term Lengths',
            'Convertible Options',
            'No Medical Exam Options',
            'Family Protection',
          ],
        };
      case 'LIFE_PERMANENT':
        return {
          heroTitle: 'Permanent Life Insurance',
          heroSubtitle: 'Lifetime protection with cash value growth',
          ctaText: 'Get Your Permanent Life Quote',
          iconItems: [
            { icon: HeartIcon, text: 'Lifetime Coverage' },
            { icon: CurrencyDollarIcon, text: 'Cash Value Growth' },
            { icon: SparklesIcon, text: 'Living Benefits' },
          ],
          benefits: [
            'Lifetime Coverage',
            'Cash Value Accumulation',
            'Tax-Deferred Growth',
            'Policy Loans',
            'Living Benefits',
            'Estate Planning',
          ],
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
            'Income Replacement',
            'Flexible Coverage Periods',
            'Quick Approval',
            'Affordable Premiums',
            'Coverage for Illness/Injury',
            'Easy Claims Process',
          ],
        };
      case 'HEALTH_SUPPLEMENTAL':
        return {
          heroTitle: 'Supplemental Health Insurance',
          heroSubtitle: 'Extra coverage for unexpected medical expenses',
          ctaText: 'Get Your Health Quote',
          iconItems: [
            { icon: HeartIcon, text: 'Medical Coverage' },
            { icon: CurrencyDollarIcon, text: 'Fixed Benefits' },
            { icon: ShieldCheckIcon, text: 'Guaranteed Acceptance' },
          ],
          benefits: [
            'Fixed Benefit Payments',
            'Guaranteed Acceptance',
            'No Network Restrictions',
            'Coverage for Critical Illness',
            'Accident Coverage',
            'Hospital Indemnity',
          ],
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
                        document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 text-center">What's Included</h3>
                <ul className="mt-4 space-y-4">
                  {config.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start justify-center">
                      <div className="flex-shrink-0">
                        <ShieldCheckIcon className="h-6 w-6 text-[#00EEFD]" aria-hidden="true" />
                      </div>
                      <p className="ml-3 text-base text-gray-500">{benefit}</p>
                    </li>
                  ))}
                </ul>
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