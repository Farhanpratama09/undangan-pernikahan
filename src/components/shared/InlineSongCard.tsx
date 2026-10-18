"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music2 } from 'lucide-react';
import { ThemeId } from '@/types/invitation';

interface InlineSongCardProps {
  themeId: ThemeId;
  title: string;
  artist: string;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

export function InlineSongCard({
  themeId,
  title,
  artist,
  isPlaying = false,
  onTogglePlay,
}: InlineSongCardProps) {
  const themeStyles = {
    editorial: {
      cardBg: 'bg-[#231C18] text-[#F6F2EA]',
      border: 'border-[#6F4E26]/50',
      muted: 'text-[#C2B9AC]',
      accent: 'text-[#D4AF37]',
      barBg: 'bg-[#D4AF37]',
      btnBg: 'bg-[#F6F2EA] text-[#231C18] hover:bg-[#E2D9C8]',
    },
    'dark-luxe': {
      cardBg: 'bg-[#161412] text-[#F2ECE4]',
      border: 'border-[#D4AF37]/45',
      muted: 'text-[#A69F95]',
      accent: 'text-[#C87D55]',
      barBg: 'bg-[#D4AF37]',
      btnBg: 'bg-[#D4AF37] text-[#0D0C0B] hover:bg-[#E5C158]',
    },
    heritage: {
      cardBg: 'bg-[#2B211E] text-[#F4EFEA]',
      border: 'border-[#B08D57]/50',
      muted: 'text-[#C9B9B2]',
      accent: 'text-[#B08D57]',
      barBg: 'bg-[#B08D57]',
      btnBg: 'bg-[#8E5B52] text-[#F4EFEA] hover:bg-[#A06960]',
    },
  }[themeId];

  return (
    <div
      className={`w-full max-w-xl mx-auto my-6 p-4 sm:p-5 rounded-2xl border ${themeStyles.border} ${themeStyles.cardBg} shadow-lg flex items-center justify-between gap-4`}
    >
      {/* Left: Spinning Vinyl Record Disc */}
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-neutral-950 via-neutral-800 to-neutral-900 border-2 border-[#D4AF37]/40 shadow-inner flex items-center justify-center shrink-0">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={
              isPlaying
                ? { duration: 6, repeat: Infinity, ease: 'linear' }
                : { duration: 0.4 }
            }
            className="w-full h-full rounded-full flex items-center justify-center relative"
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-2 rounded-full border border-white/10" />
            <div className="absolute inset-3.5 rounded-full border border-white/10" />
            {/* Center vinyl label */}
            <div className="w-5 h-5 rounded-full bg-[#C87D55] border border-[#D4AF37] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
          </motion.div>
        </div>

        {/* Song Info & Equalizer Bars */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Music2 className={`w-3 h-3 shrink-0 ${themeStyles.accent}`} />
            <span className={`font-sans text-[10px] tracking-[0.22em] uppercase ${themeStyles.accent}`}>
              Our Song • Soundtrack
            </span>
          </div>
          <p className="font-serif text-base sm:text-lg font-medium truncate">
            {title}
          </p>
          <p className={`font-serif italic text-xs sm:text-sm ${themeStyles.muted} truncate`}>
            {artist}
          </p>
        </div>
      </div>

      {/* Right: Animated Soundwave Equalizer & Play/Pause Button */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-end gap-0.5 h-5 px-1" aria-hidden="true">
          {[0.5, 0.9, 0.6, 1.0, 0.7].map((heightRatio, idx) => (
            <motion.span
              key={idx}
              animate={
                isPlaying
                  ? {
                      scaleY: [0.3, heightRatio, 0.4, 0.95, 0.35],
                    }
                  : { scaleY: 0.25 }
              }
              transition={
                isPlaying
                  ? {
                      duration: 0.9 + idx * 0.12,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : { duration: 0.2 }
              }
              className={`w-1 h-4 origin-bottom rounded-full ${themeStyles.barBg}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Jeda Lagu Pernikahan' : 'Putar Lagu Pernikahan'}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition shadow-md cursor-pointer ${themeStyles.btnBg}`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}
