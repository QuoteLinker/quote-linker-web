import {
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  StarIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Licensed Professionals',
    description: 'Connect with verified, licensed insurance agents in your area.',
  },
  {
    icon: ClockIcon,
    title: 'Fast & Easy',
    description: 'Get multiple quotes quickly without the hassle of calling around.',
  },
  {
    icon: UserGroupIcon,
    title: 'Personalized Service',
    description: 'Receive customized recommendations based on your specific needs.',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Save Money',
    description: 'Compare rates from multiple providers to find the best value.',
  },
  {
    icon: StarIcon,
    title: 'Top-Rated Carriers',
    description: 'Access quotes from the most trusted insurance companies.',
  },
  {
    icon: HeartIcon,
    title: 'Peace of Mind',
    description: 'Rest easy knowing you have the right coverage at the right price.',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-24 px-6 bg-brand-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-headline mb-4">
            Why Choose QuoteLinker?
          </h2>
          <p className="text-xl text-brand-body max-w-2xl mx-auto">
            We make finding the right insurance coverage simple, fast, and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-brand-card p-8 rounded-2xl shadow-brand transition hover:shadow-2xl hover:scale-105"
              >
                <Icon className="w-10 h-10 text-brand-primary mb-4" />
                <h3 className="text-xl font-semibold text-brand-headline mb-2">
                  {feature.title}
                </h3>
                <p className="text-brand-body">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 