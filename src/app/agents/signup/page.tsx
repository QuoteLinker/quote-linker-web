'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Logo from '@/components/Logo';
import FormField from '@/components/FormField';
import { trackEvent } from '@/utils/analytics'; // Import the event tracker

export default function AgentSignupPage() {
  const router = useRouter(); // Initialize the router
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agencyName: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      // Placeholder for actual signup logic with Firebase
      console.log('Agent signup data:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Track the conversion event
      trackEvent('generate_lead', {
        category: 'Agent Signup',
        label: formData.agencyName || 'Individual Agent',
      });

      // Redirect to the thank you page
      router.push('/thank-you?from=AgentSignup');

    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      // In a real app, you would log this error
      console.error('Signup Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-12 w-auto flex justify-center">
            <Logo />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your Agent Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/agents/login" className="font-medium text-cyan-600 hover:text-cyan-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormField
              label="Full Name"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              disabled={isLoading}
              value={formData.fullName}
              onChange={handleChange}
            />
            <FormField
              label="Agency Name (Optional)"
              name="agencyName"
              type="text"
              autoComplete="organization"
              disabled={isLoading}
              value={formData.agencyName}
              onChange={handleChange}
            />
            <FormField
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
            />
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              disabled={isLoading}
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {error && (
              <div>
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div>
                {/* Placeholder for SSO like Google Sign-In */}
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => alert('Google Sign-In (placeholder)')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM8.28 14.726a5.002 5.002 0 01-4.214-2.336A5.002 5.002 0 016.19 6.532a5.002 5.002 0 017.62 5.858A5.002 5.002 0 018.28 14.726zm1.09-3.554c.3-.107.54-.32.69-.6.15-.28.22-.6.22-.94s-.07-.66-.22-.94c-.15-.28-.39-.493-.69-.6L10 8.28l-.69.208c-.3.107-.54.32-.69.6-.15.28-.22.6-.22.94s.07.66.22.94c.15.28.39.493.69.6l.69.208.69-.208z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}