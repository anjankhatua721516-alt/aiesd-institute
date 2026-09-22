import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import { EnrollmentRecord, EnquiryRecord, EnrollmentStatus } from '../../types';
import {
  Inbox,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  FileText,
  Search,
  Filter,
  Trash2,
  Eye,
  X
} from 'lucide-react';

export const EnquiriesTab: React.FC = () => {
  const { showToast } = useApp();
  const [activeView, setActiveView] = useState<'enrollments' | 'enquiries'>('enrollments');
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(dbService.getEnrollments());
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(dbService.getEnquiries());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const [viewingRecord, setViewingRecord] = useState<EnrollmentRecord | EnquiryRecord | null>(null);

  const reload = () => {
    setEnrollments(dbService.getEnrollments());
    setEnquiries(dbService.getEnquiries());
  };

  const handleUpdateEnrollmentStatus = (id: string, newStatus: EnrollmentStatus) => {
    const updated = enrollments.map((enr) =>
      enr.id === id ? { ...enr, status: newStatus } : enr
    );
    const target = updated.find((e) => e.id === id);
    if (target) {
      dbService.saveEnrollment(target);
      setEnrollments([...updated]);
      showToast(`Enrollment marked as ${newStatus}`, 'success');
    }
  };

  const handleUpdateEnquiryStatus = (id: string, newStatus: EnrollmentStatus) => {
    const updated = enquiries.map((enq) =>
      enq.id === id ? { ...enq, status: newStatus } : enq
    );
    const target = updated.find((e) => e.id === id);
    if (target) {
      dbService.saveEnquiry(target);
      setEnquiries([...updated]);
      showToast(`Enquiry marked as ${newStatus}`, 'success');
    }
  };

  const filteredEnrollments = enrollments.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.phone.includes(searchTerm) ||
      e.referenceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="awesomic-badge">
            CRM &amp; Inquiries
          </span>
          <h2 className="text-xl font-bold text-[#18181b] tracking-tight mt-1">
            Admissions Desk: Enrollments &amp; Enquiries
          </h2>
          <p className="text-xs text-[#71717a] mt-0.5">
            Real-time pipeline of students registering online for Midnapur, Jhargram, and Gidhni centers.
          </p>
        </div>

        {/* View Switcher: Awesomic pill toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveView('enrollments');
              setStatusFilter('All');
            }}
            className={`awesomic-pill-toggle flex items-center gap-2 ${
              activeView === 'enrollments' ? 'active' : ''
            }`}
          >
            <span>Course Enrollments</span>
            <span className="bg-[#f4f4f5] text-[#18181b] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#e4e4e7]">
              {enrollments.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveView('enquiries');
              setStatusFilter('All');
            }}
            className={`awesomic-pill-toggle flex items-center gap-2 ${
              activeView === 'enquiries' ? 'active' : ''
            }`}
          >
            <span>General Contact Inquiries</span>
            <span className="bg-[#f4f4f5] text-[#18181b] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#e4e4e7]">
              {enquiries.length}
            </span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-[20px] border border-[#e4e4e7]">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717a]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, phone or reference ID..."
            className="awesomic-input pl-10 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 text-xs shrink-0">
          <span className="text-[#71717a] font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="awesomic-input text-xs bg-white font-medium flex-1 sm:w-auto"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* ENROLLMENTS TABLE */}
      {activeView === 'enrollments' && (
        <div className="bg-white rounded-[24px] border border-[#e4e4e7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafafa] border-b border-[#e4e4e7] font-bold text-[#18181b]">
                <tr>
                  <th className="p-4">Ref ID</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Phone (WhatsApp)</th>
                  <th className="p-4">Program</th>
                  <th className="p-4">Center</th>
                  <th className="p-4">Batch Slot</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e4e7]">
                {filteredEnrollments.length > 0 ? (
                  filteredEnrollments.map((enr) => (
                    <tr key={enr.id} className="hover:bg-[#fafafa]">
                      <td className="p-4 font-mono font-bold text-[#18181b]">{enr.referenceId}</td>
                      <td className="p-4 font-bold text-[#18181b]">{enr.name}</td>
                      <td className="p-4 font-mono text-[#71717a]">{enr.phone}</td>
                      <td className="p-4 font-medium text-[#18181b]">{enr.courseTitle}</td>
                      <td className="p-4 text-[#71717a]">{enr.centerName}</td>
                      <td className="p-4 text-[#71717a] text-[11px] max-w-[150px] truncate">
                        {enr.batchPreference}
                      </td>
                      <td className="p-4">
                        <select
                          value={enr.status}
                          onChange={(e) =>
                            handleUpdateEnrollmentStatus(
                              enr.id,
                              e.target.value as EnrollmentStatus
                            )
                          }
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#e4e4e7] ${
                            enr.status === 'New'
                              ? 'bg-[#09090b] text-white border-transparent'
                              : enr.status === 'Contacted'
                              ? 'bg-[#f4f4f5] text-[#18181b]'
                              : enr.status === 'Enrolled'
                              ? 'bg-[#fafafa] text-[#18181b]'
                              : 'bg-white text-[#71717a]'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`https://wa.me/${enr.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${enr.name}, this is from AIESD (${enr.centerName} Center). Regarding your enrollment application ${enr.referenceId} for ${enr.courseTitle}: when can you visit for orientation?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-[#f4f4f5] hover:bg-[#e4e4e7] text-[#18181b] rounded-full transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => setViewingRecord(enr)}
                            className="p-2 text-[#71717a] hover:text-[#18181b] hover:bg-[#f4f4f5] rounded-full transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-[#71717a]">
                      No enrollments found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ENQUIRIES TABLE */}
      {activeView === 'enquiries' && (
        <div className="bg-white rounded-[24px] border border-[#e4e4e7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafafa] border-b border-[#e4e4e7] font-bold text-[#18181b]">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Visitor Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Program</th>
                  <th className="p-4">Center</th>
                  <th className="p-4">Message Excerpt</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e4e7]">
                {filteredEnquiries.length > 0 ? (
                  filteredEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-[#fafafa]">
                      <td className="p-4 text-[#71717a]">{enq.date}</td>
                      <td className="p-4 font-bold text-[#18181b]">{enq.name}</td>
                      <td className="p-4 font-mono text-[#71717a]">{enq.phone}</td>
                      <td className="p-4 font-medium text-[#18181b]">{enq.courseInterest}</td>
                      <td className="p-4 text-[#71717a]">{enq.centerInterest}</td>
                      <td className="p-4 text-[#71717a] text-[11px] max-w-[200px] truncate">
                        {enq.message || 'No message'}
                      </td>
                      <td className="p-4">
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            handleUpdateEnquiryStatus(
                              enq.id,
                              e.target.value as EnrollmentStatus
                            )
                          }
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#e4e4e7] ${
                            enq.status === 'New'
                              ? 'bg-[#09090b] text-white border-transparent'
                              : enq.status === 'Contacted'
                              ? 'bg-[#f4f4f5] text-[#18181b]'
                              : 'bg-[#fafafa] text-[#18181b]'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Enrolled">Resolved</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${enq.name}, thank you for contacting AIESD. How can we help you regarding ${enq.courseInterest}?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-[#f4f4f5] hover:bg-[#e4e4e7] text-[#18181b] rounded-full inline-block transition-colors"
                          title="WhatsApp Reply"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-[#71717a]">
                      No general enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 bg-[#09090b]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] border border-[#e4e4e7] p-6 sm:p-8 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-[#18181b]">Application Details</h3>
                <p className="text-xs text-[#71717a]">Record ID: {viewingRecord.id}</p>
              </div>
              <button
                onClick={() => setViewingRecord(null)}
                className="p-1.5 text-[#71717a] hover:text-[#18181b] rounded-full hover:bg-[#f4f4f5] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#3f3f46] bg-[#fafafa] p-4 rounded-[18px] border border-[#e4e4e7]">
              <div className="flex justify-between">
                <span className="text-[#71717a]">Name:</span>
                <strong className="text-[#18181b]">{viewingRecord.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717a]">Phone:</span>
                <span className="font-mono text-[#18181b]">{viewingRecord.phone}</span>
              </div>
              {viewingRecord.email && (
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Email:</span>
                  <span className="text-[#18181b]">{viewingRecord.email}</span>
                </div>
              )}
              {'courseTitle' in viewingRecord && (
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Course:</span>
                  <span className="font-semibold text-[#18181b]">{viewingRecord.courseTitle}</span>
                </div>
              )}
              {'batchPreference' in viewingRecord && (
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Timing:</span>
                  <span className="text-[#18181b]">{viewingRecord.batchPreference}</span>
                </div>
              )}
              {'educationBackground' in viewingRecord && viewingRecord.educationBackground && (
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Qualification:</span>
                  <span className="text-[#18181b]">{viewingRecord.educationBackground}</span>
                </div>
              )}
              {'address' in viewingRecord && viewingRecord.address && (
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Town:</span>
                  <span className="text-[#18181b]">{viewingRecord.address}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingRecord(null)}
                className="awesomic-btn-dark py-2 px-5 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
