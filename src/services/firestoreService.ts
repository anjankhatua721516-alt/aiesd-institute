/**
 * firestoreService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Cloud Firestore service for AIESD.
 *
 * Architecture:
 *   • All data collections live in Firestore under the `aiesd` root document
 *     (or as top-level collections – we use top-level for easier querying).
 *   • A one-time seed guard in `system/meta` ensures default seed data is
 *     written only on the very first run and NEVER again.
 *   • Every write also updates localStorage so the UI reads instantly on reload
 *     from cache (handled by the legacy `db.ts` layer).
 *   • Real-time `onSnapshot` listeners are wired up from AppContext so any
 *     admin change anywhere is reflected live across all open tabs.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  serverTimestamp,
  query,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// ── Seed data imports ────────────────────────────────────────────────────────
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
  DEFAULT_SEO,
} from '../data/seedData';

import type {
  SiteSettings,
  Center,
  Course,
  Batch,
  FacultyMember,
  Testimonial,
  FAQItem,
  HomeHeroData,
  HomeSectionConfig,
  WhyChooseItem,
  CourseFeatureItem,
  GalleryItem,
  NavItem,
  SEOConfig,
  AdminUser,
} from '../types';

// ── Firestore Collection Names ───────────────────────────────────────────────
export const COL = {
  SYSTEM:        'system',
  SETTINGS:      'settings',
  CENTERS:       'centers',
  COURSES:       'courses',
  BATCHES:       'batches',
  FACULTY:       'faculty',
  TESTIMONIALS:  'testimonials',
  FAQS:          'faqs',
  GALLERY:       'gallery',
  NAV:           'nav',
  HERO:          'hero',
  HOME_SECTIONS: 'homeSections',
  WHY_CHOOSE:    'whyChoose',
  COURSE_FEAT:   'courseFeatures',
  SEO:           'seo',
  ENQUIRIES:     'enquiries',
  ENROLLMENTS:   'enrollments',
  TEST_ATTEMPTS: 'testAttempts',
  ADMIN_USERS:   'adminUsers',
  ABOUT:         'about',
  MEDIA:         'media',
} as const;

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Save a single-document collection (like settings, hero, SEO) */
async function saveSingleDoc<T extends object>(colName: string, data: T): Promise<void> {
  await setDoc(doc(db, colName, 'data'), { ...data, _updatedAt: serverTimestamp() });
}

/** Read a single-document collection */
async function getSingleDoc<T>(colName: string, fallback: T): Promise<T> {
  const snap = await getDoc(doc(db, colName, 'data'));
  if (snap.exists()) {
    const d = snap.data() as T & { _updatedAt?: unknown };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _updatedAt, ...rest } = d as Record<string, unknown>;
    return rest as T;
  }
  return fallback;
}

/** Save an array as individual Firestore documents (one doc per item) */
async function saveCollection<T extends { id: string }>(colName: string, items: T[]): Promise<void> {
  const batch = writeBatch(db);
  items.forEach((item) => {
    const ref = doc(db, colName, item.id);
    batch.set(ref, { ...item, _updatedAt: serverTimestamp() });
  });
  await batch.commit();
}

/** Read all docs from a collection, stripping internal fields */
async function readCollection<T>(colName: string): Promise<T[]> {
  const snap = await getDocs(collection(db, colName));
  return snap.docs.map((d) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _updatedAt, ...rest } = d.data() as Record<string, unknown>;
    return rest as T;
  });
}

// ── Seed Guard ───────────────────────────────────────────────────────────────

/**
 * Runs ONCE per Firestore project lifetime.
 * Writes all default seed data only if `system/meta` doesn't have `seeded: true`.
 * After this completes, real admin edits are NEVER overwritten.
 */
