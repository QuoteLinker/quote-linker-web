'use client';

import React from 'react';
import Link from 'next/link';
import { ChartBarIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const features = [
	{
		name: '100% Exclusive Leads',
		description:
			'Every lead is yours alone. No sharing, no bidding wars, just direct connections with high-intent prospects.',
		icon: ShieldCheckIcon,
	},
	{
		name: 'Smart Matching by ZIP Code',
		description:
			'Our AI matches leads to agents based on location, ensuring you get prospects in your target territory.',
		icon: ChartBarIcon,
	},
	{
		name: 'Pay-As-You-Grow Pricing',
		description:
			'Start with a volume that fits your budget and scale up as your business grows. No long-term commitments.',
		icon: CurrencyDollarIcon,
	},
];

const integrations = [
	{
		name: 'Salesforce CRM',
		description: 'Automatic lead sync and tracking',
		status: 'Coming Soon',
	},
	{
		name: 'OpenPhone',
		description: 'Integrated calling and SMS',
		status: 'Coming Soon',
	},
	{
		name: 'Stripe Billing',
		description: 'Flexible subscription management',
		status: 'Coming Soon',
	},
	{
		name: 'Zapier',
		description: 'Connect with 5000+ apps',
		status: 'Coming Soon',
	},
];

const testimonial = {
	content:
		"QuoteLinker's exclusive leads and territory protection have helped me double my book of business in just 6 months. The quality of prospects is outstanding.",
	author: {
		name: 'Sarah Johnson',
		role: 'Independent Insurance Agent',
		// Replaced placeholder image with a generic avatar or icon (using a simple div for now)
		// Consider adding a proper SVG icon or a generic avatar image if available
		imageComponent: <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">SJ</div>,
	},
};

function trackCTAClick(label: string) {
	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', 'click', {
			event_category: 'CTA',
			event_label: label,
		});
	}
}

