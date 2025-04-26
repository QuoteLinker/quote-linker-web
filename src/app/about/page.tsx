export const metadata = {
  title: 'About Us - QuoteLinker',
  description: 'Learn about QuoteLinker and our mission to simplify insurance shopping in Minnesota.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About QuoteLinker</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-8">
              QuoteLinker is a the first and only AI-first InsurTech platform for connecting individuals and businesses 
              with licensed insurance agents. We simplify the insurance shopping process by providing 
              a seamless way to compare quotes and find the right coverage.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
            <p className="mb-8">
              Our vision is to make the process of getting insurance quotes transparent, efficient, and hassle-free. 
              We believe everyone deserves access to quality insurance coverage at competitive rates, 
              backed by professional guidance from licensed agents.
            </p>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Why Choose QuoteLinker?</h2>
            <ul className="list-disc pl-6 mb-8 space-y-4">
              <li>
                <strong>Licensed Professionals:</strong> We partner exclusively with licensed insurance 
                agents who understand local needs and regulations.
              </li>
              <li>
                <strong>Multiple Options:</strong> Compare quotes from licensed agents to find the 
                best coverage for your needs and budget.
              </li>
              <li>
                <strong>Personalized Service:</strong> Receive tailored recommendations based on your 
                specific situation and requirements.
              </li>
              <li>
                <strong>No Obligation:</strong> Get free quotes and expert guidance without any 
                commitment to purchase.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Coverage Options</h2>
            <p className="mb-4">We offer quotes for various insurance types, including:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Auto Insurance</li>
              <li>Home Insurance</li>
              <li>Life Insurance</li>
              <li>Health Insurance</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-12 mb-4">Contact Us</h2>
            <p>
              Have questions about our services? We're here to help. Contact our team at{' '}
              <a href="mailto:support@quotelinker.com" className="text-brand-primary hover:text-brand-primary-dark">
                support@quotelinker.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 