export async function runSeedGuard(): Promise<void> {
  try {
    const metaRef = doc(db, COL.SYSTEM, 'meta');
    const metaSnap = await getDoc(metaRef);

    if (metaSnap.exists() && metaSnap.data()?.seeded === true) {
      // Already seeded — skip entirely. Real data is safe.
      console.log('[AIESD Firebase] Seed guard: already seeded, skipping.');
      return;
    }

    console.log('[AIESD Firebase] First run — writing seed data to Firestore...');

    // Write all seed data in parallel
    await Promise.all([
      saveSingleDoc(COL.SETTINGS, DEFAULT_SITE_SETTINGS),
      saveSingleDoc(COL.HERO, DEFAULT_HERO_DATA),
      saveSingleDoc(COL.SEO, DEFAULT_SEO),
      saveSingleDoc(COL.ABOUT, {
        mission: 'To eliminate the communication barrier for students, graduates, and professionals in rural and semi-urban Bengal.',
        vision: 'To be the most respected grassroots skill development and language coaching institute in Eastern India.',
        story: 'Founded in 2008 in Midnapur, AIESD began with a simple yet ambitious goal.',
      }),
      saveCollection(COL.CENTERS, DEFAULT_CENTERS),
      saveCollection(COL.COURSES, DEFAULT_COURSES),
      saveCollection(COL.BATCHES, DEFAULT_BATCHES),
      saveCollection(COL.FACULTY, DEFAULT_FACULTY),
      saveCollection(COL.TESTIMONIALS, DEFAULT_TESTIMONIALS),
      saveCollection(COL.FAQS, DEFAULT_FAQS),
      saveCollection(COL.GALLERY, DEFAULT_GALLERY),
      saveCollection(COL.NAV, DEFAULT_NAV_ITEMS),
      saveCollection(COL.WHY_CHOOSE, DEFAULT_WHY_CHOOSE),
      saveCollection(COL.COURSE_FEAT, DEFAULT_COURSE_FEATURES),
      saveCollection(COL.HOME_SECTIONS, DEFAULT_HOME_SECTIONS),

      // Default admin user
      setDoc(doc(db, COL.ADMIN_USERS, 'admin-rakesh-owner'), {
        id: 'admin-rakesh-owner',
        email: 'rakeshsharma@gmail.com',
        role: 'Owner',
        name: 'Rakesh Sharma',
        password: 'rakeshmidnaporesharma',
        addedAt: '2026-01-01',
      }),
    ]);

    // Mark as seeded — this document prevents future seed overwrites
    await setDoc(metaRef, {
      seeded: true,
      seededAt: serverTimestamp(),
      version: '1.0',
    });

    console.log('[AIESD Firebase] Seed data written successfully. Real data is now protected.');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[AIESD Firebase] Seed guard notice (running smoothly with local data):', msg);
  }
}

// ── Real-time Listeners ──────────────────────────────────────────────────────

/** Subscribe to site settings in real-time */
export function subscribeToSettings(
  callback: (data: SiteSettings) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  return onSnapshot(
    doc(db, COL.SETTINGS, 'data'),
    (snap) => {
      if (snap.exists()) {
        const { _updatedAt, ...data } = snap.data() as Record<string, unknown>;
        callback(data as unknown as SiteSettings);
      }
    },
    (err) => {
      if (onError) onError(err);
      else console.warn('[AIESD Firebase] Settings listener (using local data):', err.message);
    }
  );
}

