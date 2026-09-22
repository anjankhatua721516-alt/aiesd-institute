import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, BookOpen, Phone } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-white min-h-[75vh] flex items-center justify-center px-4 py-16 text-[#3f3f46]">
      <div className="max-w-md w-full text-center space-y-6 awesomic-card p-8 sm:p-12 bg-white">
        <span className="text-6xl font-black text-[#18181b] tracking-tight">404</span>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#18181b] tracking-tight">Page Not Found</h1>
          <p className="text-xs text-[#71717a] leading-relaxed">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            to="/"
            className="awesomic-btn-dark w-full justify-center py-3 text-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/courses"
            className="awesomic-btn-light w-full justify-center py-3 text-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse All Courses</span>
          </Link>
          <Link
            to="/contact"
            className="awesomic-btn-light w-full justify-center py-3 text-xs"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Institute Admissions</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
