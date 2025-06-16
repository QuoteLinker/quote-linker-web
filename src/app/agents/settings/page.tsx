'use client';

import Link from 'next/link';

export default function AgentSettingsPage() {
  // Mock settings data
  const settings = {
    notifications: {
      emailNewLead: true,
      smsNewLead: false,
      emailWeeklySummary: true,
    },
    leadPreferences: {
      autoZipCodes: ['90210', '90211'],
      homeMaxDistanceMiles: 50,
      lifeMinAge: 25,
      lifeMaxAge: 65,
    }
  };

  // Placeholder handlers
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Notification setting changed:', e.target.name, e.target.checked);
    alert('Setting updated (placeholder)');
  };

  const handlePreferenceSave = () => {
    console.log('Lead preferences saved:', settings.leadPreferences);
    alert('Preferences saved (placeholder)');
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">General Settings</h1>
            <Link href="/agents/dashboard" className="text-sm font-medium text-cyan-600 hover:text-cyan-500">
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Notification Settings */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="emailNewLead" className="text-sm font-medium text-gray-700 cursor-pointer">Email me for new leads</label>
              <div className="relative inline-flex items-center">
                <input type="checkbox" id="emailNewLead" name="emailNewLead" className="sr-only peer" defaultChecked={settings.notifications.emailNewLead} onChange={handleNotificationChange} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="smsNewLead" className="text-sm font-medium text-gray-700 cursor-pointer">SMS me for new leads (requires verified number)</label>
              <div className="relative inline-flex items-center">
                <input type="checkbox" id="smsNewLead" name="smsNewLead" className="sr-only peer" defaultChecked={settings.notifications.smsNewLead} onChange={handleNotificationChange} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="emailWeeklySummary" className="text-sm font-medium text-gray-700 cursor-pointer">Send weekly performance summary email</label>
              <div className="relative inline-flex items-center">
                <input type="checkbox" id="emailWeeklySummary" name="emailWeeklySummary" className="sr-only peer" defaultChecked={settings.notifications.emailWeeklySummary} onChange={handleNotificationChange} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Delivery Preferences - Placeholder */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Lead Delivery Preferences</h2>
          <p className="text-sm text-gray-600 mb-4">Configure criteria for the leads you want to receive. (This section is a placeholder for more complex UI)</p>
          <div>
            <label htmlFor="autoZips" className="block text-sm font-medium text-gray-700">Target ZIP Codes for Auto Leads (comma-separated)</label>
            <input type="text" name="autoZips" id="autoZips" defaultValue={settings.leadPreferences.autoZipCodes.join(', ')} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
          </div>
          <div className="mt-4">
            <label htmlFor="homeMaxDistance" className="block text-sm font-medium text-gray-700">Max Distance for Home Leads (miles from your primary ZIP)</label>
            <input type="number" name="homeMaxDistance" id="homeMaxDistance" defaultValue={settings.leadPreferences.homeMaxDistanceMiles} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
          </div>
          {/* Add more preference fields as needed */}
          <div className="mt-6 text-right">
            <button 
              onClick={handlePreferenceSave}
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Save Lead Preferences
            </button>
          </div>
        </section>

        {/* API & Integrations - Placeholder */}
         <section className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">API & Integrations</h2>
          <p className="text-sm text-gray-600 mb-4">Connect QuoteLinker with your favorite tools. (API access may depend on your plan).</p>
          <div className="space-y-3">
            <p className="text-gray-700"><span className="font-medium">Your API Key:</span> <span className="font-mono bg-gray-100 px-2 py-1 rounded">agt_xxxxxxxxxxxxxxxxx (Placeholder)</span></p>
            <button className="text-sm font-medium text-cyan-600 hover:text-cyan-700" onClick={() => alert('Generate new API Key (placeholder)')}>Regenerate API Key</button>
            <p className="mt-4 text-gray-600">Popular integrations (placeholders): Salesforce, Zapier, Slack.</p>
          </div>
        </section>

      </main>
    </div>
  );
}
