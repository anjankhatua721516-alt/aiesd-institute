import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/db';
import {
  Sparkles,
  Award,
  ArrowRight,
  MapPin,
  Check
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings, heroData, centers } = useApp();
  const about = dbService.getAboutContent();

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 text-[#3f3f46]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Hero */}
        <div className="max-w-2xl space-y-3">
          <span className="awesomic-badge">
            Heritage &amp; Purpose
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#18181b] tracking-tight">
            About {settings.brandName}
          </h1>
          <p className="text-[#71717a] text-base sm:text-lg">
            {settings.fullForm} (AIESD) was established with a singular conviction: that regional geography should never constrain a learner&apos;s English fluency or career trajectory.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="awesomic-card p-6 sm:p-8 space-y-3 bg-white">
            <span className="awesomic-badge">
              Our Mission
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#18181b] tracking-tight">
              Practical Fluency for Every Learner
            </h2>
            <p className="text-sm text-[#71717a] leading-relaxed">
              {about.mission}
            </p>
          </div>

          <div className="awesomic-card p-6 sm:p-8 space-y-3 bg-white">
            <span className="awesomic-badge">
              Our Vision
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#18181b] tracking-tight">
              Transforming Regional Aspirations
            </h2>
            <p className="text-sm text-[#71717a] leading-relaxed">
              {about.vision}
            </p>
          </div>
        </div>

        {/* Founding Story & Founder Message */}
        <div className="awesomic-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white">
          <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-[28px] overflow-hidden mx-auto lg:mx-0 border border-[#e4e4e7] bg-[#f4f4f5]">
              <img
                src={heroData.founderPhoto}
                alt={heroData.founderName}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#18181b]">{heroData.founderName}</h3>
              <p className="text-xs font-semibold text-[#18181b]">{heroData.founderDesignation}</p>
              <p className="text-xs text-[#71717a] mt-0.5">
                Founder &amp; Mentor to 8,500+ Regional Students
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#18181b]">
              The Founding Story
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#18181b] tracking-tight">
              Bridging the Vernacular-to-English Confidence Gap
            </h2>
            <p className="text-sm text-[#71717a] leading-relaxed">{about.story}</p>
            <div className="pt-2 text-xs text-[#18181b] italic border-l-2 border-[#18181b] pl-4">
              &ldquo;We teach students to stop translating words in their head and begin speaking spontaneously from their heart.&rdquo;
            </div>
          </div>
        </div>

        {/* Core Pedagogical Values */}
        <div className="space-y-6">
          <div className="max-w-2xl space-y-1.5">
            <span className="awesomic-badge">
              Guiding Principles
            </span>
            <h2 className="text-2xl font-bold text-[#18181b] tracking-tight">
              Educational Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {about.values.map((v, idx) => (
              <div
                key={idx}
                className="awesomic-card p-6 space-y-2 hover:border-[#18181b]/30 transition-all bg-white"
              >
                <span className="text-xs font-bold text-[#18181b]">
                  0{idx + 1}
                </span>
                <h4 className="text-base font-bold text-[#18181b]">{v.title}</h4>
                <p className="text-xs text-[#71717a] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Center Overview */}
        <div className="awesomic-card-dark p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white/70">
              Regional Presence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Accessible Physical Centers Across Bengal
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Each center features air-conditioned speaking labs, computer stations, and on-site faculty desks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {centers.map((cnt) => (
              <div key={cnt.id} className="p-5 rounded-[20px] bg-white/5 border border-white/10 space-y-1.5 text-xs">
                <p className="font-bold text-sm text-white">{cnt.name}</p>
                <p className="text-white/60">{cnt.address}</p>
                <p className="text-white font-medium">{cnt.phone}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#09090b] hover:bg-[#f4f4f5] font-semibold text-xs rounded-full transition-colors"
            >
              <span>View Map Directions &amp; Center Schedules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
