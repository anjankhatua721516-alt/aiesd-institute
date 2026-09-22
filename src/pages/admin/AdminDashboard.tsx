import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dbService } from '../../services/db';
import {
  Users,
  BookOpen,
  Calendar,
  Award,
  HelpCircle,
  Settings,
  Image as ImageIcon,
  CheckSquare,
  LogOut,
  MapPin,
  TrendingUp,
  Inbox,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SiteSettingsTab } from './SiteSettingsTab';
import { CoursesTab } from './CoursesTab';
import { FacultyTab } from './FacultyTab';
import { FreeTestTab } from './FreeTestTab';
import { EnquiriesTab } from './EnquiriesTab';
import { CentersTab } from './CentersTab';
import { ContentManagerTab } from './ContentManagerTab';
import { MediaAndSEOTab } from './MediaAndSEOTab';
import { PagesEditorTab } from './PagesEditorTab';
import { AdminUsersTab } from './AdminUsersTab';

type AdminTab =
  | 'dashboard'
  | 'settings'
  | 'courses'
  | 'faculty'
  | 'test'
  | 'enquiries'
  | 'centers'
  | 'content'
  | 'pages'
  | 'media_seo'
  | 'users';

export const AdminDashboard: React.FC = () => {
  const { adminUser, logoutAdmin, courses, centers, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Load stats
  const enrollments = dbService.getEnrollments();
  const enquiries = dbService.getEnquiries();
  const testAttempts = dbService.getTestAttempts();

  const newEnrollmentsCount = enrollments.filter((e) => e.status === 'New').length;

  const navItems: { id: AdminTab; label: string; icon: React.FC<any>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'enquiries', label: 'Admissions & Inquiries', icon: Inbox, badge: newEnrollmentsCount },
    { id: 'courses', label: 'Course Catalog', icon: BookOpen },
    { id: 'faculty', label: 'Faculty Profiles', icon: Award },
    { id: 'test', label: 'Diagnostic English Test', icon: HelpCircle },
    { id: 'centers', label: 'Centers & Locations', icon: MapPin },
    { id: 'content', label: 'Reviews, Gallery & FAQ', icon: ImageIcon },
    { id: 'pages', label: 'Page Content (Hero/Story)', icon: CheckSquare },
    { id: 'media_seo', label: 'SEO & Media Library', icon: Settings },
    { id: 'settings', label: 'Site Settings', icon: Settings },
    { id: 'users', label: 'Admin Access & Roles', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row text-[#3f3f46]">
      {/* MOBILE TOP BAR & SWIPEABLE TABS (< md screens) */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b border-[#e4e4e7] shadow-sm">
        <div className="p-3.5 flex items-center justify-between border-b border-[#e4e4e7]">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-sm text-[#18181b] flex items-center gap-1.5">
              <span>AIESD CMS</span>
              <span className="text-[9px] bg-[#09090b] text-white px-2 py-0.5 rounded-full font-bold">
                {adminUser?.role}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#71717a] truncate max-w-[120px] font-medium">
              {adminUser?.name}
            </span>
            <button
              onClick={logoutAdmin}
              className="p-1.5 text-[#71717a] hover:text-rose-600 active:bg-[#f4f4f5] rounded-full transition-colors touch-target flex items-center justify-center"
              title="Logout from CMS"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Swipeable Nav Tabs on Mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-2 no-scrollbar snap-x-mandatory bg-[#fafafa]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`shrink-0 snap-start flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#09090b] text-white font-semibold shadow-sm'
                    : 'bg-white text-[#71717a] border border-[#e4e4e7] hover:text-[#18181b]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white text-[#09090b]' : 'bg-[#09090b] text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP SIDEBAR (>= md screens) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-[#e4e4e7] text-[#3f3f46] shrink-0 flex-col justify-between">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-[#e4e4e7] flex items-center justify-between">
            <div>
              <h1 className="font-bold text-base tracking-tight text-[#18181b] flex items-center gap-2">
                <span>AIESD</span>
                <span className="text-[10px] bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7] font-semibold px-2 py-0.5 rounded-full">
                  Admin CMS
                </span>
              </h1>
              <p className="text-[11px] text-[#71717a] mt-0.5 truncate">
                Operations &amp; Content Workspace
              </p>
            </div>
          </div>

          {/* Current User Pill */}
          <div className="p-3 mx-3 my-3 bg-[#fafafa] rounded-[16px] border border-[#e4e4e7] text-xs flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#18181b]">{adminUser?.name}</p>
              <span className="text-[10px] font-medium text-[#71717a] uppercase">
                {adminUser?.role} Role
              </span>
            </div>
            <button
              onClick={logoutAdmin}
              className="p-1.5 text-[#71717a] hover:text-[#18181b] hover:bg-[#f4f4f5] rounded-full transition-colors"
              title="Logout from CMS"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="px-2 space-y-1 py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#09090b] text-white font-semibold'
                      : 'text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#18181b]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-[#09090b] text-white text-[10px] font-bold px-2 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-[#e4e4e7] text-[11px] text-[#71717a] space-y-0.5">
          <p className="font-medium text-[#18181b]">AIESD Local-First CMS</p>
          <p>Awesomic Design System</p>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-3.5 sm:p-8 overflow-y-auto max-h-[calc(100vh-90px)] md:max-h-screen bg-[#fafafa]">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <span className="awesomic-badge">
                Console Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#18181b] tracking-tight mt-2">
                Welcome back, {adminUser?.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#71717a] mt-0.5">
                Real-time snapshot of admissions, batch enrollments, and diagnostic assessments across centers.
              </p>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="awesomic-card p-6 space-y-2 bg-white">
                <div className="flex justify-between items-center text-[#71717a] text-[11px] font-semibold uppercase">
                  <span>Pending Enrollments</span>
                  <Inbox className="w-4 h-4 text-[#18181b]" />
                </div>
                <div className="text-3xl font-bold text-[#18181b]">{newEnrollmentsCount}</div>
                <p className="text-[11px] text-[#71717a]">
                  {enrollments.length} total applications received
                </p>
              </div>

              <div className="awesomic-card p-6 space-y-2 bg-white">
                <div className="flex justify-between items-center text-[#71717a] text-[11px] font-semibold uppercase">
                  <span>Diagnostic Test Leads</span>
                  <HelpCircle className="w-4 h-4 text-[#18181b]" />
                </div>
                <div className="text-3xl font-bold text-[#18181b]">{testAttempts.length}</div>
                <p className="text-[11px] text-[#71717a]">Free English tests evaluated</p>
              </div>

              <div className="awesomic-card p-6 space-y-2 bg-white">
                <div className="flex justify-between items-center text-[#71717a] text-[11px] font-semibold uppercase">
                  <span>Campus Centers</span>
                  <MapPin className="w-4 h-4 text-[#18181b]" />
                </div>
                <div className="text-3xl font-bold text-[#18181b]">{centers.length}</div>
                <p className="text-[11px] text-[#71717a]">Midnapur, Jhargram, Gidhni</p>
              </div>

              <div className="awesomic-card p-6 space-y-2 bg-white">
                <div className="flex justify-between items-center text-[#71717a] text-[11px] font-semibold uppercase">
                  <span>Active Courses</span>
                  <BookOpen className="w-4 h-4 text-[#18181b]" />
                </div>
                <div className="text-3xl font-bold text-[#18181b]">{courses.length}</div>
                <p className="text-[11px] text-[#71717a]">Spoken English flagship</p>
              </div>
            </div>

            {/* Quick Actions & Recent Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Enrollments */}
              <div className="lg:col-span-8 awesomic-card p-6 space-y-4 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#18181b]">Latest Seat Applications</h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-semibold text-[#18181b] hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-[#e4e4e7] text-xs">
                  {enrollments.slice(0, 5).map((enr) => (
                    <div key={enr.id} className="py-3.5 flex items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[#18181b]">{enr.name}</p>
                        <p className="text-[#71717a] text-[11px]">
                          {enr.courseTitle} &bull; {enr.centerName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${
                            enr.status === 'New'
                              ? 'bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7]'
                              : 'bg-[#fafafa] text-[#71717a]'
                          }`}
                        >
                          {enr.status}
                        </span>
                        <a
                          href={`https://wa.me/${enr.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="awesomic-btn-dark py-1 px-3 text-[11px]"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institute Center Status */}
              <div className="lg:col-span-4 awesomic-card p-6 space-y-4 bg-white">
                <h3 className="text-base font-bold text-[#18181b]">Branch Centers</h3>
                <div className="space-y-3 text-xs">
                  {centers.map((cnt) => (
                    <div
                      key={cnt.id}
                      className="p-3.5 bg-[#fafafa] rounded-[16px] border border-[#e4e4e7] space-y-1"
                    >
                      <div className="flex justify-between font-semibold text-[#18181b]">
                        <span>{cnt.name}</span>
                        <span className="text-[10px] text-[#71717a] font-mono">{cnt.code}</span>
                      </div>
                      <p className="text-[#71717a] truncate">{cnt.address}</p>
                      <p className="text-[#18181b] font-mono text-[11px]">{cnt.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && <SiteSettingsTab />}
        {activeTab === 'courses' && <CoursesTab />}
        {activeTab === 'faculty' && <FacultyTab />}
        {activeTab === 'test' && <FreeTestTab />}
        {activeTab === 'enquiries' && <EnquiriesTab />}
        {activeTab === 'centers' && <CentersTab />}
        {activeTab === 'content' && <ContentManagerTab />}
        {activeTab === 'pages' && <PagesEditorTab />}
        {activeTab === 'media_seo' && <MediaAndSEOTab />}
        {activeTab === 'users' && <AdminUsersTab />}
      </main>
    </div>
  );
};
