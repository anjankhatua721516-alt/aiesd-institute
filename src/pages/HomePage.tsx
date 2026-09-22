import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TestimonialsSection, TestimonialItem } from '@/components/ui/testimonials-3';
import Team from '@/components/ui/team-02';
import {
  MessageSquare,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Phone,
  MessageCircle,
  Calendar,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Play,
  Quote,
  ShieldCheck,
  ChevronLeft,
  Clock,
  MapPin,
  Check,
  ArrowUpRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    settings,
    heroData,
    whyChoose,
    courses,
    faculty,
    testimonials,
    courseFeatures,
    gallery,
    faqs,
    centers
  } = useApp();

  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Awesomic interactive plan filter state inspired by reference image
  const [companyStage, setCompanyStage] = useState<'Launching' | 'Scaling'>('Launching');
  const [workStyle, setWorkStyle] = useState<'Get an expert talent' | 'Create with AI'>('Get an expert talent');

  // Rotate hero quote
  useEffect(() => {
    if (!heroData.quotes || heroData.quotes.length <= 1) return;
    const interval = setInterval(() => {
      setActiveQuoteIdx((prev) => (prev + 1) % heroData.quotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [heroData.quotes]);

  // Prepared hero slider images (actual founder/owner + coaching center moments)
  const heroSliderImages = [
    heroData.founderPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    ...(heroData.heroImages && heroData.heroImages.length > 0 ? heroData.heroImages : [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85'
    ])
  ].filter(Boolean);

  // Auto-slide hero images every 5 seconds
  useEffect(() => {
    if (heroSliderImages.length <= 1) return;
    const imgInterval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % heroSliderImages.length);
    }, 5000);
    return () => clearInterval(imgInterval);
  }, [heroSliderImages.length]);

  const currentQuote = heroData.quotes?.[activeQuoteIdx] || heroData.quotes?.[0];
  const flagshipCourse = courses.find((c) => c.category === 'Spoken English') || courses[0];
  const otherCourses = courses.filter((c) => c.id !== flagshipCourse?.id);
  const homeFaqs = faqs.filter((f) => f.showOnHome).slice(0, 8);

  const cleanWhatsAppNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const cleanPhone = settings.primaryPhone.replace(/\s+/g, '');

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#3f3f46]">
      {/* 1. HERO SECTION (Awesomic clean, functional layout with large bold typography and interactive plan card) */}
      <section className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#e4e4e7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Top Pill Tag */}
          <div className="flex items-center gap-2">
            <span className="awesomic-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18181b]" />
              Admissions Open 2025–2026
            </span>
            <span className="text-[13px] text-[#71717a] hidden sm:inline">
              Midnapur • Jhargram • Gidhni
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Awesomic clean headline + concise pitch + CTA buttons */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-[#18181b] tracking-[-1px] sm:tracking-[-1.5px] leading-[1.15] sm:leading-[1.12]">
                Find the coaching program that fits how you speak &amp; build.
              </h1>

              <p className="text-[14px] sm:text-[16px] text-[#71717a] leading-[22px] sm:leading-[24px] max-w-xl">
                {currentQuote?.supportingLine ||
                  'No rote memorization, no classroom judgment. Practical spoken English coaching, computer literacy, and personality grooming tailored for vernacular students in Midnapur and Jhargram.'}
              </p>

              {/* Founder quote capsule callout */}
              <div className="awesomic-card p-4 sm:p-5 flex items-start gap-3.5 max-w-xl">
                <Quote className="w-5 h-5 text-[#18181b] shrink-0 mt-0.5" />
                <div className="text-[13px] text-[#71717a] space-y-1">
                  <p className="text-[#18181b] font-medium leading-relaxed">
                    &ldquo;{currentQuote?.quote}&rdquo;
                  </p>
                  <p className="text-[12px] font-semibold text-[#71717a]">
                    — {heroData.founderName}, {heroData.founderDesignation} ({heroData.founderExperienceYears}+ Years Dedicated Teaching)
                  </p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
                <Link
                  to="/enroll"
                  className="awesomic-btn-dark py-3 px-6 text-[14px] w-full sm:w-auto text-center justify-center"
                >
                  <span>{heroData.ctaTextPrimary || 'Reserve Admission Seat'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/free-english-test"
                  className="awesomic-btn-light py-3 px-5 text-[14px] w-full sm:w-auto text-center justify-center"
                >
                  <Sparkles className="w-4 h-4 text-[#18181b]" />
                  <span>Free English Test</span>
                </Link>

                <a
                  href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
                    settings.whatsappDefaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="awesomic-btn-ghost py-2.5 px-4 text-[14px] w-full sm:w-auto text-center justify-center border border-[#e4e4e7] sm:border-transparent"
                >
                  <MessageCircle className="w-4 h-4 text-[#18181b]" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>

              {/* Awesomic Metrics Strip */}
              <div className="pt-6 sm:pt-8 border-t border-[#e4e4e7] grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left">
                <div className="p-3 sm:p-0 bg-[#fafafa] sm:bg-transparent rounded-[18px] sm:rounded-none border border-[#e4e4e7] sm:border-none">
                  <p className="text-xl sm:text-3xl font-bold text-[#18181b] tracking-tight">
                    {heroData.stats.studentsTrained.toLocaleString()}+
                  </p>
                  <p className="text-[11px] sm:text-[12px] text-[#71717a] uppercase tracking-wider mt-0.5">
                    Alumni Mentored
                  </p>
                </div>
                <div className="p-3 sm:p-0 bg-[#fafafa] sm:bg-transparent rounded-[18px] sm:rounded-none border border-[#e4e4e7] sm:border-none">
                  <p className="text-xl sm:text-3xl font-bold text-[#18181b] tracking-tight">
                    {heroData.stats.yearsOfExperience}+
                  </p>
                  <p className="text-[11px] sm:text-[12px] text-[#71717a] uppercase tracking-wider mt-0.5">
                    Years Coaching
                  </p>
                </div>
                <div className="p-3 sm:p-0 bg-[#fafafa] sm:bg-transparent rounded-[18px] sm:rounded-none border border-[#e4e4e7] sm:border-none">
                  <p className="text-xl sm:text-3xl font-bold text-[#18181b] tracking-tight">
                    3
                  </p>
                  <p className="text-[11px] sm:text-[12px] text-[#71717a] uppercase tracking-wider mt-0.5">
                    Campus Centers
                  </p>
                </div>
                <div className="p-3 sm:p-0 bg-[#fafafa] sm:bg-transparent rounded-[18px] sm:rounded-none border border-[#e4e4e7] sm:border-none">
                  <p className="text-xl sm:text-3xl font-bold text-[#18181b] tracking-tight">
                    {heroData.stats.satisfactionRate}%
                  </p>
                  <p className="text-[11px] sm:text-[12px] text-[#71717a] uppercase tracking-wider mt-0.5">
                    Placement &amp; Fluency
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Large Image Slider Section */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative group overflow-hidden bg-white p-2 sm:p-2.5 rounded-[28px] sm:rounded-[36px] border border-[#e4e4e7] shadow-sm hover:border-[#18181b]/30 transition-all duration-300">
                {/* Inner Image Frame */}
                <div className="relative w-full h-[260px] sm:h-[380px] md:h-[460px] lg:h-[480px] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#f4f4f5] border border-[#e4e4e7]/60">
                  {heroSliderImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                        idx === activeImageIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`AIESD Coaching & Founder Showcase ${idx + 1}`}
                        className="w-full h-full object-cover object-center select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-black/10 to-transparent" />
                    </div>
                  ))}

                  {/* Left / Right Slider Controls */}
                  {heroSliderImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImageIdx((prev) =>
                            prev === 0 ? heroSliderImages.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#18181b] border border-[#e4e4e7] shadow-md flex items-center justify-center transition-all opacity-90 sm:opacity-80 sm:group-hover:opacity-100 touch-target"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveImageIdx((prev) => (prev + 1) % heroSliderImages.length)
                        }
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#18181b] border border-[#e4e4e7] shadow-md flex items-center justify-center transition-all opacity-90 sm:opacity-80 sm:group-hover:opacity-100 touch-target"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Bottom Caption Pill & Slide Indicators */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex flex-wrap items-center justify-between gap-2">
                    <div className="bg-[#09090b]/85 backdrop-blur-md text-white text-[11px] sm:text-[12px] font-medium px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 max-w-[80%] truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse shrink-0" />
                      <span className="truncate">
                        {activeImageIdx === 0
                          ? `${heroData.founderName} • Head of Pedagogy`
                          : `AIESD Campus (${activeImageIdx + 1}/${heroSliderImages.length})`}
                      </span>
                    </div>

                    {/* Pagination Dots */}
                    {heroSliderImages.length > 1 && (
                      <div className="flex items-center gap-1.5 bg-[#09090b]/60 backdrop-blur-md px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full border border-white/10 shrink-0">
                        {heroSliderImages.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setActiveImageIdx(dotIdx)}
                            className={`transition-all rounded-full ${
                              dotIdx === activeImageIdx
                                ? 'w-4 sm:w-5 h-1 sm:h-1.5 bg-white'
                                : 'w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`Go to slide ${dotIdx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Plan Selector & Programs Grid (Directly matching Awesomic Reference UI) */}
          <div className="pt-8 border-t border-[#e4e4e7] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="awesomic-card p-6 sm:p-7 space-y-6 bg-white shadow-sm">
                <div className="space-y-2.5">
                  <p className="text-[13px] font-semibold text-[#18181b]">What's your learning goal?</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setCompanyStage('Launching')}
                      className={`awesomic-pill-toggle ${companyStage === 'Launching' ? 'active' : ''}`}
                    >
                      {companyStage === 'Launching' && <Check className="w-3.5 h-3.5" />}
                      <span>Beginner Fluency</span>
                    </button>
                    <button
                      onClick={() => setCompanyStage('Scaling')}
                      className={`awesomic-pill-toggle ${companyStage === 'Scaling' ? 'active' : ''}`}
                    >
                      {companyStage === 'Scaling' && <Check className="w-3.5 h-3.5" />}
                      <span>Career &amp; Interview</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <p className="text-[13px] font-semibold text-[#18181b]">How do you like to learn?</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setWorkStyle('Get an expert talent')}
                      className={`awesomic-pill-toggle ${workStyle === 'Get an expert talent' ? 'active' : ''}`}
                    >
                      {workStyle === 'Get an expert talent' && <Check className="w-3.5 h-3.5" />}
                      <span>Classroom Speaking Circles</span>
                    </button>
                    <button
                      onClick={() => setWorkStyle('Create with AI')}
                      className={`awesomic-pill-toggle ${workStyle === 'Create with AI' ? 'active' : ''}`}
                    >
                      {workStyle === 'Create with AI' && <Check className="w-3.5 h-3.5" />}
                      <span>1-on-1 Personalized Mentoring</span>
                    </button>
                  </div>
                </div>

                <Link
                  to="/enroll"
                  className="awesomic-btn-dark w-full py-3.5 justify-center text-[14px]"
                >
                  <span className="tracking-widest text-xs opacity-60">&gt;&gt;&gt;</span>
                  <span>Book demo &amp; trial class</span>
                  <span className="tracking-widest text-xs opacity-60">&lt;&lt;&lt;</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {courses.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="awesomic-card p-5 sm:p-6 flex flex-col justify-between gap-3 hover:border-[#18181b]/30 transition-all bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#18181b] inline-block" />
                      <span className="text-[14px] font-bold text-[#18181b]">{c.title}</span>
                    </div>
                    <span className="text-[14px] font-semibold text-[#18181b]">
                      {settings.showCourseFees && c.fee ? `₹${c.fee}/course` : c.duration}
                    </span>
                  </div>

                  <p className="text-[13px] text-[#71717a] leading-relaxed">
                    {c.shortDescription}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-[#e4e4e7]">
                    <span className="text-[11px] text-[#71717a]">
                      {c.mode.toUpperCase()} • {c.level}
                    </span>
                    <Link
                      to={`/courses/${c.slug}`}
                      className="text-[13px] font-medium text-[#18181b] hover:underline inline-flex items-center gap-1"
                    >
                      <span>More details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. METHODOLOGY / WHY CHOOSE AIESD (Awesomic 28px card grid with crisp borders) */}
      <section className="py-16 sm:py-24 bg-[#fafafa] border-b border-[#e4e4e7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2 mb-12">
            <span className="awesomic-badge">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18181b] tracking-[-1px]">
              Why Students &amp; Job Seekers Choose AIESD
            </h2>
            <p className="text-[15px] text-[#71717a]">
              We understand the hesitation felt by vernacular-medium learners. Our practical system removes fear through gentle daily conversations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, idx) => (
              <div
                key={item.id}
                className="awesomic-card p-6 flex flex-col justify-between hover:border-[#18181b]/30 transition-all bg-white"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#a1a1aa]">0{idx + 1}</span>
                  <h3 className="text-[16px] font-bold text-[#18181b]">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#71717a] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP & COURSES (Spoken English Top Billing with Awesomic clean visual) */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#e4e4e7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="awesomic-badge">
                Top Billing Program
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#18181b] tracking-tight">
                Curriculum &amp; Coaching Programs
              </h2>
              <p className="text-[15px] text-[#71717a]">
                Built specifically for college students, job aspirants, and working adults who want practical results.
              </p>
            </div>
            <Link
              to="/courses"
              className="text-[14px] font-medium text-[#18181b] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Explore All Programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* FLAGSHIP COURSE SPOTLIGHT */}
          {flagshipCourse && (
            <div className="awesomic-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white">
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-[#f4f4f5]">
                <img
                  src={flagshipCourse.thumbnail}
                  alt={flagshipCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#09090b] text-white text-[11px] font-medium px-3 py-1 rounded-full">
                  Flagship Program
                </div>
              </div>
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                    <span className="bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7] px-3 py-1 rounded-full">
                      {flagshipCourse.duration}
                    </span>
                    <span className="bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7] px-3 py-1 rounded-full uppercase">
                      {flagshipCourse.mode}
                    </span>
                    <span className="bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7] px-3 py-1 rounded-full">
                      Level: {flagshipCourse.level}
                    </span>
                    {settings.showCourseFees && flagshipCourse.fee && (
                      <span className="bg-[#09090b] text-white font-semibold px-3 py-1 rounded-full">
                        ₹{flagshipCourse.fee.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#18181b] tracking-tight">
                    {flagshipCourse.title}
                  </h3>
                  <p className="text-[#71717a] text-[15px] leading-relaxed">
                    {flagshipCourse.shortDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {flagshipCourse.keyHighlights.slice(0, 4).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[13px] text-[#18181b]">
                        <Check className="w-4 h-4 text-[#18181b] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e4e4e7] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[12px] text-[#71717a]">
                    <p className="font-semibold text-[#18181b]">New cohorts every Monday</p>
                    <p>Locations: Midnapur • Jhargram • Gidhni</p>
                  </div>
                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <Link
                      to={`/courses/${flagshipCourse.slug}`}
                      className="awesomic-btn-light text-[13px] py-2 px-4"
                    >
                      View Modules
                    </Link>
                    <Link
                      to={`/enroll?course=${flagshipCourse.id}`}
                      className="awesomic-btn-dark text-[13px] py-2 px-5"
                    >
                      Enroll in Batch
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OTHER COURSES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherCourses.map((course) => (
              <div
                key={course.id}
                className="awesomic-card overflow-hidden hover:border-[#18181b]/30 transition-all flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="h-44 overflow-hidden relative bg-[#f4f4f5]">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#09090b]/80 backdrop-blur text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-[#71717a]">
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span className="uppercase">{course.mode}</span>
                    </div>
                    <h3 className="text-[16px] font-bold text-[#18181b] line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-[13px] text-[#71717a] line-clamp-3 leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#e4e4e7] flex items-center justify-between gap-2 mt-4">
                  <Link
                    to={`/courses/${course.slug}`}
                    className="text-[13px] font-medium text-[#18181b] hover:underline"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/enroll?course=${course.id}`}
                    className="awesomic-btn-light text-[12px] py-1.5 px-3.5"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FREE ENGLISH TEST CALLOUT (Awesomic Dark Card Surface) */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#e4e4e7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="awesomic-card-dark p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white font-medium px-3 py-1 rounded-full text-[12px] border border-white/10">
                100% Free Assessment
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Take the Free English Grammar &amp; Aptitude Test
              </h2>
              <p className="text-[15px] text-white/80 max-w-2xl leading-relaxed">
                Check your current speaking and grammar baseline in 15 minutes. Receive instant category-wise breakdowns (Tenses, Prepositions, Modals) and personalized course recommendations.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-[13px] font-medium text-white/80">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-white" />
                  20 Curated Questions
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-white" />
                  Instant Scorecard
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-white" />
                  No Sign-Up Fee
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 text-left lg:text-right">
              <Link
                to="/free-english-test"
                className="awesomic-btn-light bg-white text-[#18181b] hover:bg-white/90 py-3.5 px-6 text-[14px]"
              >
                <span>Start Free Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FACULTY MENTORS (Modern Shadcn Team UI Theme) */}
      <section className="bg-[#fafafa] border-b border-[#e4e4e7]">
        <Team
          badge="Faculty &amp; Mentors"
          title="Learn from Dedicated Educators"
          description="Experienced educators committed to eliminating hesitation, building spoken fluency, and preparing students for interview success."
          members={faculty.slice(0, 4).map((fac) => ({
            name: fac.name,
            role: fac.designation,
            image: fac.photo,
            slug: fac.slug,
            experience: fac.teachingExperienceYears,
            isFounder: fac.isFounder
          }))}
        />
        <div className="text-center pb-16 -mt-8">
          <Link
            to="/faculty"
            className="awesomic-btn-dark py-2.5 px-6 text-xs inline-flex items-center gap-2"
          >
            <span>Explore All Faculty &amp; Academic Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 7. ALUMNI STORIES & TESTIMONIALS (Modern Shadcn UI Testimonials Section) */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#e4e4e7] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <span className="awesomic-badge">
              Alumni Reviews
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#18181b] tracking-tight">
              Loved by learners everywhere
            </h2>
            <p className="text-[#71717a] text-base sm:text-lg">
              Don&apos;t take our word for it — here&apos;s what our graduates and successful candidates have to say.
            </p>
          </div>

          <div className="pt-6">
            <TestimonialsSection
              items={(testimonials.filter((t) => t.isApproved && t.isFeaturedOnHome).length > 0
                ? testimonials.filter((t) => t.isApproved && t.isFeaturedOnHome)
                : testimonials.filter((t) => t.isApproved)
              ).map((t) => ({
                name: t.studentName,
                quote: t.quote,
                role: t.studentCurrentRole || t.courseTaken,
                company: t.company || t.center || 'AIESD Alumni',
                image: t.photoUrl
              }))}
            />
          </div>

          <div className="text-center pt-8">
            <Link
              to="/testimonials"
              className="text-[13px] font-semibold text-[#18181b] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Explore all verified student success stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. WHAT COURSES INCLUDE */}
      <section className="py-16 sm:py-24 bg-[#fafafa] border-b border-[#e4e4e7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="awesomic-badge">
              Full Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18181b] tracking-tight">
              What Every AIESD Course Includes
            </h2>
            <p className="text-[15px] text-[#71717a]">
              Comprehensive learning support designed for lasting career independence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseFeatures.map((feat) => (
              <div
                key={feat.id}
                className="awesomic-card p-6 flex items-start gap-4 hover:border-[#18181b]/30 transition-all bg-white"
              >
                <div className="w-9 h-9 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[16px] font-bold text-[#18181b]">{feat.title}</h4>
                  <p className="text-[13px] text-[#71717a] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#e4e4e7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="awesomic-badge">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#18181b] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] text-[#71717a]">
              Clear answers to common questions about courses, timings, and fees.
            </p>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="awesomic-card bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-[#18181b] text-[15px]"
                  >
                    <span>{faq.question}</span>
                    <span className="text-[#18181b] text-base font-bold shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-[14px] text-[#71717a] border-t border-[#e4e4e7] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/contact"
              className="text-[13px] font-medium text-[#18181b] hover:underline inline-flex items-center gap-1"
            >
              <span>Have another question? Contact our campus desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9.5 SOCIAL MEDIA & DIRECT APP REDIRECTS SHOWCASE */}
      <section className="py-14 sm:py-18 bg-[#fafafa] border-t border-[#e4e4e7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="awesomic-badge">
                Connect Directly
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#18181b] tracking-tight">
                Follow AIESD on Instagram, WhatsApp &amp; Facebook
              </h2>
              <p className="text-sm text-[#71717a] max-w-xl">
                Daily spoken English idioms, video reels, batch announcements, and free study notes delivered directly to your favorite apps.
              </p>
            </div>
            <Link
              to="/social"
              className="awesomic-btn-dark py-2.5 px-5 text-xs font-semibold self-start md:self-auto shrink-0"
            >
              <span>Explore All Social Channels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* WhatsApp Card */}
            <div className="group rounded-[24px] border border-[#e4e4e7] bg-white p-6 flex flex-col justify-between hover:border-[#18181b]/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[16px] bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#18181b]">WhatsApp Chat</h3>
                  <p className="text-xs text-[#71717a] font-mono">{settings.whatsappNumber}</p>
                </div>
                <p className="text-xs text-[#71717a] leading-relaxed">
                  Chat directly with counselors for instant fee plans, trial booking, and syllabus PDFs.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#f4f4f5]">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    settings.whatsappDefaultMessage || 'Hello AIESD'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="awesomic-btn-dark w-full py-2 px-3 text-xs justify-center gap-1.5 font-semibold"
                >
                  <span>Open WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="group rounded-[24px] border border-[#e4e4e7] bg-white p-6 flex flex-col justify-between hover:border-[#18181b]/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[16px] bg-[#E1306C] text-white flex items-center justify-center shadow-xs">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#18181b]">Instagram Reels</h3>
                  <p className="text-xs text-[#71717a] font-mono">@aiesd_spokenenglish</p>
                </div>
                <p className="text-xs text-[#71717a] leading-relaxed">
                  Daily 60-second pronunciation tips, vocabulary tests, and student speech transformations.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#f4f4f5]">
                <a
                  href={settings.socialLinks?.instagram || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="awesomic-btn-dark w-full py-2 px-3 text-xs justify-center gap-1.5 font-semibold"
                >
                  <span>Open Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Facebook Card */}
            <div className="group rounded-[24px] border border-[#e4e4e7] bg-white p-6 flex flex-col justify-between hover:border-[#18181b]/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[16px] bg-[#1877F2] text-white flex items-center justify-center shadow-xs">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#18181b]">Facebook Page</h3>
                  <p className="text-xs text-[#71717a] font-mono">facebook.com/aiesdofficial</p>
                </div>
                <p className="text-xs text-[#71717a] leading-relaxed">
                  Official community updates, campus photos, elocution events, and batch schedules.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#f4f4f5]">
                <a
                  href={settings.socialLinks?.facebook || 'https://facebook.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="awesomic-btn-dark w-full py-2 px-3 text-xs justify-center gap-1.5 font-semibold"
                >
                  <span>Open Facebook</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* YouTube / Telegram Card */}
            <div className="group rounded-[24px] border border-[#e4e4e7] bg-white p-6 flex flex-col justify-between hover:border-[#18181b]/40 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[16px] bg-[#FF0000] text-white flex items-center justify-center shadow-xs">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#18181b]">YouTube Channel</h3>
                  <p className="text-xs text-[#71717a] font-mono">@aiesd_education</p>
                </div>
                <p className="text-xs text-[#71717a] leading-relaxed">
                  In-depth grammar masterclasses, interview tips, and extempore speech recordings.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#f4f4f5]">
                <a
                  href={settings.socialLinks?.youtube || 'https://youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="awesomic-btn-dark w-full py-2 px-3 text-xs justify-center gap-1.5 font-semibold"
                >
                  <span>Open YouTube</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL ACTION BANNER (Awesomic deep black rounded container) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="awesomic-card-dark p-8 sm:p-14 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white font-medium px-3.5 py-1 rounded-full text-[12px] border border-white/10">
              Admissions Active
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Stop hesitating. Start speaking English with confidence today.
            </h2>
            <p className="text-[15px] sm:text-[16px] text-white/80 max-w-xl mx-auto leading-relaxed">
              Visit our Midnapur, Jhargram, or Gidhni branches for a counseling session and trial class.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <Link
                to="/enroll"
                className="awesomic-btn-light bg-white text-[#18181b] hover:bg-white/90 py-3 px-6 text-[14px]"
              >
                Reserve Admission Seat
              </Link>
              <Link
                to="/free-english-test"
                className="awesomic-btn-ghost text-white hover:bg-white/10 py-3 px-6 text-[14px] border border-white/20"
              >
                Take Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
