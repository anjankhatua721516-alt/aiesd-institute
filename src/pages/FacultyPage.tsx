import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Team from '@/components/ui/team-02';
import {
  Award,
  BookOpen,
  GraduationCap,
  Calendar,
  Check,
  ArrowRight,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const FacultyPage: React.FC = () => {
  const { faculty } = useApp();

  return (
    <div className="bg-white min-h-screen pb-20 text-[#3f3f46]">
      <Team
        badge="AIESD Faculty &amp; Mentors"
        title="Meet our educators"
        description="Our faculty team is committed to eliminating vernacular hesitation, building spoken English confidence, and fostering practical career skills through compassionate, personalized mentorship."
        members={faculty.map((fac) => ({
          name: fac.name,
          role: fac.designation,
          image: fac.photo,
          slug: fac.slug,
          experience: fac.teachingExperienceYears,
          isFounder: fac.isFounder
        }))}
      />

      {/* Detailed Academic Subject Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pt-12 border-t border-[#e4e4e7]">
        <div className="max-w-2xl mb-8 space-y-2">
          <span className="awesomic-badge">
            Curriculum Specializations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#18181b] tracking-tight">
            Specializations &amp; Class Portfolios
          </h2>
          <p className="text-sm text-[#71717a]">
            Every trainer brings deep pedagogical expertise across grammar drills, spoken interaction circles, and technical software suites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((fac) => (
            <div
              key={fac.id}
              className="p-6 rounded-[22px] bg-[#fafafa] border border-[#e4e4e7] hover:border-[#18181b]/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={fac.photo}
                    alt={fac.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#e4e4e7]"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#18181b]">{fac.name}</h3>
                    <p className="text-xs text-[#71717a]">{fac.designation}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-[#18181b] uppercase tracking-wider">
                    Core Teaching Domains:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {fac.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] bg-white text-[#18181b] border border-[#e4e4e7] px-2.5 py-0.5 rounded-full font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#71717a] line-clamp-3 leading-relaxed">
                  {fac.bio}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#e4e4e7]">
                <Link
                  to={`/faculty/${fac.slug}`}
                  className="text-xs font-semibold text-[#18181b] hover:underline flex items-center justify-between"
                >
                  <span>View full credentials &amp; career milestones</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FacultyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { faculty } = useApp();

  const member = faculty.find((f) => f.slug === slug) || faculty[0];

  if (!member) {
    return (
      <div className="py-20 text-center bg-white">
        <p className="text-[#18181b]">Faculty member not found.</p>
        <Link to="/faculty" className="text-[#18181b] underline mt-2 inline-block">
          Back to Faculty
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 text-[#3f3f46]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/faculty"
            className="text-xs font-semibold text-[#18181b] hover:underline inline-flex items-center gap-1.5"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            <span>Back to All Faculty Mentors</span>
          </Link>
          <span className="text-xs text-[#71717a]">AIESD Academic Directory</span>
        </div>

        {/* Profile Card Header */}
        <div className="awesomic-card p-6 sm:p-8 bg-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-[22px] overflow-hidden border border-[#e4e4e7] bg-[#f4f4f5] shrink-0">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-2.5 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="awesomic-badge">
                  Faculty Profile
                </span>
                {member.isFounder && (
                  <span className="bg-[#09090b] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    Founder of AIESD
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#18181b]">{member.name}</h1>
              <p className="text-sm font-semibold text-[#18181b]">{member.designation}</p>
              <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">{member.bio}</p>
              <div className="pt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 bg-[#f4f4f5] border border-[#e4e4e7] text-[#18181b] text-xs px-3 py-1 rounded-full font-medium">
                  <Award className="w-3.5 h-3.5 text-[#18181b]" />
                  {member.teachingExperienceYears}+ Years Dedicated Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="awesomic-card p-6 space-y-3 bg-white">
            <h2 className="text-base font-bold text-[#18181b] tracking-tight flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#18181b]" />
              <span>Academic Qualifications</span>
            </h2>
            <ul className="space-y-2 text-xs text-[#71717a]">
              {member.qualifications.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#18181b] mt-1.5 shrink-0" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="awesomic-card p-6 space-y-3 bg-white">
            <h2 className="text-base font-bold text-[#18181b] tracking-tight flex items-center gap-2">
              <Award className="w-4 h-4 text-[#18181b]" />
              <span>Certifications &amp; Accreditations</span>
            </h2>
            <ul className="space-y-2 text-xs text-[#71717a]">
              {member.certifications.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#18181b] shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Career Timeline */}
        <div className="awesomic-card p-6 sm:p-8 space-y-4 bg-white">
          <h2 className="text-base font-bold text-[#18181b] tracking-tight flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#18181b]" />
            <span>Career Milestones &amp; Timeline</span>
          </h2>
          <div className="space-y-4 border-l-2 border-[#e4e4e7] ml-2 pl-4">
            {member.careerTimeline.map((item, idx) => (
              <div key={idx} className="relative space-y-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#18181b] absolute -left-[21px] top-1.5" />
                <span className="text-[11px] font-bold text-[#18181b]">{item.year}</span>
                <p className="text-xs font-semibold text-[#18181b]">{item.title}</p>
                <p className="text-xs text-[#71717a]">{item.institution}</p>
                <p className="text-xs text-[#71717a]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
