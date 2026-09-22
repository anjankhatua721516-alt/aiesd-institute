import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Check,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  ChevronDown
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { courses, settings, centers } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Spoken English',
    'Computer Basics',
    'Interview Training',
    'Personality Development'
  ];

  const filteredCourses = courses.filter((c) => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  // Ensure Spoken English is placed first
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (a.category === 'Spoken English') return -1;
    if (b.category === 'Spoken English') return 1;
    return a.order - b.order;
  });

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 text-[#3f3f46]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="max-w-2xl space-y-3">
          <span className="awesomic-badge">
            Curriculum Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#18181b] tracking-tight">
            Skill &amp; Language Development Programs
          </h1>
          <p className="text-[#71717a] text-base sm:text-lg">
            Interactive spoken coaching designed for students, job candidates, and working adults in Midnapur, Jhargram, and Gidhni.
          </p>
        </div>

        {/* Category Tabs: Awesomic pill toggles */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap snap-x-mandatory">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`awesomic-pill-toggle shrink-0 snap-start ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {sortedCourses.map((course) => {
            const isSpoken = course.category === 'Spoken English';
            return (
              <div
                key={course.id}
                className="awesomic-card overflow-hidden flex flex-col justify-between hover:border-[#18181b]/30 transition-all bg-white"
              >
                <div>
                  <div className="relative h-48 sm:h-64 overflow-hidden bg-[#f4f4f5]">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
                      <span className="bg-[#09090b] text-white text-[11px] font-medium px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                      {isSpoken && (
                        <span className="bg-white text-[#18181b] text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                          Flagship
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 sm:p-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#71717a]">
                      <span className="bg-[#f4f4f5] px-3 py-1 rounded-full border border-[#e4e4e7] text-[#18181b]">
                        {course.duration}
                      </span>
                      <span className="bg-[#f4f4f5] px-3 py-1 rounded-full border border-[#e4e4e7] text-[#18181b] uppercase">
                        {course.mode}
                      </span>
                      <span className="bg-[#f4f4f5] px-3 py-1 rounded-full border border-[#e4e4e7] text-[#18181b]">
                        Level: {course.level}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#18181b] tracking-tight">
                      {course.title}
                    </h2>
                    <p className="text-[14px] text-[#71717a] leading-relaxed">
                      {course.shortDescription}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2 border-t border-[#e4e4e7]">
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-[#71717a]">
                        Curriculum Highlights:
                      </p>
                      <div className="space-y-1.5">
                        {course.keyHighlights.slice(0, 3).map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-[13px] text-[#18181b]">
                            <Check className="w-3.5 h-3.5 text-[#18181b] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-5 sm:p-8 pt-0 border-t border-[#e4e4e7] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-2">
                  <div>
                    {settings.showCourseFees && course.fee ? (
                      <div>
                        <p className="text-[10px] uppercase font-semibold text-[#71717a]">Course Fee</p>
                        <p className="text-base font-bold text-[#18181b]">
                          ₹{course.fee.toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs font-medium text-[#71717a]">Fees on enquiry</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/courses/${course.slug}`}
                      className="awesomic-btn-light text-[12px] py-2 px-3.5 flex-1 sm:flex-initial text-center justify-center"
                    >
                      Syllabus
                    </Link>
                    <Link
                      to={`/enroll?course=${course.id}`}
                      className="awesomic-btn-dark text-[12px] py-2 px-4 flex-1 sm:flex-initial text-center justify-center"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { courses, centers, settings } = useApp();
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);

  const course = courses.find((c) => c.slug === slug) || courses[0];

  if (!course) {
    return (
      <div className="py-20 text-center bg-white">
        <p className="text-base text-[#18181b]">Course not found.</p>
        <Link to="/courses" className="text-[#18181b] font-medium underline mt-4 inline-block">
          Return to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 text-[#3f3f46]">
      {/* Course Banner (Awesomic deep black header) */}
      <div className="bg-[#09090b] text-white py-14 sm:py-16 border-b border-[#09090b]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Link to="/courses" className="hover:text-white">
                  Courses
                </Link>
                <span>/</span>
                <span className="text-white font-medium">{course.category}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                {course.title}
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
                {course.shortDescription}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 pt-2">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  Duration: {course.duration}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 uppercase">
                  <BookOpen className="w-3.5 h-3.5 text-white" />
                  Mode: {course.mode}
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  <Award className="w-3.5 h-3.5 text-white" />
                  Certificate Included
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white text-[#18181b] rounded-[28px] p-6 border border-[#e4e4e7] space-y-4 shadow-sm">
              <div className="rounded-[18px] overflow-hidden h-40 bg-[#f4f4f5]">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] text-[#71717a] uppercase tracking-wider font-semibold">
                  Admissions Status
                </p>
                <p className="text-lg font-bold text-[#18181b]">Batches Enrolling Now</p>
                {settings.showCourseFees && course.fee && (
                  <p className="text-xl font-bold text-[#18181b] mt-1">
                    ₹{course.fee.toLocaleString()}
                  </p>
                )}
              </div>
              <Link
                to={`/enroll?course=${course.id}`}
                className="awesomic-btn-dark w-full justify-center py-2.5 text-[14px]"
              >
                <span>Reserve Seat in Batch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="awesomic-card p-6 sm:p-8 space-y-3 bg-white">
              <h2 className="text-xl font-bold text-[#18181b] tracking-tight">Course Overview</h2>
              <p className="text-[#71717a] leading-relaxed text-sm sm:text-base">
                {course.fullOverview}
              </p>
            </div>

            {/* Syllabus Accordion */}
            <div className="awesomic-card p-6 sm:p-8 space-y-6 bg-white">
              <div>
                <h2 className="text-xl font-bold text-[#18181b] tracking-tight">
                  Detailed Syllabus &amp; Modules
                </h2>
                <p className="text-xs text-[#71717a] mt-1">
                  Step-by-step progression from initial hesitation removal to fluid speaking and interview delivery.
                </p>
              </div>

              <div className="space-y-3">
                {course.syllabus.map((mod, idx) => {
                  const isOpen = openModuleId === mod.id || (openModuleId === null && idx === 0);
                  return (
                    <div
                      key={mod.id}
                      className="border border-[#e4e4e7] rounded-[18px] overflow-hidden bg-white"
                    >
                      <button
                        onClick={() => setOpenModuleId(isOpen ? '' : mod.id)}
                        className="w-full px-5 py-4 text-left font-semibold text-[#18181b] text-sm flex items-center justify-between gap-2 hover:bg-[#fafafa]"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#f4f4f5] text-[#18181b] text-[11px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <span>{mod.title}</span>
                        </span>
                        <span className="text-xs text-[#71717a] font-normal shrink-0">
                          {mod.duration}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 pt-1 text-xs text-[#71717a] border-t border-[#e4e4e7] space-y-2">
                          {mod.topics.map((t, tidx) => (
                            <div key={tidx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#18181b] shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="awesomic-card p-6 sm:p-8 space-y-4 bg-white">
              <h2 className="text-xl font-bold text-[#18181b] tracking-tight">
                What You Will Master (Learning Outcomes)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#fafafa] rounded-[16px] border border-[#e4e4e7] text-xs text-[#18181b] flex items-start gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-[#18181b] shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who It Is For */}
            <div className="awesomic-card p-6 sm:p-8 space-y-3 bg-white">
              <h2 className="text-xl font-bold text-[#18181b] tracking-tight">
                Who Should Attend This Program
              </h2>
              <ul className="space-y-2 text-xs text-[#71717a]">
                {course.whoIsThisFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18181b] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar: Admission & Locations */}
          <div className="lg:col-span-4 space-y-6">
            <div className="awesomic-card p-6 space-y-4 bg-white">
              <h3 className="text-base font-bold text-[#18181b] tracking-tight">
                Admission &amp; Seat Reservation
              </h3>
              <p className="text-xs text-[#71717a] leading-relaxed">
                Admissions are currently open for {course.title}. Apply online to reserve your seat and choose your preferred study timings with our academic mentors.
              </p>
              <div className="pt-2">
                <Link
                  to={`/enroll?course=${course.id}`}
                  className="awesomic-btn-dark w-full justify-center text-[13px] py-2.5"
                >
                  Apply for Admission
                </Link>
              </div>
            </div>

            {/* Centers Offered Strip */}
            <div className="awesomic-card p-6 space-y-3 text-xs bg-white">
              <h3 className="text-sm font-bold text-[#18181b] tracking-tight">
                Classroom Center Availability
              </h3>
              <div className="space-y-2">
                {centers.map((center) => (
                  <div key={center.id} className="flex items-center gap-2 text-[#71717a]">
                    <MapPin className="w-3.5 h-3.5 text-[#18181b] shrink-0" />
                    <span>{center.name} ({center.code})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
