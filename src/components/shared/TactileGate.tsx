"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { ThemeId } from '@/types/invitation';

interface TactileGateProps {
  themeId: ThemeId;
  coupleTitle: string;
  eventDate: string;
  guestName: string;
  isLocked: boolean;
  onOpenInvitation: () => void;
  isMobileFrame?: boolean;
}

export function TactileGate({
  themeId,
  coupleTitle,
  eventDate,
  guestName,
  isLocked,
  onOpenInvitation,
  isMobileFrame = false,
}: TactileGateProps) {
  // Lock/Unlock document body scroll based on gate lock state (only in full viewport mode)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isLocked && !isMobileFrame) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isLocked, isMobileFrame]);

  // Theme-aware envelope paper, V-flap, and 3D wax seal styling
  const themeStyles = {
    editorial: {
      outerBg: 'bg-[#EFE9DD]',
      envelopeBg: 'bg-[#F6F2EA]',
      flapFill: '#FBF9F5',
      flapStroke: '#D8CEBE',
      border: 'border-[#D8CEBE]',
      hairline: 'border-[#E2D9C8]',
      textPrimary: 'text-[#231C18]',
      textMuted: 'text-[#78756F]',
      accentText: 'text-[#8C6D46]',
      guestCardBg: 'bg-[#FBF9F5]/95 border-[#E2D9C8]',
      waxOuter: 'from-[#8C3B32] via-[#6E2922] to-[#4A1914]',
      waxInner: 'border-[#D4AF37]/50 bg-[#752C24]',
      waxText: 'text-[#F6F2EA]',
      waxRim: 'ring-[#5A201A]/40',
    },
    'dark-luxe': {
      outerBg: 'bg-[#090808]',
      envelopeBg: 'bg-[#121110]',
      flapFill: '#1A1816',
      flapStroke: '#D4AF37',
      border: 'border-[#D4AF37]/40',
      hairline: 'border-[#C87D55]/30',
      textPrimary: 'text-[#F2ECE4]',
      textMuted: 'text-[#A69F95]',
      accentText: 'text-[#D4AF37]',
      guestCardBg: 'bg-[#181614]/95 border-[#D4AF37]/35',
      waxOuter: 'from-[#D4AF37] via-[#B38728] to-[#7A5813]',
      waxInner: 'border-[#FFF3D1]/60 bg-[#9E741E]',
      waxText: 'text-[#121110]',
      waxRim: 'ring-[#D4AF37]/30',
    },
    heritage: {
      outerBg: 'bg-[#EAE2D9]',
      envelopeBg: 'bg-[#F4EFEA]',
      flapFill: '#FAF7F4',
      flapStroke: '#B08D57',
      border: 'border-[#B08D57]/50',
      hairline: 'border-[#8E5B52]/25',
      textPrimary: 'text-[#2B211E]',
      textMuted: 'text-[#765D53]',
      accentText: 'text-[#8E5B52]',
      guestCardBg: 'bg-[#FAF7F4]/95 border-[#B08D57]/40',
      waxOuter: 'from-[#9E645A] via-[#8E5B52] to-[#633B34]',
      waxInner: 'border-[#F4EFEA]/50 bg-[#7D4D45]',
      waxText: 'text-[#F4EFEA]',
      waxRim: 'ring-[#8E5B52]/30',
    },
  }[themeId];

  // In mobile frame mode on desktop, position as absolute within the phone frame; otherwise fixed full screen
  const containerPosition = isMobileFrame
    ? 'absolute inset-0 z-40'
    : 'fixed inset-0 z-40';

  const [groomName, brideName] = coupleTitle.split('&').map((s) => s.trim());

  return (
    <AnimatePresence>
      {isLocked && (
        <motion.div
          key="tactile-gate"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            y: -40,
            filter: 'blur(4px)',
          }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className={`${containerPosition} flex items-center justify-center p-3 sm:p-6 select-none overflow-hidden ${themeStyles.outerBg}`}
        >
          {/* Subtle fine paper grain */}
          <div className="absolute inset-0 bg-noise pointer-events-none opacity-45" />

          {/* Physical Bespoke Envelope Container */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-[460px] rounded-[24px] border ${themeStyles.border} ${themeStyles.envelopeBg} shadow-[0_28px_70px_-15px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col justify-between`}
          >
            {/* Inner Hairline Frame */}
            <div
              className={`absolute inset-2.5 rounded-[18px] border ${themeStyles.hairline} pointer-events-none z-20`}
            />

            {/* TOP SECTION: Invitation Header & Couple Script Names */}
            <div className="relative z-10 pt-7 sm:pt-9 px-5 sm:px-8 text-center">
              <p
                className={`font-sans text-[9px] sm:text-[10px] tracking-[0.28em] uppercase ${themeStyles.textMuted} mb-2`}
              >
                YOU ARE CORDIALLY INVITED TO THE WEDDING OF
              </p>

              {/* Couple Name Combining Script & Serif */}
              <div className="my-2">
                <h1
                  className={`font-script text-4xl sm:text-5xl ${themeStyles.textPrimary} leading-tight`}
                >
                  {groomName || 'Arya'}{' '}
                  <span className={`font-serif italic text-2xl sm:text-3xl ${themeStyles.accentText}`}>
                    &amp;
                  </span>{' '}
                  {brideName || 'Kirana'}
                </h1>
              </div>

              <div className="inline-flex items-center gap-2.5 mt-1">
                <span className={`h-px w-6 bg-current opacity-25 ${themeStyles.textMuted}`} />
                <p
                  className={`font-serif italic text-sm sm:text-base tracking-[0.18em] ${themeStyles.accentText}`}
                >
                  {eventDate}
                </p>
                <span className={`h-px w-6 bg-current opacity-25 ${themeStyles.textMuted}`} />
              </div>
            </div>

            {/* MIDDLE SECTION: Realistic V-Flap SVG & 3D Embossed Wax Seal Button */}
            <div className="relative my-2 sm:my-4 flex flex-col items-center justify-center">
              {/* Envelope V-Flap SVG with soft drop-shadow */}
              <div className="w-full relative pointer-events-none">
                <svg
                  viewBox="0 0 460 150"
                  className="w-full h-auto block drop-shadow-[0_10px_14px_rgba(0,0,0,0.12)]"
                  preserveAspectRatio="none"
                >
                  {/* Side envelope fold lines */}
                  <path
                    d="M 0 150 L 185 65 M 460 150 L 275 65"
                    stroke={themeStyles.flapStroke}
                    strokeWidth="0.8"
                    strokeOpacity="0.45"
                    fill="none"
                  />
                  {/* Upper V-Flap triangle */}
                  <path
                    d="M 0 0 L 460 0 L 248 112 C 236 118, 224 118, 212 112 Z"
                    fill={themeStyles.flapFill}
                    stroke={themeStyles.flapStroke}
                    strokeWidth="1.2"
                    strokeOpacity="0.65"
                  />
                  {/* Inner foil trim line inside V-Flap */}
                  <path
                    d="M 18 4 L 442 4 L 244 103 C 235 108, 225 108, 216 103 Z"
                    fill="none"
                    stroke={themeStyles.flapStroke}
                    strokeWidth="0.7"
                    strokeDasharray="3 2"
                    strokeOpacity="0.5"
                  />
                </svg>
              </div>

              {/* 3D Wax Seal Button Positioned at V-Flap Vertex */}
              <div className="relative z-30 -mt-12 sm:-mt-14 flex flex-col items-center">
                <motion.button
                  type="button"
                  onClick={onOpenInvitation}
                  whileHover={{ scale: 1.07, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label="Buka Undangan Pernikahan"
                  className={`group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${themeStyles.waxOuter} p-1.5 shadow-[0_12px_25px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] ring-4 ${themeStyles.waxRim} flex items-center justify-center cursor-pointer focus:outline-none`}
                >
                  <div
                    className={`w-full h-full rounded-full border-2 ${themeStyles.waxInner} shadow-[inset_0_3px_8px_rgba(0,0,0,0.45)] flex flex-col items-center justify-center relative overflow-hidden`}
                  >
                    <Sparkles className={`w-3 h-3 opacity-50 mb-0.5 ${themeStyles.waxText}`} />
                    <span
                      className={`font-serif text-base sm:text-lg font-semibold tracking-widest ${themeStyles.waxText} drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]`}
                    >
                      A &amp; K
                    </span>
                    <span
                      className={`font-serif italic text-[9px] tracking-[0.15em] opacity-80 ${themeStyles.waxText}`}
                    >
                      12.12.26
                    </span>
                  </div>
                </motion.button>

                {/* Pulsing Tap Indicator */}
                <motion.button
                  type="button"
                  onClick={onOpenInvitation}
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mt-2.5 inline-flex flex-col items-center gap-0.5 cursor-pointer group"
                >
                  <span
                    className={`font-sans text-[10px] tracking-[0.22em] uppercase font-medium ${themeStyles.accentText} group-hover:underline`}
                  >
                    Buka Undangan
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 ${themeStyles.accentText}`} />
                </motion.button>
              </div>
            </div>

            {/* BOTTOM SECTION: Personalized Guest Name Label Card */}
            <div className="relative z-20 px-5 sm:px-8 pb-6 sm:pb-8 pt-1 text-center">
              <div
                className={`w-full py-3.5 px-4 rounded-2xl border ${themeStyles.guestCardBg} shadow-sm`}
              >
                <p
                  className={`font-sans text-[10px] tracking-[0.18em] uppercase ${themeStyles.textMuted} mb-1`}
                >
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <h2
                  className={`font-serif text-xl sm:text-2xl font-medium tracking-wide ${themeStyles.textPrimary} break-words`}
                >
                  {guestName}
                </h2>
              </div>

              <p className={`font-serif italic text-xs tracking-wide mt-3 opacity-80 ${themeStyles.textMuted}`}>
                Ketuk segel lilin untuk membuka sampul &amp; memutar alunan musik
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
