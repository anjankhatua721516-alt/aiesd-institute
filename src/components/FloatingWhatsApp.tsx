import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Show pop-up bubble automatically after 4 seconds if not dismissed
    const timer = setTimeout(() => {
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [hasDismissed]);

  if (!settings.showFloatingWhatsApp) {
    return null;
  }

  const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(settings.whatsappDefaultMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Speech popover bubble in Awesomic rounded capsule style */}
      {isOpen && (
        <div className="mb-2.5 w-[calc(100vw-32px)] sm:w-auto max-w-xs sm:max-w-sm bg-white rounded-[22px] sm:rounded-[24px] p-4 sm:p-4.5 shadow-xl border border-[#e4e4e7] text-[#18181b] transition-all animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#18181b] inline-block animate-pulse" />
              <p className="text-[12px] font-semibold text-[#18181b] uppercase tracking-wider">
                AIESD Admissions Desk
              </p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setHasDismissed(true);
              }}
              className="text-[#71717a] hover:text-[#18181b] p-1 rounded-full touch-target flex items-center justify-center -mr-1 -mt-1"
              aria-label="Dismiss message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[13px] text-[#3f3f46] mt-2 leading-relaxed">
            {settings.whatsappGreetingText}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3.5 awesomic-btn-dark w-full justify-center text-[13px] py-2.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}

      {/* Floating launcher trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#09090b] text-white flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-lg border border-white/20"
        aria-label="Open WhatsApp conversation"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};
