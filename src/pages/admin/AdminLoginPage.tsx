import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const success = loginAdmin(email.trim(), password.trim());
      if (!success) {
        setErrorMsg('Invalid email or password. Please verify your credentials.');
      }
      setIsSubmitting(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 text-[#3f3f46]">
      <div className="max-w-md w-full awesomic-card p-8 sm:p-10 space-y-6 bg-white shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-[16px] bg-[#09090b] text-white mx-auto flex items-center justify-center font-bold text-lg shadow-sm">
            <span className="font-mono">a:</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#18181b] mt-3">
            AIESD Administrative CMS
          </h1>
          <p className="text-xs text-[#71717a]">
            Restricted access for institute administrators and authorized staff
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-[14px] text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#18181b]">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#71717a] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="awesomic-input pl-10 text-sm"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-[#18181b]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#71717a] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="awesomic-input pl-10 text-sm"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="awesomic-btn-dark w-full justify-center py-3 text-xs inline-flex items-center gap-2 mt-2"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign in to CMS'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#71717a] hover:text-[#18181b] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to public website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
