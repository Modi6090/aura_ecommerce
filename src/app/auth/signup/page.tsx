'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { toast } from "sonner";
import GuestRoute from '@/components/auth/GuestRoute';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Validations
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords must match');
      return;
    }

    try {
      setLoading(true);
      await authService.signUp({ email, password, fullName: name });
      toast.success('Please verify your email.');
      router.push('/auth/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestRoute>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-stone-900">Create Account</h2>
            <p className="mt-2 text-sm text-stone-600">
              Join Aura for premium furniture
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-[#0F5A37] focus:border-[#0F5A37] transition-colors"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                <label className="block text-sm font-medium text-stone-700" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-[#0F5A37] focus:border-[#0F5A37] transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-[#0F5A37] focus:border-[#0F5A37] transition-colors"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0F5A37] hover:bg-[#0c4a2d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F5A37] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-stone-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-[#0F5A37] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </GuestRoute>
  );
}
