'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import SkeletonLoader from './SkeletonLoader';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  agencyName: string;
  address: string;
  licenseNumber: string;
}

const ProfileContent: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '555-123-4567',
    agencyName: 'Doe Insurance Pros',
    address: '123 Main St, Anytown, USA 12345',
    licenseNumber: 'AGNT12345X',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    console.log("Saving profile:", profile);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsEditing(false);
    alert('Profile saved (placeholder)');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Responsive two-column grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-6">
        {/* Left sidebar - Navigation */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="w-full bg-white shadow-sm rounded-lg p-6">
            <nav className="space-y-2">
              <Link
                href="/agents/dashboard"
                className="group flex items-center px-3 py-2 text-sm font-medium border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="truncate">← Back to Dashboard</span>
              </Link>
              <div className="group flex items-center px-3 py-2 text-sm font-medium border-l-4 border-cyan-500 text-cyan-700 bg-cyan-50">
                <span className="truncate">Profile Settings</span>
              </div>
              <Link
                href="/agents/settings"
                className="group flex items-center px-3 py-2 text-sm font-medium border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="truncate">Account Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Right main content */}
        <div className="min-w-0">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Personal & Agency Information</h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 border border-cyan-600 rounded-md hover:bg-cyan-50 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); if(isEditing) handleSave(); }}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    id="fullName" 
                    value={profile.fullName} 
                    onChange={handleChange} 
                    disabled={!isEditing || isLoading} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm disabled:bg-gray-100 disabled:opacity-70" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={profile.email} 
                    onChange={handleChange} 
                    disabled={!isEditing || isLoading} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm disabled:bg-gray-100 disabled:opacity-70" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    value={profile.phone} 
                    onChange={handleChange} 
                    disabled={!isEditing || isLoading} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm disabled:bg-gray-100 disabled:opacity-70" 
                  />
                </div>
                <div>
                  <label htmlFor="agencyName" className="block text-sm font-medium text-gray-700">Agency Name</label>
                  <input 
                    type="text" 
                    name="agencyName" 
                    id="agencyName" 
                    value={profile.agencyName} 
                    onChange={handleChange} 
                    disabled={!isEditing || isLoading} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm disabled:bg-gray-100 disabled:opacity-70" 
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Agency Address</label>
                  <textarea 
                    name="address" 
                    id="address" 
                    rows={3} 
                    value={profile.address} 
                    onChange={handleChange} 
                    disabled={!isEditing || isLoading} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm disabled:bg-gray-100 disabled:opacity-70" 
                  />
                </div>
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">License Number</label>
                  <input 
                    type="text" 
                    name="licenseNumber" 
                    id="licenseNumber" 
                    value={profile.licenseNumber} 
                    onChange={handleChange} 
                    disabled={!isEditing || isLoading} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm disabled:bg-gray-100 disabled:opacity-70" 
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => { setIsEditing(false); /* TODO: Reset form to original values if needed */ }}
                      disabled={isLoading}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 border border-transparent rounded-md shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Placeholder for changing password */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Security</h3>
              <button 
                onClick={() => alert('Change password (placeholder)')}
                className="mt-3 px-4 py-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 border border-cyan-600 rounded-md hover:bg-cyan-50 transition"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AgentProfile() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Suspense fallback={<SkeletonLoader type="profile" />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
