export type SeatStatus = 'Open' | 'Filling fast' | 'Full';
export type SeatsStatus = SeatStatus;
export type CourseMode = 'offline' | 'online' | 'hybrid';
export type CourseLevel = 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced' | 'All Levels';
export type LeadStatus = 'New' | 'Contacted' | 'Enrolled' | 'Cancelled';
export type EnrollmentStatus = LeadStatus;
export type CourseCategory = 'Spoken English' | 'Computer Basics' | 'Interview Training' | 'Personality Development';
export type AdminRole = 'Owner' | 'Editor';

export interface Center {
  id: string;
  name: string;
  code: string;
  address: string;
  landmark?: string;
  phone: string;
  alternatePhone?: string;
  whatsapp?: string;
  email: string;
  timings: string;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
  isHeadOffice?: boolean;
  facilities?: string[];
}

export interface SyllabusModule {
  id: string;
  title: string;
  duration: string;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: 'Spoken English' | 'Computer Basics' | 'Interview Training' | 'Personality Development';
  isFeatured?: boolean;
  shortDescription: string;
  fullOverview: string;
  thumbnail: string;
  duration: string;
  mode: CourseMode;
  level: CourseLevel;
  batchTimings: string;
  fee?: number;
  availableCenters: string[]; // Center IDs or Names
  keyHighlights: string[];
  whoIsThisFor: string[];
  learningOutcomes: string[];
  syllabus: SyllabusModule[];
  trainerName: string;
  trainerRole: string;
  isPublished: boolean;
  order: number;
}

export interface Batch {
  id: string;
  batchName: string;
  courseId: string;
  courseTitle: string;
  centerId: string;
  centerName: string;
  timing: string;
  days: string;
  startDate: string;
  seatsStatus: SeatStatus;
  trainerName?: string;
  isActive: boolean;
}

export interface CareerTimelineItem {
  year: string;
  title: string;
  institution: string;
  description: string;
}

export interface FacultyMember {
  id: string;
  slug: string;
  name: string;
  designation: string;
  photo: string;
  teachingExperienceYears: number;
  qualifications: string[];
  certifications: string[];
  subjects: string[];
  bio: string;
  careerTimeline: CareerTimelineItem[];
  order: number;
  isFounder?: boolean;
}

export interface Question {
  id: string;
  category: 'tenses' | 'articles' | 'prepositions' | 'subject-verb agreement' | 'modals' | 'conditionals' | 'vocabulary' | 'sentence correction';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface TestSettings {
  questionsPerTest: number; // default 20, 15 to 30
  enableTimer: boolean;
  timeLimitMinutes: number;
  requireLeadBeforeResult: boolean;
  beginnerMax: number;
  elementaryMax: number;
  intermediateMax: number;
  upperIntermediateMax: number;
  advancedMax: number;
}

export interface TestAttempt {
  id: string;
  date: string;
  candidateName: string;
  candidatePhone: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  levelAssigned: 'Beginner' | 'Elementary' | 'Intermediate' | 'Upper-Intermediate' | 'Advanced';
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  recommendedCourse: string;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}

export interface Testimonial {
  id: string;
  studentName: string;
  courseTaken: string;
  center: string;
  photoUrl: string;
  quote: string;
  type: 'text' | 'video';
  videoEmbedUrl?: string;
  studentCurrentRole?: string;
  company?: string;
  isApproved: boolean;
  isFeaturedOnHome: boolean;
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classroom' | 'Events' | 'Certifications' | 'Campus';
  imageUrl: string;
  caption?: string;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Courses' | 'Admissions' | 'Batches' | 'Certificates';
  showOnHome: boolean;
  order: number;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
}

export interface CourseFeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
}

export interface HomeQuote {
  id: string;
  quote: string;
  author: string;
  supportingLine: string;
}

export interface HomeHeroData {
  quotes: HomeQuote[];
  activeQuoteIndex: number;
  founderName: string;
  founderDesignation: string;
  founderDegrees: string[];
  founderExperienceYears: number;
  founderPhoto: string;
  heroImages?: string[];
  achievementBadges: string[];
  stats: {
    studentsTrained: number;
    yearsOfExperience: number;
    centersCount: number;
    satisfactionRate: number;
  };
  ctaTextPrimary: string;
  ctaTextWhatsApp: string;
  ctaTextCall: string;
}

export interface HomeSectionConfig {
  id: string;
  key: string;
  title: string;
  isVisible: boolean;
  order: number;
}

export interface SiteSettings {
  brandName: string;
  fullForm: string;
  tagline: string;
  logoUrl: string;
  primaryPhone: string;
  alternatePhone: string;
  email: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  whatsappGreetingText: string;
  showFloatingWhatsApp: boolean;
  showCourseFees: boolean;
  enableAnimations: boolean;
  maintenanceMode: boolean;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    telegram?: string;
    twitter?: string;
    whatsappChannel?: string;
  };
}

export interface EnquiryRecord {
  id: string;
  date: string;
  name: string;
  phone: string;
  email?: string;
  courseInterest: string;
  centerInterest: string;
  message: string;
  status: LeadStatus;
  adminNotes?: string;
}

export interface EnrollmentRecord {
  id: string;
  referenceId: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  educationBackground?: string;
  courseId: string;
  courseTitle: string;
  centerId: string;
  centerName: string;
  batchPreference: string;
  mode: CourseMode;
  status: LeadStatus;
  adminNotes?: string;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  isVisible: boolean;
  order: number;
}

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  addedAt: string;
  name?: string;
  password?: string;
  lastLogin?: string;
}

export interface SEOConfig {
  siteTitleDefault: string;
  metaDescriptionDefault: string;
  keywordsDefault: string;
  ogImageDefault: string;
  pageOverrides: Record<string, { title: string; description: string; ogImage?: string }>;
}
