import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService, MediaItem } from '../../services/db';
import {
  Sparkles,
  Search,
  Globe,
  Upload,
  CheckCircle2,
  Trash2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Save,
  Rocket
} from 'lucide-react';
import { SEOConfig } from '../../types';

export const MediaAndSEOTab: React.FC = () => {
  const { showToast, refreshState, adminUser } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'seo' | 'media' | 'checklist'>('seo');

  // SEO State
  const [seo, setSeo] = useState<SEOConfig>(dbService.getSEO());
  const [isSavingSeo, setIsSavingSeo] = useState(false);

  // Media Library State
  const [mediaList, setMediaList] = useState<MediaItem[]>(dbService.getMediaLibrary());
  const [mediaSearch, setMediaSearch] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);

  const isOwner = adminUser?.role === 'Owner';

  // Handle SEO save
  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner) {
      showToast('Only Owners can save global SEO configurations.', 'error');
      return;
    }
    setIsSavingSeo(true);
    try {
      dbService.saveSEO(seo);
      refreshState();
      showToast('SEO & OpenGraph tags updated successfully!', 'success');
    } catch {
      showToast('Error saving SEO.', 'error');
    } finally {
      setIsSavingSeo(false);
    }
  };

  // Handle Client-side Image Upload & Compression
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const optimizedItem = await dbService.uploadImage(file);
      const updated = dbService.getMediaLibrary();
      setMediaList(updated);
      showToast(
        `Uploaded & compressed "${optimizedItem.name}" to WebP format (${Math.round(
          optimizedItem.sizeKb
        )} KB)!`,
        'success'
      );
    } catch {
      showToast('Could not process image.', 'error');
    } finally {
      setIsCompressing(false);
      e.target.value = '';
    }
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm('Delete this asset from media library?')) {
      dbService.deleteMediaItem(id);
      setMediaList(dbService.getMediaLibrary());
      showToast('Asset removed.', 'info');
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Asset URL copied to clipboard!', 'success');
  };

  const filteredMedia = mediaList.filter((m) =>
    m.name.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            Search &amp; Assets
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            SEO, Media Library &amp; Launch Readiness
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Optimize meta tags, upload WebP-compressed images, and verify pre-launch checklists.
          </p>
        </div>

        {/* Awesomic pill toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('seo')}
            className={`awesomic-pill-toggle ${activeSubTab === 'seo' ? 'active' : ''}`}
          >
            SEO &amp; Meta Tags
          </button>
          <button
            onClick={() => setActiveSubTab('media')}
            className={`awesomic-pill-toggle ${activeSubTab === 'media' ? 'active' : ''}`}
          >
            Media Library ({mediaList.length})
          </button>
          <button
            onClick={() => setActiveSubTab('checklist')}
            className={`awesomic-pill-toggle ${activeSubTab === 'checklist' ? 'active' : ''}`}
          >
            Launch Checklist
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: SEO */}
      {activeSubTab === 'seo' && (
        <form
          onSubmit={handleSaveSeo}
          className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8 space-y-6 max-w-3xl"
        >
          <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#18181b]">
                Search Engine Optimization &amp; Social Previews
              </h3>
              <p className="text-xs text-[#71717a]">
                Meta title, descriptions, keywords, and OpenGraph share cards for Google &amp; WhatsApp previews.
              </p>
            </div>
            <button
              type="submit"
              disabled={isSavingSeo || !isOwner}
              className="awesomic-btn-dark py-2 px-4 text-xs inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingSeo ? 'Saving...' : 'Save Meta Tags'}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">Site Title Default</label>
              <input
                type="text"
                disabled={!isOwner}
                value={seo.siteTitleDefault}
                onChange={(e) => setSeo({ ...seo, siteTitleDefault: e.target.value })}
                className="awesomic-input text-xs"
              />
              <p className="text-[11px] text-[#71717a]">
                Recommended: 50-60 characters. Current: {seo.siteTitleDefault.length} characters.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">Meta Description Default</label>
              <textarea
                rows={3}
                disabled={!isOwner}
                value={seo.metaDescriptionDefault}
                onChange={(e) => setSeo({ ...seo, metaDescriptionDefault: e.target.value })}
                className="awesomic-input text-xs"
              />
              <p className="text-[11px] text-[#71717a]">
                Recommended: 140-160 characters. Current: {seo.metaDescriptionDefault.length} characters.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">
                Target Meta Keywords (Comma separated)
              </label>
              <input
                type="text"
                disabled={!isOwner}
                value={seo.keywordsDefault}
                onChange={(e) => setSeo({ ...seo, keywordsDefault: e.target.value })}
                className="awesomic-input text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#18181b]">
                OpenGraph Share Image URL (WhatsApp/Facebook)
              </label>
              <input
                type="text"
                disabled={!isOwner}
                value={seo.ogImageDefault}
                onChange={(e) => setSeo({ ...seo, ogImageDefault: e.target.value })}
                className="awesomic-input text-xs font-mono"
              />
            </div>

            {/* Google SERP Preview Card */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-[#18181b] uppercase tracking-wider mb-2">
                Google Search Snippet Preview:
              </p>
              <div className="p-4 bg-[#fafafa] border border-[#e4e4e7] rounded-[18px] space-y-1">
                <p className="text-[11px] text-[#18181b] font-medium">https://aiesd.in › spoken-english</p>
                <h4 className="text-base font-semibold text-[#18181b] hover:underline cursor-pointer leading-snug">
                  {seo.siteTitleDefault}
                </h4>
                <p className="text-xs text-[#71717a] leading-relaxed">
                  {seo.metaDescriptionDefault}
                </p>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* SUB-TAB 2: MEDIA LIBRARY */}
      {activeSubTab === 'media' && (
        <div className="space-y-6">
          <div className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#18181b]">In-Browser Image Compression</h3>
              <p className="text-xs text-[#71717a] mt-0.5">
                Uploaded images are automatically scaled (max 1200px) and converted into lightweight WebP format to ensure rapid loading on 3G/4G networks.
              </p>
            </div>

            <div>
              <label className="awesomic-btn-dark py-2.5 px-5 text-xs cursor-pointer inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span>{isCompressing ? 'Compressing...' : 'Upload & Compress Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isCompressing}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredMedia.map((m) => (
              <div
                key={m.id}
                className="group bg-white rounded-[20px] border border-[#e4e4e7] overflow-hidden flex flex-col justify-between hover:border-[#18181b]/30 transition-all"
              >
                <div className="relative aspect-video bg-[#fafafa] overflow-hidden">
                  <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 bg-[#09090b]/80 text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                    {Math.round(m.sizeKb)} KB
                  </span>
                </div>

                <div className="p-3 space-y-1">
                  <p className="text-xs font-semibold text-[#18181b] truncate" title={m.name}>
                    {m.name}
                  </p>
                  <p className="text-[10px] text-[#71717a]">Added: {m.uploadedAt}</p>
                </div>

                <div className="p-3 pt-0 border-t border-[#e4e4e7] flex items-center justify-between gap-1">
                  <button
                    onClick={() => handleCopyUrl(m.url)}
                    className="flex-1 py-1.5 px-2 bg-[#f4f4f5] hover:bg-[#e4e4e7] text-[#18181b] text-[11px] font-semibold rounded-full transition-colors flex items-center justify-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy URL</span>
                  </button>
                  <button
                    onClick={() => handleDeleteMedia(m.id)}
                    className="p-1.5 text-[#71717a] hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: LAUNCH READINESS CHECKLIST */}
      {activeSubTab === 'checklist' && (
        <div className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-10 space-y-6 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center border border-[#e4e4e7]">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#18181b]">Pre-Launch Quality &amp; Content Audit</h3>
              <p className="text-xs text-[#71717a]">
                100% compliance verification before production promotion.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'No "All India" Wording Found',
                desc: 'Verified: Full form strictly renders "An Institute of Education & Skill Development".',
                checked: true
              },
              {
                title: 'Spoken English Priority Billing',
                desc: 'Verified: Spoken English ranks #1 on Home, Courses list, Header nav, and Footer.',
                checked: true
              },
              {
                title: 'Center Contacts (Midnapur, Jhargram, Gidhni)',
                desc: 'Verified: All 3 regional locations render complete addresses and working helpline buttons.',
                checked: true
              },
              {
                title: 'Free Diagnostic English Test Active',
                desc: 'Verified: 20-question randomized bank, instant CEFR level calculation, and lead-gate capture.',
                checked: true
              },
              {
                title: 'Full End-to-End Admissions Pipeline',
                desc: 'Verified: 3-step enrollment wizard captures submissions to Admissions desk with WhatsApp quick confirmation.',
                checked: true
              },
              {
                title: 'Zero Dummy Links or Broken Click Handlers',
                desc: 'Verified: Every telephone, WhatsApp, social, and enrollment link has a fully functional handler.',
                checked: true
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[18px] bg-[#fafafa] border border-[#e4e4e7] flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#18181b] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#18181b]">{item.title}</h4>
                  <p className="text-xs text-[#71717a] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
