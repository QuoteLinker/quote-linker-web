"use client";
import React from "react";

export default function AgentBillingPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Billing & Payments</h1>
      <div className="bg-gray-50 rounded-lg p-6 shadow text-center">
        <div className="mb-4">
          <span className="inline-block bg-[#00EEFD] text-white px-4 py-2 rounded-full font-semibold">Stripe Integration Coming Soon</span>
        </div>
        <p className="text-gray-600 mb-2">You will be able to manage your subscription and payment methods here.</p>
        <p className="text-gray-400 text-sm">(This is a placeholder. No real billing is active.)</p>
      </div>
    </div>
  );
} 