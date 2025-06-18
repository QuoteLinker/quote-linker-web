'use client';

import React, { useState, useMemo, useCallback, Suspense } from 'react';
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SkeletonLoader from './SkeletonLoader';
import { useDebounce } from '../hooks/useDebounce';

// Mock data for leads - replace with actual data fetching later
const allLeads = [
  { id: 'L123', type: 'Auto', date: '2025-06-13', name: 'John Doe', zip: '90210', status: 'New', email: 'john.doe@example.com', phone: '555-0101' },
  { id: 'L124', type: 'Life', date: '2025-06-12', name: 'Alice Smith', zip: '10001', status: 'Contacted', email: 'alice.s@example.com', phone: '555-0102' },
  { id: 'L125', type: 'Auto', date: '2025-06-11', name: 'Bob Johnson', zip: '60606', status: 'Closed (Won)', email: 'bobbyj@example.com', phone: '555-0103' },
  { id: 'L126', type: 'Home', date: '2025-06-10', name: 'Carol White', zip: '77002', status: 'New', email: 'carol.w@example.com', phone: '555-0104' },
  { id: 'L127', type: 'Health', date: '2025-06-09', name: 'David Green', zip: '33101', status: 'Not Interested', email: 'dgreen@example.com', phone: '555-0105' },
  { id: 'L128', type: 'Auto', date: '2025-06-08', name: 'Eve Black', zip: '94102', status: 'Follow-up', email: 'eve.b@example.com', phone: '555-0106' },
  { id: 'L129', type: 'Life', date: '2025-06-07', name: 'Frank Brown', zip: '02101', status: 'New', email: 'frank.b@example.com', phone: '555-0107' },
  { id: 'L130', type: 'Home', date: '2025-06-06', name: 'Grace Wilson', zip: '90210', status: 'Contacted', email: 'grace.w@example.com', phone: '555-0108' },
];

interface Lead {
  id: string;
  type: string;
  date: string;
  name: string;
  zip: string;
  status: string;
  email: string;
  phone: string;
}

type SortField = keyof Lead;
type SortDirection = 'asc' | 'desc';

interface AgentLeadsTableProps {
  leads?: Lead[];
  onLeadAction?: (leadId: string, action: string) => void;
}

const LeadsTableContent: React.FC<AgentLeadsTableProps> = ({ 
  leads = allLeads, 
  onLeadAction 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    dateRange: ''
  });

  // Debounce search term with 300ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField, sortDirection]);

  const handleFilterChange = useCallback((filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const handleLeadActionInternal = useCallback((leadId: string, action: string) => {
    if (onLeadAction) {
      onLeadAction(leadId, action);
    } else {
      console.log(`Action: ${action} on Lead ID: ${leadId}`);
      alert(`Action: ${action} on Lead ID: ${leadId} (placeholder)`);
    }
  }, [onLeadAction]);

  // Filter and sort leads
  const filteredAndSortedLeads = useMemo(() => {
    let filtered = leads.filter(lead => {
      const matchesSearch = debouncedSearchTerm === '' || 
        lead.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        lead.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        lead.phone.includes(debouncedSearchTerm) ||
        lead.zip.includes(debouncedSearchTerm);

      const matchesType = filters.type === '' || lead.type === filters.type;
      const matchesStatus = filters.status === '' || lead.status === filters.status;
      
      // Simple date filter - could be enhanced for date ranges
      const matchesDate = filters.dateRange === '' || lead.date.includes(filters.dateRange);

      return matchesSearch && matchesType && matchesStatus && matchesDate;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [leads, debouncedSearchTerm, filters, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronUpIcon className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUpIcon className="h-4 w-4 text-cyan-600" />
      : <ChevronDownIcon className="h-4 w-4 text-cyan-600" />;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed (Won)':
        return 'bg-green-100 text-green-800';
      case 'Not Interested':
        return 'bg-red-100 text-red-800';
      case 'Follow-up':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cyan-500">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Search Leads</h3>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search leads by name, ID, email, phone, or ZIP..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {debouncedSearchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Searching for: <span className="font-medium">"{debouncedSearchTerm}"</span>
          </p>
        )}
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-medium text-gray-800 mb-3">Filter Leads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700">Insurance Type</label>
            <select 
              id="typeFilter" 
              name="typeFilter" 
              onChange={(e) => handleFilterChange('type', e.target.value)} 
              value={filters.type}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
            >
              <option value="">All Types</option>
              <option value="Auto">Auto</option>
              <option value="Home">Home</option>
              <option value="Life">Life</option>
              <option value="Health">Health</option>
            </select>
          </div>
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Status</label>
            <select 
              id="statusFilter" 
              name="statusFilter" 
              onChange={(e) => handleFilterChange('status', e.target.value)} 
              value={filters.status}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
            >
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
            <input 
              type="date" 
              id="dateRangeFilter" 
              name="dateRangeFilter" 
              onChange={(e) => handleFilterChange('dateRange', e.target.value)} 
              value={filters.dateRange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md" 
            />
          </div>
          <div className="self-end">
            <button 
              onClick={() => setFilters({ type: '', status: '', dateRange: '' })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Leads ({filteredAndSortedLeads.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          {filteredAndSortedLeads.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Lead ID</span>
                      {getSortIcon('id')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                    onClick={() => handleSort('type')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Type</span>
                      {getSortIcon('type')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      {getSortIcon('date')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                    onClick={() => handleSort('zip')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>ZIP</span>
                      {getSortIcon('zip')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className="hover:bg-blue-50 focus-within:bg-blue-50 transition-colors duration-150 ease-in-out group"
                    tabIndex={0}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-blue-900">{lead.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700">{lead.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700">{lead.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700">{lead.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700">{lead.zip}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => alert(`View details for ${lead.id}`)} 
                        className="text-cyan-600 hover:text-cyan-900 transition-colors"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleLeadActionInternal(lead.id, 'Update Status')} 
                        className="text-indigo-600 hover:text-indigo-900 transition-colors"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">No leads found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ type: '', status: '', dateRange: '' });
                }}
                className="mt-2 text-cyan-600 hover:text-cyan-700 text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination Placeholder */}
        {filteredAndSortedLeads.length > 0 && (
          <nav className="mt-6 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(10, filteredAndSortedLeads.length)}</span> of <span className="font-medium">{filteredAndSortedLeads.length}</span> results
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled={filteredAndSortedLeads.length <= 10}>
                Next
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default function AgentLeadsTable(props: AgentLeadsTableProps) {
  return (
    <Suspense fallback={<SkeletonLoader type="table" rows={8} />}>
      <LeadsTableContent {...props} />
    </Suspense>
  );
}
