import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import {
  MessageCircle,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Sparkles,
  Smartphone,
  Globe,
  Bell,
  ArrowRight,
  ShieldCheck,
  Video,
  Send,
  Users
} from 'lucide-react';

interface SocialPlatformCard {
  id: string;
  name: string;
  category: string;
  handle: string;
  description: string;
  directUrl: string;
  appDeepLink?: string;
  brandColor: string;
  bgGradient: string;
  accentBadge: string;
  followersOrMembers: string;
  highlights: string[];
  icon: (props: { className?: string }) => React.ReactNode;
  actionText: string;
}

export const SocialPage: React.FC = () => {
  const { settings } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Construct dynamic links with fallbacks
  const instagramUrl = settings.socialLinks?.instagram || 'https://instagram.com/aiesd_official';
  const facebookUrl = settings.socialLinks?.facebook || 'https://facebook.com/aiesdofficial';
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappChatUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    settings.whatsappDefaultMessage || 'Hello AIESD Team, I want to learn more about spoken English courses.'
  )}`;
  const whatsappChannelUrl =
    settings.socialLinks?.whatsappChannel || `https://wa.me/${cleanPhone}`;
  const youtubeUrl = settings.socialLinks?.youtube || 'https://youtube.com/@aiesd_education';
  const linkedinUrl = settings.socialLinks?.linkedin || 'https://linkedin.com/school/aiesd-india';
  const telegramUrl = settings.socialLinks?.telegram || 'https://t.me/aiesd_english';

  const platforms: SocialPlatformCard[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Direct & Community',
      category: 'Instant Messaging & Admissions',
      handle: settings.whatsappNumber,
      description:
        'Chat directly with senior academic counselors, enquire about upcoming batch seats, or join our community broadcasts for class updates.',
      directUrl: whatsappChatUrl,
      appDeepLink: `whatsapp://send?phone=${cleanPhone}`,
      brandColor: '#25D366',
      bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
      accentBadge: 'Fastest Response (< 5 mins)',
      followersOrMembers: 'Direct Counselor Line',
      highlights: ['Instant syllabus PDF delivery', 'Free speaking assessment booking', 'Fee & batch schedule assistance'],
      icon: ({ className }) => <MessageCircle className={className} />,
      actionText: 'Open in WhatsApp'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      category: 'Daily Speaking Tips & Reels',
      handle: '@aiesd_spokenenglish',
      description:
        'Watch daily 60-second English idiom reels, common grammatical blunders, classroom speaking highlights, and student transformation stories.',
      directUrl: instagramUrl,
      appDeepLink: 'instagram://user?username=aiesd_spokenenglish',
      brandColor: '#E1306C',
      bgGradient: 'from-pink-500/10 via-purple-500/5 to-transparent',
      accentBadge: 'Daily Reels & Quizzes',
      followersOrMembers: '12.4K+ Learners',
      highlights: ['Pronunciation drills & vocabulary stories', 'Student speech recordings', 'Live doubt clearing sessions'],
      icon: ({ className }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      actionText: 'Open in Instagram'
    },
    {
      id: 'facebook',
      name: 'Facebook Page',
      category: 'Official Community & Events',
      handle: 'facebook.com/aiesdofficial',
      description:
        'Join regional alumni, parents, and working learners. Read in-depth institute announcements, ceremony photos, and verified reviews.',
      directUrl: facebookUrl,
      appDeepLink: 'fb://page/aiesdofficial',
      brandColor: '#1877F2',
      bgGradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
      accentBadge: 'Verified Page',
      followersOrMembers: '18.9K+ Followers',
      highlights: ['Annual debate & elocution videos', 'Detailed batch admission schedules', 'Alumni placement stories'],
      icon: ({ className }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      actionText: 'Open in Facebook'
    },
    {
      id: 'youtube',
      name: 'YouTube Channel',
      category: 'Full Masterclasses & Lectures',
      handle: '@aiesd_education',
      description:
        'Free 20-minute grammar lectures, English pronunciation masterclasses, mock interview recordings, and extempore speech tutorials.',
      directUrl: youtubeUrl,
      appDeepLink: 'vnd.youtube://www.youtube.com/@aiesd_education',
      brandColor: '#FF0000',
      bgGradient: 'from-red-500/10 via-red-500/5 to-transparent',
      accentBadge: 'Video Lessons',
      followersOrMembers: '8.5K+ Subscribers',
      highlights: ['Step-by-step Tenses series', 'Corporate interview preparation', 'English for Bengali medium students'],
      icon: ({ className }) => <Video className={className} />,
      actionText: 'Open in YouTube'
    },
    {
      id: 'telegram',
      name: 'Telegram Study Channel',
      category: 'Notes, PDFs & Daily Quizzes',
      handle: 't.me/aiesd_english_updates',
      description:
        'Download free daily PDF vocabulary flashcards, grammar exercise sheets, newspaper reading lists, and test notifications right on your phone.',
      directUrl: telegramUrl,
      appDeepLink: 'tg://resolve?domain=aiesd_english_updates',
      brandColor: '#229ED9',
      bgGradient: 'from-sky-500/10 via-sky-500/5 to-transparent',
      accentBadge: 'Free Study PDFs',
      followersOrMembers: '4.2K+ Members',
      highlights: ['Daily morning word & usage card', 'Sunday practice test answer keys', 'Direct batch reminder broadcasts'],
      icon: ({ className }) => <Send className={className} />,
      actionText: 'Open in Telegram'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Institute Page',
      category: 'Professional Careers & Alumni',
      handle: 'AIESD Skill Development',
      description:
        'Connect with graduates working in IT, banking, teaching, and MNC sectors. Discover career tips, resume templates, and corporate partnerships.',
      directUrl: linkedinUrl,
      appDeepLink: 'linkedin://company/aiesd-india',
      brandColor: '#0A66C2',
      bgGradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
      accentBadge: 'Professional Network',
      followersOrMembers: '2.1K+ Connections',
      highlights: ['Corporate hiring updates', 'Resume & interview guidelines', 'Alumni career milestones'],
      icon: ({ className }) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      actionText: 'Open in LinkedIn'
    }
  ];

  const handleRedirect = (platform: SocialPlatformCard) => {
    // Attempt deep link protocol for mobile apps, with immediate fallback to Web URL
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && platform.appDeepLink) {
      // Create a hidden link to trigger the native app handler
      window.location.href = platform.appDeepLink;
      setTimeout(() => {
        window.open(platform.directUrl, '_blank', 'noopener,noreferrer');
      }, 500);
    } else {
      window.open(platform.directUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="bg-white min-h-screen text-[#3f3f46]">
      {/* Top Hero Section */}
      <section className="py-12 sm:py-20 bg-[#fafafa] border-b border-[#e4e4e7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-4"
          >
            <Badge variant="outline" className="px-3.5 py-1 text-xs border-border bg-white text-foreground">
              Official Media Channels
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-bold text-[#18181b] tracking-tight">
              Connect on Social &amp; Direct Apps
            </h1>

            <p className="text-base sm:text-lg text-[#71717a] leading-relaxed">
              Stay connected with daily 60-second speaking drills, batch admission alerts, downloadable grammar PDFs, and verified alumni success stories.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-[#71717a]">
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#e4e4e7] font-medium text-[#18181b]">
                <Smartphone className="w-3.5 h-3.5 text-[#18181b]" />
                Direct Mobile App Redirects
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#e4e4e7] font-medium text-[#18181b]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Official Verified Channels
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Social Cards Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {platforms.map((platform, idx) => {
              const isCopied = copiedId === platform.id;
              return (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative rounded-[24px] border border-[#e4e4e7] bg-white p-6 sm:p-7 flex flex-col justify-between hover:border-[#18181b]/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Header Row: Icon + Badge + Action */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="w-14 h-14 rounded-[18px] flex items-center justify-center text-white shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: platform.brandColor }}
                      >
                        {platform.icon({ className: 'w-7 h-7' })}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[11px] font-semibold text-[#18181b] bg-[#f4f4f5] px-2.5 py-0.5 rounded-full border border-[#e4e4e7]">
                          {platform.accentBadge}
                        </span>
                        <span className="text-[10px] text-[#71717a] font-medium">
                          {platform.followersOrMembers}
                        </span>
                      </div>
                    </div>

                    {/* Platform Title & Handle */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#18181b] group-hover:text-black transition-colors">
                          {platform.name}
                        </h2>
                      </div>
                      <p className="text-xs font-mono text-[#71717a] truncate">
                        {platform.handle}
                      </p>
                    </div>

                    {/* Category */}
                    <span className="inline-block text-[11px] font-semibold text-foreground/80 uppercase tracking-wider">
                      {platform.category}
                    </span>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#71717a] leading-relaxed">
                      {platform.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="pt-2 space-y-1.5 border-t border-[#f4f4f5]">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-[#a1a1aa]">
                        What you get:
                      </p>
                      <ul className="space-y-1">
                        {platform.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="text-xs text-[#18181b] flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: platform.brandColor }}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions: Primary Redirect Button + Secondary Copy Link */}
                  <div className="pt-6 mt-6 border-t border-[#e4e4e7] flex items-center gap-2">
                    <button
                      onClick={() => handleRedirect(platform)}
                      className="flex-1 awesomic-btn-dark py-2.5 px-4 text-xs justify-center gap-2 font-semibold shadow-xs"
                      aria-label={`${platform.actionText} - Open ${platform.name}`}
                    >
                      <span>{platform.actionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => copyToClipboard(platform.directUrl, platform.id)}
                      title="Copy Direct Link"
                      className="p-2.5 rounded-full border border-[#e4e4e7] text-[#71717a] hover:text-[#18181b] hover:bg-[#f4f4f5] transition-colors"
                      aria-label="Copy Channel Link"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Help & Community Banner */}
      <section className="py-12 bg-[#fafafa] border-t border-[#e4e4e7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="awesomic-card p-6 sm:p-10 bg-white border border-[#e4e4e7] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="awesomic-badge">
                Direct Academic Support
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#18181b]">
                Need Admission Guidance or Syllabus PDF?
              </h2>
              <p className="text-xs sm:text-sm text-[#71717a] max-w-lg">
                Our counselor team answers every enquiry on WhatsApp within minutes. Get class timings, fees structure, and free trial registration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() =>
                  window.open(whatsappChatUrl, '_blank', 'noopener,noreferrer')
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
              <button
                onClick={() =>
                  window.open(instagramUrl, '_blank', 'noopener,noreferrer')
                }
                className="w-full sm:w-auto awesomic-btn-light py-3 px-5 text-xs justify-center gap-2 font-semibold"
              >
                <span>Follow on Instagram</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialPage;
