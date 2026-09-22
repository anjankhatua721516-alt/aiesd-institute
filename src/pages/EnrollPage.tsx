import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/db';
import { EnrollmentRecord, CourseMode } from '../types';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Clock,
  MapPin,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const EnrollPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { courses, centers, batches, settings, showToast } = useApp();

  const preselectedCourseId = searchParams.get('course') || courses[0]?.id || '';
  const preselectedBatchId = searchParams.get('batch') || '';

  // 3-step wizard state
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [educationBackground, setEducationBackground] = useState('');

  const [selectedCourseId, setSelectedCourseId] = useState(preselectedCourseId);
  const [selectedCenterId, setSelectedCenterId] = useState(centers[0]?.id || '');
  const [batchPreference, setBatchPreference] = useState('');
  const [mode, setMode] = useState<CourseMode>('offline');

  // Honeypot field for spam prevention
  const [honeypot, setHoneypot] = useState('');

  // Submitted Enrollment
  const [submittedRecord, setSubmittedRecord] = useState<EnrollmentRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedCourseId) {
      setSelectedCourseId(preselectedCourseId);
    }
  }, [preselectedCourseId]);

  useEffect(() => {
    if (preselectedBatchId) {
      const match = batches.find((b) => b.id === preselectedBatchId);
      if (match) {
        setSelectedCourseId(match.courseId);
        setSelectedCenterId(match.centerId);
        setBatchPreference(`${match.batchName} (${match.timing})`);
      }
    }
  }, [preselectedBatchId, batches]);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const selectedCenter = centers.find((c) => c.id === selectedCenterId) || centers[0];

  // Validation rules
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full Name is required.';
    const cleanDigits = phone.replace(/[^0-9]/g, '');
    if (cleanDigits.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!selectedCourseId) errs.course = 'Please choose a course.';
    if (!selectedCenterId) errs.center = 'Please choose your preferred center.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard bots

    setIsSubmitting(true);
    const refId = `AIESD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newRecord: EnrollmentRecord = {
      id: `enr-${Date.now()}`,
      referenceId: refId,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      educationBackground: educationBackground.trim(),
      courseId: selectedCourse?.id || '',
      courseTitle: selectedCourse?.title || '',
      centerId: selectedCenter?.id || '',
      centerName: selectedCenter?.name || '',
      batchPreference: batchPreference || 'Flexible / Any suitable batch',
      mode,
      status: 'New'
    };

    try {
      dbService.saveEnrollment(newRecord);
      setSubmittedRecord(newRecord);
      showToast('Enrollment submitted successfully! Admissions desk notified.', 'success');
    } catch {
      showToast('Could not save enrollment. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (submittedRecord) {
    const cleanWa = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `Hello AIESD Team, I have submitted my admission enquiry.\n\n*Reference ID:* ${submittedRecord.referenceId}\n*Name:* ${submittedRecord.name}\n*Course:* ${submittedRecord.courseTitle}\n*Center:* ${submittedRecord.centerName}\n*Batch Preference:* ${submittedRecord.batchPreference}\n\nPlease let me know the batch start date and next steps.`
    );
    const waLink = `https://wa.me/${cleanWa}?text=${waText}`;

    return (
      <div className="bg-white min-h-screen py-16 px-4">
        <div className="max-w-xl mx-auto awesomic-card p-8 sm:p-12 text-center space-y-6 bg-white">
          <div className="space-y-1">
            <span className="awesomic-badge">
              Application Logged
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#18181b] tracking-tight">
              Thank You, {submittedRecord.name}!
            </h1>
            <p className="text-[14px] text-[#71717a] max-w-md mx-auto">
              Your enrollment application has been logged at our {submittedRecord.centerName} admissions desk.
            </p>
          </div>

          <div className="p-5 bg-[#fafafa] rounded-[20px] border border-[#e4e4e7] text-left space-y-2 text-xs text-[#71717a]">
            <div className="flex justify-between">
              <span className="text-[#71717a]">Reference ID:</span>
              <strong className="text-[#18181b] font-mono text-sm">{submittedRecord.referenceId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717a]">Program:</span>
              <span className="font-semibold text-[#18181b]">{submittedRecord.courseTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717a]">Center:</span>
              <span className="font-semibold text-[#18181b]">{submittedRecord.centerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#71717a]">Contact Number:</span>
              <span className="font-semibold text-[#18181b]">{submittedRecord.phone}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="awesomic-btn-dark py-2.5 px-5 text-xs inline-flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Confirm on WhatsApp</span>
            </a>
            <Link
              to="/"
              className="awesomic-btn-light py-2.5 px-5 text-xs"
            >
              Return to Home
            </Link>
          </div>

          <p className="text-xs text-[#a1a1aa]">
            Our counselor will call you within 24 working hours to confirm your seat and trial class schedule.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 text-[#3f3f46]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="max-w-2xl space-y-2">
          <span className="awesomic-badge">
            Direct Center Admissions
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#18181b] tracking-tight">
            Reserve Your Course Seat
          </h1>
          <p className="text-[15px] text-[#71717a]">
            Join our upcoming batch in Midnapur, Jhargram, or Gidhni. Complete the 3 quick steps below.
          </p>
        </div>

        {/* Wizard Steps indicator */}
        <div className="flex items-center justify-between sm:justify-start gap-1.5 sm:gap-6 text-xs sm:text-sm font-semibold border-b border-[#e4e4e7] pb-2">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 sm:gap-2 pb-1 transition-colors ${
              step >= 1 ? 'border-b-2 border-[#09090b] text-[#18181b] font-bold' : 'text-[#a1a1aa]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-[10px] sm:text-[11px] font-bold shrink-0">
              1
            </span>
            <span className="hidden xs:inline sm:hidden">Details</span>
            <span className="hidden sm:inline">Personal Details</span>
          </button>
          <span className="text-[#e4e4e7] text-xs">&rarr;</span>
          <button
            onClick={() => {
              if (validateStep1()) setStep(2);
            }}
            className={`flex items-center gap-1.5 sm:gap-2 pb-1 transition-colors ${
              step >= 2 ? 'border-b-2 border-[#09090b] text-[#18181b] font-bold' : 'text-[#a1a1aa]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-[10px] sm:text-[11px] font-bold shrink-0">
              2
            </span>
            <span className="hidden xs:inline sm:hidden">Course</span>
            <span className="hidden sm:inline">Course &amp; Batch</span>
          </button>
          <span className="text-[#e4e4e7] text-xs">&rarr;</span>
          <button
            onClick={() => {
              if (validateStep1() && validateStep2()) setStep(3);
            }}
            className={`flex items-center gap-1.5 sm:gap-2 pb-1 transition-colors ${
              step === 3 ? 'border-b-2 border-[#09090b] text-[#18181b] font-bold' : 'text-[#a1a1aa]'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-[10px] sm:text-[11px] font-bold shrink-0">
              3
            </span>
            <span className="hidden xs:inline sm:hidden">Review</span>
            <span className="hidden sm:inline">Review &amp; Submit</span>
          </button>
        </div>

        {/* Wizard Card Container */}
        <div className="awesomic-card p-5 sm:p-10 bg-white">
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#18181b] tracking-tight">
                  Step 1: Your Personal Information
                </h2>
                <p className="text-xs text-[#71717a] mt-0.5">
                  We require this to contact you regarding batch timings and counseling.
                </p>
              </div>

              {/* Honeypot hidden input */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#18181b]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Subham Roy"
                    className="awesomic-input text-sm"
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#18181b]">
                    10-Digit Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9832109876"
                    className="awesomic-input text-sm"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#18181b]">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="subham@example.com"
                    className="awesomic-input text-sm"
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#18181b]">
                    Educational Qualification
                  </label>
                  <input
                    type="text"
                    value={educationBackground}
                    onChange={(e) => setEducationBackground(e.target.value)}
                    placeholder="e.g. Class 12 / Graduate / Job Seeker"
                    className="awesomic-input text-sm"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-medium text-[#18181b]">
                    Town / Area
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Keranitola, Midnapur or Jhargram Town"
                    className="awesomic-input text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="awesomic-btn-dark py-2.5 px-6 text-xs w-full sm:w-auto text-center justify-center"
                >
                  <span>Continue to Course Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Course & Center Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#18181b] tracking-tight">
                  Step 2: Select Program &amp; Center
                </h2>
                <p className="text-xs text-[#71717a] mt-0.5">
                  Choose the course you want to master and your preferred physical center location.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#18181b]">Desired Course *</label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="awesomic-input text-sm bg-white"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#18181b]">Preferred Center *</label>
                    <select
                      value={selectedCenterId}
                      onChange={(e) => setSelectedCenterId(e.target.value)}
                      className="awesomic-input text-sm bg-white"
                    >
                      {centers.map((cnt) => (
                        <option key={cnt.id} value={cnt.id}>
                          {cnt.name} ({cnt.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#18181b]">Learning Mode</label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value as CourseMode)}
                      className="awesomic-input text-sm bg-white uppercase"
                    >
                      <option value="offline">Offline Classroom (Recommended)</option>
                      <option value="online">Online Interactive</option>
                      <option value="hybrid">Hybrid (Classroom + Weekend)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#18181b]">
                    Preferred Batch Timing
                  </label>
                  <input
                    type="text"
                    value={batchPreference}
                    onChange={(e) => setBatchPreference(e.target.value)}
                    placeholder="e.g. Morning (7:30 AM - 9:00 AM) or Weekend Special"
                    className="awesomic-input text-sm"
                  />
                  <p className="text-[11px] text-[#71717a]">
                    Our counselor will match you to the nearest open batch slot.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-medium text-[#71717a] hover:text-[#18181b] text-center"
                >
                  &larr; Back to Personal Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep2()) setStep(3);
                  }}
                  className="awesomic-btn-dark py-2.5 px-6 text-xs w-full sm:w-auto text-center justify-center"
                >
                  <span>Review Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Submit */}
          {step === 3 && (
            <form onSubmit={handleSubmitEnrollment} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#18181b] tracking-tight">
                  Step 3: Review Your Enrollment
                </h2>
                <p className="text-xs text-[#71717a] mt-0.5">
                  Confirm your details. No immediate online payment is required.
                </p>
              </div>

              <div className="bg-[#fafafa] rounded-[20px] border border-[#e4e4e7] p-5 space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-[#e4e4e7] pb-2">
                  <span className="text-[#71717a]">Applicant:</span>
                  <span className="font-semibold text-[#18181b]">{name}</span>
                </div>
                <div className="flex justify-between border-b border-[#e4e4e7] pb-2">
                  <span className="text-[#71717a]">Phone:</span>
                  <span className="font-semibold text-[#18181b]">{phone}</span>
                </div>
                {email && (
                  <div className="flex justify-between border-b border-[#e4e4e7] pb-2">
                    <span className="text-[#71717a]">Email:</span>
                    <span className="text-[#18181b]">{email}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-[#e4e4e7] pb-2">
                  <span className="text-[#71717a]">Selected Program:</span>
                  <span className="font-semibold text-[#18181b]">{selectedCourse?.title}</span>
                </div>
                <div className="flex justify-between border-b border-[#e4e4e7] pb-2">
                  <span className="text-[#71717a]">Preferred Center:</span>
                  <span className="font-semibold text-[#18181b]">{selectedCenter?.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#e4e4e7] pb-2">
                  <span className="text-[#71717a]">Batch Timing:</span>
                  <span className="text-[#18181b]">
                    {batchPreference || 'Flexible / Assigned by center'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717a]">Mode:</span>
                  <span className="font-semibold uppercase text-[#18181b]">{mode}</span>
                </div>
              </div>

              {/* Payment policy note */}
              <div className="p-4 bg-[#f4f4f5] rounded-[18px] border border-[#e4e4e7] flex items-start gap-2.5 text-xs text-[#18181b]">
                <ShieldCheck className="w-4 h-4 text-[#18181b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Offline Desk Verification &amp; Fee Policy</p>
                  <p className="text-[#71717a] text-[11px] mt-0.5">
                    Course fee payment is finalized directly at the physical center upon attending orientation.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-medium text-[#71717a] hover:text-[#18181b] text-center"
                >
                  &larr; Back to Program
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="awesomic-btn-dark py-3 px-6 text-xs disabled:opacity-50 w-full sm:w-auto text-center justify-center"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application Now'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
