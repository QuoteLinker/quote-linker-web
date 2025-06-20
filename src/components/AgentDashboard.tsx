'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { BarChart, DollarSign, Settings, UserPlus, FileText } from 'lucide-react';
import SkeletonLoader from './SkeletonLoader';

// Mock data - replace with actual data fetching and auth later
const agentName = "Jane Doe"; // Placeholder
const leadPackages = [
  { id: 'auto_basic', name: "Auto Leads - Basic Plan", status: "Active", leadsThisMonth: 25, price: "$99/mo" },
  { id: 'life_premium', name: "Life Leads - Premium Plan", status: "Active", leadsThisMonth: 15, price: "$199/mo" },
  { id: 'home_trial', name: "Home Leads - Trial", status: "Expires in 7 days", leadsThisMonth: 5, price: "$0 (Trial)" },
];

const quickStats = [
  { title: "Active Lead Packages", value: leadPackages.filter(p => p.status === "Active").length, icon: FileText },
  { title: "Total Leads This Month", value: leadPackages.reduce((sum, p) => sum + p.leadsThisMonth, 0), icon: BarChart },
  { title: "Next Billing Amount", value: "$298", icon: DollarSign }, // Placeholder
];

// Navigation items for the sidebar
const navigationItems = [
  { name: 'Dashboard', href: '/agents/dashboard', icon: BarChart, current: true },
  { name: 'All Leads', href: '/agents/leads', icon: FileText, current: false },
  { name: 'Profile', href: '/agents/profile', icon: Settings, current: false },
  { name: 'Packages', href: '/agents/packages', icon: DollarSign, current: false },
  { name: 'Settings', href: '/agents/settings', icon: Settings, current: false },
];

const DashboardContent = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white shadow sm:rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {agentName}!</h1>
        <p className="mt-2 text-sm text-gray-600">Here&apos;s an overview of your lead generation activity.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat) => (
          <div key={stat.title} className="bg-white shadow rounded-lg p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-cyan-500 rounded-md p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Your Lead Packages */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Lead Packages</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your active and available lead subscriptions.</p>
        </div>
        <div className="divide-y divide-gray-200">
          {leadPackages.map((pkg) => (
            <div key={pkg.id} className="p-6 hover:bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <h3 className="text-lg font-medium text-cyan-600">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">Status: <span className={`font-semibold ${pkg.status === "Active" ? "text-green-600" : "text-yellow-600"}`}>{pkg.status}</span></p>
                  <p className="text-sm text-gray-500">Leads this month: {pkg.leadsThisMonth}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <p className="text-lg font-semibold text-gray-900">{pkg.price}</p>
                  <Link href="/agents/billing">
                    <span className="mt-1 inline-block text-sm text-cyan-500 hover:text-cyan-700 cursor-pointer">
                      Manage Subscription &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
          <Link href="/agents/billing">
            <span className="text-cyan-600 hover:text-cyan-700 font-medium cursor-pointer">
              Explore More Lead Packages &rarr;
            </span>
          </Link>
        </div>
      </div>

      {/* Account Settings & Other Actions */}
      <div className="bg-white shadow sm:rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account & Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/agents/settings">
            <span className="block p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <Settings className="h-6 w-6 text-cyan-600 mb-2" />
              <h3 className="font-medium text-gray-700">Account Settings</h3>
              <p className="text-sm text-gray-500">Update profile, password.</p>
            </span>
          </Link>
          <Link href="/agents/upload">
             <span className="block p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <UserPlus className="h-6 w-6 text-cyan-600 mb-2" />
              <h3 className="font-medium text-gray-700">Upload Leads</h3>
              <p className="text-sm text-gray-500">Upload your existing leads.</p>
            </span>
          </Link>
          <Link href="/agents/reactivation">
            <span className="block p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <BarChart className="h-6 w-6 text-cyan-600 mb-2" />
              <h3 className="font-medium text-gray-700">Reactivation Campaigns</h3>
              <p className="text-sm text-gray-500">Engage your old leads.</p>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const AgentSidebar = () => {
  return (
    <div className="w-full lg:w-64 bg-white shadow-sm rounded-lg p-6">
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${
              item.current
                ? 'bg-cyan-50 border-cyan-500 text-cyan-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors`}
          >
            <item.icon
              className={`${
                item.current ? 'text-cyan-500' : 'text-gray-400 group-hover:text-gray-500'
              } flex-shrink-0 -ml-1 mr-3 h-5 w-5`}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default function AgentDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Responsive two-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Left sidebar - Agent navigation */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <AgentSidebar />
          </div>

          {/* Right main content */}
          <div className="min-w-0 p-6">
            <Suspense fallback={<SkeletonLoader type="dashboard" />}>
              <DashboardContent />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
