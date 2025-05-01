import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// This is a simple auth check - in a real app, you'd use a proper auth system
function isAuthenticated() {
  // For now, we'll just check if we're on the signup or login page
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  return pathname.includes('/signup') || pathname.includes('/login');
}

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only redirect if we're not on signup/login pages
  if (!isAuthenticated() && !headers().get('x-pathname')?.includes('/signup') && !headers().get('x-pathname')?.includes('/login')) {
    redirect('/agents/signup');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Agent Portal</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 