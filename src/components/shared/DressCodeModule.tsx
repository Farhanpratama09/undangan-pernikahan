"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import { ThemeId, DressCodeInfo } from '@/types/invitation';

interface DressCodeModuleProps {
  themeId: ThemeId;
  dressCode: DressCodeInfo;
  viewMode?: 'mobile' | 'desktop';
}

// Fine 1px minimalist line-art icon for Gentlemen's Suit / Bowtie
function GentlemenSuitIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M 22 12 L 32 22 L 42 12" />
      <path d="M 18 14 L 10 22 L 14 54 L 50 54 L 54 22 L 46 14" />
      <path d="M 22 12 L 16 28 L 32 42 L 48 28 L 42 12" />
      <path d="M 26 19 L 38 25 L 38 19 L 26 25 Z" />
      <circle cx="32" cy="22" r="1.5" fill="currentColor" />
      <circle cx="32" cy="46" r="1" fill="currentColor" />
      <circle cx="32" cy="50" r="1" fill="currentColor" />
      <path d="M 40 33 L 46 33 L 44 30 Z" />
    </svg>
  );
}

// Fine 1px minimalist line-art icon for Ladies' Evening Gown
function LadiesGownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M 24 10 L 25 18" />
      <path d="M 40 10 L 39 18" />
      <path d="M 22 18 C 26 15, 30 18, 32 20 C 34 18, 38 15, 42 18 L 39 30 L 25 30 Z" />
      <line x1="25" y1="30" x2="39" y2="30" />
      <path d="M 25 30 C 19 38, 15 46, 12 54 C 24 56, 40 56, 52 54 C 49 46, 45 38, 39 30" />
      <path d="M 29 30 C 27 40, 25 48, 24 55" strokeOpacity="0.6" />
      <path d="M 35 30 C 37 40, 39 48, 40 55" strokeOpacity="0.6" />
    </svg>
  );
}

export function DressCodeModule({
  themeId,
  dressCode,
  viewMode = 'desktop',
}: DressCodeModuleProps) {
  const isMobile = viewMode === 'mobile';
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const activeSwatch = dressCode.colors[selectedColorIndex] || dressCode.colors[0];

  const themeStyles = {
    editorial: {
      cardBg: 'bg-[#FAF7F0]',
      subBoxBg: 'bg-white/80 border-[#E2D9C8]',
      border: 'border-[#E2D9C8]',
      textPrimary: 'text-[#231C18]',
      textMuted: 'text-[#524F4A]',
      accent: 'text-[#6F4E26]',
    },
    'dark-luxe': {
      cardBg: 'bg-[#141312]',
      subBoxBg: 'bg-[#1B1917] border-[#D4AF37]/25',
      border: 'border-[#D4AF37]/35',
      textPrimary: 'text-[#F2ECE4]',
      textMuted: 'text-[#A69F95]',
      accent: 'text-[#D4AF37]',
    },
    heritage: {
      cardBg: 'bg-[#FAF6F2]',
      subBoxBg: 'bg-white/75 border-[#B08D57]/35',
      border: 'border-[#B08D57]/45',
      textPrimary: 'text-[#2B211E]',
      textMuted: 'text-[#765D53]',
      accent: 'text-[#8E5B52]',
    },
  }[themeId];

  return (
    <section className="w-full my-8">
      <div
        className={`${
          isMobile ? 'p-5' : 'p-6 sm:p-10'
        } rounded-2xl border ${themeStyles.border} ${themeStyles.cardBg} text-center`}
      >
        {/* Header */}
        <div className="max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5">
            <Sparkles className={`w-3.5 h-3.5 ${themeStyles.accent}`} />
            <span className={`font-sans text-[10px] tracking-[0.28em] uppercase ${themeStyles.accent}`}>
              Attire &amp; Palette Guide
            </span>
          </div>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl'
            } tracking-[0.12em] uppercase font-normal ${themeStyles.textPrimary}`}
          >
            {dressCode.title}
          </h2>
          <p className={`font-sans text-xs sm:text-sm leading-relaxed ${themeStyles.textMuted}`}>
            {dressCode.description}
          </p>
        </div>

        {/* Gentlemen & Ladies Minimalist Line-Art Cards */}
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 sm:grid-cols-2 gap-6'
          } max-w-2xl mx-auto mb-8`}
        >
          {/* Gentlemen */}
          <div className={`p-5 rounded-xl border ${themeStyles.subBoxBg} flex flex-col items-center`}>
            <GentlemenSuitIcon className={`w-14 h-14 mb-3 ${themeStyles.accent}`} />
            <span
              className={`font-serif text-base tracking-[0.15em] uppercase font-medium ${themeStyles.textPrimary} mb-1.5`}
            >
              Gentlemen / Pria
            </span>
            <p className={`font-sans text-xs leading-relaxed ${themeStyles.textMuted}`}>
              {dressCode.gentlemenNote}
            </p>
          </div>

          {/* Ladies */}
          <div className={`p-5 rounded-xl border ${themeStyles.subBoxBg} flex flex-col items-center`}>
            <LadiesGownIcon className={`w-14 h-14 mb-3 ${themeStyles.accent}`} />
            <span
              className={`font-serif text-base tracking-[0.15em] uppercase font-medium ${themeStyles.textPrimary} mb-1.5`}
            >
              Ladies / Wanita
            </span>
            <p className={`font-sans text-xs leading-relaxed ${themeStyles.textMuted}`}>
              {dressCode.ladiesNote}
            </p>
          </div>
        </div>

        {/* Interactive 5 Color Swatches */}
        <div className="max-w-md mx-auto space-y-4">
          <p className={`font-serif italic text-sm ${themeStyles.textMuted}`}>
            Sentuh lingkaran warna untuk melihat inspirasi nuansa busana
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 py-2">
            {dressCode.colors.map((swatch, idx) => {
              const isSelected = idx === selectedColorIndex;
              return (
                <motion.button
                  key={swatch.hex}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedColorIndex(idx)}
                  aria-label={`Pilih warna ${swatch.name}`}
                  aria-pressed={isSelected}
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full cursor-pointer transition-shadow flex items-center justify-center ${
                    isSelected
                      ? 'ring-2 ring-offset-2 ring-[#D4AF37] scale-110 shadow-lg'
                      : 'opacity-90 hover:opacity-100 shadow-sm'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/15 via-transparent to-white/30 pointer-events-none" />
                  {isSelected && (
                    <Check
                      className={`w-4 h-4 relative z-10 ${
                        swatch.hex.toLowerCase() === '#2c221e' ? 'text-white' : 'text-[#231C18]'
                      }`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Active Swatch Pill Label */}
          {activeSwatch && (
            <motion.div
              key={activeSwatch.hex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border ${themeStyles.subBoxBg}`}
            >
              <span
                className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                style={{ backgroundColor: activeSwatch.hex }}
              />
              <span className={`font-serif italic text-base font-medium ${themeStyles.textPrimary}`}>
                {activeSwatch.name}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
