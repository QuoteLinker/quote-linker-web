import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agent Dashboard | QuoteLinker',
  description: 'Access your leads, monitor performance, and manage your QuoteLinker account.',
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
