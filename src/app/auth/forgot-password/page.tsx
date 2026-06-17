'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';
import GuestRoute from '@/components/auth/GuestRoute';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      await authService.resetPassword(email);
      setIsSent(true);
      toast.success('Password reset link sent to your email');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestRoute>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900">Reset Password</h2>
            <p className="mt-2 text-sm text-stone-600">
              {isSent 
                ? "We've sent a recovery link to your email." 
                : "Enter your email to receive a password reset link."}
            </p>
          </div>
          
          {!isSent ? (
            <form className="mt-8 space-y-6" onSubmit={handleReset}>
              <div>
                <label className="block text-sm font-medium text-stone-700" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-[#0F5A37] focus:border-[#0F5A37] transition-colors"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0F5A37] hover:bg-[#0c4a2d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F5A37] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8">
              <button
                onClick={() => setIsSent(false)}
                className="w-full flex justify-center py-3 px-4 border border-stone-300 rounded-lg shadow-sm text-sm font-medium text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F5A37] transition-all"
              >
                Try another email
              </button>
            </div>
          )}

          <p className="text-center text-sm text-stone-600 mt-6">
            Remembered your password?{' '}
            <Link href="/auth/login" className="font-medium text-[#0F5A37] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </GuestRoute>
  );
}
