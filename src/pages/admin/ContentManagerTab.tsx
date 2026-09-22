import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import { Testimonial, GalleryItem, FAQItem } from '../../types';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  MessageSquare,
  Image as ImageIcon,
  HelpCircle,
  Video,
  ExternalLink
} from 'lucide-react';

export const ContentManagerTab: React.FC = () => {
  const { testimonials, gallery, faqs, refreshState, showToast } = useApp();
  const [activeSection, setActiveSection] = useState<'testimonials' | 'gallery' | 'faq'>('testimonials');

  // Testimonial State
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Gallery State
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);

  // FAQ State
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  // =================== TESTIMONIAL HANDLERS ===================
  const handleCreateTestimonial = () => {
    const newT: Testimonial = {
      id: `test-${Date.now()}`,
      studentName: 'New Student',
      studentCurrentRole: 'Spoken English Graduate',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      courseTaken: 'Spoken English & Communication Mastery',
      center: 'Midnapur',
      quote: 'AIESD completely broke down my fear of speaking in English during job interviews.',
      type: 'text',
      isApproved: true,
      isFeaturedOnHome: true,
      order: testimonials.length + 1
    };
    setEditingTestimonial(newT);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    dbService.saveTestimonial(editingTestimonial);
    refreshState();
    setEditingTestimonial(null);
    showToast('Testimonial saved.', 'success');
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Delete this student review?')) {
      dbService.deleteTestimonial(id);
      refreshState();
      showToast('Testimonial removed.', 'info');
      if (editingTestimonial?.id === id) setEditingTestimonial(null);
    }
  };

  // =================== GALLERY HANDLERS ===================
  const handleCreateGallery = () => {
    const newG: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: 'Classroom Activity',
      category: 'Classroom',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80',
      caption: 'Interactive student speaking pair exercises.',
      order: gallery.length + 1
    };
    setEditingGallery(newG);
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;
    dbService.saveGalleryItem(editingGallery);
    refreshState();
    setEditingGallery(null);
    showToast('Gallery photo saved.', 'success');
  };

  const handleDeleteGallery = (id: string) => {
    if (confirm('Delete gallery item?')) {
      dbService.deleteGalleryItem(id);
      refreshState();
      showToast('Gallery item removed.', 'info');
      if (editingGallery?.id === id) setEditingGallery(null);
    }
  };

  // =================== FAQ HANDLERS ===================
  const handleCreateFaq = () => {
    const newF: FAQItem = {
      id: `faq-${Date.now()}`,
      category: 'General',
      question: 'Do you provide course completion certificates?',
      answer: 'Yes, ISO-aligned certificates of completion and proficiency scorecards are issued upon clearing the final speaking and listening evaluations.',
      showOnHome: true,
      order: faqs.length + 1
    };
    setEditingFaq(newF);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    dbService.saveFaq(editingFaq);
    refreshState();
    setEditingFaq(null);
    showToast('FAQ question saved.', 'success');
  };

  const handleDeleteFaq = (id: string) => {
    if (confirm('Delete this question?')) {
      dbService.deleteFaq(id);
      refreshState();
      showToast('FAQ removed.', 'info');
      if (editingFaq?.id === id) setEditingFaq(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            Content Management
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            Content Editor: Testimonials, Gallery &amp; FAQs
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Maintain social proof reviews, classroom photo galleries, and institute answers.
          </p>
        </div>

        {/* Awesomic pill toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('testimonials')}
            className={`awesomic-pill-toggle ${activeSection === 'testimonials' ? 'active' : ''}`}
          >
            Reviews ({testimonials.length})
          </button>
          <button
            onClick={() => setActiveSection('gallery')}
            className={`awesomic-pill-toggle ${activeSection === 'gallery' ? 'active' : ''}`}
          >
            Gallery ({gallery.length})
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`awesomic-pill-toggle ${activeSection === 'faq' ? 'active' : ''}`}
          >
            FAQs ({faqs.length})
          </button>
        </div>
      </div>

      {/* SECTION 1: TESTIMONIALS */}
      {activeSection === 'testimonials' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex justify-between items-center pb-2">
              <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wide">
                Student Testimonials
              </span>
              <button
                onClick={handleCreateTestimonial}
                className="awesomic-btn-dark py-1.5 px-3.5 text-xs inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Review</span>
              </button>
            </div>

            {testimonials.map((t) => (
              <div
                key={t.id}
                onClick={() => setEditingTestimonial({ ...t })}
                className={`p-4 rounded-[20px] border cursor-pointer transition-all bg-white flex items-center justify-between gap-3 ${
                  editingTestimonial?.id === t.id
                    ? 'border-[#09090b] shadow-sm ring-1 ring-[#09090b]'
                    : 'border-[#e4e4e7] hover:border-[#18181b]/30'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={t.photoUrl}
                    alt={t.studentName}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#e4e4e7]"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#18181b] truncate">{t.studentName}</h4>
                    <p className="text-[11px] text-[#18181b] font-medium">{t.studentCurrentRole}</p>
                    <p className="text-[10px] text-[#71717a] capitalize">
                      {t.type} review • {t.center}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTestimonial(t.id);
                  }}
                  className="p-1.5 text-[#71717a] hover:text-rose-600 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8">
            {editingTestimonial ? (
              <form onSubmit={handleSaveTestimonial} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
                  <h3 className="text-sm font-bold text-[#18181b]">Edit Student Review</h3>
                  <button
                    type="submit"
                    className="awesomic-btn-dark py-1.5 px-4 text-xs inline-flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Review</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Student Name</label>
                    <input
                      type="text"
                      required
                      value={editingTestimonial.studentName}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          studentName: e.target.value
                        })
                      }
                      className="awesomic-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Current Role / Designation</label>
                    <input
                      type="text"
                      value={editingTestimonial.studentCurrentRole || ''}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          studentCurrentRole: e.target.value
                        })
                      }
                      placeholder="e.g. Software Associate"
                      className="awesomic-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Company / Organization</label>
                    <input
                      type="text"
                      value={editingTestimonial.company || ''}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          company: e.target.value
                        })
                      }
                      placeholder="e.g. TCS Kolkata / Care Hospital"
                      className="awesomic-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Center Location</label>
                    <input
                      type="text"
                      value={editingTestimonial.center}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          center: e.target.value
                        })
                      }
                      className="awesomic-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Review Format</label>
                    <select
                      value={editingTestimonial.type}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          type: e.target.value as any
                        })
                      }
                      className="awesomic-input text-xs bg-white"
                    >
                      <option value="text">Written Quote</option>
                      <option value="video">Video Embed Link</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <ImageUploadField
                      label="Student / Alumnus Photo"
                      value={editingTestimonial.photoUrl}
                      onChange={(url) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          photoUrl: url
                        })
                      }
                      helperText="Upload student avatar or profile image (automatically optimized and stored)."
                    />
                  </div>

                  {editingTestimonial.type === 'video' && (
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-[#18181b]">
                        YouTube Video URL
                      </label>
                      <input
                        type="text"
                        value={editingTestimonial.videoEmbedUrl || ''}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            videoEmbedUrl: e.target.value
                          })
                        }
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="awesomic-input text-xs font-mono"
                      />
                    </div>
                  )}

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Student Testimonial</label>
                    <textarea
                      rows={3}
                      required
                      value={editingTestimonial.quote}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          quote: e.target.value
                        })
                      }
                      className="awesomic-input text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-wrap items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 text-xs font-medium text-[#18181b] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingTestimonial.isFeaturedOnHome}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            isFeaturedOnHome: e.target.checked
                          })
                        }
                        className="rounded border-[#e4e4e7] text-[#09090b] focus:ring-[#09090b]"
                      />
                      <span>Feature on Homepage Shadcn Review Cards</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-medium text-[#18181b] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingTestimonial.isApproved}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            isApproved: e.target.checked
                          })
                        }
                        className="rounded border-[#e4e4e7] text-[#09090b] focus:ring-[#09090b]"
                      />
                      <span>Approved / Live</span>
                    </label>
                  </div>
                </div>
              </form>
            ) : (
              <div className="py-16 text-center text-[#71717a] space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto text-[#e4e4e7]" />
                <p className="text-xs">Select a testimonial on the left to edit.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: GALLERY */}
      {activeSection === 'gallery' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex justify-between items-center pb-2">
              <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wide">
                Photos ({gallery.length})
              </span>
              <button
                onClick={handleCreateGallery}
                className="awesomic-btn-dark py-1.5 px-3.5 text-xs inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Photo</span>
              </button>
            </div>

            {gallery.map((g) => (
              <div
                key={g.id}
                onClick={() => setEditingGallery({ ...g })}
                className={`p-3 rounded-[20px] border cursor-pointer transition-all bg-white flex items-center justify-between gap-3 ${
                  editingGallery?.id === g.id
                    ? 'border-[#09090b] shadow-sm ring-1 ring-[#09090b]'
                    : 'border-[#e4e4e7] hover:border-[#18181b]/30'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={g.imageUrl}
                    alt={g.title}
                    className="w-12 h-12 rounded-[14px] object-cover shrink-0 border border-[#e4e4e7]"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#18181b] truncate">{g.title}</h4>
                    <p className="text-[10px] text-[#71717a] uppercase font-semibold">{g.category}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGallery(g.id);
                  }}
                  className="p-1.5 text-[#71717a] hover:text-rose-600 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8">
            {editingGallery ? (
              <form onSubmit={handleSaveGallery} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
                  <h3 className="text-sm font-bold text-[#18181b]">Edit Photo Details</h3>
                  <button
                    type="submit"
                    className="awesomic-btn-dark py-1.5 px-4 text-xs inline-flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Photo</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Photo Title</label>
                    <input
                      type="text"
                      required
                      value={editingGallery.title}
                      onChange={(e) =>
                        setEditingGallery({ ...editingGallery, title: e.target.value })
                      }
                      className="awesomic-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Category</label>
                    <select
                      value={editingGallery.category}
                      onChange={(e) =>
                        setEditingGallery({
                          ...editingGallery,
                          category: e.target.value as 'Classroom' | 'Events' | 'Certifications' | 'Campus'
                        })
                      }
                      className="awesomic-input text-xs bg-white"
                    >
                      <option value="Classroom">Classroom</option>
                      <option value="Events">Events</option>
                      <option value="Certifications">Certifications</option>
                      <option value="Campus">Campus</option>
                    </select>
                  </div>

                  <div>
                    <ImageUploadField
                      label="Campus / Classroom Photo"
                      value={editingGallery.imageUrl}
                      required
                      onChange={(url) =>
                        setEditingGallery({ ...editingGallery, imageUrl: url })
                      }
                      helperText="Upload event, classroom, or campus photography directly, or input an image URL."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Caption / Description</label>
                    <input
                      type="text"
                      value={editingGallery.caption || ''}
                      onChange={(e) =>
                        setEditingGallery({ ...editingGallery, caption: e.target.value })
                      }
                      className="awesomic-input text-xs"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div className="py-16 text-center text-[#71717a] space-y-2">
                <ImageIcon className="w-8 h-8 mx-auto text-[#e4e4e7]" />
                <p className="text-xs">Select an image to edit caption and category.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: FAQ */}
      {activeSection === 'faq' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex justify-between items-center pb-2">
              <span className="text-xs font-semibold text-[#71717a] uppercase tracking-wide">
                Questions ({faqs.length})
              </span>
              <button
                onClick={handleCreateFaq}
                className="awesomic-btn-dark py-1.5 px-3.5 text-xs inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            {faqs.map((f) => (
              <div
                key={f.id}
                onClick={() => setEditingFaq({ ...f })}
                className={`p-3.5 rounded-[20px] border cursor-pointer transition-all bg-white flex items-center justify-between gap-3 ${
                  editingFaq?.id === f.id
                    ? 'border-[#09090b] shadow-sm ring-1 ring-[#09090b]'
                    : 'border-[#e4e4e7] hover:border-[#18181b]/30'
                }`}
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#18181b] truncate">{f.question}</h4>
                  <p className="text-[10px] text-[#71717a] truncate">{f.answer}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFaq(f.id);
                  }}
                  className="p-1.5 text-[#71717a] hover:text-rose-600 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8">
            {editingFaq ? (
              <form onSubmit={handleSaveFaq} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
                  <h3 className="text-sm font-bold text-[#18181b]">Edit FAQ Question</h3>
                  <button
                    type="submit"
                    className="awesomic-btn-dark py-1.5 px-4 text-xs inline-flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save FAQ</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Question Text</label>
                    <input
                      type="text"
                      required
                      value={editingFaq.question}
                      onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                      className="awesomic-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#18181b]">Comprehensive Answer</label>
                    <textarea
                      rows={4}
                      required
                      value={editingFaq.answer}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      className="awesomic-input text-xs"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div className="py-16 text-center text-[#71717a] space-y-2">
                <HelpCircle className="w-8 h-8 mx-auto text-[#e4e4e7]" />
                <p className="text-xs">Select an FAQ on the left to edit question and response.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
