'use client';

import Link from 'next/link';
import AgentLeadsTable from '../../../components/AgentLeadsTable';

export default function AgentLeadsPage() {
  const handleLeadAction = (leadId: string, action: string) => {
    console.log(`Action: ${action} on Lead ID: ${leadId}`);
    alert(`Action: ${action} on Lead ID: ${leadId} (placeholder)`);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">All Leads</h1>
            <Link href="/agents/dashboard" className="text-sm font-medium text-cyan-600 hover:text-cyan-500">
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <AgentLeadsTable onLeadAction={handleLeadAction} />
      </main>
    </div>
  );
}
