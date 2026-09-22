import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import { Batch, SeatStatus } from '../../types';
import { Plus, Trash2, Edit2, Save, Calendar, Clock, MapPin } from 'lucide-react';

export const BatchesTab: React.FC = () => {
  const { batches, courses, centers, refreshState, showToast } = useApp();
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleEdit = (b: Batch) => {
    setEditingBatch({ ...b });
    setIsCreatingNew(false);
  };

  const handleCreate = () => {
    const defaultCourse = courses[0];
    const defaultCenter = centers[0];
    const newB: Batch = {
      id: `batch-${Date.now()}`,
      courseId: defaultCourse?.id || '',
      courseTitle: defaultCourse?.title || '',
      centerId: defaultCenter?.id || '',
      centerName: defaultCenter?.name || '',
      batchName: 'Morning Fluency Cohort',
      timing: '7:30 AM - 9:00 AM',
      days: 'Mon, Wed, Fri',
      startDate: 'Next Monday',
      seatsStatus: 'Filling fast',
      isActive: true
    };
    setEditingBatch(newB);
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBatch) return;

    // sync titles if IDs changed
    const matchedCourse = courses.find((c) => c.id === editingBatch.courseId);
    const matchedCenter = centers.find((c) => c.id === editingBatch.centerId);

    const readyToSave: Batch = {
      ...editingBatch,
      courseTitle: matchedCourse ? matchedCourse.title : editingBatch.courseTitle,
      centerName: matchedCenter ? matchedCenter.name : editingBatch.centerName
    };

    try {
      dbService.saveBatch(readyToSave);
      refreshState();
      showToast(`Batch "${readyToSave.batchName}" saved!`, 'success');
      setEditingBatch(null);
      setIsCreatingNew(false);
    } catch {
      showToast('Failed to save batch.', 'error');
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete batch "${name}"?`)) {
      dbService.deleteBatch(id);
      refreshState();
      showToast('Batch deleted.', 'info');
      if (editingBatch?.id === id) setEditingBatch(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            Cohort Operations
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            Class Batches &amp; Timings
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Manage timings, days of week, center allocations, and real-time seat availability tags.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="awesomic-btn-dark py-2 px-4 text-xs inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Batch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Batches List */}
        <div className="lg:col-span-6 space-y-3">
          {batches.map((b) => {
            const isSelected = editingBatch?.id === b.id;
            return (
              <div
                key={b.id}
                onClick={() => handleEdit(b)}
                className={`p-4 rounded-[20px] border cursor-pointer transition-all bg-white flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#09090b] shadow-sm ring-1 ring-[#09090b]'
                    : 'border-[#e4e4e7] hover:border-[#18181b]/30'
                }`}
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#18181b]">{b.batchName}</span>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        b.seatsStatus === 'Open'
                          ? 'bg-[#f4f4f5] text-[#18181b] border-[#e4e4e7]'
                          : b.seatsStatus === 'Filling fast'
                          ? 'bg-[#fafafa] text-[#18181b] border-[#e4e4e7]'
                          : 'bg-[#fafafa] text-[#71717a] border-[#e4e4e7]'
                      }`}
                    >
                      {b.seatsStatus}
                    </span>
                  </div>
                  <p className="text-xs text-[#18181b] font-semibold truncate">{b.courseTitle}</p>
                  <p className="text-[11px] text-[#71717a] flex items-center gap-2">
                    <span>{b.centerName}</span> • <span>{b.timing}</span> • <span>{b.days}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(b.id, b.batchName);
                    }}
                    className="p-2 text-[#71717a] hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editor Form */}
        <div className="lg:col-span-6 bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8">
          {editingBatch ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
                <h3 className="text-base font-bold text-[#18181b]">
                  {isCreatingNew ? 'Create New Batch' : `Edit: ${editingBatch.batchName}`}
                </h3>
                <button
                  type="submit"
                  className="awesomic-btn-dark py-1.5 px-4 text-xs inline-flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Batch</span>
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#18181b]">Batch Name</label>
                <input
                  type="text"
                  required
                  value={editingBatch.batchName}
                  onChange={(e) => setEditingBatch({ ...editingBatch, batchName: e.target.value })}
                  className="awesomic-input text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Program</label>
                  <select
                    value={editingBatch.courseId}
                    onChange={(e) =>
                      setEditingBatch({ ...editingBatch, courseId: e.target.value })
                    }
                    className="awesomic-input text-xs bg-white"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Center Location</label>
                  <select
                    value={editingBatch.centerId}
                    onChange={(e) =>
                      setEditingBatch({ ...editingBatch, centerId: e.target.value })
                    }
                    className="awesomic-input text-xs bg-white"
                  >
                    {centers.map((cnt) => (
                      <option key={cnt.id} value={cnt.id}>
                        {cnt.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Batch Timing</label>
                  <input
                    type="text"
                    value={editingBatch.timing}
                    onChange={(e) => setEditingBatch({ ...editingBatch, timing: e.target.value })}
                    placeholder="e.g. 7:30 AM - 9:00 AM"
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Days of Week</label>
                  <input
                    type="text"
                    value={editingBatch.days}
                    onChange={(e) => setEditingBatch({ ...editingBatch, days: e.target.value })}
                    placeholder="e.g. Mon, Wed, Fri"
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Seats Status</label>
                  <select
                    value={editingBatch.seatsStatus}
                    onChange={(e) =>
                      setEditingBatch({
                        ...editingBatch,
                        seatsStatus: e.target.value as SeatStatus
                      })
                    }
                    className="awesomic-input text-xs bg-white"
                  >
                    <option value="Open">Open</option>
                    <option value="Filling fast">Filling fast</option>
                    <option value="Full">Full</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Batch Start Date Label</label>
                  <input
                    type="text"
                    value={editingBatch.startDate}
                    onChange={(e) =>
                      setEditingBatch({ ...editingBatch, startDate: e.target.value })
                    }
                    placeholder="e.g. 1st Monday of Month"
                    className="awesomic-input text-xs"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={editingBatch.isActive}
                  onChange={(e) =>
                    setEditingBatch({ ...editingBatch, isActive: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#18181b] border-[#e4e4e7] focus:ring-0"
                />
                <span className="text-xs font-semibold text-[#18181b]">
                  Batch is active and displaying on public schedules
                </span>
              </label>
            </form>
          ) : (
            <div className="py-16 text-center text-[#71717a] space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-[#e4e4e7]" />
              <p className="text-xs">Select a batch to edit or create a new slot.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
