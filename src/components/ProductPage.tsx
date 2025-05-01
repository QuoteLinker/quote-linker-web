'use client';

import React, { useEffect, Suspense } from 'react';
import { InsuranceType, insuranceProducts } from '../utils/insuranceCopy';
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
  StarIcon,
} from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import StickyCTA from './StickyCTA';
import { generateProductMetadata, generateProductSchema, getAltText } from '../utils/productMetadata';
import { Metadata } from 'next';

interface ProductPageProps {
  params: {
    type: InsuranceType;
  };
}

interface Benefit {
  title: string;
  description: string;
}

interface ProductPageContentProps {
  params: {
    type: InsuranceType;
  };
}

function ProductPageContent({ params }: ProductPageContentProps) {
  const { type } = params;
  const searchParams = useSearchParams();

  const getMinnesotaFact = (type: InsuranceType): string => {
    switch (type) {
      case 'AUTO':
        return "Minnesota requires $30,000/$60,000 in bodily injury liability coverage, but experts recommend at least $100,000/$300,000 to protect your assets.";
      case 'HOME':
        return "Minnesota homes need special coverage for ice dams and frozen pipes. Standard policies may not cover these winter-specific risks.";
      case 'LIFE_TERM':
        return "Minnesota residents can save up to 40% on term life insurance by purchasing before age 40 and maintaining good health.";
      case 'LIFE_PERMANENT':
        return "Whole life insurance cash value grows tax-deferred in Minnesota, making it a smart addition to your retirement strategy.";
      case 'HEALTH_SHORT_TERM_DISABILITY':
        return "Minnesota employers aren't required to provide short-term disability coverage, making personal STDI essential for income protection.";
      case 'HEALTH_SUPPLEMENTAL':
        return "Supplemental health insurance can help cover Minnesota's rising healthcare costs, including out-of-pocket expenses and lost income.";
      default:
        return "Minnesota residents can save money by bundling multiple insurance policies with the same provider.";
    }
  };

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
    switch (type) {
      case 'AUTO':
        return {
          heroTitle: 'Minnesota Auto Insurance Made Simple',
          heroSubtitle: 'Get comprehensive coverage that meets state requirements',
          ctaText: 'Get Your Auto Quote',
          primaryCTA: 'Protect your family and vehicle from Minnesota\'s unpredictable weather and road conditions. Get matched with a local expert now.',
          secondaryCTA: 'Calculate your potential savings with our Minnesota auto insurance calculator',
          iconItems: [
            { icon: ShieldCheckIcon, text: 'Adequate Liability' },
            { icon: CurrencyDollarIcon, text: 'PIP Coverage' },
            { icon: ClockIcon, text: 'STDI Connection' },
          ],
          benefits: [
            'Liability Coverage - $30,000/$60,000 bodily injury, $10,000 property damage',
            'Personal Injury Protection - $40,000 coverage for medical expenses',
            'Uninsured/Underinsured Motorist - $25,000/$50,000 coverage',
            'Comprehensive Coverage - Protection against Minnesota weather, theft, and more',
            'Collision Coverage - Repairs for your vehicle after an accident',
            'Roadside Assistance - 24/7 help in any weather',
          ],
          eligibility: [
            'Valid Minnesota driver\'s license',
            'Vehicle registered in Minnesota',
            'Clean driving record preferred',
            'Must meet state minimum requirements'
          ],
          coverage: {
            minimum: '$30,000/$60,000',
            recommended: '$100,000/$300,000',
            maximum: '$500,000+'
          },
          relatedProducts: [
            {
              title: 'Short-Term Disability Insurance',
              description: 'Protect your income during recovery from an accident',
              link: '/short-term-disability'
            },
            {
              title: 'Supplemental Health Insurance',
              description: 'Additional coverage for medical expenses',
              link: '/supplemental-health'
            }
          ]
        };
      case 'HOME':
        return {
          heroTitle: 'Protect Your Minnesota Home',
          heroSubtitle: 'Coverage designed for Minnesota weather and property needs',
          ctaText: 'Get Your Home Quote',
          primaryCTA: 'Don\'t let Minnesota\'s harsh winters catch you unprepared. Secure your home\'s future with comprehensive coverage today.',
          secondaryCTA: 'Learn how to winter-proof your home with our Minnesota home maintenance guide',
          iconItems: [
            { icon: HomeIcon, text: 'Adequate Liability' },
            { icon: ShieldCheckIcon, text: 'Property Coverage' },
            { icon: SparklesIcon, text: 'STDI Protection' },
          ],
          benefits: [
            'Dwelling Coverage - Full replacement cost for your home',
            'Winter Damage Protection - Coverage for ice dams and frozen pipes',
            'Personal Property Coverage - Protection for your belongings',
            'Liability Protection - Coverage for accidents on your property',
            'Additional Living Expenses - Temporary housing during repairs',
            'Storm Coverage - Protection against Minnesota severe weather',
          ],
          eligibility: [
            'Minnesota residential property',
            'Home meets safety standards',
            'Located in an insurable area',
            'Updated systems and maintenance'
          ],
          coverage: {
            minimum: '$150,000',
            recommended: '$350,000',
            maximum: '$1,000,000+'
          },
          relatedProducts: [
            {
              title: 'Short-Term Disability Insurance',
              description: 'Ensure you can maintain your home insurance during disability',
              link: '/short-term-disability'
            },
            {
              title: 'Whole Life Insurance',
              description: 'Build cash value to help with home expenses',
              link: '/permanent-life'
            }
          ]
        };
      case 'LIFE_TERM':
        return {
          heroTitle: 'Protect Your Minnesota Family',
          heroSubtitle: 'Affordable term life insurance that grows with your family',
          ctaText: 'Get Your Family Protection Quote',
          primaryCTA: 'Ensure your Minnesota family\'s future is secure, no matter what life brings. Get matched with a local expert who understands Minnesota families.',
          secondaryCTA: 'Use our Minnesota family needs calculator to determine your ideal coverage amount',
          iconItems: [
            { icon: HeartIcon, text: 'Family Protection' },
            { icon: CurrencyDollarIcon, text: 'Level Premiums' },
            { icon: ClockIcon, text: 'Conversion Options' },
          ],
          benefits: [
            'Family Protection - Coverage that grows with your children\'s needs',
            'College Fund Protection - Ensure your kids\' education is secure',
            'Mortgage Protection - Keep your family in their Minnesota home',
            'Income Replacement - Maintain your family\'s lifestyle',
            'Final Expenses - Cover medical bills and funeral costs',
            'Debt Protection - Prevent financial burden on your loved ones',
          ],
          eligibility: [
            'Minnesota resident',
            'Age 18-65 for most terms',
            'Basic health requirements',
            'No medical exam options available'
          ],
          coverage: {
            minimum: '$100,000',
            recommended: '$500,000',
            maximum: '$1,000,000+'
          },
          relatedProducts: [
            {
              title: 'Whole Life Insurance',
              description: 'Build cash value to help with future family expenses',
              link: '/permanent-life'
            },
            {
              title: 'Short-Term Disability Insurance',
              description: 'Protect your income while maintaining life insurance',
              link: '/short-term-disability'
            }
          ]
        };
      case 'LIFE_PERMANENT':
        return {
          heroTitle: 'Whole Life Insurance',
          heroSubtitle: 'Lifetime protection with guaranteed cash value',
          ctaText: 'Get Your Whole Life Quote',
          primaryCTA: 'Build lasting financial security for your Minnesota family while protecting their future. Connect with a local expert today.',
          secondaryCTA: 'Explore how whole life insurance can help with Minnesota estate planning',
          iconItems: [
            { icon: HeartIcon, text: 'Lifetime Coverage' },
            { icon: CurrencyDollarIcon, text: 'Cash Value Growth' },
            { icon: SparklesIcon, text: 'Dividend Potential' },
          ],
          benefits: [
            'Guaranteed Coverage - Protection that never expires',
            'Level Premiums - Rates never increase',
            'Guaranteed Cash Value - Tax-deferred growth',
            'Dividend Potential - Opportunity for additional benefits',
            'Policy Loans - Access to cash value when needed',
            'Estate Planning - Tax-efficient wealth transfer',
          ],
          eligibility: [
            'Minnesota resident',
            'Age 18-75',
            'Basic health requirements',
            'Long-term planning needs'
          ],
          coverage: {
            minimum: '$25,000',
            recommended: '$250,000',
            maximum: '$2,000,000+'
          },
          relatedProducts: [
            {
              title: 'Short-Term Disability Insurance',
              description: 'Protect your income while building cash value',
              link: '/short-term-disability'
            },
            {
              title: 'Supplemental Health Insurance',
              description: 'Additional protection for medical expenses',
              link: '/supplemental-health'
            }
          ]
        };
      case 'HEALTH_SHORT_TERM_DISABILITY':
        return {
          heroTitle: 'Protect Your Family\'s Income',
          heroSubtitle: 'Short-term disability insurance for Minnesota working parents',
          ctaText: 'Get Your Income Protection Quote',
          primaryCTA: 'Don\'t let an injury or illness disrupt your Minnesota family\'s lifestyle. Secure your income protection today.',
          secondaryCTA: 'Calculate your potential disability benefits with our Minnesota-specific calculator',
          iconItems: [
            { icon: UserGroupIcon, text: 'Family Income Protection' },
            { icon: ClockIcon, text: 'Quick Benefits' },
            { icon: CurrencyDollarIcon, text: 'Portable Coverage' },
          ],
          benefits: [
            'Income Protection - Keep paying your Minnesota mortgage and bills',
            'Family Support - Maintain your children\'s activities and education',
            'Quick Benefits - Payments start after short waiting period',
            'Flexible Coverage - Choose 3, 6, or 12-month terms',
            'Guaranteed Renewable - Cannot be cancelled if you pay premiums',
            'Easy Claims Process - Streamlined documentation for busy parents',
          ],
          eligibility: [
            'Employed full-time in Minnesota',
            'Age 18-65',
            'U.S. resident',
            'No pre-existing conditions'
          ],
          coverage: {
            minimum: '$500/month',
            recommended: '60% of income',
            maximum: '$5,000/month'
          },
          relatedProducts: [
            {
              title: 'Supplemental Health Insurance',
              description: 'Additional coverage for medical expenses and family care',
              link: '/supplemental-health'
            },
            {
              title: 'Whole Life Insurance',
              description: 'Build cash value to supplement disability benefits',
              link: '/permanent-life'
            }
          ]
        };
      case 'HEALTH_SUPPLEMENTAL':
        return {
          heroTitle: 'Extra Protection for Your Minnesota Family',
          heroSubtitle: 'Supplemental health insurance for unexpected medical expenses',
          ctaText: 'Get Your Family Health Quote',
          primaryCTA: 'Avoid surprise medical bills and protect your Minnesota family\'s health. Get matched with a local expert now.',
          secondaryCTA: 'Learn about Minnesota-specific health insurance options and requirements',
          iconItems: [
            { icon: HeartIcon, text: 'Family Health Protection' },
            { icon: CurrencyDollarIcon, text: 'No Network Restrictions' },
            { icon: ShieldCheckIcon, text: 'Guaranteed Renewable' },
          ],
          benefits: [
            'Family Health Protection - Coverage for you and your children',
            'Fixed Cash Benefits - Paid directly to you for flexibility',
            'No Network Restrictions - Use any Minnesota provider',
            'Critical Illness Coverage - Lump sum payments for major illnesses',
            'Accident Coverage - Emergency and follow-up care for active families',
            'Hospital Benefits - Daily cash payments during hospital stays',
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
          },
          relatedProducts: [
            {
              title: 'Short-Term Disability Insurance',
              description: 'Protect your income during recovery',
              link: '/short-term-disability'
            },
            {
              title: 'Whole Life Insurance',
              description: 'Build cash value for medical expenses',
              link: '/permanent-life'
            }
          ]
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
              Why Choose Our {type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')} Insurance
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
              {config.primaryCTA}
            </p>
            <div className="mt-6">
              <a
                href="#quote-form"
                onClick={(e) => {
                  e.preventDefault();
                  const formElement = document.getElementById('quote-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-block bg-[#00EEFD] text-white px-6 py-3 rounded-lg hover:bg-[#00D4E5] transition-colors"
              >
                {config.ctaText}
              </a>
            </div>
            <div className="mt-8">
              <a
                href="#"
                className="text-[#00EEFD] hover:text-[#00D4E5] font-medium"
              >
                {config.secondaryCTA}
              </a>
            </div>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div id="quote-form">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#00EEFD] text-white flex items-center justify-center">
                        1
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">Get Your Quote</span>
                    </div>
                    <div className="flex-1 h-1 mx-4 bg-gray-200">
                      <div className="h-1 bg-[#00EEFD] w-1/3"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                        2
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-400">Compare Options</span>
                    </div>
                    <div className="flex-1 h-1 mx-4 bg-gray-200">
                      <div className="h-1 bg-gray-200"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                        3
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-400">Get Covered</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center">
                    <div className="text-center">
                      <ShieldCheckIcon className="h-8 w-8 text-[#00EEFD] mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Licensed Minnesota Agents</p>
                    </div>
                    <div className="text-center">
                      <ClockIcon className="h-8 w-8 text-[#00EEFD] mx-auto mb-2" />
                      <p className="text-sm text-gray-600">3-Minute Quotes</p>
                    </div>
                    <div className="text-center">
                      <CurrencyDollarIcon className="h-8 w-8 text-[#00EEFD] mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Best Rates Guaranteed</p>
                    </div>
                    <div className="text-center">
                      <StarIcon className="h-8 w-8 text-[#00EEFD] mx-auto mb-2" />
                      <p className="text-sm text-gray-600">4.8/5 Customer Rating</p>
                    </div>
                  </div>
                </div>
                <QuoteForm productType={type} />
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
                  <div className="mt-4 p-4 bg-[#F5F7FA] rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <SparklesIcon className="h-5 w-5 text-[#00EEFD]" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Did You Know?</span> {getMinnesotaFact(type)}
                        </p>
                      </div>
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

                {/* Application Checklist */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 text-center mb-4">What You'll Need</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-[#00EEFD] mr-2" />
                      <span className="text-sm text-gray-600">Basic personal information</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-[#00EEFD] mr-2" />
                      <span className="text-sm text-gray-600">Minnesota driver's license (for auto)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-[#00EEFD] mr-2" />
                      <span className="text-sm text-gray-600">Vehicle information (for auto)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-[#00EEFD] mr-2" />
                      <span className="text-sm text-gray-600">Home details (for home)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-[#00EEFD] mr-2" />
                      <span className="text-sm text-gray-600">Health history (for life/health)</span>
                    </li>
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

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {insuranceProducts[type].faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add this section after the FAQ section for both insurance types */}
      <div className="mt-16 bg-blue-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Minnesota Family Protection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Minnesota Families Choose Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckIcon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="ml-3 text-gray-600">Helped over 5,000 Minnesota families secure their future</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckIcon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="ml-3 text-gray-600">Local agents who understand Minnesota family needs</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckIcon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="ml-3 text-gray-600">Policies designed for Minnesota's cost of living</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Family-Focused Coverage</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-900">Income Protection</h4>
                <p className="text-sm text-gray-600">Keep your family's lifestyle secure during recovery</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-900">Medical Expenses</h4>
                <p className="text-sm text-gray-600">Cover unexpected medical bills and treatments</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-900">Family Support</h4>
                <p className="text-sm text-gray-600">Maintain your children's activities and education</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minnesota-Specific Testimonials */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What Minnesota Residents Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/testimonials/minnesota-1.jpg"
                  alt="Sarah from Minneapolis"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Sarah M.</p>
                <p className="text-sm text-gray-500">Minneapolis</p>
              </div>
            </div>
            <p className="text-gray-600">
              "QuoteLinker helped me find the perfect auto insurance coverage for Minnesota winters. The agent was knowledgeable about our specific needs."
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/testimonials/minnesota-2.jpg"
                  alt="Michael from St. Paul"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Michael R.</p>
                <p className="text-sm text-gray-500">St. Paul</p>
              </div>
            </div>
            <p className="text-gray-600">
              "As a Minnesota homeowner, I needed coverage that understood our unique weather challenges. QuoteLinker delivered exactly what I needed."
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/testimonials/minnesota-3.jpg"
                  alt="Jennifer from Duluth"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Jennifer L.</p>
                <p className="text-sm text-gray-500">Duluth</p>
              </div>
            </div>
            <p className="text-gray-600">
              "The process was so easy, and I saved over $300 on my life insurance. The Minnesota-based agent was incredibly helpful."
            </p>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <StickyCTA ctaText={config.ctaText} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { type: InsuranceType } }): Promise<Metadata> {
  return generateProductMetadata(params.type);
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <ProductPageContent params={params} />
    </div>
  );
} 