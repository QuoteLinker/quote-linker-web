interface TrustItem {
  title: string;
  description: string;
  icon: string;
}

const trustItems: TrustItem[] = [
  {
    title: 'Secure',
    description: 'Your information is protected with bank-level security',
    icon: '🔒',
  },
  {
    title: 'No Spam',
    description: 'We never share your information with third parties',
    icon: '✉️',
  },
  {
    title: 'Licensed Agents',
    description: 'All agents are fully licensed and vetted',
    icon: '📋',
  },
  {
    title: 'Free to Use',
    description: 'No hidden fees or obligations',
    icon: '💰',
  },
];

export default function TrustSection() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Trust & Security</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Your Trust is Our Priority
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.title} className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center space-x-8">
          <img
            className="h-12"
            src="https://www.vectorlogo.zone/logos/pcisecuritystandards/pcisecuritystandards-icon.svg"
            alt="PCI Security Standards"
          />
          <img
            className="h-12"
            src="https://www.vectorlogo.zone/logos/ssl/ssl-icon.svg"
            alt="SSL Secure"
          />
          <img
            className="h-12"
            src="https://www.vectorlogo.zone/logos/norton/norton-icon.svg"
            alt="Norton Secured"
          />
        </div>
      </div>
    </div>
  );
} 