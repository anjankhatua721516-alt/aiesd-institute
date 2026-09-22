import React, { createContext, useContext, useState, useEffect } from 'react';
import { dbService, MediaItem } from '../services/db';
import {
  runSeedGuard,
  subscribeToSettings,
  subscribeToCollection,
} from '../services/firestoreService';
import {
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
  AdminUser
} from '../types';
import { COL } from '../services/firestoreService';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  settings: SiteSettings;
  centers: Center[];
  courses: Course[];
  batches: Batch[];
  faculty: FacultyMember[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  heroData: HomeHeroData;
  homeSections: HomeSectionConfig[];
  whyChoose: WhyChooseItem[];
  courseFeatures: CourseFeatureItem[];
  gallery: GalleryItem[];
  navItems: NavItem[];
  seo: SEOConfig;
  adminUser: AdminUser | null;
  currentAdmin: AdminUser | null;
  firebaseReady: boolean;
  refreshState: () => void;
  refreshAll: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  setCurrentAdminUser: (user: AdminUser | null) => void;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ── Initial state from localStorage (instant, zero flash) ─────────────────
  const [settings, setSettings] = useState<SiteSettings>(dbService.getSettings());
  const [centers, setCenters] = useState<Center[]>(dbService.getCenters());
  const [courses, setCourses] = useState<Course[]>(dbService.getCourses());
  const [batches, setBatches] = useState<Batch[]>(dbService.getBatches());
  const [faculty, setFaculty] = useState<FacultyMember[]>(dbService.getFaculty());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(dbService.getTestimonials());
  const [faqs, setFaqs] = useState<FAQItem[]>(dbService.getFAQs());
  const [heroData, setHeroData] = useState<HomeHeroData>(dbService.getHeroData());
  const [homeSections, setHomeSections] = useState<HomeSectionConfig[]>(dbService.getHomeSections());
  const [whyChoose, setWhyChoose] = useState<WhyChooseItem[]>(dbService.getWhyChoose());
  const [courseFeatures, setCourseFeatures] = useState<CourseFeatureItem[]>(dbService.getCourseFeatures());
  const [gallery, setGallery] = useState<GalleryItem[]>(dbService.getGallery());
  const [navItems, setNavItems] = useState<NavItem[]>(dbService.getNavItems());
  const [seo, setSeo] = useState<SEOConfig>(dbService.getSEO());
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(dbService.getCurrentAdmin());
  const [toasts, setToasts] = useState<Toast[]>([]);

  // ── Firebase ready state ───────────────────────────────────────────────────
  const [firebaseReady, setFirebaseReady] = useState(false);

  // ── Seed guard + real-time Firestore listeners on mount ───────────────────
  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    const initFirebase = async () => {
      try {
        // Step 1: Run seed guard (writes defaults only on very first run)
        await runSeedGuard();

        // Step 2: Wire up real-time listeners — Firestore pushes live updates
        unsubscribers.push(
          subscribeToSettings((data) => {
            if (data && Object.keys(data).length > 0) {
              setSettings(data);
              dbService.saveSettings(data, false);
            }
          }),
          subscribeToCollection<Center>(COL.CENTERS, (items) => {
            if (items && items.length > 0) {
              setCenters(items);
              dbService.saveCenters(items, false);
            }
          }),
          subscribeToCollection<Course>(COL.COURSES, (items) => {
            if (items && items.length > 0) {
              setCourses(items);
              dbService.saveCourses(items, false);
            }
          }),
          subscribeToCollection<Batch>(COL.BATCHES, (items) => {
            if (items && items.length > 0) {
              setBatches(items);
              dbService.saveBatches(items, false);
            }
          }),
          subscribeToCollection<FacultyMember>(COL.FACULTY, (items) => {
            if (items && items.length > 0) {
              setFaculty(items);
              dbService.saveFaculty(items, false);
            }
          }),
          subscribeToCollection<Testimonial>(COL.TESTIMONIALS, (items) => {
            if (items && items.length > 0) {
              setTestimonials(items);
              dbService.saveTestimonials(items, false);
            }
          }),
          subscribeToCollection<FAQItem>(COL.FAQS, (items) => {
            if (items && items.length > 0) {
              setFaqs(items);
              dbService.saveFAQs(items, false);
            }
          }),
          subscribeToCollection<GalleryItem>(COL.GALLERY, (items) => {
            if (items && items.length > 0) {
              setGallery(items);
              dbService.saveGallery(items, false);
            }
          }),
          subscribeToCollection<NavItem>(COL.NAV, (items) => {
            if (items && items.length > 0) {
              const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
              setNavItems(sorted);
              dbService.saveNavItems(sorted, false);
            }
          }),
          subscribeToCollection<HomeSectionConfig>(COL.HOME_SECTIONS, (items) => {
            if (items && items.length > 0) {
              const filtered = items.filter((s) => s.key !== 'batches' && s.id !== 'sec-batches');
              setHomeSections(filtered);
            }
          }),
          subscribeToCollection<WhyChooseItem>(COL.WHY_CHOOSE, (items) => {
            if (items && items.length > 0) {
              setWhyChoose(items);
            }
          }),
          subscribeToCollection<CourseFeatureItem>(COL.COURSE_FEAT, (items) => {
            if (items && items.length > 0) {
              setCourseFeatures(items);
            }
          }),
        );

        setFirebaseReady(true);
        console.log('[AIESD] Firebase real-time sync active ✓');
      } catch (err) {
        console.error('[AIESD] Firebase init error — falling back to localStorage:', err);
        // App continues working offline from localStorage
        setFirebaseReady(false);
      }
    };

    initFirebase();

    return () => {
      // Clean up all Firestore listeners on unmount
      unsubscribers.forEach((unsub) => unsub());
    };
  }, []);

  // ── Legacy localStorage update listener ───────────────────────────────────
  const refreshAll = () => {
    setSettings(dbService.getSettings());
    setCenters(dbService.getCenters());
    setCourses(dbService.getCourses());
    setBatches(dbService.getBatches());
    setFaculty(dbService.getFaculty());
    setTestimonials(dbService.getTestimonials());
    setFaqs(dbService.getFAQs());
    setHeroData(dbService.getHeroData());
    setHomeSections(dbService.getHomeSections());
    setWhyChoose(dbService.getWhyChoose());
    setCourseFeatures(dbService.getCourseFeatures());
    setGallery(dbService.getGallery());
    setNavItems(dbService.getNavItems());
    setSeo(dbService.getSEO());
    setCurrentAdmin(dbService.getCurrentAdmin());
  };

  const refreshState = refreshAll;

  useEffect(() => {
    const handleStorageUpdate = () => refreshAll();
    window.addEventListener('aiesd_storage_updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);
    return () => {
      window.removeEventListener('aiesd_storage_updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  // ── Toast System ──────────────────────────────────────────────────────────
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // ── Admin Auth ────────────────────────────────────────────────────────────
  const setCurrentAdminUser = (user: AdminUser | null) => {
    dbService.setCurrentAdmin(user);
    setCurrentAdmin(user);
  };

  const loginAdmin = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    const isMasterAdmin =
      cleanEmail === 'rakeshsharma@gmail.com' &&
      cleanPass === 'rakeshmidnaporesharma';

    const users = dbService.getAdminUsers();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    const isValidSavedUser = found && found.password && found.password === cleanPass;

    if (isMasterAdmin) {
      const adminUser: AdminUser = found || {
        id: 'admin-rakesh-owner',
        email: 'rakeshsharma@gmail.com',
        name: 'Rakesh Sharma',
        role: 'Owner',
        password: 'rakeshmidnaporesharma',
        addedAt: '2026-01-01'
      };
      setCurrentAdminUser(adminUser);
      showToast(`Welcome back, ${adminUser.name}!`, 'success');
      return true;
    }

    if (isValidSavedUser && found) {
      setCurrentAdminUser(found);
      showToast(`Welcome back, ${found.name || found.email}!`, 'success');
      return true;
    }

    return false;
  };

  const logoutAdmin = () => {
    setCurrentAdminUser(null);
    showToast('Logged out from admin panel.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        centers,
        courses,
        batches,
        faculty,
        testimonials,
        faqs,
        heroData,
        homeSections,
        whyChoose,
        courseFeatures,
        gallery,
        navItems,
        seo,
        adminUser: currentAdmin,
        currentAdmin,
        firebaseReady,
        refreshState,
        refreshAll,
        showToast,
        setCurrentAdminUser,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
      {/* Global Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl border text-xs font-semibold flex items-start justify-between gap-3 transition-all transform translate-y-0 ${
              toast.type === 'success'
                ? 'bg-emerald-950 text-emerald-100 border-emerald-700'
                : toast.type === 'error'
                ? 'bg-rose-950 text-rose-100 border-rose-700'
                : 'bg-slate-900 text-slate-100 border-slate-700'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-xs opacity-70 hover:opacity-100 text-slate-400 hover:text-white"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
