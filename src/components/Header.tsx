import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Phone, Menu, X, ArrowRight, Sparkles, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export const Header: React.FC = () => {
  const { settings, navItems } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(90);

  // Update header height on mount and resize
  React.useLayoutEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Close mobile menu on location change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const activeNavItems = navItems
    .filter((item) => item.isVisible)
    .sort((a, b) => a.order - b.order);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e4e4e7] transition-all">

      {/* ── Single Pure Black Animated Info Bar (Centers, Email, Phone, Social) ── */}
      <div className="bg-[#000000] text-white text-[11px] py-2 overflow-hidden relative border-b border-[#27272a] select-none">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="flex items-center shrink-0">
              {/* Admissions badge */}
              <div className="inline-flex items-center gap-1.5 mx-5">
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-white font-medium px-2.5 py-0.5 rounded-full text-[10px] border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Admissions Open
                </span>
              </div>

              {/* Centers */}
              <div className="inline-flex items-center gap-1.5 mx-5 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold text-white">Centers:</span>
                <span className="text-zinc-200">Midnapur</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-200">Jhargram</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-200">Gidhni</span>
              </div>

              {/* Email */}
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-1.5 mx-5 text-zinc-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">Email:</span>
                <span className="text-zinc-200 underline underline-offset-2">{settings.email}</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 mx-5 text-zinc-200 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">Call:</span>
                <span className="text-white font-bold">{settings.primaryPhone}</span>
              </a>

              {/* Social Links */}
              <div className="inline-flex items-center gap-2 mx-5 text-zinc-400">
                <span className="text-zinc-500 font-medium">Follow:</span>
                {settings.socialLinks?.facebook && (
                  <a
                    href={settings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                )}
                {settings.socialLinks?.instagram && (
                  <a
                    href={settings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                )}
                {settings.socialLinks?.youtube && (
                  <a
                    href={settings.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Edge Gradients for smooth fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-black to-transparent z-10" />
      </div>


      {/* Main Navigation Bar */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20">
          {/* Brand Logo with real AIESD image */}
          <Link to="/" className="flex items-center gap-2.5 group min-w-0">
            <img
              src="/aiesd-logo.jpg"
              alt="AIESD Logo"
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover shrink-0 shadow-sm border-2 border-[#e4e4e7] group-hover:border-[#09090b] transition-colors"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#18181b] leading-none uppercase truncate">
                AIESD
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium text-[#71717a] tracking-wide mt-0.5 truncate hidden xs:block">
                {settings.fullForm}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {activeNavItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`px-3.5 py-1.5 text-[14px] font-medium rounded-full transition-all ${
                    active
                      ? 'text-[#18181b] bg-[#f4f4f5] font-semibold border border-[#e4e4e7]'
                      : 'text-[#3f3f46] hover:text-[#18181b] hover:bg-[#fafafa]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/free-english-test"
              className="awesomic-btn-light text-[13px] py-2 px-4.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#18181b]" />
              <span>Free Assessment</span>
            </Link>
            <Link
              to="/enroll"
              className="awesomic-btn-dark text-[13px] py-2 px-5"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Enquire now</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle & Quick Enroll */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/enroll"
              className="awesomic-btn-dark text-xs py-1.5 px-3 sm:hidden"
            >
              Enquire
            </Link>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2.5 rounded-full text-[#18181b] hover:bg-[#f4f4f5] active:bg-[#e4e4e7] transition-colors touch-target flex items-center justify-center"
              aria-label="Toggle Navigation Drawer"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown & Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Full-screen backdrop below header */}
          <div
            className="lg:hidden fixed inset-0 z-30 bg-[#09090b]/50"
            style={{ top: headerHeight }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Dropdown panel */}
          <div
            className="lg:hidden relative z-40 border-t border-[#e4e4e7] bg-white px-4 pt-3 pb-6 space-y-4 shadow-2xl overflow-y-auto"
            style={{ maxHeight: `calc(100vh - ${headerHeight}px)` }}
          >
            <nav className="flex flex-col gap-1.5">
              {activeNavItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-[16px] text-sm font-medium transition-colors flex items-center justify-between ${
                      active
                        ? 'bg-[#09090b] text-white font-semibold'
                        : 'text-[#3f3f46] hover:bg-[#f4f4f5] active:bg-[#e4e4e7]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-70" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#e4e4e7] flex flex-col gap-2.5">
              <Link
                to="/enroll"
                onClick={() => setMobileMenuOpen(false)}
                className="awesomic-btn-dark w-full justify-center py-3 text-sm"
              >
                <span>Enquire for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/free-english-test"
                onClick={() => setMobileMenuOpen(false)}
                className="awesomic-btn-light w-full justify-center py-3 text-sm"
              >
                <Sparkles className="w-4 h-4 text-[#18181b]" />
                <span>Take Free English Assessment</span>
              </Link>
              <a
                href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`}
                className="w-full py-2.5 px-4 rounded-full border border-[#e4e4e7] text-xs font-semibold text-[#18181b] flex items-center justify-center gap-2 bg-[#fafafa]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Admissions: {settings.primaryPhone}</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
