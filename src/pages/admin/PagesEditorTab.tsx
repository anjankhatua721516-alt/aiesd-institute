import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import {
  Sparkles,
  Save,
  CheckCircle2,
  HelpCircle,
  FileText,
  Sliders,
  Award
} from 'lucide-react';
import { HomeHeroData } from '../../types';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import { Plus, Trash2, Eye } from 'lucide-react';

export const PagesEditorTab: React.FC = () => {
  const { heroData, showToast, refreshState } = useApp();
  const [activePage, setActivePage] = useState<'hero' | 'about'>('hero');

  // Hero form
  const [heroForm, setHeroForm] = useState<HomeHeroData>({ ...heroData });

  // About form
  const [aboutForm, setAboutForm] = useState(dbService.getAboutContent());

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dbService.saveHeroData(heroForm);
      refreshState();
      showToast('Homepage hero content updated!', 'success');
    } catch {
      showToast('Error saving hero content.', 'error');
    }
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dbService.saveAboutContent(aboutForm);
      refreshState();
      showToast('About Page mission and story saved!', 'success');
    } catch {
      showToast('Error saving about content.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            Copywriting &amp; Story
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            Page Content &amp; Storytelling Editor
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Directly edit headline copy, founder quotes, stats, mission statements, and pedagogical values.
          </p>
        </div>

        {/* Awesomic pill toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('hero')}
            className={`awesomic-pill-toggle ${activePage === 'hero' ? 'active' : ''}`}
          >
            Homepage Hero &amp; Stats
          </button>
          <button
            onClick={() => setActivePage('about')}
            className={`awesomic-pill-toggle ${activePage === 'about' ? 'active' : ''}`}
          >
            About Page &amp; Mission
          </button>
        </div>
      </div>

      {/* HOMEPAGE HERO EDITOR */}
      {activePage === 'hero' && (
        <form
          onSubmit={handleSaveHero}
          className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8 space-y-6 max-w-4xl"
        >
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
            <h3 className="text-base font-bold text-[#18181b]">
              Hero Section Copy &amp; Founder Profile
            </h3>
            <button
              type="submit"
              className="awesomic-btn-dark py-2 px-4 text-xs inline-flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Hero Content</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">Founder Name</label>
              <input
                type="text"
                value={heroForm.founderName}
                onChange={(e) => setHeroForm({ ...heroForm, founderName: e.target.value })}
                className="awesomic-input text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">Founder Designation</label>
              <input
                type="text"
                value={heroForm.founderDesignation}
                onChange={(e) =>
                  setHeroForm({ ...heroForm, founderDesignation: e.target.value })
                }
                className="awesomic-input text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploadField
                label="Founder & Owner Portrait Photo"
                value={heroForm.founderPhoto}
                onChange={(url) => setHeroForm({ ...heroForm, founderPhoto: url })}
                helperText="Upload founder/director portrait picture (optimized into WebP) or paste an external image link."
              />
            </div>

            <div className="sm:col-span-2 space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-2">
                <div>
                  <h4 className="text-xs font-bold text-[#18181b]">Homepage Hero Showcase Slider Images</h4>
                  <p className="text-[11px] text-[#71717a]">
                    These images rotate in the large right-hand hero frame (classroom sessions, branch moments, coaching).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setHeroForm({
                      ...heroForm,
                      heroImages: [...(heroForm.heroImages || []), '']
                    })
                  }
                  className="awesomic-btn-light py-1 px-3 text-xs inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Slide</span>
                </button>
              </div>

              {/* Slider image upload list */}
              <div className="space-y-3">
                {(heroForm.heroImages || []).map((imgUrl, idx) => (
                  <div key={idx} className="p-3 rounded-[20px] bg-[#fafafa] border border-[#e4e4e7] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#18181b]">Slide #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(heroForm.heroImages || [])];
                          updated.splice(idx, 1);
                          setHeroForm({ ...heroForm, heroImages: updated });
                        }}
                        className="text-xs text-[#71717a] hover:text-rose-600 inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                    <ImageUploadField
                      label={`Slide Image #${idx + 1}`}
                      value={imgUrl}
                      onChange={(newUrl) => {
                        const updated = [...(heroForm.heroImages || [])];
                        updated[idx] = newUrl;
                        setHeroForm({ ...heroForm, heroImages: updated });
                      }}
                      helperText="Upload slide photo or paste image link"
                    />
                  </div>
                ))}

                {(!heroForm.heroImages || heroForm.heroImages.length === 0) && (
                  <div className="p-4 text-center rounded-[18px] border border-dashed border-[#e4e4e7] text-xs text-[#71717a]">
                    No slider photos currently added. Click &ldquo;Add Slide&rdquo; above to upload photos.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">Primary CTA Text</label>
              <input
                type="text"
                value={heroForm.ctaTextPrimary}
                onChange={(e) => setHeroForm({ ...heroForm, ctaTextPrimary: e.target.value })}
                className="awesomic-input text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">WhatsApp CTA Text</label>
              <input
                type="text"
                value={heroForm.ctaTextWhatsApp}
                onChange={(e) => setHeroForm({ ...heroForm, ctaTextWhatsApp: e.target.value })}
                className="awesomic-input text-xs"
              />
            </div>

            {/* Stats */}
            <div className="sm:col-span-2 border-t border-[#e4e4e7] pt-4">
              <h4 className="text-xs font-semibold text-[#18181b] uppercase tracking-wider mb-3">
                Key Institute Statistics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#71717a]">Students Trained</label>
                  <input
                    type="number"
                    value={heroForm.stats.studentsTrained}
                    onChange={(e) =>
                      setHeroForm({
                        ...heroForm,
                        stats: { ...heroForm.stats, studentsTrained: Number(e.target.value) }
                      })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#71717a]">Years Active</label>
                  <input
                    type="number"
                    value={heroForm.stats.yearsOfExperience}
                    onChange={(e) =>
                      setHeroForm({
                        ...heroForm,
                        stats: { ...heroForm.stats, yearsOfExperience: Number(e.target.value) }
                      })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#71717a]">Centers Count</label>
                  <input
                    type="number"
                    value={heroForm.stats.centersCount}
                    onChange={(e) =>
                      setHeroForm({
                        ...heroForm,
                        stats: { ...heroForm.stats, centersCount: Number(e.target.value) }
                      })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#71717a]">Satisfaction Rate %</label>
                  <input
                    type="number"
                    value={heroForm.stats.satisfactionRate}
                    onChange={(e) =>
                      setHeroForm({
                        ...heroForm,
                        stats: { ...heroForm.stats, satisfactionRate: Number(e.target.value) }
                      })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ABOUT PAGE STORY EDITOR */}
      {activePage === 'about' && (
        <form
          onSubmit={handleSaveAbout}
          className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8 space-y-6 max-w-4xl"
        >
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
            <h3 className="text-base font-bold text-[#18181b]">About Page &amp; Heritage</h3>
            <button
              type="submit"
              className="awesomic-btn-dark py-2 px-4 text-xs inline-flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save About Content</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">Mission Statement</label>
              <textarea
                rows={3}
                value={aboutForm.mission}
                onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                className="awesomic-input text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">Vision Statement</label>
              <textarea
                rows={3}
                value={aboutForm.vision}
                onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                className="awesomic-input text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">Full Founding Story</label>
              <textarea
                rows={5}
                value={aboutForm.story}
                onChange={(e) => setAboutForm({ ...aboutForm, story: e.target.value })}
                className="awesomic-input text-xs"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
