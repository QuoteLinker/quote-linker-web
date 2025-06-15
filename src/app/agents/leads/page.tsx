'use client';

import Link from 'next/link';

// Mock data for leads - replace with actual data fetching later
const allLeads = [
  { id: 'L123', type: 'Auto', date: '2025-06-13', name: 'John Doe', zip: '90210', status: 'New', email: 'john.doe@example.com', phone: '555-0101' },
  { id: 'L124', type: 'Life', date: '2025-06-12', name: 'Alice Smith', zip: '10001', status: 'Contacted', email: 'alice.s@example.com', phone: '555-0102' },
  { id: 'L125', type: 'Auto', date: '2025-06-11', name: 'Bob Johnson', zip: '60606', status: 'Closed (Won)', email: 'bobbyj@example.com', phone: '555-0103' },
  { id: 'L126', type: 'Home', date: '2025-06-10', name: 'Carol White', zip: '77002', status: 'New', email: 'carol.w@example.com', phone: '555-0104' },
  { id: 'L127', type: 'Health', date: '2025-06-09', name: 'David Green', zip: '33101', status: 'Not Interested', email: 'dgreen@example.com', phone: '555-0105' },
  { id: 'L128', type: 'Auto', date: '2025-06-08', name: 'Eve Black', zip: '94102', status: 'Follow-up', email: 'eve.b@example.com', phone: '555-0106' },
];

export default function AgentLeadsPage() {
  // Placeholder for filters and actions
  const handleFilterChange = (filterType: string, value: string) => {
    console.log(`Filter by ${filterType}: ${value}`);
    alert(`Filtering by ${filterType}: ${value} (placeholder)`);
  };

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
        {/* Filters Section - Placeholder */}
        <section className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Filter Leads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700">Insurance Type</label>
              <select id="typeFilter" name="typeFilter" onChange={(e) => handleFilterChange('type', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md">
                <option value="">All Types</option>
                <option value="Auto">Auto</option>
                <option value="Home">Home</option>
                <option value="Life">Life</option>
                <option value="Health">Health</option>
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Status</label>
              <select id="statusFilter" name="statusFilter" onChange={(e) => handleFilterChange('status', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md">
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Closed (Won)">Closed (Won)</option>
                <option value="Not Interested">Not Interested</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateRangeFilter" className="block text-sm font-medium text-gray-700">Date Range</label>
              <input type="date" id="dateRangeFilter" name="dateRangeFilter" onChange={(e) => handleFilterChange('date', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md" />
            </div>
            <div className="self-end">
                <button className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Apply Filters
                </button>
            </div>
          </div>
        </section>

        {/* Leads Table */}
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            {allLeads.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ZIP</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allLeads.map(lead => (
                    <tr key={lead.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.zip}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' : lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' : lead.status === 'Closed (Won)' ? 'bg-green-100 text-green-800' : lead.status === 'Not Interested' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onClick={() => alert(`View details for ${lead.id}`)} className="text-cyan-600 hover:text-cyan-900">View</button>
                        <button onClick={() => handleLeadAction(lead.id, 'Update Status')} className="text-indigo-600 hover:text-indigo-900">Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-10 text-gray-600">No leads found matching your criteria.</p>
            )}
          </div>
          {/* Pagination Placeholder */}
          {allLeads.length > 0 && (
            <nav className="mt-6 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(10, allLeads.length)}</span> of <span className="font-medium">{allLeads.length}</span> results
                </p>
              </div>
              <div className="flex-1 flex justify-between sm:justify-end">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled={allLeads.length <= 10}>
                  Next
                </button>
              </div>
            </nav>
          )}
        </section>
      </main>
    </div>
  );
}
