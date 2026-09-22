import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, centers, courses } = useApp();

  return (
    <footer className="bg-[#fafafa] text-[#71717a] border-t border-[#e4e4e7] transition-colors">
      {/* Top Banner / Trust Strip - Awesomic rounded capsule styling */}
      <div className="border-b border-[#e4e4e7] py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-[14px] bg-[#f4f4f5] border border-[#e4e4e7] flex items-center justify-center text-[#18181b]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-[#18181b]">
                Empowering Career &amp; Spoken English Fluency Since 2008
              </p>
              <p className="text-[13px] text-[#71717a]">
                Authorized Skill Development Programs Across Paschim Medinipur &amp; Jhargram
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/enroll"
              className="awesomic-btn-dark text-[13px] py-2 px-5"
            >
              Reserve Admission Seat
            </Link>
            <Link
              to="/free-english-test"
              className="awesomic-btn-light text-[13px] py-2 px-4.5"
            >
              Take Free English Test
            </Link>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[12px] bg-[#09090b] text-white flex items-center justify-center font-bold text-sm">
                <span className="font-mono">a:</span>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#18181b] block lowercase">
                  {settings.brandName.toLowerCase()}:
                </span>
                <span className="text-[10px] font-medium text-[#71717a] block tracking-wide">
                  {settings.fullForm}
                </span>
              </div>
            </div>
            <p className="text-[14px] text-[#71717a] leading-relaxed max-w-sm">
              Dedicated coaching institute delivering spoken English fluency, foundational computer skills, and professional personality grooming for students and job seekers in small-town and semi-urban Bengal.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-[13px] text-[#71717a]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#18181b]" />
                <a href={`tel:${settings.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-[#18181b]">
                  {settings.primaryPhone} / {settings.alternatePhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#18181b]" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#18181b]">
                  {settings.email}
                </a>
              </div>
            </div>

            {/* Quick social redirect buttons */}
            <div className="pt-2">
              <Link
                to="/social"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f4f5] hover:bg-[#e4e4e7] border border-[#e4e4e7] text-xs font-semibold text-[#18181b] transition-colors"
              >
                <span>View Instagram, WhatsApp &amp; Facebook</span>
                <ArrowUpRight className="w-3 h-3 text-[#18181b]" />
              </Link>
            </div>
          </div>

          {/* Programs Column */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold text-[#18181b] uppercase tracking-wider">
              Popular Programs
            </h4>
            <ul className="space-y-2 text-[13px] text-[#71717a]">
              {courses.slice(0, 5).map((course) => (
                <li key={course.id}>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="hover:text-[#18181b] transition-colors block line-clamp-1"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/courses" className="text-[#18181b] hover:underline font-medium inline-flex items-center gap-1">
                  View All Programs <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Centers Column */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold text-[#18181b] uppercase tracking-wider">
              Campus Centers
            </h4>
            <ul className="space-y-3 text-[13px] text-[#71717a]">
              {centers.map((center) => (
                <li key={center.id} className="space-y-0.5">
                  <div className="flex items-center gap-1 font-medium text-[#18181b]">
                    <MapPin className="w-3 h-3 text-[#18181b]" />
                    <span>{center.name}</span>
                    {center.isHeadOffice && (
                      <span className="text-[9px] bg-[#09090b] text-white px-1.5 py-0.2 rounded-full font-normal">HQ</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#a1a1aa] line-clamp-1 pl-4">{center.address}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-[12px] font-semibold text-[#18181b] uppercase tracking-wider">
              Navigation &amp; Support
            </h4>
            <ul className="space-y-2 text-[13px] text-[#71717a]">
              <li>
                <Link to="/about" className="hover:text-[#18181b] transition-colors">
                  About Institute
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-[#18181b] transition-colors">
                  Faculty Mentors
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-[#18181b] transition-colors">
                  Student Success Stories
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#18181b] transition-colors">
                  Campus Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/social" className="hover:text-[#18181b] transition-colors font-medium">
                  Social &amp; App Channels
                </Link>
              </li>
              <li>
                <Link to="/free-english-test" className="hover:text-[#18181b] transition-colors">
                  Free Spoken English Test
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#18181b] transition-colors">
                  Contact &amp; Directions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-[#e4e4e7] flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#a1a1aa] gap-4">
          <p>© {new Date().getFullYear()} AIESD. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Local-first architecture</span>
            <span>•</span>
            <span>Awesomic Clean System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
