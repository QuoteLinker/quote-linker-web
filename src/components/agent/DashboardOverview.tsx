import { 
  BarChart,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  FileText,
  Phone,
  Mail,
} from 'lucide-react';

const stats = [
  {
    name: 'Total Leads',
    value: '2,451',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Conversion Rate',
    value: '24.8%',
    change: '+4.3%',
    trend: 'up',
    icon: ArrowUpRight,
  },
  {
    name: 'Avg. Premium',
    value: '$1,245',
    change: '-2.1%',
    trend: 'down',
    icon: DollarSign,
  },
  {
    name: 'Lead Quality',
    value: '4.8/5',
    change: '+0.3',
    trend: 'up',
    icon: Star,
  },
];

const recentLeads = [
  {
    id: 1,
    name: 'John Smith',
    type: 'Auto Insurance',
    status: 'New',
    date: '2h ago',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    type: 'Home Insurance',
    status: 'Contacted',
    date: '4h ago',
    email: 'sarah.j@example.com',
    phone: '(555) 234-5678',
  },
  {
    id: 3,
    name: 'Michael Brown',
    type: 'Life Insurance',
    status: 'Qualified',
    date: '6h ago',
    email: 'm.brown@example.com',
    phone: '(555) 345-6789',
  },
];

export default function DashboardOverview() {
  return (
    <div className="min-h-screen bg-background-secondary">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`
                    p-2 rounded-lg 
                    ${stat.name === 'Total Leads' ? 'bg-blue-100 text-primary-500' : ''}
                    ${stat.name === 'Conversion Rate' ? 'bg-green-100 text-green-600' : ''}
                    ${stat.name === 'Avg. Premium' ? 'bg-purple-100 text-purple-600' : ''}
                    ${stat.name === 'Lead Quality' ? 'bg-yellow-100 text-yellow-600' : ''}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.name}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className={`
                  flex items-center text-sm font-medium
                  ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}
                `}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
          <a
            href="/agents/leads"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View all
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {lead.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{lead.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${lead.status === 'New' ? 'bg-green-100 text-green-800' : ''}
                      ${lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' : ''}
                      ${lead.status === 'Qualified' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    <div className="flex space-x-2">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-gray-400 hover:text-primary-500"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-gray-400 hover:text-primary-500"
                      >
                        <Phone className="h-5 w-5" />
                      </a>
                      <button
                        className="text-gray-400 hover:text-primary-500"
                        title="View notes"
                      >
                        <FileText className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{lead.date}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Monthly Leads Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Leads</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <BarChart className="h-8 w-8" />
            <span className="ml-2">Chart coming soon...</span>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <BarChart className="h-8 w-8" />
            <span className="ml-2">Chart coming soon...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
