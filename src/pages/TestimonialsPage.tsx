import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Quote, Play, Video, MessageSquare } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { testimonials } = useApp();
  const [filter, setFilter] = useState<'All' | 'text' | 'video'>('All');

  const filtered = testimonials.filter((t) => {
    if (filter === 'All') return true;
    return t.type === filter;
  });

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 text-[#3f3f46]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-3">
          <span className="awesomic-badge">
            Alumni Outcomes
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#18181b] tracking-tight">
            Student Reviews &amp; Stories
          </h1>
          <p className="text-[#71717a] text-base sm:text-lg">
            Authentic experiences from learners who overcame hesitation, mastered fluency, and secured jobs.
          </p>
        </div>

        {/* Filter buttons: Awesomic pill toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('All')}
            className={`awesomic-pill-toggle ${filter === 'All' ? 'active' : ''}`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setFilter('text')}
            className={`awesomic-pill-toggle flex items-center gap-1.5 ${filter === 'text' ? 'active' : ''}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Written Reviews</span>
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`awesomic-pill-toggle flex items-center gap-1.5 ${filter === 'video' ? 'active' : ''}`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Stories</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="awesomic-card p-6 flex flex-col justify-between hover:border-[#18181b]/30 transition-all relative bg-white"
            >
              <Quote className="w-8 h-8 text-[#e4e4e7] absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={t.photoUrl}
                    alt={t.studentName}
                    className="w-12 h-12 rounded-full object-cover border border-[#e4e4e7]"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#18181b]">{t.studentName}</h3>
                    <p className="text-xs font-semibold text-[#18181b]">
                      {t.studentCurrentRole}{t.company ? ` • ${t.company}` : ''}
                    </p>
                    <p className="text-[11px] text-[#71717a]">Center: {t.center}</p>
                  </div>
                </div>

                <div className="text-[11px] bg-[#f4f4f5] px-3 py-1.5 rounded-full text-[#18181b] border border-[#e4e4e7] inline-block font-medium">
                  Course: {t.courseTaken}
                </div>

                <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {t.type === 'video' && t.videoEmbedUrl && (
                  <div className="pt-2">
                    <a
                      href={t.videoEmbedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="awesomic-btn-dark w-full justify-center text-xs py-2"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Watch Student Video</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
