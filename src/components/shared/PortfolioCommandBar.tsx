"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Monitor,
  Lock,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  User,
  ChevronDown,
  ChevronUp,
  Eye,
} from 'lucide-react';
import { ThemeId } from '@/types/invitation';
import { sanitizeGuestInputRaw } from '@/lib/validation';

interface PortfolioCommandBarProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  guestName: string;
  onGuestNameChange: (rawName: string) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: (isMobile: boolean) => void;
  onRelockGate: () => void;
  isPlayingAudio: boolean;
  isMutedAudio: boolean;
  onTogglePlayAudio: () => void;
  onToggleMuteAudio: () => void;
  onResetRsvpLimit?: () => void;
  onActivateLiveMode?: () => void;
}

export function PortfolioCommandBar({
  currentTheme,
  onThemeChange,
  guestName,
  onGuestNameChange,
  isMobileFrame,
  onToggleMobileFrame,
  onRelockGate,
  isPlayingAudio,
  isMutedAudio,
  onTogglePlayAudio,
  onToggleMuteAudio,
  onResetRsvpLimit,
  onActivateLiveMode,
}: PortfolioCommandBarProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [resetRsvpNotice, setResetRsvpNotice] = useState<boolean>(false);

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedRaw = sanitizeGuestInputRaw(e.target.value);
    onGuestNameChange(sanitizedRaw);
  };

  const handleResetRsvp = () => {
    if (onResetRsvpLimit) {
      onResetRsvpLimit();
      setResetRsvpNotice(true);
      setTimeout(() => setResetRsvpNotice(false), 2000);
    }
  };

  const handleLiveMode = () => {
    if (onActivateLiveMode) {
      onActivateLiveMode();
      return;
    }
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', 'live');
      window.location.href = url.toString();
    }
  };

  const themes: Array<{ id: ThemeId; label: string }> = [
    { id: 'editorial', label: 'Editorial' },
    { id: 'dark-luxe', label: 'Dark Luxe' },
    { id: 'heritage', label: 'Heritage' },
  ];

  return (
    <aside
      aria-label="Portfolio Command Bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[94vw] md:w-auto max-w-[95vw] bg-neutral-950/90 backdrop-blur-xl border border-white/15 rounded-full px-4 py-2.5 shadow-2xl text-white font-sans select-none"
    >
      {/* =========================================================
          MOBILE VIEW (< 768px): COMPACT 1-ROW CAPSULE + DRAWER
         ========================================================= */}
      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {isMobileDrawerOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden border-b border-white/10 mb-2.5 pb-3 pt-1"
            >
              <div className="space-y-2.5">
                {/* Clean Guest Name Input inside Mobile Drawer */}
                <div className="relative w-full h-9 rounded-full bg-white/10 border border-white/15 overflow-hidden flex items-center px-3">
                  <User className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 pointer-events-none" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={handleNameInput}
                    placeholder="Ketik nama tamu undangan..."
                    maxLength={35}
                    aria-label="Simulasi Nama Tamu"
                    className="w-full h-full pl-2.5 pr-2 text-xs font-sans font-medium tracking-wide bg-transparent text-white placeholder-white/40 focus:outline-none"
                  />
                </div>

                {/* Action Row: Kunci Amplop + Reset RSVP + Live Mode */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={onRelockGate}
                    className="h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-[11px] font-sans font-medium tracking-wide flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Lock className="w-3 h-3 text-[#D4AF37]" />
                    <span>Kunci Amplop</span>
                  </button>

                  {onResetRsvpLimit && (
                    <button
                      type="button"
                      onClick={handleResetRsvp}
                      className="h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-[11px] font-sans font-medium tracking-wide flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
                      <span>{resetRsvpNotice ? 'Tereset!' : 'Reset RSVP'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleLiveMode}
                    className="h-8 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[11px] font-sans font-medium tracking-wide text-[#E5C667] flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Live</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Default Compact Mobile Capsule Row: Theme Switcher + Audio + Opsi ^ */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 h-9 min-w-0">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onThemeChange(t.id)}
                className={`flex-1 h-full px-2 rounded-full text-[11px] font-sans font-medium tracking-wide transition-all flex items-center justify-center cursor-pointer truncate ${
                  currentTheme === t.id
                    ? 'bg-[#D4AF37] text-neutral-950 font-semibold shadow-sm'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onTogglePlayAudio}
            aria-label={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white shrink-0 transition cursor-pointer"
          >
            {isPlayingAudio ? (
              <Pause className="w-3.5 h-3.5 text-[#D4AF37]" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen((prev) => !prev)}
            className="h-9 px-3 rounded-full border border-[#D4AF37]/40 bg-white/10 text-[11px] font-sans font-medium tracking-wide text-white hover:bg-white/15 transition inline-flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>Opsi</span>
            {isMobileDrawerOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37]" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-[#D4AF37]" />
            )}
          </button>
        </div>
      </div>

      {/* =========================================================
          DESKTOP VIEW (>= 768px): 1-ROW FLOATING CAPSULE DOCK
         ========================================================= */}
      <div className="hidden md:flex items-center justify-between gap-3 w-auto max-w-[95vw] overflow-x-auto no-scrollbar">
        {/* Grup 1: Theme Switcher (Editorial | Dark Luxe | Heritage) */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 h-9 shrink-0">
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onThemeChange(t.id)}
              className={`h-full px-3.5 rounded-full text-xs font-sans font-medium tracking-wide transition-all flex items-center justify-center cursor-pointer whitespace-nowrap ${
                currentTheme === t.id
                  ? 'bg-[#D4AF37] text-neutral-950 font-semibold shadow-sm'
                  : 'text-white/75 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Divider 1 */}
        <div className="h-5 w-px bg-white/15 shrink-0" />

        {/* Grup 2: Input Nama Tamu (w-48 shrink-0) */}
        <div className="w-48 shrink-0 relative h-9 rounded-full bg-white/10 border border-white/15 focus-within:border-[#D4AF37] transition-colors overflow-hidden flex items-center px-3.5">
          <User className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 pointer-events-none" />
          <input
            type="text"
            value={guestName}
            onChange={handleNameInput}
            placeholder="Nama Tamu..."
            maxLength={35}
            aria-label="Simulasi Nama Tamu"
            className="w-full h-full pl-2 pr-1 text-xs font-sans font-medium tracking-wide bg-transparent text-white placeholder-white/40 focus:outline-none"
          />
        </div>

        {/* Divider 2 */}
        <div className="h-5 w-px bg-white/15 shrink-0" />

        {/* Grup 3: Viewport Toggle ([Mobile | Desktop]) */}
        <div className="hidden md:flex shrink-0 items-center gap-0.5 bg-white/5 p-1 rounded-full border border-white/10 h-9">
          <button
            type="button"
            onClick={() => onToggleMobileFrame(true)}
            title="Simulasi Layar HP (430px)"
            aria-label="Mode Mobile (430px)"
            className={`h-full px-3 rounded-full text-xs font-sans font-medium tracking-wide transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              isMobileFrame
                ? 'bg-[#D4AF37] text-neutral-950 font-semibold'
                : 'text-white/75 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span>Mobile</span>
          </button>
          <button
            type="button"
            onClick={() => onToggleMobileFrame(false)}
            title="Tampilan Layar Penuh"
            aria-label="Mode Desktop Penuh"
            className={`h-full px-3 rounded-full text-xs font-sans font-medium tracking-wide transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              !isMobileFrame
                ? 'bg-[#D4AF37] text-neutral-950 font-semibold'
                : 'text-white/75 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 shrink-0" />
            <span>Desktop</span>
          </button>
        </div>

        {/* Grup 4: Tombol Aksi Lengkap (Kunci Amplop, Reset RSVP, Audio Play/Pause, Live Preview) */}
        <div className="shrink-0 flex items-center gap-2">
          {/* Kunci Amplop */}
          <button
            type="button"
            onClick={onRelockGate}
            title="Kunci kembali amplop pembuka"
            className="h-9 px-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-xs font-sans font-medium tracking-wide inline-flex items-center justify-center gap-1.5 transition whitespace-nowrap cursor-pointer shrink-0"
          >
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Kunci Amplop</span>
          </button>

          {/* Reset RSVP */}
          {onResetRsvpLimit && (
            <button
              type="button"
              onClick={handleResetRsvp}
              title="Reset batas 1x kirim RSVP"
              className="h-9 px-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-xs font-sans font-medium tracking-wide inline-flex items-center justify-center gap-1.5 transition whitespace-nowrap cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{resetRsvpNotice ? 'Tereset!' : 'Reset RSVP'}</span>
            </button>
          )}

          {/* Audio Play/Pause & Mute */}
          <div className="flex items-center bg-white/5 rounded-full border border-white/10 h-9 p-0.5 shrink-0">
            <button
              type="button"
              onClick={onTogglePlayAudio}
              title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
              aria-label={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
              className="w-8 h-full rounded-full hover:bg-white/10 flex items-center justify-center transition cursor-pointer"
            >
              {isPlayingAudio ? (
                <Pause className="w-3.5 h-3.5 text-[#D4AF37]" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={onToggleMuteAudio}
              title={isMutedAudio ? 'Nyalakan Suara' : 'Bisukan Suara'}
              aria-label={isMutedAudio ? 'Nyalakan Suara' : 'Bisukan Suara'}
              className="w-8 h-full rounded-full hover:bg-white/10 flex items-center justify-center transition cursor-pointer"
            >
              {isMutedAudio ? (
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Live Preview */}
          <button
            type="button"
            onClick={handleLiveMode}
            title="Sembunyikan Command Bar (Simulasi Tamu Asli)"
            className="h-9 px-3.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#E5C667] text-xs font-sans font-medium tracking-wide inline-flex items-center justify-center gap-1.5 transition whitespace-nowrap cursor-pointer shrink-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
