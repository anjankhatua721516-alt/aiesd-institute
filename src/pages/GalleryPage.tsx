import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { gallery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Classroom', 'Events', 'Certifications', 'Campus'];

  const filtered = gallery.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filtered.length);
  };

  const prevImage = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filtered.length) % filtered.length);
  };

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 text-[#3f3f46]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-3">
          <span className="awesomic-badge">
            Photo Archive
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#18181b] tracking-tight">
            Institute Gallery
          </h1>
          <p className="text-[#71717a] text-base sm:text-lg">
            A look inside our interactive classroom sessions, lab practice, and student celebrations.
          </p>
        </div>

        {/* Category Filter: Awesomic pill toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`awesomic-pill-toggle ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="awesomic-card overflow-hidden group cursor-pointer hover:border-[#18181b]/30 transition-all flex flex-col justify-between bg-white"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#f4f4f5]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <span className="absolute top-3.5 left-3.5 bg-[#09090b]/80 text-white text-[10px] font-semibold px-3 py-1 rounded-full backdrop-blur">
                  {item.category}
                </span>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="text-sm font-bold text-[#18181b]">{item.title}</h3>
                {item.caption && (
                  <p className="text-xs text-[#71717a] line-clamp-1">{item.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        {activeLightboxIndex !== null && filtered[activeLightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-[#09090b]/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="max-w-3xl w-full max-h-[85vh] flex flex-col items-center">
              <img
                src={filtered[activeLightboxIndex].imageUrl}
                alt={filtered[activeLightboxIndex].title}
                className="max-h-[65vh] w-auto max-w-full rounded-[24px] object-contain border border-white/15"
              />
              <div className="mt-4 text-center text-white space-y-1">
                <h4 className="text-base font-bold">{filtered[activeLightboxIndex].title}</h4>
                <p className="text-xs text-white/70">{filtered[activeLightboxIndex].caption}</p>
                <p className="text-[11px] text-white/50 font-medium">
                  {filtered[activeLightboxIndex].category} &bull; {activeLightboxIndex + 1} of{' '}
                  {filtered.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