export default function AgentsPage() {
	return (
		<div className="bg-white">
			{/* Hero Section */}
			<div className="relative isolate overflow-hidden">
				{/* Removed transparency from gradient */}
				<div className="absolute inset-0 bg-gradient-to-b from-electric-blue to-white" />
				<div className="container max-w-screen-xl mx-auto px-4 py-24 sm:py-32">
					<div className="mx-auto max-w-3xl text-center">
						<span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-sm font-semibold tracking-wide">
							Premium Lead Generation For Insurance Agents
						</span>
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
							Your Growth Engine for the Modern Insurance Economy
						</h1>
						<p className="mt-6 text-lg md:text-xl leading-8 text-gray-700 max-w-2xl mx-auto">
							QuoteLinker combines AI-powered lead generation with powerful tools to help you scale your business.
						</p>
						
						<div className="mt-4 mb-8 flex justify-center">
							<div className="inline-flex items-center text-sm text-gray-700 gap-1.5">
								<span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
									<svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
									</svg>
								</span>
								<span>100% Exclusive Leads</span>
								<span className="mx-2">•</span>
								<span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
									<svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
									</svg>
								</span>
								<span>Just Like EverQuote & ZipQuote</span>
							</div>
						</div>
						
						<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
							<Link
								href="/agents/signup"
								className="w-full sm:w-auto rounded-lg bg-electric-blue px-8 py-3 text-base font-medium text-white shadow-lg hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 transition-all duration-200"
								onClick={() => trackCTAClick('Agent Signup - Agents Page Hero')}
							>
								Start Getting Leads Now
							</Link>
							<Link
								href="/agents/login"
								className="w-full sm:w-auto rounded-lg bg-white px-8 py-3 text-base font-medium text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-all duration-200"
								onClick={() => trackCTAClick('Agent Login - Agents Page Hero')}
							>
								Agent Login
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Comparison Section - Highlighting advantages over competitors */}
			<div className="bg-slate-50 py-24">
				<div className="container max-w-screen-xl mx-auto px-4">
					<div className="mx-auto max-w-2xl text-center mb-16">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							How QuoteLinker Compares to Other Lead Providers
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							See why insurance agents are switching to our premium lead generation service
						</p>
					</div>
					
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="bg-white border-b">
									<th className="py-4 px-6 text-left font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">Feature</th>
									<th className="py-4 px-6 text-center font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
										<span className="text-electric-blue font-bold">QuoteLinker</span>
									</th>
									<th className="py-4 px-6 text-center font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">EverQuote</th>
									<th className="py-4 px-6 text-center font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">ZipQuote</th>
								</tr>
							</thead>
							<tbody>
								<tr className="bg-white border-b hover:bg-slate-50">
									<td className="py-4 px-6 text-gray-900 font-medium">100% Exclusive Leads</td>
									<td className="py-4 px-6 text-center">
										<svg className="w-6 h-6 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</td>
									<td className="py-4 px-6 text-center text-gray-500">Limited</td>
									<td className="py-4 px-6 text-center text-gray-500">Limited</td>
								</tr>
								<tr className="bg-white border-b hover:bg-slate-50">
									<td className="py-4 px-6 text-gray-900 font-medium">Real-Time Lead Alerts</td>
									<td className="py-4 px-6 text-center">
										<svg className="w-6 h-6 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</td>
									<td className="py-4 px-6 text-center">
										<svg className="w-6 h-6 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</td>
									<td className="py-4 px-6 text-center">
										<svg className="w-6 h-6 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</td>
								</tr>
								<tr className="bg-white border-b hover:bg-slate-50">
									<td className="py-4 px-6 text-gray-900 font-medium">No Long-Term Commitments</td>
									<td className="py-4 px-6 text-center">
										<svg className="w-6 h-6 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</td>
									<td className="py-4 px-6 text-center text-gray-500">Contracts Required</td>
									<td className="py-4 px-6 text-center text-gray-500">Contracts Required</td>
								</tr>
								<tr className="bg-white border-b hover:bg-slate-50">
									<td className="py-4 px-6 text-gray-900 font-medium">Transparent Pricing</td>
									<td className="py-4 px-6 text-center">
										<svg className="w-6 h-6 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</td>
									<td className="py-4 px-6 text-center text-gray-500">Variable</td>
									<td className="py-4 px-6 text-center text-gray-500">Variable</td>
								</tr>
								<tr className="bg-white hover:bg-slate-50">
									<td className="py-4 px-6 text-gray-900 font-medium">Local Territory Protection</td>
									<td className="py-4 px-6 text-center">
										<svg className="w-6 h-6 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</td>
									<td className="py-4 px-6 text-center text-gray-500">Limited</td>
									<td className="py-4 px-6 text-center text-gray-500">No</td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<div className="mt-12 text-center">
						<Link 
							href="/agents/signup"
							onClick={() => trackCTAClick('Agent Signup - Comparison Table')}
							className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-electric-blue hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-electric-blue"
						>
							Start Getting Exclusive Leads
						</Link>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="container max-w-screen-xl mx-auto px-4 py-24">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Powerful Tools for Insurance Agents
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Everything you need to boost your sales and streamline your workflow.
					</p>
				</div>
				<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
					<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
						{features.map((feature) => (
							<div key={feature.name} className="flex flex-col">
								<dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
									<feature.icon className="h-6 w-6 flex-none text-electric-blue" aria-hidden="true" />
									{feature.name}
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
									<p className="flex-auto">{feature.description}</p>
								</dd>
							</div>
						))}
					</dl>
				</div>
				<div className="mt-16 text-center">
					<Link
						href="/agents/signup"
						className="inline-block rounded-lg bg-electric-blue px-4 py-2.5 text-sm font-medium text-white shadow-brand hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 transition-all duration-200"
						onClick={() => trackCTAClick('Agent Signup - Features Section')}
					>
						Get Started with Exclusive Leads
					</Link>
				</div>
			</div>

			{/* Integrations Section */}
			<div className="bg-gray-50">
				<div className="container max-w-screen-xl mx-auto px-4 py-24">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Powerful Integrations
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Connect QuoteLinker with your favorite tools to streamline your workflow.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
						{integrations.map((integration) => (
							<div
								key={integration.name}
								className="flex flex-col rounded-lg bg-white p-8 shadow-card hover:shadow-card-hover transition-shadow"
							>
								<h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
									{integration.name}
								</h3>
								<p className="mt-2 text-base leading-7 text-gray-600">{integration.description}</p>
								<p className="mt-6 text-sm font-medium text-electric-blue">{integration.status}</p>
							</div>
						))}
					</div>
					<div className="mt-12 text-center">
						<p className="text-sm text-gray-600">
							Secure billing and subscription management for agents will be powered by Stripe.
						</p>
						{/* In a real scenario, you'd use an official Stripe logo SVG or Image component here */}
						<p className="mt-1 text-md font-semibold text-gray-700">
							Powered by <span className="text-indigo-600">Stripe</span>
						</p>
					</div>
				</div>
			</div>

			{/* Testimonial Section */}
			<div className="container max-w-screen-xl mx-auto px-4 py-24">
				<figure className="mx-auto max-w-2xl">
					<blockquote className="relative text-center text-xl font-medium leading-8 text-gray-900 sm:text-2xl sm:leading-9">
						<p className="before:content-['\u201C'] after:content-['\u201D'] italic">
							{testimonial.content}
						</p>
					</blockquote>
					<figcaption className="mt-8 flex items-center justify-center gap-x-6">
						<div className="relative h-12 w-12 rounded-full bg-gray-50">
							{/* Replaced placeholder image with a generic avatar or icon (using a simple div for now) */}
							{/* Consider adding a proper SVG icon or a generic avatar image if available */}
							{testimonial.author.imageComponent}
						</div>
						<div className="text-base">
							<div className="font-semibold text-gray-900">{testimonial.author.name}</div>
							<div className="mt-1 text-gray-600">{testimonial.author.role}</div>
						</div>
					</figcaption>
				</figure>
			</div>

			{/* Calendly Section */}
			<div id="schedule" className="bg-white">
				<div className="container max-w-screen-xl mx-auto px-4 py-24">
					<div className="mx-auto max-w-2xl text-center mb-12">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Schedule a Demo
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Learn how QuoteLinker can help grow your insurance business.
						</p>
					</div>
					<div className="mx-auto max-w-3xl">
						<div
							className="calendly-inline-widget"
							data-url="https://calendly.com/quotelinker/demo"
							style={{ minWidth: '320px', height: '700px' }}
						></div>
						<script
							type="text/javascript"
							src="https://assets.calendly.com/assets/external/widget.js"
							async
						></script>
					</div>
				</div>
			</div>

			{/* Waitlist Section */}
			<div id="join-waitlist" className="bg-gray-50">
				<div className="container max-w-screen-xl mx-auto px-4 py-24">
					<div className="mx-auto max-w-2xl text-center mb-12">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Join Our Waitlist
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Be among the first agents to get access to QuoteLinker&apos;s exclusive leads and powerful tools.
						</p>
					</div>
					<form className="mx-auto max-w-xl">
						<div className="grid grid-cols-1 gap-4">
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Enter your email"
								className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-electric-blue sm:text-sm"
								required
							/>
							<button
								type="submit"
								className="rounded-lg bg-electric-blue px-6 py-3 text-sm font-medium text-white shadow-brand hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 transition-all duration-200"
								onClick={() => trackCTAClick('Submit Waitlist - Agents Page')}
							>
								Join Waitlist
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* CTA Section */}
			<div className="bg-gray-50">
				<div className="container max-w-screen-xl mx-auto px-4 py-16">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Ready to Grow Your Business?
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Join QuoteLinker today and start receiving exclusive, high-quality insurance leads.
						</p>
						<div className="mt-10 flex items-center justify-center gap-6">
							<Link
								href="/agents/signup"
								className="rounded-lg bg-electric-blue px-6 py-2.5 text-sm font-medium text-white shadow-brand hover:bg-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 transition-all duration-200"
								onClick={() => trackCTAClick('Agent Signup - Final CTA')}
							>
								Unlock Your Territory Today
							</Link>
							<a
								href="https://calendly.com/quotelinker/demo"
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-all duration-200"
								onClick={() => trackCTAClick('Schedule Demo - Agents Page Bottom')}
							>
								Schedule a Demo
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
