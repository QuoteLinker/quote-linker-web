interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  bgColor?: string;
}

export default function FeatureGrid({ items, bgColor = 'bg-[#F5F7FA]' }: FeatureGridProps) {
  return (
    <section className={`${bgColor} py-16`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-[#00EEFD] text-4xl mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 