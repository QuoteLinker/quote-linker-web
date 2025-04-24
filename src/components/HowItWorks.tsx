interface Step {
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: 'Tell us your needs',
    description: 'Fill out our simple form with your insurance requirements and preferences.',
    icon: '📝',
  },
  {
    title: 'Get matched',
    description: 'We'll connect you with licensed agents who specialize in your needs.',
    icon: '🤝',
  },
  {
    title: 'Review your quote',
    description: 'Compare quotes and choose the coverage that's right for you.',
    icon: '✅',
  },
];

export default function HowItWorks() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple Steps to Better Insurance
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Get the coverage you need in three easy steps
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 