export default function ThankYouLoading() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mt-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mx-auto mt-2"></div>
        </div>

        <div className="mt-12 bg-white shadow rounded-lg p-6">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start">
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="ml-4 flex-1">
                  <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    </main>
  );
} 