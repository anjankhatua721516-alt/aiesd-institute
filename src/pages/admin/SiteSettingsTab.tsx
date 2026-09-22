import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import { SiteSettings } from '../../types';
import { Save, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, Download, Upload, Database } from 'lucide-react';

export const SiteSettingsTab: React.FC = () => {
  const { settings, showToast, refreshState, adminUser } = useApp();
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState(false);

  const isOwner = adminUser?.role === 'Owner';

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner) {
      showToast('Only administrators with Owner role can update global site settings.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      dbService.saveSiteSettings(formData);
      refreshState();
      showToast('Global Site Settings successfully saved and live!', 'success');
    } catch {
      showToast('Error saving settings.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Reset site settings to factory seed defaults?')) {
      dbService.resetToDefault();
      refreshState();
      setFormData(dbService.getSiteSettings());
      showToast('Settings reset to seed defaults.', 'info');
    }
  };

  const handleExport = () => {
    dbService.exportBackup();
    showToast('Database backup downloaded successfully (.json)', 'success');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (dbService.importBackup(content)) {
        refreshState();
        setFormData(dbService.getSiteSettings());
        showToast('Backup restored successfully! All data updated.', 'success');
      } else {
        showToast('Invalid backup file format.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            System Config
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            Global Site Configuration &amp; Contact Information
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Controls header, footer, contact links, WhatsApp numbers, and global fee display toggles across the entire public site.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isOwner && (
            <button
              type="button"
              onClick={handleResetToDefault}
              className="awesomic-btn-light py-2 px-3 text-xs"
            >
              Reset to Factory Seed
            </button>
          )}
          <button
            type="submit"
            disabled={isSaving || !isOwner}
            className="awesomic-btn-dark py-2 px-5 text-xs inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Site Settings'}</span>
          </button>
        </div>
      </div>

      {!isOwner && (
        <div className="p-4 bg-[#fafafa] border border-[#e4e4e7] rounded-[18px] flex items-center gap-3 text-xs text-[#3f3f46]">
          <AlertCircle className="w-5 h-5 text-[#18181b] shrink-0" />
          <span>You have viewing access. Editing global institute settings requires Owner role.</span>
        </div>
      )}

      {/* Basic Identity */}
      <div className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-[#18181b]">Institute Identity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">Brand Short Name</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.brandName}
              onChange={(e) => handleChange('brandName', e.target.value)}
              className="awesomic-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">Full Official Form</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.fullForm}
              onChange={(e) => handleChange('fullForm', e.target.value)}
              className="awesomic-input text-xs"
            />
            <p className="text-[11px] text-[#71717a]">
              Must remain &ldquo;An Institute of Education &amp; Skill Development&rdquo;
            </p>
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">Header Tagline</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="awesomic-input text-xs"
            />
          </div>
        </div>
      </div>

      {/* Direct Contact Numbers */}
      <div className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-[#18181b]">Contact &amp; Helpline Numbers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">Primary Phone</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.primaryPhone}
              onChange={(e) => handleChange('primaryPhone', e.target.value)}
              className="awesomic-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">Alternate Phone</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.alternatePhone}
              onChange={(e) => handleChange('alternatePhone', e.target.value)}
              className="awesomic-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">WhatsApp Helpline (Digits)</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              className="awesomic-input text-xs font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">Official Email</label>
            <input
              type="email"
              disabled={!isOwner}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="awesomic-input text-xs"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">WhatsApp Default Chat Message</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.whatsappDefaultMessage}
              onChange={(e) => handleChange('whatsappDefaultMessage', e.target.value)}
              className="awesomic-input text-xs"
            />
          </div>
        </div>
      </div>

      {/* Social Media & Instant Channels */}
      <div className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-[#18181b]">Social Media &amp; App Redirect Links</h3>
        <p className="text-xs text-[#71717a]">
          Configure direct URLs for the dedicated /social page and app redirects (Instagram, WhatsApp, Facebook, YouTube, LinkedIn, Telegram).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">Instagram Profile URL / Handle</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.socialLinks?.instagram || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                })
              }
              placeholder="https://instagram.com/aiesd_official"
              className="awesomic-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">Facebook Page URL</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.socialLinks?.facebook || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                })
              }
              placeholder="https://facebook.com/aiesd"
              className="awesomic-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">WhatsApp Official Channel / Group</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.socialLinks?.whatsappChannel || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, whatsappChannel: e.target.value }
                })
              }
              placeholder="https://chat.whatsapp.com/... or https://whatsapp.com/channel/..."
              className="awesomic-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">YouTube Channel URL</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.socialLinks?.youtube || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                })
              }
              placeholder="https://youtube.com/@aiesd"
              className="awesomic-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">LinkedIn Page / Profile</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.socialLinks?.linkedin || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                })
              }
              placeholder="https://linkedin.com/school/aiesd"
              className="awesomic-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#18181b]">Telegram Group / Channel</label>
            <input
              type="text"
              disabled={!isOwner}
              value={formData.socialLinks?.telegram || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, telegram: e.target.value }
                })
              }
              placeholder="https://t.me/aiesd_english"
              className="awesomic-input text-xs"
            />
          </div>
        </div>
      </div>

      {/* Global Toggles */}
      <div className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-[#18181b]">Feature Toggles &amp; Commercial Policy</h3>
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              disabled={!isOwner}
              checked={formData.showCourseFees}
              onChange={(e) => handleChange('showCourseFees', e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-[#18181b] focus:ring-[#18181b]"
            />
            <div>
              <span className="text-xs font-bold text-[#18181b]">
                Display Course Fees Publicly on Website
              </span>
              <p className="text-[11px] text-[#71717a]">
                When unchecked, all course cards and detail pages hide the exact numeric amount and display &ldquo;Fees on enquiry&rdquo;.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              disabled={!isOwner}
              checked={formData.showFloatingWhatsApp}
              onChange={(e) => handleChange('showFloatingWhatsApp', e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-[#18181b] focus:ring-[#18181b]"
            />
            <div>
              <span className="text-xs font-bold text-[#18181b]">
                Show Floating WhatsApp Assistance Button
              </span>
              <p className="text-[11px] text-[#71717a]">
                Displays the floating direct counselor WhatsApp button at the bottom-right corner of all public pages.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Backup & Data Ownership */}
      <div className="bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#18181b]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#18181b]">Data Backup &amp; Offline Portability</h3>
            <p className="text-xs text-[#71717a]">
              Download complete backups of all courses, centers, batches, testimonials, and student enquiries.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-[#e4e4e7] bg-[#fafafa] space-y-2">
            <h4 className="text-xs font-bold text-[#18181b] flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-600" /> Export Database Backup
            </h4>
            <p className="text-[11px] text-[#71717a]">
              Save an offline JSON copy of all website content, settings, and student data to your computer.
            </p>
            <button
              type="button"
              onClick={handleExport}
              className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181b] text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download JSON Backup
            </button>
          </div>

          <div className="p-4 rounded-xl border border-[#e4e4e7] bg-[#fafafa] space-y-2">
            <h4 className="text-xs font-bold text-[#18181b] flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-600" /> Restore Database Backup
            </h4>
            <p className="text-[11px] text-[#71717a]">
              Restore all website content and settings from a previously saved JSON backup file.
            </p>
            <label className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e4e4e7] bg-white text-[#18181b] text-xs font-semibold hover:bg-[#f4f4f5] cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" /> Select Backup File (.json)
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
