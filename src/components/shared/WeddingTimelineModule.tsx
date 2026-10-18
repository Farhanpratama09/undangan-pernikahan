"use client";

import React from 'react';
import {
  Heart,
  Calendar,
  Download,
  Sparkles,
  Camera,
  Utensils,
  Music,
  Gem,
} from 'lucide-react';
import { ThemeId, RundownItem, EventDetail } from '@/types/invitation';
import { useCalendarGenerator } from '@/hooks/useCalendarGenerator';

interface WeddingTimelineModuleProps {
  themeId: ThemeId;
  variant?: 'wavy' | 'icon-pillar';
  coupleNickname: string;
  venueName: string;
  fullAddress: string;
  akadEvent: EventDetail;
  rundown: RundownItem[];
  viewMode?: 'mobile' | 'desktop';
}

export function WeddingTimelineModule({
  themeId,
  variant = 'wavy',
  coupleNickname,
  venueName,
  fullAddress,
  akadEvent,
  rundown,
  viewMode = 'desktop',
}: WeddingTimelineModuleProps) {
  const isMobile = viewMode === 'mobile';

  const calendar = useCalendarGenerator({
    title: `The Wedding of ${coupleNickname}`,
    description: `${akadEvent.description} bertempat di ${venueName}`,
    location: fullAddress,
    startDateISO: akadEvent.dateISO,
    endDateISO: akadEvent.endTimeISO,
  });

  // 7-day strip around December 12, 2026
  const calendarDays = [
    { dayName: 'Rab', dateNum: '09', isWeddingDay: false },
    { dayName: 'Kam', dateNum: '10', isWeddingDay: false },
    { dayName: 'Jum', dateNum: '11', isWeddingDay: false },
    { dayName: 'Sab', dateNum: '12', isWeddingDay: true },
    { dayName: 'Min', dateNum: '13', isWeddingDay: false },
    { dayName: 'Sen', dateNum: '14', isWeddingDay: false },
    { dayName: 'Sel', dateNum: '15', isWeddingDay: false },
  ];

  const themeStyles = {
    editorial: {
      cardBg: 'bg-[#FAF7F0]',
      border: 'border-[#E2D9C8]',
      textPrimary: 'text-[#231C18]',
      textMuted: 'text-[#524F4A]',
      accent: 'text-[#6F4E26]',
      strokeColor: '#6F4E26',
      nodeBg: 'bg-[#231C18] text-[#F6F2EA] border-[#6F4E26]',
      heartBadge: 'bg-[#231C18] text-[#F6F2EA] border-[#6F4E26]',
      btnPrimary: 'bg-[#231C18] text-[#F6F2EA] hover:bg-[#382D27] border-[#231C18]',
      btnSecondary: 'bg-white text-[#231C18] hover:bg-[#EFE9DD] border-[#D8CEBE]',
      pillarCircle: 'bg-[#F6F2EA] border-[#6F4E26] text-[#231C18]',
    },
    'dark-luxe': {
      cardBg: 'bg-[#141312]',
      border: 'border-[#D4AF37]/30',
      textPrimary: 'text-[#F2ECE4]',
      textMuted: 'text-[#A69F95]',
      accent: 'text-[#D4AF37]',
      strokeColor: '#D4AF37',
      nodeBg: 'bg-[#D4AF37] text-[#0D0C0B] border-[#F2ECE4]',
      heartBadge: 'bg-[#C87D55] text-[#F2ECE4] border-[#D4AF37]',
      btnPrimary: 'bg-[#D4AF37] text-[#0D0C0B] hover:bg-[#E5C158] border-[#D4AF37]',
      btnSecondary: 'bg-[#1C1A18] text-[#F2ECE4] hover:bg-[#272421] border-[#D4AF37]/40',
      pillarCircle: 'bg-[#1C1A18] border-[#D4AF37] text-[#D4AF37]',
    },
    heritage: {
      cardBg: 'bg-[#FAF6F2]',
      border: 'border-[#B08D57]/40',
      textPrimary: 'text-[#2B211E]',
      textMuted: 'text-[#765D53]',
      accent: 'text-[#8E5B52]',
      strokeColor: '#8E5B52',
      nodeBg: 'bg-[#8E5B52] text-[#F4EFEA] border-[#B08D57]',
      heartBadge: 'bg-[#8E5B52] text-[#F4EFEA] border-[#B08D57]',
      btnPrimary: 'bg-[#8E5B52] text-[#F4EFEA] hover:bg-[#764840] border-[#8E5B52]',
      btnSecondary: 'bg-[#F4EFEA] text-[#2B211E] hover:bg-[#E8DFD5] border-[#B08D57]/50',
      pillarCircle: 'bg-[#8E5B52] border-[#B08D57] text-[#F4EFEA]',
    },
  }[themeId];

  const renderRundownIcon = (iconType: RundownItem['iconType']) => {
    switch (iconType) {
      case 'arrival':
        return <Sparkles className="w-4 h-4" />;
      case 'rings':
        return <Gem className="w-4 h-4" />;
      case 'camera':
        return <Camera className="w-4 h-4" />;
      case 'dinner':
        return <Utensils className="w-4 h-4" />;
      case 'music':
        return <Music className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full my-8">
      <div
        className={`${
          isMobile ? 'p-5' : 'p-6 sm:p-10'
        } rounded-2xl border ${themeStyles.border} ${themeStyles.cardBg} shadow-sm`}
      >
        {/* PART 1: MONTHLY CALENDAR STRIP WITH HEART PIN ON DATE 12 */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <p
            className={`font-sans text-[10px] sm:text-xs tracking-[0.28em] uppercase ${themeStyles.accent} mb-1`}
          >
            Save The Date
          </p>
          <h3
            className={`font-serif text-2xl sm:text-3xl tracking-[0.12em] uppercase font-normal ${themeStyles.textPrimary} mb-6`}
          >
            Desember 2026
          </h3>

          {/* 7-Day Date Strip */}
          <div className={`grid grid-cols-7 gap-1 sm:gap-3 items-center py-4 px-2 border-y ${themeStyles.border}`}>
            {calendarDays.map((d) => (
              <div key={d.dateNum} className="flex flex-col items-center justify-center">
                <span
                  className={`font-sans text-[10px] sm:text-xs tracking-wider uppercase mb-2 ${
                    d.isWeddingDay ? `${themeStyles.accent} font-semibold` : themeStyles.textMuted
                  }`}
                >
                  {d.dayName}
                </span>

                {d.isWeddingDay ? (
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${themeStyles.heartBadge} shadow-md flex flex-col items-center justify-center relative`}
                    >
                      <Heart className="w-3 h-3 fill-current mb-0.5" />
                      <span className="font-serif text-sm sm:text-base font-semibold leading-none">
                        {d.dateNum}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center">
                    <span className={`font-serif text-base sm:text-xl ${themeStyles.textPrimary} opacity-75`}>
                      {d.dateNum}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Calendar Action Buttons */}
          <div
            className={`flex flex-col ${
              isMobile ? '' : 'sm:flex-row'
            } items-center justify-center gap-2.5 mt-6`}
          >
            <a
              href={calendar.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border text-xs font-sans font-medium tracking-wider uppercase transition ${themeStyles.btnPrimary}`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Simpan ke Google Calendar</span>
            </a>
            <button
              type="button"
              onClick={calendar.downloadIcsFile}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border text-xs font-sans font-medium tracking-wider uppercase transition cursor-pointer ${themeStyles.btnSecondary}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh .ICS (Apple/Outlook)</span>
            </button>
          </div>
        </div>

        {/* PART 2: RUNDOWN TIMELINE (VARIANT A: WAVY S-CURVE OR VARIANT B: ICON PILLAR) */}
        <div className="pt-4">
          <div className="text-center mb-8">
            <span className={`font-script text-3xl sm:text-4xl ${themeStyles.accent} block mb-1`}>
              Wedding Timeline
            </span>
            <p className={`font-sans text-[10px] tracking-[0.25em] uppercase ${themeStyles.textMuted}`}>
              Susunan Rangkaian Acara
            </p>
          </div>

          {variant === 'wavy' ? (
            /* MODE A: WAVY S-CURVE TIMELINE (For Editorial & DarkLuxe) */
            <div className="relative max-w-2xl mx-auto py-4">
              {/* Organic Smooth Bezier S-Curve SVG Flowing Down the Center */}
              <svg
                viewBox="0 0 200 620"
                fill="none"
                preserveAspectRatio="none"
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-24 sm:w-36 h-full pointer-events-none opacity-65"
                aria-hidden="true"
              >
                <path
                  d="M 100 0 C 165 65, 165 115, 100 155 C 35 195, 35 245, 100 305 C 165 365, 165 415, 100 465 C 35 515, 65 575, 100 620"
                  stroke={themeStyles.strokeColor}
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                />
                <path
                  d="M 100 0 C 165 65, 165 115, 100 155 C 35 195, 35 245, 100 305 C 165 365, 165 415, 100 465 C 35 515, 65 575, 100 620"
                  stroke={themeStyles.strokeColor}
                  strokeWidth="0.9"
                  strokeOpacity="0.4"
                />
              </svg>

              <div className="relative z-10 space-y-10 sm:space-y-12">
                {rundown.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <div
                      key={item.time}
                      className="grid grid-cols-12 items-center gap-2 sm:gap-4"
                    >
                      {/* Left Side Content (Shown when isLeft is true) */}
                      <div
                        className={`col-span-5 ${
                          isLeft ? 'text-right pr-2 sm:pr-4' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        {isLeft && (
                          <div>
                            <span
                              className={`font-serif italic text-xl sm:text-2xl font-medium ${themeStyles.accent} block`}
                            >
                              {item.time} WIB
                            </span>
                            <h4
                              className={`font-serif text-base sm:text-xl font-semibold ${themeStyles.textPrimary} mt-0.5`}
                            >
                              {item.title}
                            </h4>
                            <p
                              className={`font-sans text-[11px] sm:text-xs ${themeStyles.textMuted} leading-relaxed mt-1`}
                            >
                              {item.description}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Center Curve Node */}
                      <div className="col-span-2 flex flex-col items-center justify-center">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 ${themeStyles.nodeBg} shadow-md flex items-center justify-center`}
                        >
                          {renderRundownIcon(item.iconType)}
                        </div>
                      </div>

                      {/* Right Side Content (Shown when isLeft is false) */}
                      <div
                        className={`col-span-5 ${
                          !isLeft ? 'text-left pl-2 sm:pl-4' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        {!isLeft && (
                          <div>
                            <span
                              className={`font-serif italic text-xl sm:text-2xl font-medium ${themeStyles.accent} block`}
                            >
                              {item.time} WIB
                            </span>
                            <h4
                              className={`font-serif text-base sm:text-xl font-semibold ${themeStyles.textPrimary} mt-0.5`}
                            >
                              {item.title}
                            </h4>
                            <p
                              className={`font-sans text-[11px] sm:text-xs ${themeStyles.textMuted} leading-relaxed mt-1`}
                            >
                              {item.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* MODE B: ICON-PILLAR TIMELINE (For ModernHeritage) */
            <div className="relative max-w-xl mx-auto py-2">
              {/* Straight Vertical Pillar Line */}
              <div
                className="absolute top-3 bottom-3 left-6 sm:left-8 w-[1.5px] opacity-40"
                style={{ backgroundColor: themeStyles.strokeColor }}
              />

              <div className="space-y-7">
                {rundown.map((item) => (
                  <div key={item.time} className="relative flex items-start gap-4 sm:gap-6">
                    {/* Left Circular Icon Badge */}
                    <div
                      className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 ${themeStyles.pillarCircle} shadow-sm flex flex-col items-center justify-center shrink-0`}
                    >
                      {renderRundownIcon(item.iconType)}
                      <span className="font-serif italic text-[11px] mt-0.5 opacity-95">
                        {item.time}
                      </span>
                    </div>

                    {/* Right Activity Details Card */}
                    <div
                      className={`flex-1 p-4 rounded-xl border ${themeStyles.border} bg-white/60`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                        <h4
                          className={`font-serif text-lg sm:text-xl font-medium ${themeStyles.textPrimary}`}
                        >
                          {item.title}
                        </h4>
                        <span
                          className={`font-serif italic text-base sm:text-lg ${themeStyles.accent}`}
                        >
                          {item.time} WIB
                        </span>
                      </div>
                      <p className={`font-sans text-xs ${themeStyles.textMuted} leading-relaxed`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