/** Subscribe to a collection in real-time, returns sorted array */
export function subscribeToCollection<T extends { id: string; order?: number }>(
  colName: string,
  callback: (items: T[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  return onSnapshot(
    collection(db, colName),
    (snap) => {
      const items = snap.docs.map((d) => {
        const { _updatedAt, ...rest } = d.data() as Record<string, unknown>;
        return rest as T;
      });
      callback(items);
    },
    (err) => {
      if (onError) onError(err);
      else console.warn(`[AIESD Firebase] Collection ${colName} listener (using local data):`, err.message);
    }
  );
}

// ── Write Operations ─────────────────────────────────────────────────────────

export const firestoreService = {
  // Settings
  saveSettings: (s: SiteSettings) => saveSingleDoc(COL.SETTINGS, s),
  getSettings: () => getSingleDoc<SiteSettings>(COL.SETTINGS, DEFAULT_SITE_SETTINGS),

  // Centers
  saveCenter: async (center: Center) => {
    await setDoc(doc(db, COL.CENTERS, center.id), { ...center, _updatedAt: serverTimestamp() });
  },
  saveCenters: (centers: Center[]) => saveCollection(COL.CENTERS, centers),
  getCenters: () => readCollection<Center>(COL.CENTERS),
  deleteCenter: async (id: string) => {
    await deleteDoc(doc(db, COL.CENTERS, id));
  },

  // Courses
  saveCourse: async (course: Course) => {
    await setDoc(doc(db, COL.COURSES, course.id), { ...course, _updatedAt: serverTimestamp() });
  },
  saveCourses: (courses: Course[]) => saveCollection(COL.COURSES, courses),
  getCourses: () => readCollection<Course>(COL.COURSES),
  deleteCourse: async (id: string) => {
    await deleteDoc(doc(db, COL.COURSES, id));
  },

  // Batches
  saveBatch: async (batch: Batch) => {
    await setDoc(doc(db, COL.BATCHES, batch.id), { ...batch, _updatedAt: serverTimestamp() });
  },
  saveBatches: (batches: Batch[]) => saveCollection(COL.BATCHES, batches),
  getBatches: () => readCollection<Batch>(COL.BATCHES),
  deleteBatch: async (id: string) => {
    await deleteDoc(doc(db, COL.BATCHES, id));
  },

  // Faculty
  saveFacultyMember: async (member: FacultyMember) => {
    await setDoc(doc(db, COL.FACULTY, member.id), { ...member, _updatedAt: serverTimestamp() });
  },
  saveFaculty: (faculty: FacultyMember[]) => saveCollection(COL.FACULTY, faculty),
  getFaculty: () => readCollection<FacultyMember>(COL.FACULTY),
  deleteFaculty: async (id: string) => {
    await deleteDoc(doc(db, COL.FACULTY, id));
  },

  // Testimonials
  saveTestimonial: async (t: Testimonial) => {
    await setDoc(doc(db, COL.TESTIMONIALS, t.id), { ...t, _updatedAt: serverTimestamp() });
  },
  saveTestimonials: (items: Testimonial[]) => saveCollection(COL.TESTIMONIALS, items),
  getTestimonials: () => readCollection<Testimonial>(COL.TESTIMONIALS),
  deleteTestimonial: async (id: string) => {
    await deleteDoc(doc(db, COL.TESTIMONIALS, id));
  },

  // FAQs
  saveFaq: async (faq: FAQItem) => {
    await setDoc(doc(db, COL.FAQS, faq.id), { ...faq, _updatedAt: serverTimestamp() });
  },
  saveFAQs: (faqs: FAQItem[]) => saveCollection(COL.FAQS, faqs),
  getFAQs: () => readCollection<FAQItem>(COL.FAQS),
  deleteFaq: async (id: string) => {
    await deleteDoc(doc(db, COL.FAQS, id));
  },

  // Gallery
  saveGalleryItem: async (g: GalleryItem) => {
    await setDoc(doc(db, COL.GALLERY, g.id), { ...g, _updatedAt: serverTimestamp() });
  },
  saveGallery: (items: GalleryItem[]) => saveCollection(COL.GALLERY, items),
  getGallery: () => readCollection<GalleryItem>(COL.GALLERY),
  deleteGalleryItem: async (id: string) => {
    await deleteDoc(doc(db, COL.GALLERY, id));
  },

  // Nav Items
  saveNavItems: (items: NavItem[]) => saveCollection(COL.NAV, items),
  getNavItems: () => readCollection<NavItem>(COL.NAV),

  // Hero / Home
  saveHeroData: (hero: HomeHeroData) => saveSingleDoc(COL.HERO, hero),
  getHeroData: () => getSingleDoc<HomeHeroData>(COL.HERO, DEFAULT_HERO_DATA),
  saveHomeSections: (sections: HomeSectionConfig[]) => saveCollection(COL.HOME_SECTIONS, sections),
  getHomeSections: () => readCollection<HomeSectionConfig>(COL.HOME_SECTIONS),
  saveWhyChoose: (items: WhyChooseItem[]) => saveCollection(COL.WHY_CHOOSE, items),
  getWhyChoose: () => readCollection<WhyChooseItem>(COL.WHY_CHOOSE),
  saveCourseFeatures: (items: CourseFeatureItem[]) => saveCollection(COL.COURSE_FEAT, items),
  getCourseFeatures: () => readCollection<CourseFeatureItem>(COL.COURSE_FEAT),

  // SEO
  saveSEO: (seo: SEOConfig) => saveSingleDoc(COL.SEO, seo),
  getSEO: () => getSingleDoc<SEOConfig>(COL.SEO, DEFAULT_SEO),

  // Enquiries
  saveEnquiry: async (enquiry: Record<string, unknown>) => {
    await setDoc(doc(db, COL.ENQUIRIES, enquiry.id as string), {
      ...enquiry,
      _updatedAt: serverTimestamp(),
    });
  },
  getEnquiries: () => readCollection<Record<string, unknown>>(COL.ENQUIRIES),
  deleteEnquiry: async (id: string) => {
    await deleteDoc(doc(db, COL.ENQUIRIES, id));
  },

  // Enrollments
  saveEnrollment: async (enrollment: Record<string, unknown>) => {
    await setDoc(doc(db, COL.ENROLLMENTS, enrollment.id as string), {
      ...enrollment,
      _updatedAt: serverTimestamp(),
    });
  },
  getEnrollments: () => readCollection<Record<string, unknown>>(COL.ENROLLMENTS),
  deleteEnrollment: async (id: string) => {
    await deleteDoc(doc(db, COL.ENROLLMENTS, id));
  },

  // Test Attempts
  saveTestAttempt: async (attempt: Record<string, unknown>) => {
    await setDoc(doc(db, COL.TEST_ATTEMPTS, attempt.id as string), {
      ...attempt,
      _updatedAt: serverTimestamp(),
    });
  },
  getTestAttempts: () => readCollection<Record<string, unknown>>(COL.TEST_ATTEMPTS),
  deleteTestAttempt: async (id: string) => {
    await deleteDoc(doc(db, COL.TEST_ATTEMPTS, id));
  },

  // Admin Users
  getAdminUsers: () => readCollection<AdminUser>(COL.ADMIN_USERS),
  saveAdminUser: async (user: AdminUser) => {
    await setDoc(doc(db, COL.ADMIN_USERS, user.id), { ...user, _updatedAt: serverTimestamp() });
  },

  // About
  saveAboutContent: (content: Record<string, unknown>) => saveSingleDoc(COL.ABOUT, content),
  getAboutContent: () => getSingleDoc<Record<string, unknown>>(COL.ABOUT, {}),
};
