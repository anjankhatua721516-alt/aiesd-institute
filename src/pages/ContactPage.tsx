import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/db';
import { EnquiryRecord } from '../types';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Check,
  ChevronDown
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { centers, courses, settings, faqs, showToast } = useApp();

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [courseInterest, setCourseInterest] = useState(courses[0]?.title || '');
  const [centerInterest, setCenterInterest] = useState(centers[0]?.name || '');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    if (!name.trim() || !phone.trim()) {
      showToast('Please provide your name and contact phone number.', 'error');
      return;
    }

    setIsSubmitting(true);
    const newEnquiry: EnquiryRecord = {
      id: `enq-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      courseInterest: courseInterest || 'Spoken English & Communication Mastery',
      centerInterest: centerInterest || centers[0]?.name || '',
      message: message.trim(),
      status: 'New'
    };

    try {
      dbService.saveEnquiry(newEnquiry);
      setIsSuccess(true);
      showToast('Enquiry sent! Our counselor will call you shortly.', 'success');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch {
      showToast('Could not send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16 text-[#3f3f46]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="awesomic-badge">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#18181b] tracking-tight">
            Contact Admissions &amp; Centers
          </h1>
          <p className="text-[#71717a] text-base sm:text-lg">
            Visit our physical centers in Midnapur, Jhargram, or Gidhni, or submit an inquiry to speak directly with our team.
          </p>
        </div>

        {/* Form + Direct Contact Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Enquiry Form */}
          <div className="lg:col-span-7 awesomic-card p-6 sm:p-8 space-y-5 bg-white">
            <div>
              <h2 className="text-xl font-bold text-[#18181b] tracking-tight">
                Send an Admissions Enquiry
              </h2>
              <p className="text-xs text-[#71717a] mt-0.5">
                Fill in your details and we will call or WhatsApp you within 24 hours.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-6 bg-[#fafafa] border border-[#e4e4e7] rounded-[22px] text-center space-y-2 text-[#18181b]">
                <h3 className="text-base font-bold">Thank You for Connecting!</h3>
                <p className="text-xs text-[#71717a]">
                  Your enquiry has been received by our desk. Our admissions counselor will contact you at your phone number.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-xs font-semibold underline text-[#18181b]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#18181b]">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anjan Roy"
                      className="awesomic-input text-sm"
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#18181b]">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9832109876"
                      className="awesomic-input text-sm"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#18181b]">Email (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anjan@example.com"
                      className="awesomic-input text-sm"
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#18181b]">Interested Program</label>
                    <select
                      value={courseInterest}
                      onChange={(e) => setCourseInterest(e.target.value)}
                      className="awesomic-input text-sm bg-white"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#18181b]">Preferred Center</label>
                  <select
                    value={centerInterest}
                    onChange={(e) => setCenterInterest(e.target.value)}
                    className="awesomic-input text-sm bg-white"
                  >
                    {centers.map((cnt) => (
                      <option key={cnt.id} value={cnt.name}>
                        {cnt.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#18181b]">Your Message / Query</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us your current English level, preferred batch time, or any questions..."
                    className="awesomic-input text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="awesomic-btn-dark py-3 px-6 text-xs w-full sm:w-auto text-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Enquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Quick Contacts & Direct Helpline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="awesomic-card-dark p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  Direct Helpline
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">Central Admissions Desk</h3>
              </div>

              <div className="space-y-3.5 text-xs text-white/80">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Call Office</p>
                    <p className="text-white/70">{settings.primaryPhone}</p>
                    <p className="text-white/70">{settings.alternatePhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-white/70">{settings.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Working Hours</p>
                    <p className="text-white/70">Mon - Sat: 8:00 AM to 7:00 PM</p>
                    <p className="text-white/70">Sun: 8:30 AM to 1:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-[#f4f4f5] text-[#09090b] font-semibold rounded-full transition-colors text-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#09090b]" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PHYSICAL CENTERS CARDS */}
        <div className="space-y-6">
          <div>
            <span className="awesomic-badge">
              Physical Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#18181b] tracking-tight mt-2">
              Our 3 Centers in Paschim Medinipur &amp; Jhargram
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {centers.map((cnt) => (
              <div
                key={cnt.id}
                className="awesomic-card overflow-hidden flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="h-44 bg-[#f4f4f5] relative border-b border-[#e4e4e7]">
                    <iframe
                      title={`Map for ${cnt.name}`}
                      src={cnt.mapEmbedUrl}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#18181b] bg-[#f4f4f5] px-2.5 py-0.5 rounded-full border border-[#e4e4e7]">
                        {cnt.code} Branch
                      </span>
                      {cnt.isHeadOffice && (
                        <span className="text-[10px] font-semibold text-white bg-[#09090b] px-2.5 py-0.5 rounded-full">
                          Head Office
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-[#18181b]">{cnt.name}</h3>

                    <div className="space-y-1.5 text-xs text-[#71717a]">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#18181b] shrink-0 mt-0.5" />
                        <span>{cnt.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#18181b] shrink-0" />
                        <span>{cnt.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#e4e4e7] flex items-center justify-between gap-2 mt-2">
                  <a
                    href={`tel:${cnt.phone.replace(/[^0-9]/g, '')}`}
                    className="awesomic-btn-light flex-1 justify-center text-xs py-2"
                  >
                    Call Center
                  </a>
                  <a
                    href={`https://wa.me/${cnt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello AIESD, I am inquiring about courses at the ${cnt.name} center.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="awesomic-btn-dark flex-1 justify-center text-xs py-2"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6 pt-4">
          <div className="max-w-2xl space-y-1.5">
            <span className="awesomic-badge">
              Questions &amp; Answers
            </span>
            <h2 className="text-2xl font-bold text-[#18181b] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="awesomic-card divide-y divide-[#e4e4e7] overflow-hidden bg-white">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="p-5 sm:p-6">
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left font-semibold text-[#18181b] text-sm flex items-center justify-between gap-4"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#71717a] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-[#71717a] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
