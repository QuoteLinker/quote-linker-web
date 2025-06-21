"use client";
import React, { useState } from "react";

const insuranceLines = ["Auto", "Home", "Life", "Health", "Disability"];

export default function AgentReactivationPage() {
  const [line, setLine] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Launch Database Reactivation Campaign</h1>
      <form className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Line of Insurance</label>
          <select
            value={line}
            onChange={e => setLine(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select a line</option>
            {insuranceLines.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">SMS Message</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter your SMS campaign message here..."
          />
        </div>
        <button
          type="submit"
          className="bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#00D4E5] transition"
          disabled={!line || !message}
        >
          Launch Campaign
        </button>
      </form>
    </div>
  );
} 