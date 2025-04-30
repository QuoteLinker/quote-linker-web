import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// This is a simple auth check - in a real app, you'd use a proper auth system
function isAuthenticated() {
  // For now, we'll just check if we're on the signup page
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  return pathname.includes('/signup');
}

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, you'd check for a valid session/token
  if (!isAuthenticated()) {
    redirect('/agents/signup');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Agent Portal</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 