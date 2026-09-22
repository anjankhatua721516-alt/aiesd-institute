import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import { Center } from '../../types';
import { Plus, Trash2, Edit2, Save, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export const CentersTab: React.FC = () => {
  const { centers, refreshState, showToast } = useApp();
  const [editingCenter, setEditingCenter] = useState<Center | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const handleEdit = (c: Center) => {
    setEditingCenter({ ...c });
    setIsCreatingNew(false);
  };

  const handleCreate = () => {
    const newC: Center = {
      id: `center-${Date.now()}`,
      name: 'New Campus Center',
      code: 'NEW',
      isHeadOffice: false,
      address: 'Near Bus Stand / Station Road',
      phone: '+91 98321 09876',
      whatsapp: '+91 98321 09876',
      email: 'midnapur@aiesd.in',
      timings: 'Mon-Sat: 8:00 AM - 7:00 PM',
      facilities: ['A/C Speaking Lab', 'Computer Workstations', 'Library'],
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.8!2d87.3!3d22.4',
      mapDirectionsUrl: 'https://maps.google.com'
    };
    setEditingCenter(newC);
    setIsCreatingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCenter) return;

    try {
      dbService.saveCenter(editingCenter);
      refreshState();
      showToast(`Center "${editingCenter.name}" saved!`, 'success');
      setEditingCenter(null);
      setIsCreatingNew(false);
    } catch {
      showToast('Failed to save center.', 'error');
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove center "${name}"?`)) {
      dbService.deleteCenter(id);
      refreshState();
      showToast('Center removed.', 'info');
      if (editingCenter?.id === id) setEditingCenter(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            Branch Operations
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            Center Locations &amp; Campus Facilities
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Manage Midnapur, Jhargram, and Gidhni campuses, contact phone numbers, maps, and local timings.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="awesomic-btn-dark py-2 px-4 text-xs inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Center</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Centers List */}
        <div className="lg:col-span-5 space-y-3">
          {centers.map((c) => {
            const isSelected = editingCenter?.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => handleEdit(c)}
                className={`p-4 rounded-[20px] border cursor-pointer transition-all bg-white flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-[#09090b] shadow-sm ring-1 ring-[#09090b]'
                    : 'border-[#e4e4e7] hover:border-[#18181b]/30'
                }`}
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#18181b]">{c.name}</span>
                    <span className="text-[10px] font-semibold bg-[#f4f4f5] text-[#18181b] px-2 py-0.5 rounded-full border border-[#e4e4e7]">
                      {c.code}
                    </span>
                    {c.isHeadOffice && (
                      <span className="text-[9px] font-semibold bg-[#09090b] text-white px-2 py-0.5 rounded-full">
                        HQ
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#71717a] truncate">{c.address}</p>
                  <p className="text-[11px] text-[#18181b] font-semibold">{c.phone}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(c.id, c.name);
                  }}
                  className="p-2 text-[#71717a] hover:text-rose-600 hover:bg-rose-50 rounded-full shrink-0 transition-colors"
                  title="Delete Center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Editor Form */}
        <div className="lg:col-span-7 bg-white rounded-[24px] border border-[#e4e4e7] p-6 sm:p-8">
          {editingCenter ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-3">
                <h3 className="text-base font-bold text-[#18181b]">
                  {isCreatingNew ? 'Create New Center' : `Edit Center: ${editingCenter.name}`}
                </h3>
                <button
                  type="submit"
                  className="awesomic-btn-dark py-1.5 px-4 text-xs inline-flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Center</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Center Name</label>
                  <input
                    type="text"
                    required
                    value={editingCenter.name}
                    onChange={(e) =>
                      setEditingCenter({ ...editingCenter, name: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Branch Code</label>
                  <input
                    type="text"
                    required
                    value={editingCenter.code}
                    onChange={(e) =>
                      setEditingCenter({ ...editingCenter, code: e.target.value })
                    }
                    className="awesomic-input text-xs uppercase"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Full Physical Address</label>
                  <input
                    type="text"
                    required
                    value={editingCenter.address}
                    onChange={(e) =>
                      setEditingCenter({ ...editingCenter, address: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Direct Phone Number</label>
                  <input
                    type="text"
                    required
                    value={editingCenter.phone}
                    onChange={(e) =>
                      setEditingCenter({ ...editingCenter, phone: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">WhatsApp / Helpline</label>
                  <input
                    type="text"
                    value={editingCenter.whatsapp || ''}
                    onChange={(e) =>
                      setEditingCenter({ ...editingCenter, whatsapp: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editingCenter.email}
                    onChange={(e) =>
                      setEditingCenter({ ...editingCenter, email: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">Daily Operating Timings</label>
                  <input
                    type="text"
                    value={editingCenter.timings}
                    onChange={(e) =>
                      setEditingCenter({ ...editingCenter, timings: e.target.value })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">
                    Google Maps Embed URL (Iframe Src)
                  </label>
                  <input
                    type="text"
                    value={editingCenter.mapEmbedUrl}
                    onChange={(e) =>
                      setEditingCenter({ ...editingCenter, mapEmbedUrl: e.target.value })
                    }
                    className="awesomic-input text-xs font-mono"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">
                    Google Maps Directions Link
                  </label>
                  <input
                    type="text"
                    value={editingCenter.mapDirectionsUrl}
                    onChange={(e) =>
                      setEditingCenter({ ...editingCenter, mapDirectionsUrl: e.target.value })
                    }
                    className="awesomic-input text-xs font-mono"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#18181b]">
                    Campus Facilities (1 per line)
                  </label>
                  <textarea
                    rows={2}
                    value={(editingCenter.facilities || []).join('\n')}
                    onChange={(e) =>
                      setEditingCenter({
                        ...editingCenter,
                        facilities: e.target.value.split('\n').filter((l) => l.trim())
                      })
                    }
                    className="awesomic-input text-xs"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={editingCenter.isHeadOffice}
                  onChange={(e) =>
                    setEditingCenter({ ...editingCenter, isHeadOffice: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#18181b] border-[#e4e4e7] focus:ring-0"
                />
                <span className="text-xs font-semibold text-[#18181b]">
                  Mark as Head Office / Principal Center (Midnapur)
                </span>
              </label>
            </form>
          ) : (
            <div className="py-16 text-center text-[#71717a] space-y-2">
              <MapPin className="w-8 h-8 mx-auto text-[#e4e4e7]" />
              <p className="text-xs">Select a center on the left to edit or add a new branch.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
