import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Public Pages
import { HomePage } from './pages/HomePage';
import { CoursesPage, CourseDetailPage } from './pages/CoursesPage';
import { EnrollPage } from './pages/EnrollPage';
import { FreeEnglishTestPage } from './pages/FreeEnglishTestPage';
import { ContactPage } from './pages/ContactPage';
import { FacultyPage, FacultyDetailPage } from './pages/FacultyPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { GalleryPage } from './pages/GalleryPage';
import { SocialPage } from './pages/SocialPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public Layout Wrapper with Header, Footer and Floating WhatsApp
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#3f3f46] selection:bg-[#18181b] selection:text-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

// Admin Route Guard
const AdminRoute: React.FC = () => {
  const { adminUser } = useApp();
  if (!adminUser) {
    return <AdminLoginPage />;
  }
  return <AdminDashboard />;
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Pages with Header, Footer, and Floating WhatsApp */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/courses"
            element={
              <PublicLayout>
                <CoursesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/courses/:slug"
            element={
              <PublicLayout>
                <CourseDetailPage />
              </PublicLayout>
            }
          />
          <Route
            path="/enroll"
            element={
              <PublicLayout>
                <EnrollPage />
              </PublicLayout>
            }
          />
          <Route
            path="/free-english-test"
            element={
              <PublicLayout>
                <FreeEnglishTestPage />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ContactPage />
              </PublicLayout>
            }
          />
          <Route
            path="/faculty"
            element={
              <PublicLayout>
                <FacultyPage />
              </PublicLayout>
            }
          />
          <Route
            path="/faculty/:slug"
            element={
              <PublicLayout>
                <FacultyDetailPage />
              </PublicLayout>
            }
          />
          <Route
            path="/testimonials"
            element={
              <PublicLayout>
                <TestimonialsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <PublicLayout>
                <GalleryPage />
              </PublicLayout>
            }
          />
          <Route
            path="/social"
            element={
              <PublicLayout>
                <SocialPage />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutPage />
              </PublicLayout>
            }
          />

          {/* Redirects for removed batch pages */}
          <Route path="/batches" element={<Navigate to="/courses" replace />} />
          <Route path="/upcoming-batches" element={<Navigate to="/courses" replace />} />

          {/* Admin CMS Route */}
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/admin/*" element={<AdminRoute />} />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <NotFoundPage />
              </PublicLayout>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}
