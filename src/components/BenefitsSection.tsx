'use client';

import { FaUserTie, FaRobot, FaShieldAlt, FaUserCheck } from 'react-icons/fa';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <FaUserTie className="w-8 h-8" />,
      title: 'Smart AI Matching',
      description: 'Get matched with a local agent who understands your needs',
    },
    {
      icon: <FaRobot className="w-8 h-8" />,
      title: 'No Spam, Just Agents',
      description: 'No robocalls or spam — only real, licensed professionals',
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Built by an Agent',
      description: 'Created by an actual insurance producer who knows the industry',
    },
    {
      icon: <FaUserCheck className="w-8 h-8" />,
      title: 'Hassle-Free Experience',
      description: 'The most straightforward way to find the right insurance',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose QuoteLinker?
          </h2>
          <p className="text-xl text-gray-600">
            We&apos;re not just another quote aggregator. We&apos;re your personal connection to
            trusted local agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-[#F8F9FA] rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-[#28A745] mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-[#212529] mb-2">{benefit.title}</h3>
              <p className="text-[#212529]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
