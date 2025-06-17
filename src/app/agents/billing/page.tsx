"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, FileText, Settings } from "lucide-react";
import toast from "react-hot-toast";

interface SubscriptionData {
  packageName: string;
  amount: number;
  interval: string;
  startDate: string;
  status: string;
  leadsRemaining?: number;
  nextBillingDate?: string;
}

// Mock subscription data - in a real app, fetch this from API
const mockSubscription: SubscriptionData = {
  packageName: "Auto Leads - Premium",
  amount: 189,
  interval: "month",
  startDate: new Date().toLocaleDateString(),
  status: "active",
  leadsRemaining: 72,
  nextBillingDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 25 days from now
};

export default function AgentBillingPage() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPortalLoading, setIsPortalLoading] = useState(false);

  useEffect(() => {
    // In a real app, fetch this from API with agent's auth token
    const fetchSubscription = async () => {
      try {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubscription(mockSubscription);
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
        toast.error("Failed to load subscription data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const handleManageSubscription = async () => {
    setIsPortalLoading(true);
    try {
      // In a real app, get the agentId from authentication
      const agentId = "demo_agent_123"; // Placeholder
      
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId }),
      });
      
      const { url, error } = await response.json();
      
      if (error) {
        throw new Error(error);
      }
      
      // Redirect to Stripe Customer Portal
      window.location.href = url;
    } catch (error) {
      console.error("Failed to create portal session:", error);
      toast.error("Failed to open customer portal. Please try again.");
      setIsPortalLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Billing & Payments</h1>
      
      {isLoading ? (
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4 mt-6"></div>
        </div>
      ) : subscription ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Current Subscription</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {subscription.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Package</h3>
                <p className="mt-1 text-lg font-semibold">{subscription.packageName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Price</h3>
                <p className="mt-1 text-lg font-semibold">${subscription.amount}/{subscription.interval}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                <p className="mt-1">{subscription.startDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Next Billing Date</h3>
                <p className="mt-1">{subscription.nextBillingDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Leads Remaining This Month</h3>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-cyan-600 h-2.5 rounded-full" style={{ width: `${(subscription.leadsRemaining || 0) / 100 * 100}%` }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">{subscription.leadsRemaining}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t flex flex-wrap gap-4">
              <button
                onClick={handleManageSubscription}
                disabled={isPortalLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
              >
                <Settings className="mr-2 h-4 w-4" />
                {isPortalLoading ? "Loading..." : "Manage Subscription"}
              </button>
              <button
                onClick={() => window.open('/agents/billing/invoices', '_blank')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <FileText className="mr-2 h-4 w-4" />
                View Invoices
              </button>
              <button
                onClick={() => window.open('/agents/billing/payment-methods', '_blank')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 shadow text-center">
          <div className="mb-4">
            <span className="inline-block bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full font-medium">No Active Subscription</span>
          </div>
          <p className="text-gray-600 mb-6">You don't have an active subscription yet. Browse our lead packages to get started.</p>
          <a 
            href="/agents/packages" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700"
          >
            View Lead Packages
          </a>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800">Need Help?</h3>
        <p className="mt-1 text-sm text-blue-600">
          If you have any questions about billing or your subscription, contact our support team at 
          <a href="mailto:billing@quotelinker.com" className="font-medium underline ml-1">billing@quotelinker.com</a>
        </p>
      </div>
    </div>
  );
} 