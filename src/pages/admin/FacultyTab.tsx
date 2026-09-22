import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import { FacultyMember } from '../../types';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import { Plus, Trash2, Edit2, Save, GraduationCap, Award, ChevronRight } from 'lucide-react';

export const FacultyTab: React.FC = () => {
  const { faculty, refreshState, showToast } = useApp();
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleEdit = (f: FacultyMember) => {
    setEditingFaculty({ ...f });
    setIsCreatingNew(false);
  };

  const handleCreate = () => {
    const newF: FacultyMember = {
      id: `fac-${Date.now()}`,
      slug: `mentor-${Date.now().toString().slice(-4)}`,
      name: 'New Faculty Member',
      designation: 'Senior English Communication Trainer',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      bio: 'Experienced educator passionate about eliminating vernacular hesitation and coaching students to speak confidently.',
      isFounder: false,
      order: faculty.length + 1,
      teachingExperienceYears: 5,
      subjects: ['Spoken English', 'Interview Preparation', 'Pronunciation'],
      qualifications: ['M.A. in English Literature', 'B.Ed.'],
      certifications: ['TESOL / TEFL 120-Hr Certified'],
      careerTimeline: [
        {
          year: '2020 - Present',
          title: 'Senior Spoken English Mentor',
          institution: 'AIESD Institute',
          description: 'Conducting intensive spoken fluency circles and public speaking clinics.'
        }
      ]
    };
    setEditingFaculty(newF);
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) return;

    try {
      dbService.saveFaculty(editingFaculty);
      refreshState();
      showToast(`Faculty "${editingFaculty.name}" saved!`, 'success');
      setEditingFaculty(null);
      setIsCreatingNew(false);
    } catch {
      showToast('Failed to save faculty profile.', 'error');
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove faculty member "${name}"?`)) {
      dbService.deleteFaculty(id);
      refreshState();
      showToast('Faculty member removed.', 'info');
      if (editingFaculty?.id === id) setEditingFaculty(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            Academic Mentors
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            Faculty &amp; Trainers Directory
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Maintain mentor credentials, teaching years, subjects, and biographical profiles.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="awesomic-btn-dark py-2 px-4 text-xs inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Trainer Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Faculty List */}
        <div className="lg:col-span-5 space-y-3">
          {faculty.map((f) => {
            const isSelected = editingFaculty?.id === f.id;
            return (
              <div
                key={f.id}
                onClick={() => handleEdit(f)}
                className={`p-4 rounded-[20px] border cursor-pointer transition-all bg-white flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#09090b] shadow-sm ring-1 ring-[#09090b]'
                    : 'border-[#e4e4e7] hover:border-[#18181b]/30'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#e4e4e7]"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-[#18181b] truncate">{f.name}</h4>
                      {f.isFounder && (
                        <span className="text-[9px] bg-[#09090b] text-white font-extrabold px-2 py-0.5 rounded-full uppercase">
                          Founder
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#71717a] truncate">{f.designation}</p>
                    <p className="text-[10px] text-[#18181b] font-semibold">
                      {f.teachingExperienceYears}+ Years Experience
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(f.id, f.name);
                  }}
                  className="p-2 text-[#71717a] hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                  title="Delete Faculty Profile"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Faculty Form */}
        <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8">
          {editingFaculty ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
                <h3 className="text-base font-bold text-[#18181b]">
                  {isCreatingNew ? 'Create New Faculty Profile' : `Edit: ${editingFaculty.name}`}
                </h3>
                <button
                  type="submit"
                  className="awesomic-btn-dark py-1.5 px-4 text-xs inline-flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingFaculty.name}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, name: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Designation *</label>
                  <input
                    type="text"
                    required
                    value={editingFaculty.designation}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, designation: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Teaching Experience (Years)</label>
                  <input
                    type="number"
                    min={0}
                    value={editingFaculty.teachingExperienceYears}
                    onChange={(e) =>
                      setEditingFaculty({
                        ...editingFaculty,
                        teachingExperienceYears: Number(e.target.value)
                      })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={editingFaculty.order}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, order: Number(e.target.value) })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUploadField
                    label="Faculty Profile Photo"
                    value={editingFaculty.photo}
                    onChange={(url) =>
                      setEditingFaculty({ ...editingFaculty, photo: url })
                    }
                    helperText="Upload a professional portrait photo of the educator or specify a photo URL."
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">
                    Subjects Taught (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingFaculty.subjects.join(', ')}
                    onChange={(e) =>
                      setEditingFaculty({
                        ...editingFaculty,
                        subjects: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">
                    Qualifications (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingFaculty.qualifications.join(', ')}
                    onChange={(e) =>
                      setEditingFaculty({
                        ...editingFaculty,
                        qualifications: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Bio Overview</label>
                  <textarea
                    rows={3}
                    value={editingFaculty.bio}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, bio: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingFaculty.isFounder}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, isFounder: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#18181b] border-[#e4e4e7] focus:ring-0"
                  />
                  <span className="text-xs font-semibold text-[#18181b]">
                    Mark as Institute Founder / Lead Academic Mentor
                  </span>
                </label>
              </div>
            </form>
          ) : (
            <div className="py-16 text-center text-[#71717a] space-y-2">
              <GraduationCap className="w-8 h-8 mx-auto text-[#e4e4e7]" />
              <p className="text-xs">Select a trainer on the left to edit details or add new faculty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
