import {
  SiteSettings,
  HomeHeroData,
  HomeSectionConfig,
  WhyChooseItem,
  CourseFeatureItem,
  Course,
  Batch,
  FacultyMember,
  Question,
  TestSettings,
  Testimonial,
  GalleryItem,
  FAQItem,
  Center,
  NavItem,
  AdminUser,
  SEOConfig,
  EnquiryRecord,
  EnrollmentRecord,
  TestAttempt
} from '../types';

import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_CENTERS,
  DEFAULT_HERO_DATA,
  DEFAULT_HOME_SECTIONS,
  DEFAULT_WHY_CHOOSE,
  DEFAULT_COURSES,
  DEFAULT_BATCHES,
  DEFAULT_FACULTY,
  DEFAULT_QUESTIONS,
  DEFAULT_TEST_SETTINGS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_COURSE_FEATURES,
  DEFAULT_GALLERY,
  DEFAULT_FAQS,
  DEFAULT_NAV_ITEMS,
  DEFAULT_SEO
} from '../data/seedData';
import { firestoreService } from './firestoreService';

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  sizeKb: number;
  uploadedAt: string;
}

const STORAGE_KEYS = {
  SETTINGS: 'aiesd_site_settings',
  CENTERS: 'aiesd_centers',
  HERO: 'aiesd_home_hero',
  SECTIONS: 'aiesd_home_sections',
  WHY_CHOOSE: 'aiesd_why_choose',
  COURSES: 'aiesd_courses',
  BATCHES: 'aiesd_batches',
  FACULTY: 'aiesd_faculty',
  QUESTIONS: 'aiesd_questions',
  TEST_SETTINGS: 'aiesd_test_settings',
  TESTIMONIALS: 'aiesd_testimonials',
  COURSE_FEATURES: 'aiesd_course_features',
  GALLERY: 'aiesd_gallery',
  FAQS: 'aiesd_faqs',
  NAV: 'aiesd_nav_items',
  SEO: 'aiesd_seo',
  ENQUIRIES: 'aiesd_enquiries',
  ENROLLMENTS: 'aiesd_enrollments',
  TEST_ATTEMPTS: 'aiesd_test_attempts',
  ADMINS: 'aiesd_admin_users',
  ABOUT_CONTENT: 'aiesd_about_content',
  CURRENT_ADMIN_USER: 'aiesd_current_admin',
  MEDIA: 'aiesd_media_library'
};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch {
    // Fallback on storage errors
  }
  return defaultValue;
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('aiesd_storage_updated', { detail: { key } }));
  } catch {
    // Fallback
  }
}

// Initial default about text
const DEFAULT_ABOUT_CONTENT = {
  mission:
    'To eliminate the communication barrier for students, graduates, and professionals in rural and semi-urban Bengal, equipping them with spoken English fluency, digital competencies, and unshakeable self-confidence.',
  vision:
    'To be the most respected grassroots skill development and language coaching institute in Eastern India, celebrated for authentic student transformations, human-centric teaching, and practical career readiness.',
  story:
    'Founded in 2008 in Midnapur, AIESD began with a simple yet ambitious goal: proving that speaking fluent English does not depend on attending an expensive metropolitan boarding school. Over 18 years, our compassionate methodology has helped more than 8,500 students step onto interview stages, boardrooms, and prestigious corporate positions.',
  values: [
    {
      title: 'Empathetic Mentorship',
      desc: "Every student's background is respected; hesitation is dissolved with patience rather than criticism."
    },
    {
      title: 'Active Daily Practice',
      desc: 'Fluency requires tongue muscles and vocal cords to speak daily. Theory is always secondary to oral action.'
    },
    {
      title: 'Practical Affordability',
      desc: 'World-class spoken English pedagogy should remain accessible to families across all economic tiers.'
    },
    {
      title: 'Honest Outcomes',
      desc: 'We focus on genuine capability building. No false placement guarantees, only measurable skill mastery.'
    }
  ]
};

