import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import { Course, CourseCategory, CourseMode } from '../../types';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  BookOpen,
  Eye,
  Star,
  ChevronDown
} from 'lucide-react';

export const CoursesTab: React.FC = () => {
  const { courses, refreshState, showToast } = useApp();
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const categories: CourseCategory[] = [
    'Spoken English',
    'Computer Basics',
    'Interview Training',
    'Personality Development'
  ];

  const handleEdit = (course: Course) => {
    setEditingCourse({ ...course });
    setIsCreatingNew(false);
  };

  const handleCreate = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      slug: `new-course-${Date.now().toString().slice(-4)}`,
      title: 'New Coaching Program',
      category: 'Spoken English',
      shortDescription: 'Short description summarizing curriculum and who it benefits.',
      fullOverview: 'Comprehensive overview of the course curriculum, learning trajectory, and class structure.',
      duration: '3 Months (36 Hours)',
      mode: 'offline',
      level: 'All Levels',
      order: courses.length + 1,
      isFeatured: false,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
      keyHighlights: ['Personalized Attention', 'Regular Practice', 'Institute Certificate'],
      syllabus: [
        {
          id: 'mod-1',
          title: 'Module 1: Orientation & Basics',
          duration: 'Week 1-2',
          topics: ['Introduction to sentence framing', 'Hesitation removal drills']
        }
      ],
      learningOutcomes: ['Confidence in spontaneous speaking', 'Professional email etiquette'],
      whoIsThisFor: ['College Students', 'Job Seekers', 'Working Professionals'],
      batchTimings: 'Morning & Evening slots available',
      availableCenters: ['Midnapur', 'Jhargram', 'Gidhni'],
      trainerName: 'Senior Faculty',
      trainerRole: 'Lead Fluency Mentor',
      isPublished: true
    };
    setEditingCourse(newCourse);
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    try {
      dbService.saveCourse(editingCourse);
      refreshState();
      showToast(`Course "${editingCourse.title}" successfully saved!`, 'success');
      setEditingCourse(null);
      setIsCreatingNew(false);
    } catch {
      showToast('Failed to save course.', 'error');
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      dbService.deleteCourse(id);
      refreshState();
      showToast('Course deleted.', 'info');
      if (editingCourse?.id === id) setEditingCourse(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            Academic Catalog
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            Course Catalog &amp; Syllabus Manager
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Create, edit, reorder, and update complete module curriculums. Spoken English automatically appears first across all public lists.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="awesomic-btn-dark py-2 px-4 text-xs inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Main Grid: List on Left, Editor on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Course Cards List */}
        <div className="lg:col-span-5 space-y-3">
          {courses.map((course) => {
            const isSelected = editingCourse?.id === course.id;
            const isSpoken = course.category === 'Spoken English';

            return (
              <div
                key={course.id}
                onClick={() => handleEdit(course)}
                className={`p-4 rounded-[20px] border cursor-pointer transition-all bg-white flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#09090b] shadow-sm ring-1 ring-[#09090b]'
                    : 'border-[#e4e4e7] hover:border-[#18181b]/30'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-12 h-12 rounded-[14px] object-cover shrink-0 border border-[#e4e4e7]"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#71717a] uppercase">
                        {course.category}
                      </span>
                      {isSpoken && (
                        <span className="text-[9px] bg-[#09090b] text-white font-extrabold px-2 py-0.5 rounded-full">
                          FLAGSHIP
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-[#18181b] truncate">{course.title}</h4>
                    <p className="text-[11px] text-[#71717a]">
                      {course.duration} • Level: {course.level}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(course.id, course.title);
                    }}
                    className="p-2 text-[#71717a] hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editor Form */}
        <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8">
          {editingCourse ? (
            <form onSubmit={handleSave} className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-4">
                <h3 className="text-base font-bold text-[#18181b]">
                  {isCreatingNew ? 'Create New Course' : `Edit: ${editingCourse.title}`}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCourse(null)}
                    className="awesomic-btn-light py-1.5 px-3 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="awesomic-btn-dark py-1.5 px-4 text-xs inline-flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Course</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.title}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, title: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.slug}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, slug: e.target.value })
                    }
                    className="awesomic-input text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Category *</label>
                  <select
                    value={editingCourse.category}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        category: e.target.value as CourseCategory
                      })
                    }
                    className="awesomic-input text-xs bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Duration (Display)</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, duration: e.target.value })
                    }
                    placeholder="e.g. 3 Months (48 Hours)"
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Learning Mode</label>
                  <select
                    value={editingCourse.mode}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        mode: e.target.value as CourseMode
                      })
                    }
                    className="awesomic-input text-xs bg-white uppercase"
                  >
                    <option value="offline">Offline Classroom</option>
                    <option value="online">Online Interactive</option>
                    <option value="hybrid">Hybrid Mode</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Course Fee (₹ INR)</label>
                  <input
                    type="number"
                    value={editingCourse.fee || ''}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        fee: e.target.value ? Number(e.target.value) : undefined
                      })
                    }
                    placeholder="e.g. 3500"
                    className="awesomic-input text-xs"
                  />
                  <p className="text-[10px] text-[#71717a]">
                    Visible publicly only if &ldquo;Display Course Fees&rdquo; toggle is active in Site Settings.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <ImageUploadField
                    label="Course Thumbnail Image"
                    value={editingCourse.thumbnail}
                    onChange={(url) =>
                      setEditingCourse({ ...editingCourse, thumbnail: url })
                    }
                    helperText="Upload your own course cover image (compressed automatically) or paste an external URL."
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Short Summary Card Teaser</label>
                  <textarea
                    rows={2}
                    value={editingCourse.shortDescription}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, shortDescription: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Full Course Overview</label>
                  <textarea
                    rows={4}
                    value={editingCourse.fullOverview}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, fullOverview: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">
                    Key Highlights (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={editingCourse.keyHighlights.join('\n')}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        keyHighlights: e.target.value.split('\n').filter((l) => l.trim())
                      })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">
                    Learning Outcomes (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={editingCourse.learningOutcomes.join('\n')}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        learningOutcomes: e.target.value.split('\n').filter((l) => l.trim())
                      })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="py-20 text-center text-[#71717a] space-y-2">
              <BookOpen className="w-10 h-10 mx-auto text-[#e4e4e7]" />
              <p className="text-xs font-medium">Select a course on the left or add a new program to start editing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
