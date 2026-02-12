'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail(email) && password.length > 0) {
      // Check if user has already personalized
      const hasPersonalized = localStorage.getItem('userPreferences');
      if (hasPersonalized) {
        router.push('/profile');
      } else {
        router.push('/personalize');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Login
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValidEmail(email) || password.length === 0}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
