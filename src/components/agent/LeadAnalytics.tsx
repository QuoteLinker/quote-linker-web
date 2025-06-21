import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Percent } from 'lucide-react';

// Example data - replace with real data from your backend
const leadData = [
  { month: 'Jan', leads: 65 },
  { month: 'Feb', leads: 75 },
  { month: 'Mar', leads: 85 },
  { month: 'Apr', leads: 95 },
  { month: 'May', leads: 105 },
  { month: 'Jun', leads: 115 },
];

const stats = [
  {
    name: 'Total Leads',
    value: '540',
    change: '+12.5%',
    trend: 'up',
    timePeriod: 'from last month'
  },
  {
    name: 'Conversion Rate',
    value: '24.3%',
    change: '+4.1%',
    trend: 'up',
    timePeriod: 'from last month'
  },
  {
    name: 'Cost per Lead',
    value: '$42',
    change: '-8.3%',
    trend: 'down',
    timePeriod: 'from last month'
  },
];

export default function LeadAnalytics() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Lead Analytics</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">{stat.name}</p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="flex items-center">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-0.5" />
                  )}
                  {stat.change}
                </span>
              </span>
            </p>
            <p className="mt-1 text-xs text-gray-500">{stat.timePeriod}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={leadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="leads" fill="#1A73E8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
