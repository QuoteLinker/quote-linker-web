'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DashboardOverview from '@/components/agent/DashboardOverview';
import TeamPermissions from '@/components/agent/TeamPermissions';
import LeadAnalytics from '@/components/agent/LeadAnalytics';
import MonthlyPL from '@/components/agent/MonthlyPL';
import { BookMarked, Gauge, Users, Settings } from 'lucide-react';

const tabs = [
	{ id: 'overview', name: 'Overview', icon: Gauge },
	{ id: 'leads', name: 'Leads', icon: BookMarked },
	{ id: 'team', name: 'Team', icon: Users },
	{ id: 'settings', name: 'Settings', icon: Settings },
];

export default function DashboardPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="md:flex md:items-center md:justify-between">
						<div className="flex-1 min-w-0">
							<h1 className="text-2xl font-semibold text-gray-900">
								Welcome back, Agent
							</h1>
							<p className="mt-1 text-sm text-gray-500">
								Here&apos;s what&apos;s happening with your leads today.
							</p>
						</div>
						<div className="mt-4 flex md:mt-0 md:ml-4">
							<a
								href="/agents/get-more-leads"
								className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
							>
								Get More Leads
							</a>
							<a
								href="/agents/upgrade"
								className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
							>
								Upgrade Plan
							</a>
						</div>
					</div>
				</div>
			</header>

			{/* Main content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Tabs defaultValue="overview" className="space-y-6">
					<div className="bg-white rounded-lg shadow-sm p-1 mb-6">
						<TabsList className="grid grid-cols-4 gap-4">
							{tabs.map((tab) => {
								const Icon = tab.icon;
								return (
									<TabsTrigger
										key={tab.id}
										value={tab.id}
										className="flex items-center justify-center py-2.5 px-3 text-sm font-medium rounded-md"
									>
										<Icon className="h-5 w-5 mr-2" />
										{tab.name}
									</TabsTrigger>
								);
							})}
						</TabsList>
					</div>

					<TabsContent value="overview">
						<DashboardOverview />
					</TabsContent>

					<TabsContent value="leads">
						<div className="space-y-6">
							<LeadAnalytics />
							<MonthlyPL />
						</div>
					</TabsContent>

					<TabsContent value="team">
						<TeamPermissions />
					</TabsContent>

					<TabsContent value="settings">
						<div className="bg-white shadow-sm rounded-lg p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								Account Settings
							</h2>
							{/* Add settings form components here */}
							<div className="text-sm text-gray-500">
								Account settings coming soon...
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