// Initial admin users
const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    id: 'admin-rakesh-owner',
    email: 'rakeshsharma@gmail.com',
    role: 'Owner',
    name: 'Rakesh Sharma',
    password: 'rakeshmidnaporesharma',
    addedAt: '2026-01-01'
  }
];

const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: 'med-1',
    name: 'Classroom Interactive Speaking',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&auto=format&fit=crop&q=80',
    sizeKb: 84.5,
    uploadedAt: '2026-09-01'
  },
  {
    id: 'med-2',
    name: 'Midnapur Campus Reception',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80',
    sizeKb: 92.1,
    uploadedAt: '2026-09-05'
  },
  {
    id: 'med-3',
    name: 'Certificate Convocation Ceremony',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80',
    sizeKb: 78.3,
    uploadedAt: '2026-09-10'
  }
];

export const dbService = {
  // Site Settings
  getSettings: (): SiteSettings => getItem(STORAGE_KEYS.SETTINGS, DEFAULT_SITE_SETTINGS),
  getSiteSettings: (): SiteSettings => getItem(STORAGE_KEYS.SETTINGS, DEFAULT_SITE_SETTINGS),
  saveSettings: (settings: SiteSettings, syncCloud = true) => {
    setItem(STORAGE_KEYS.SETTINGS, settings);
    if (syncCloud) firestoreService.saveSettings(settings).catch(() => {});
  },
  saveSiteSettings: (settings: SiteSettings, syncCloud = true) => {
    setItem(STORAGE_KEYS.SETTINGS, settings);
    if (syncCloud) firestoreService.saveSettings(settings).catch(() => {});
  },
  resetSettings: () => setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SITE_SETTINGS),
  resetToDefault: () => {
    setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SITE_SETTINGS);
    firestoreService.saveSettings(DEFAULT_SITE_SETTINGS).catch(() => {});
    return DEFAULT_SITE_SETTINGS;
  },

  // Centers
  getCenters: (): Center[] => getItem(STORAGE_KEYS.CENTERS, DEFAULT_CENTERS),
  saveCenters: (centers: Center[], syncCloud = true) => {
    setItem(STORAGE_KEYS.CENTERS, centers);
    if (syncCloud) firestoreService.saveCenters(centers).catch(() => {});
  },
  saveCenter: (center: Center, syncCloud = true) => {
    const list = getItem<Center[]>(STORAGE_KEYS.CENTERS, DEFAULT_CENTERS);
    const existingIndex = list.findIndex((c) => c.id === center.id);
    const updated = existingIndex >= 0
      ? list.map((c, i) => (i === existingIndex ? center : c))
      : [...list, center];
    setItem(STORAGE_KEYS.CENTERS, updated);
    if (syncCloud) firestoreService.saveCenter(center).catch(() => {});
  },
  deleteCenter: (id: string, syncCloud = true) => {
    const list = getItem<Center[]>(STORAGE_KEYS.CENTERS, DEFAULT_CENTERS);
    setItem(STORAGE_KEYS.CENTERS, list.filter((c) => c.id !== id));
    if (syncCloud) firestoreService.deleteCenter(id).catch(() => {});
  },
  resetCenters: () => setItem(STORAGE_KEYS.CENTERS, DEFAULT_CENTERS),

  // Hero & Home Sections
  getHeroData: (): HomeHeroData => getItem(STORAGE_KEYS.HERO, DEFAULT_HERO_DATA),
  saveHeroData: (hero: HomeHeroData, syncCloud = true) => {
    setItem(STORAGE_KEYS.HERO, hero);
    if (syncCloud) firestoreService.saveHeroData(hero).catch(() => {});
  },
  resetHeroData: () => setItem(STORAGE_KEYS.HERO, DEFAULT_HERO_DATA),

  getHomeSections: (): HomeSectionConfig[] => {
    const list = getItem(STORAGE_KEYS.SECTIONS, DEFAULT_HOME_SECTIONS);
    return list.filter((s: HomeSectionConfig) => s.key !== 'batches' && s.id !== 'sec-batches');
  },
  saveHomeSections: (sections: HomeSectionConfig[], syncCloud = true) => {
    setItem(STORAGE_KEYS.SECTIONS, sections);
    if (syncCloud) firestoreService.saveHomeSections(sections).catch(() => {});
  },
  resetHomeSections: () => setItem(STORAGE_KEYS.SECTIONS, DEFAULT_HOME_SECTIONS),

  // Why Choose & Course Features
  getWhyChoose: (): WhyChooseItem[] => getItem(STORAGE_KEYS.WHY_CHOOSE, DEFAULT_WHY_CHOOSE),
  saveWhyChoose: (items: WhyChooseItem[], syncCloud = true) => {
    setItem(STORAGE_KEYS.WHY_CHOOSE, items);
    if (syncCloud) firestoreService.saveWhyChoose(items).catch(() => {});
  },
  resetWhyChoose: () => setItem(STORAGE_KEYS.WHY_CHOOSE, DEFAULT_WHY_CHOOSE),

  getCourseFeatures: (): CourseFeatureItem[] =>
    getItem(STORAGE_KEYS.COURSE_FEATURES, DEFAULT_COURSE_FEATURES),
  saveCourseFeatures: (items: CourseFeatureItem[], syncCloud = true) => {
    setItem(STORAGE_KEYS.COURSE_FEATURES, items);
    if (syncCloud) firestoreService.saveCourseFeatures(items).catch(() => {});
  },
  resetCourseFeatures: () => setItem(STORAGE_KEYS.COURSE_FEATURES, DEFAULT_COURSE_FEATURES),

  // Courses
  getCourses: (): Course[] => getItem(STORAGE_KEYS.COURSES, DEFAULT_COURSES),
  saveCourses: (courses: Course[], syncCloud = true) => {
    setItem(STORAGE_KEYS.COURSES, courses);
    if (syncCloud) firestoreService.saveCourses(courses).catch(() => {});
  },
  saveCourse: (course: Course, syncCloud = true) => {
    const list = getItem<Course[]>(STORAGE_KEYS.COURSES, DEFAULT_COURSES);
    const existingIdx = list.findIndex((c) => c.id === course.id);
    const updated = existingIdx >= 0
      ? list.map((c, i) => (i === existingIdx ? course : c))
      : [course, ...list];
    setItem(STORAGE_KEYS.COURSES, updated);
    if (syncCloud) firestoreService.saveCourse(course).catch(() => {});
  },
  deleteCourse: (id: string, syncCloud = true) => {
    const list = getItem<Course[]>(STORAGE_KEYS.COURSES, DEFAULT_COURSES);
    setItem(STORAGE_KEYS.COURSES, list.filter((c) => c.id !== id));
    if (syncCloud) firestoreService.deleteCourse(id).catch(() => {});
  },
  resetCourses: () => setItem(STORAGE_KEYS.COURSES, DEFAULT_COURSES),

  // Batches
  getBatches: (): Batch[] => getItem(STORAGE_KEYS.BATCHES, DEFAULT_BATCHES),
  saveBatches: (batches: Batch[], syncCloud = true) => {
    setItem(STORAGE_KEYS.BATCHES, batches);
    if (syncCloud) firestoreService.saveBatches(batches).catch(() => {});
  },
  saveBatch: (batch: Batch, syncCloud = true) => {
    const list = getItem<Batch[]>(STORAGE_KEYS.BATCHES, DEFAULT_BATCHES);
    const existingIdx = list.findIndex((b) => b.id === batch.id);
    const updated = existingIdx >= 0
      ? list.map((b, i) => (i === existingIdx ? batch : b))
      : [batch, ...list];
    setItem(STORAGE_KEYS.BATCHES, updated);
    if (syncCloud) firestoreService.saveBatch(batch).catch(() => {});
  },
  deleteBatch: (id: string, syncCloud = true) => {
    const list = getItem<Batch[]>(STORAGE_KEYS.BATCHES, DEFAULT_BATCHES);
    setItem(STORAGE_KEYS.BATCHES, list.filter((b) => b.id !== id));
    if (syncCloud) firestoreService.deleteBatch(id).catch(() => {});
  },
  resetBatches: () => setItem(STORAGE_KEYS.BATCHES, DEFAULT_BATCHES),

  // Faculty
  getFaculty: (): FacultyMember[] => getItem(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY),
  saveFaculty: (facultyListOrMember: FacultyMember[] | FacultyMember, syncCloud = true) => {
    if (Array.isArray(facultyListOrMember)) {
      setItem(STORAGE_KEYS.FACULTY, facultyListOrMember);
      if (syncCloud) firestoreService.saveFaculty(facultyListOrMember).catch(() => {});
    } else {
      const list = getItem<FacultyMember[]>(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
      const existingIdx = list.findIndex((f) => f.id === facultyListOrMember.id);
      const updated = existingIdx >= 0
        ? list.map((f, i) => (i === existingIdx ? facultyListOrMember : f))
        : [...list, facultyListOrMember];
      setItem(STORAGE_KEYS.FACULTY, updated);
      if (syncCloud) firestoreService.saveFacultyMember(facultyListOrMember).catch(() => {});
    }
  },
  deleteFaculty: (id: string, syncCloud = true) => {
    const list = getItem<FacultyMember[]>(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY);
    setItem(STORAGE_KEYS.FACULTY, list.filter((f) => f.id !== id));
    if (syncCloud) firestoreService.deleteFaculty(id).catch(() => {});
  },
  resetFaculty: () => setItem(STORAGE_KEYS.FACULTY, DEFAULT_FACULTY),

  // Questions & Tests
  getQuestions: (): Question[] => getItem(STORAGE_KEYS.QUESTIONS, DEFAULT_QUESTIONS),
  saveQuestions: (questions: Question[]) => setItem(STORAGE_KEYS.QUESTIONS, questions),
  saveQuestion: (question: Question) => {
    const list = getItem<Question[]>(STORAGE_KEYS.QUESTIONS, DEFAULT_QUESTIONS);
    const existingIdx = list.findIndex((q) => q.id === question.id);
    const updated = existingIdx >= 0
      ? list.map((q, i) => (i === existingIdx ? question : q))
      : [question, ...list];
    setItem(STORAGE_KEYS.QUESTIONS, updated);
  },
  deleteQuestion: (id: string) => {
    const list = getItem<Question[]>(STORAGE_KEYS.QUESTIONS, DEFAULT_QUESTIONS);
    setItem(STORAGE_KEYS.QUESTIONS, list.filter((q) => q.id !== id));
  },
  resetQuestions: () => setItem(STORAGE_KEYS.QUESTIONS, DEFAULT_QUESTIONS),

  getTestSettings: (): TestSettings =>
    getItem(STORAGE_KEYS.TEST_SETTINGS, DEFAULT_TEST_SETTINGS),
  saveTestSettings: (settings: TestSettings) =>
    setItem(STORAGE_KEYS.TEST_SETTINGS, settings),
  resetTestSettings: () => setItem(STORAGE_KEYS.TEST_SETTINGS, DEFAULT_TEST_SETTINGS),

  getTestAttempts: (): TestAttempt[] => getItem(STORAGE_KEYS.TEST_ATTEMPTS, []),
  saveTestAttempt: (attempt: TestAttempt, syncCloud = true) => {
    const attempts = getItem<TestAttempt[]>(STORAGE_KEYS.TEST_ATTEMPTS, []);
    setItem(STORAGE_KEYS.TEST_ATTEMPTS, [attempt, ...attempts]);
    if (syncCloud) firestoreService.saveTestAttempt(attempt as unknown as Record<string, unknown>).catch(() => {});
  },
  deleteTestAttempt: (id: string, syncCloud = true) => {
    const attempts = getItem<TestAttempt[]>(STORAGE_KEYS.TEST_ATTEMPTS, []);
    setItem(STORAGE_KEYS.TEST_ATTEMPTS, attempts.filter((a) => a.id !== id));
    if (syncCloud) firestoreService.deleteTestAttempt(id).catch(() => {});
  },
  clearTestAttempts: () => setItem(STORAGE_KEYS.TEST_ATTEMPTS, []),

  // Testimonials
  getTestimonials: (): Testimonial[] =>
    getItem(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS),
  saveTestimonials: (testimonials: Testimonial[], syncCloud = true) => {
    setItem(STORAGE_KEYS.TESTIMONIALS, testimonials);
    if (syncCloud) firestoreService.saveTestimonials(testimonials).catch(() => {});
  },
  saveTestimonial: (t: Testimonial, syncCloud = true) => {
    const list = getItem<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
    const existingIdx = list.findIndex((item) => item.id === t.id);
    const updated = existingIdx >= 0
      ? list.map((item, i) => (i === existingIdx ? t : item))
      : [t, ...list];
    setItem(STORAGE_KEYS.TESTIMONIALS, updated);
    if (syncCloud) firestoreService.saveTestimonial(t).catch(() => {});
  },
  deleteTestimonial: (id: string, syncCloud = true) => {
    const list = getItem<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
    setItem(STORAGE_KEYS.TESTIMONIALS, list.filter((item) => item.id !== id));
    if (syncCloud) firestoreService.deleteTestimonial(id).catch(() => {});
  },
  resetTestimonials: () => setItem(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS),

  // Gallery
  getGallery: (): GalleryItem[] => getItem(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY),
  saveGallery: (gallery: GalleryItem[], syncCloud = true) => {
    setItem(STORAGE_KEYS.GALLERY, gallery);
    if (syncCloud) firestoreService.saveGallery(gallery).catch(() => {});
  },
  saveGalleryItem: (g: GalleryItem, syncCloud = true) => {
    const list = getItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
    const existingIdx = list.findIndex((item) => item.id === g.id);
    const updated = existingIdx >= 0
      ? list.map((item, i) => (i === existingIdx ? g : item))
      : [g, ...list];
    setItem(STORAGE_KEYS.GALLERY, updated);
    if (syncCloud) firestoreService.saveGalleryItem(g).catch(() => {});
  },
  deleteGalleryItem: (id: string, syncCloud = true) => {
    const list = getItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
    setItem(STORAGE_KEYS.GALLERY, list.filter((item) => item.id !== id));
    if (syncCloud) firestoreService.deleteGalleryItem(id).catch(() => {});
  },
  resetGallery: () => setItem(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY),

  // FAQs
  getFAQs: (): FAQItem[] => getItem(STORAGE_KEYS.FAQS, DEFAULT_FAQS),
  saveFAQs: (faqs: FAQItem[], syncCloud = true) => {
    setItem(STORAGE_KEYS.FAQS, faqs);
    if (syncCloud) firestoreService.saveFAQs(faqs).catch(() => {});
  },
  saveFaq: (f: FAQItem, syncCloud = true) => {
    const list = getItem<FAQItem[]>(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
    const existingIdx = list.findIndex((item) => item.id === f.id);
    const updated = existingIdx >= 0
      ? list.map((item, i) => (i === existingIdx ? f : item))
      : [f, ...list];
    setItem(STORAGE_KEYS.FAQS, updated);
    if (syncCloud) firestoreService.saveFaq(f).catch(() => {});
  },
  deleteFaq: (id: string, syncCloud = true) => {
    const list = getItem<FAQItem[]>(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
    setItem(STORAGE_KEYS.FAQS, list.filter((item) => item.id !== id));
    if (syncCloud) firestoreService.deleteFaq(id).catch(() => {});
  },
  resetFAQs: () => setItem(STORAGE_KEYS.FAQS, DEFAULT_FAQS),

  // Navigation
  getNavItems: (): NavItem[] => {
    const stored = getItem<NavItem[]>(STORAGE_KEYS.NAV, DEFAULT_NAV_ITEMS);
    // Ensure all default items (like nav-social) exist if user has an existing saved list
    const missing = DEFAULT_NAV_ITEMS.filter((def) => !stored.some((s) => s.id === def.id || s.path === def.path));
    if (missing.length > 0) {
      const merged = [...stored, ...missing].sort((a, b) => a.order - b.order);
      setItem(STORAGE_KEYS.NAV, merged);
      return merged;
    }
    return stored;
  },
  saveNavItems: (items: NavItem[], syncCloud = true) => {
    setItem(STORAGE_KEYS.NAV, items);
    if (syncCloud) firestoreService.saveNavItems(items).catch(() => {});
  },
  resetNavItems: () => setItem(STORAGE_KEYS.NAV, DEFAULT_NAV_ITEMS),

  // SEO
  getSEO: (): SEOConfig => getItem(STORAGE_KEYS.SEO, DEFAULT_SEO),
  getSEOSettings: (): SEOConfig => getItem(STORAGE_KEYS.SEO, DEFAULT_SEO),
  saveSEO: (seo: SEOConfig, syncCloud = true) => {
    setItem(STORAGE_KEYS.SEO, seo);
    if (syncCloud) firestoreService.saveSEO(seo).catch(() => {});
  },
  saveSEOSettings: (seo: SEOConfig, syncCloud = true) => {
    setItem(STORAGE_KEYS.SEO, seo);
    if (syncCloud) firestoreService.saveSEO(seo).catch(() => {});
  },
  resetSEO: () => setItem(STORAGE_KEYS.SEO, DEFAULT_SEO),

  // Media Library
  getMediaLibrary: (): MediaItem[] => getItem(STORAGE_KEYS.MEDIA, DEFAULT_MEDIA),
  saveMediaLibrary: (items: MediaItem[]) => setItem(STORAGE_KEYS.MEDIA, items),
  deleteMediaItem: (id: string) => {
    const list = getItem<MediaItem[]>(STORAGE_KEYS.MEDIA, DEFAULT_MEDIA);
    setItem(STORAGE_KEYS.MEDIA, list.filter((m) => m.id !== id));
  },

  // About Page
  getAboutContent: () => getItem(STORAGE_KEYS.ABOUT_CONTENT, DEFAULT_ABOUT_CONTENT),
  saveAboutContent: (content: typeof DEFAULT_ABOUT_CONTENT, syncCloud = true) => {
    setItem(STORAGE_KEYS.ABOUT_CONTENT, content);
    if (syncCloud) firestoreService.saveAboutContent(content as unknown as Record<string, unknown>).catch(() => {});
  },
  resetAboutContent: () => setItem(STORAGE_KEYS.ABOUT_CONTENT, DEFAULT_ABOUT_CONTENT),

  // Enquiries & Enrollments
  getEnquiries: (): EnquiryRecord[] =>
    getItem(STORAGE_KEYS.ENQUIRIES, [
      {
        id: 'enq-seed-1',
        date: '2026-09-20 14:30',
        name: 'Rakesh Mukherjee',
        phone: '9832109876',
        email: 'rakesh.m@example.com',
        courseInterest: 'Spoken English & Communication Mastery',
        centerInterest: 'Midnapur Main Center',
        message: 'I want to know if evening batch timings fit after 5:30 PM.',
        status: 'New'
      },
      {
        id: 'enq-seed-2',
        date: '2026-09-21 09:15',
        name: 'Mousumi Das',
        phone: '9734561234',
        email: 'mousumi.jhargram@example.com',
        courseInterest: 'Computer Basics & MS Office Professional',
        centerInterest: 'Jhargram Branch',
        message: 'Looking for a Sunday or weekend fast-track computer training class.',
        status: 'Contacted',
        adminNotes: 'Spoke over phone. Sent course syllabus PDF on WhatsApp.'
      }
    ]),
  saveEnquiry: (enquiry: EnquiryRecord, syncCloud = true) => {
    const list = getItem<EnquiryRecord[]>(STORAGE_KEYS.ENQUIRIES, []);
    const idx = list.findIndex((e) => e.id === enquiry.id);
    const updated = idx >= 0
      ? list.map((item, i) => (i === idx ? enquiry : item))
      : [enquiry, ...list];
    setItem(STORAGE_KEYS.ENQUIRIES, updated);
    if (syncCloud) firestoreService.saveEnquiry(enquiry as unknown as Record<string, unknown>).catch(() => {});
  },
  updateEnquiry: (updated: EnquiryRecord, syncCloud = true) => {
    const list = getItem<EnquiryRecord[]>(STORAGE_KEYS.ENQUIRIES, []);
    setItem(
      STORAGE_KEYS.ENQUIRIES,
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    if (syncCloud) firestoreService.saveEnquiry(updated as unknown as Record<string, unknown>).catch(() => {});
  },
  deleteEnquiry: (id: string, syncCloud = true) => {
    const list = getItem<EnquiryRecord[]>(STORAGE_KEYS.ENQUIRIES, []);
    setItem(STORAGE_KEYS.ENQUIRIES, list.filter((item) => item.id !== id));
    if (syncCloud) firestoreService.deleteEnquiry(id).catch(() => {});
  },

  getEnrollments: (): EnrollmentRecord[] =>
    getItem(STORAGE_KEYS.ENROLLMENTS, [
      {
        id: 'enr-seed-1',
        referenceId: 'AIESD-ENR-2026-1082',
        date: '2026-09-20 16:45',
        name: 'Subham Ghosh',
        phone: '9123456780',
        email: 'subham.ghosh@example.com',
        address: 'Keranitola, Midnapur',
        educationBackground: 'B.Sc Graduate (2025)',
        courseId: 'course-spoken-english',
        courseTitle: 'Spoken English & Communication Mastery',
        centerId: 'center-midnapur',
        centerName: 'Midnapur Main Center',
        batchPreference: 'Morning 7:30 AM - 9:00 AM',
        mode: 'offline',
        status: 'New'
      }
    ]),
  saveEnrollment: (enrollment: EnrollmentRecord, syncCloud = true) => {
    const list = getItem<EnrollmentRecord[]>(STORAGE_KEYS.ENROLLMENTS, []);
    const idx = list.findIndex((e) => e.id === enrollment.id);
    const updated = idx >= 0
      ? list.map((item, i) => (i === idx ? enrollment : item))
      : [enrollment, ...list];
    setItem(STORAGE_KEYS.ENROLLMENTS, updated);
    if (syncCloud) firestoreService.saveEnrollment(enrollment as unknown as Record<string, unknown>).catch(() => {});
  },
  updateEnrollment: (updated: EnrollmentRecord, syncCloud = true) => {
    const list = getItem<EnrollmentRecord[]>(STORAGE_KEYS.ENROLLMENTS, []);
    setItem(
      STORAGE_KEYS.ENROLLMENTS,
      list.map((item) => (item.id === updated.id ? updated : item))
    );
    if (syncCloud) firestoreService.saveEnrollment(updated as unknown as Record<string, unknown>).catch(() => {});
  },
  deleteEnrollment: (id: string, syncCloud = true) => {
    const list = getItem<EnrollmentRecord[]>(STORAGE_KEYS.ENROLLMENTS, []);
    setItem(STORAGE_KEYS.ENROLLMENTS, list.filter((item) => item.id !== id));
    if (syncCloud) firestoreService.deleteEnrollment(id).catch(() => {});
  },

  // Push all local data to Cloud Firestore (Manual or Automatic Sync)
  syncAllToCloudFirestore: async (): Promise<boolean> => {
    try {
      await Promise.all([
        firestoreService.saveSettings(dbService.getSettings()),
        firestoreService.saveCenters(dbService.getCenters()),
        firestoreService.saveCourses(dbService.getCourses()),
        firestoreService.saveBatches(dbService.getBatches()),
        firestoreService.saveFaculty(dbService.getFaculty()),
        firestoreService.saveTestimonials(dbService.getTestimonials()),
        firestoreService.saveFAQs(dbService.getFAQs()),
        firestoreService.saveGallery(dbService.getGallery()),
        firestoreService.saveNavItems(dbService.getNavItems()),
        firestoreService.saveHeroData(dbService.getHeroData()),
        firestoreService.saveHomeSections(dbService.getHomeSections()),
        firestoreService.saveWhyChoose(dbService.getWhyChoose()),
        firestoreService.saveCourseFeatures(dbService.getCourseFeatures()),
        firestoreService.saveSEO(dbService.getSEO()),
        firestoreService.saveAboutContent(dbService.getAboutContent() as unknown as Record<string, unknown>),
      ]);
      console.log('[AIESD] Successfully synced all local data to Cloud Firestore!');
      return true;
    } catch (err) {
      console.error('[AIESD] Cloud sync error:', err);
      return false;
    }
  },

  // Admin Users
  getAdminUsers: (): AdminUser[] => getItem(STORAGE_KEYS.ADMINS, DEFAULT_ADMIN_USERS),
  saveAdminUsers: (users: AdminUser[]) => setItem(STORAGE_KEYS.ADMINS, users),

  // Auth Simulation
  getCurrentAdmin: (): AdminUser | null => {
    return getItem<AdminUser | null>(STORAGE_KEYS.CURRENT_ADMIN_USER, null);
  },
  setCurrentAdmin: (user: AdminUser | null) => {
    setItem(STORAGE_KEYS.CURRENT_ADMIN_USER, user);
  },

  // In-browser image upload & WebP compression
  uploadImage: async (file: File): Promise<MediaItem> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select an image file.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            const fallbackItem: MediaItem = {
              id: `med-${Date.now()}`,
              name: file.name.replace(/\.[^/.]+$/, ''),
              url: e.target?.result as string,
              sizeKb: file.size / 1024,
              uploadedAt: new Date().toISOString().split('T')[0]
            };
            const currentList = getItem<MediaItem[]>(STORAGE_KEYS.MEDIA, DEFAULT_MEDIA);
            setItem(STORAGE_KEYS.MEDIA, [fallbackItem, ...currentList]);
            resolve(fallbackItem);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/webp', 0.82);
          const approxSizeKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);

          const newItem: MediaItem = {
            id: `med-${Date.now()}`,
            name: file.name.replace(/\.[^/.]+$/, ''),
            url: compressedDataUrl,
            sizeKb: approxSizeKb,
            uploadedAt: new Date().toISOString().split('T')[0]
          };

          const currentList = getItem<MediaItem[]>(STORAGE_KEYS.MEDIA, DEFAULT_MEDIA);
          setItem(STORAGE_KEYS.MEDIA, [newItem, ...currentList]);
          resolve(newItem);
        };
        img.onerror = () => reject(new Error('Image failed to load for compression'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed reading image file'));
      reader.readAsDataURL(file);
    });
  },

  // Export all database records as a downloadable JSON file
  exportBackup: () => {
    const backupData: Record<string, unknown> = {
      _exportDate: new Date().toISOString(),
      _version: '2.0',
    };
    Object.entries(STORAGE_KEYS).forEach(([, key]) => {
      if (key !== STORAGE_KEYS.CURRENT_ADMIN_USER) {
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            backupData[key] = JSON.parse(raw);
          } catch {
            backupData[key] = raw;
          }
        }
      }
    });
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AIESD_Data_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // Import data from a backup JSON file
  importBackup: (jsonContent: string): boolean => {
    try {
      const data = JSON.parse(jsonContent);
      Object.entries(data).forEach(([key, val]) => {
        if (key.startsWith('_')) return; // skip metadata
        if (typeof val === 'object' && val !== null) {
          localStorage.setItem(key, JSON.stringify(val));
        } else if (typeof val === 'string') {
          localStorage.setItem(key, val);
        }
      });
      window.dispatchEvent(new CustomEvent('aiesd_storage_updated', { detail: { key: 'all' } }));
      return true;
    } catch {
      return false;
    }
  },

  // Full Database Reset
  resetAllToFactoryDefaults: () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  }
};
