import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

// Example data - replace with real data from your backend
const monthlyData = [
  { month: 'Jan', revenue: 9500, expenses: 4200 },
  { month: 'Feb', revenue: 11200, expenses: 4500 },
  { month: 'Mar', revenue: 12800, expenses: 4800 },
  { month: 'Apr', revenue: 14500, expenses: 5100 },
  { month: 'May', revenue: 16200, expenses: 5400 },
  { month: 'Jun', revenue: 18000, expenses: 5700 },
];

const stats = [
  {
    name: 'Monthly Revenue',
    value: '$18,000',
    change: '+10.2%',
    trend: 'up'
  },
  {
    name: 'Monthly Expenses',
    value: '$5,700',
    change: '+5.5%',
    trend: 'up'
  },
  {
    name: 'Net Profit',
    value: '$12,300',
    change: '+12.8%',
    trend: 'up'
  }
];

export default function MonthlyPL() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Monthly P&L</h2>
        <select className="text-sm border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500">
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>Year to date</option>
        </select>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">{stat.name}</p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-2xl font-semibold text-gray-900">{stat.value}</span>
              <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <span className="flex items-center">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-0.5" />
                  )}
                  {stat.change}
                </span>
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="revenue" stroke="#1A73E8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="expenses" stroke="#FFC107" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-end gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#1A73E8] rounded-full mr-2"></div>
          <span className="text-gray-600">Revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#FFC107] rounded-full mr-2"></div>
          <span className="text-gray-600">Expenses</span>
        </div>
      </div>
    </div>
  );
}
