"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Users,
  Check,
  HelpCircle,
  XCircle,
  Minus,
  Plus,
} from 'lucide-react';
import { ThemeId, GuestbookEntry } from '@/types/invitation';
import { useGuestbook } from '@/hooks/useGuestbook';
import { formatEntryDate } from '@/lib/validation';

interface GuestbookModuleProps {
  themeId: ThemeId;
  initialEntries: GuestbookEntry[];
  defaultGuestName?: string;
  viewMode?: 'mobile' | 'desktop';
}

export function GuestbookModule({
  themeId,
  initialEntries,
  defaultGuestName = '',
  viewMode = 'desktop',
}: GuestbookModuleProps) {
  const isMobile = viewMode === 'mobile';
  const { entries, isSubmitting, hasSubmitted, submitEntry, resetDemoLimit } =
    useGuestbook(initialEntries);

  const [formData, setFormData] = useState({
    guestName: defaultGuestName,
    attendance: 'hadir' as 'hadir' | 'tidak_hadir' | 'ragu',
    pax: 2,
    message: '',
    honeypot: '',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const prevGuestNameRef = useRef<string>(defaultGuestName);

  // Auto-sync guestName field and auto-reset RSVP lock whenever simulated guestName changes
  useEffect(() => {
    if (prevGuestNameRef.current !== defaultGuestName) {
      prevGuestNameRef.current = defaultGuestName;
      setFormData((prev) => ({
        ...prev,
        guestName: defaultGuestName,
      }));
      resetDemoLimit();
      setFormSuccess(false);
      setFormError(null);
    }
  }, [defaultGuestName, resetDemoLimit]);

  const handleDecrementPax = () => {
    setFormData((prev) => ({
      ...prev,
      pax: Math.max(1, prev.pax - 1),
    }));
  };

  const handleIncrementPax = () => {
    setFormData((prev) => ({
      ...prev,
      pax: Math.min(5, prev.pax + 1),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const result = await submitEntry(formData);
    if (result.success) {
      setFormSuccess(true);
      setFormData((prev) => ({ ...prev, message: '' }));
    } else {
      setFormError(result.error || 'Terjadi kendala saat mengirim ucapan.');
    }
  };

  // High-contrast dark RSVP form card + warm champagne/bronze comment feed
  const themeStyles = {
    editorial: {
      sectionBg: 'bg-[#FAF7F0] border-[#E2D9C8]',
      textPrimary: 'text-[#231C18]',
      textMuted: 'text-[#524F4A]',
      accent: 'text-[#6F4E26]',
      hairline: 'border-[#E2D9C8]',
      formCardBg: 'bg-[#231A16] text-[#F6F2EA] border-[#6F4E26]/50 shadow-xl',
      formLabel: 'text-[#D6C9B8]',
      formInput:
        'bg-[#2E231E] border-[#6F4E26]/45 text-[#F6F2EA] placeholder-[#9E8F7F] focus:border-[#D4AF37]',
      optActive:
        'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F6F2EA] shadow-[inset_0_0_12px_rgba(212,175,55,0.2)] font-medium',
      optInactive:
        'border-[#6F4E26]/35 bg-[#2E231E]/80 text-[#C8B9A6] hover:border-[#D4AF37]/60 hover:text-[#F6F2EA]',
      stepperBox: 'bg-[#2E231E] border-[#6F4E26]/45 text-[#F6F2EA]',
      stepperBtn:
        'bg-[#3D2F28] text-[#F6F2EA] hover:bg-[#D4AF37]/25 hover:border-[#D4AF37] border-[#6F4E26]/40',
      buttonSubmit:
        'bg-gradient-to-r from-[#C8A464] via-[#D4AF37] to-[#B8924A] text-[#231A16] hover:brightness-105 border-[#D4AF37] font-semibold',
      badgeHadir: 'bg-[#6F4E26]/10 text-[#6F4E26] border-[#6F4E26]/25',
      badgeTidak: 'bg-[#231C18]/5 text-[#524F4A] border-[#231C18]/15',
      badgeRagu: 'bg-[#B08D57]/15 text-[#7A5C32] border-[#B08D57]/30',
      itemCard: 'bg-white border-[#E2D9C8]',
      quoteMark: 'text-[#6F4E26]/20',
      successIcon: 'text-[#D4AF37]',
      errorBox: 'border-red-400/50 bg-red-950/50 text-red-200',
    },
    'dark-luxe': {
      sectionBg: 'bg-[#141312] border-[#D4AF37]/35',
      textPrimary: 'text-[#F2ECE4]',
      textMuted: 'text-[#A69F95]',
      accent: 'text-[#D4AF37]',
      hairline: 'border-[#272421]',
      formCardBg: 'bg-[#121110] text-[#F2ECE4] border-[#D4AF37]/50 shadow-2xl',
      formLabel: 'text-[#D4C5B4]',
      formInput:
        'bg-[#1B1917] border-[#D4AF37]/35 text-[#F2ECE4] placeholder-[#78716A] focus:border-[#D4AF37]',
      optActive:
        'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F2ECE4] shadow-[inset_0_0_12px_rgba(212,175,55,0.2)] font-medium',
      optInactive:
        'border-[#D4AF37]/25 bg-[#1B1917] text-[#A69F95] hover:border-[#D4AF37]/60 hover:text-[#F2ECE4]',
      stepperBox: 'bg-[#1B1917] border-[#D4AF37]/35 text-[#F2ECE4]',
      stepperBtn:
        'bg-[#262320] text-[#F2ECE4] hover:bg-[#D4AF37]/25 hover:border-[#D4AF37] border-[#D4AF37]/35',
      buttonSubmit:
        'bg-gradient-to-r from-[#C8A464] via-[#D4AF37] to-[#B8924A] text-[#0D0C0B] hover:brightness-105 border-[#D4AF37] font-semibold',
      badgeHadir: 'bg-[#D4AF37]/15 text-[#E5C667] border-[#D4AF37]/30',
      badgeTidak: 'bg-white/5 text-[#A69F95] border-white/15',
      badgeRagu: 'bg-[#C87D55]/15 text-[#E09B76] border-[#C87D55]/30',
      itemCard: 'bg-[#1A1816] border-[#D4AF37]/20',
      quoteMark: 'text-[#D4AF37]/20',
      successIcon: 'text-[#D4AF37]',
      errorBox: 'border-red-500/50 bg-red-950/40 text-red-300',
    },
    heritage: {
      sectionBg: 'bg-[#FAF6F2] border-[#B08D57]/45',
      textPrimary: 'text-[#2B211E]',
      textMuted: 'text-[#765D53]',
      accent: 'text-[#8E5B52]',
      hairline: 'border-[#DFD5CA]',
      formCardBg: 'bg-[#2B211E] text-[#F4EFEA] border-[#B08D57]/60 shadow-xl',
      formLabel: 'text-[#DECFC8]',
      formInput:
        'bg-[#382B27] border-[#B08D57]/40 text-[#F4EFEA] placeholder-[#9A857C] focus:border-[#B08D57]',
      optActive:
        'border-[#B08D57] bg-[#8E5B52]/75 text-[#F4EFEA] shadow-[inset_0_0_12px_rgba(176,141,87,0.25)] font-medium',
      optInactive:
        'border-[#B08D57]/30 bg-[#382B27] text-[#D8C8C0] hover:border-[#B08D57]/70 hover:text-white',
      stepperBox: 'bg-[#382B27] border-[#B08D57]/40 text-[#F4EFEA]',
      stepperBtn:
        'bg-[#4A3934] text-[#F4EFEA] hover:bg-[#8E5B52] hover:text-white border-[#B08D57]/40',
      buttonSubmit:
        'bg-gradient-to-r from-[#9E675E] via-[#8E5B52] to-[#7A4B43] text-[#F4EFEA] hover:brightness-110 border-[#B08D57] font-semibold',
      badgeHadir: 'bg-[#8E5B52]/10 text-[#764840] border-[#8E5B52]/25',
      badgeTidak: 'bg-[#2B211E]/5 text-[#765D53] border-[#2B211E]/15',
      badgeRagu: 'bg-[#B08D57]/15 text-[#7A5C32] border-[#B08D57]/30',
      itemCard: 'bg-white/90 border-[#DFD5CA]',
      quoteMark: 'text-[#8E5B52]/20',
      successIcon: 'text-[#B08D57]',
      errorBox: 'border-red-400/50 bg-red-950/50 text-red-200',
    },
  }[themeId];

  // Helper for warm champagne/bronze attendance badge (Zero neon green or font-mono)
  const renderAttendanceBadge = (status: 'hadir' | 'tidak_hadir' | 'ragu', pax?: number) => {
    switch (status) {
      case 'hadir':
        return (
          <span
            className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-serif italic border shrink-0 ${themeStyles.badgeHadir}`}
          >
            <Check className="w-3 h-3" /> Hadir {pax ? `(${pax} Orang)` : ''}
          </span>
        );
      case 'tidak_hadir':
        return (
          <span
            className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-serif italic border shrink-0 ${themeStyles.badgeTidak}`}
          >
            <XCircle className="w-3 h-3" /> Berhalangan
          </span>
        );
      case 'ragu':
        return (
          <span
            className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-serif italic border shrink-0 ${themeStyles.badgeRagu}`}
          >
            <HelpCircle className="w-3 h-3" /> Masih Ragu
          </span>
        );
    }
  };

  return (
    <section id="rsvp-section" className="w-full my-8 scroll-mt-16">
      <div
        className={`${
          isMobile ? 'p-5' : 'p-6 sm:p-10'
        } rounded-2xl border ${themeStyles.sectionBg} relative`}
      >
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <MessageSquare className={`w-4 h-4 ${themeStyles.accent}`} />
            <p className={`font-sans text-[11px] tracking-[0.22em] uppercase ${themeStyles.accent}`}>
              RSVP &amp; Buku Tamu
            </p>
          </div>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl'
            } tracking-[0.08em] uppercase font-normal ${themeStyles.textPrimary}`}
          >
            Konfirmasi Kehadiran &amp; Doa Restu
          </h2>
          <p className={`font-sans text-xs sm:text-sm leading-relaxed ${themeStyles.textMuted}`}>
            Kehadiran dan doa restu Anda merupakan kehormatan terbesar bagi kami. Mohon isi formulir
            kehadiran di bawah ini.
          </p>
        </div>

        {/* Form & Feed Layout — Force 1 vertical column with generous p-6 when viewMode === 'mobile' */}
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-1 lg:grid-cols-12 gap-8'
          } items-start`}
        >
          {/* High-Contrast Dark Arch-Topped RSVP Form Card */}
          <div
            className={`${
              isMobile ? 'col-span-1 p-6' : 'lg:col-span-5 p-6 sm:p-8'
            } rounded-t-[32px] rounded-b-2xl border ${themeStyles.formCardBg}`}
          >
            <div className="text-center mb-6 pb-4 border-b border-white/15">
              <span className="font-script text-3xl text-[#D4AF37] block mb-0.5">
                R.S.V.P
              </span>
              <h3 className="font-serif text-lg tracking-[0.15em] uppercase font-normal">
                Formulir Kehadiran
              </h3>
            </div>

            {hasSubmitted || formSuccess ? (
              <div className="p-6 rounded-2xl border border-[#D4AF37]/40 bg-white/5 text-center space-y-2 animate-fade-in">
                <CheckCircle2 className={`w-9 h-9 ${themeStyles.successIcon} mx-auto`} />
                <p className="font-serif text-xl font-medium text-white">
                  Terima Kasih Atas Konfirmasinya
                </p>
                <p className="font-sans text-xs leading-relaxed text-white/80">
                  Untaian doa restu dan konfirmasi kehadiran Anda telah tersimpan rapi di buku tamu kami.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formError && (
                  <div
                    role="alert"
                    className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-sans ${themeStyles.errorBox}`}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="honeypot"
                  aria-hidden="true"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Guest Name */}
                <div>
                  <label
                    htmlFor="rsvp-guest-name"
                    className={`block font-sans text-xs font-medium tracking-wide mb-2 ${themeStyles.formLabel}`}
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="rsvp-guest-name"
                    type="text"
                    required
                    maxLength={40}
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs font-sans transition-colors focus:outline-none ${themeStyles.formInput}`}
                  />
                </div>

                {/* Attendance Options — Elegant Capsule Pills */}
                <div>
                  <span
                    className={`block font-sans text-xs font-medium tracking-wide mb-2.5 ${themeStyles.formLabel}`}
                  >
                    Konfirmasi Kehadiran
                  </span>
                  <div
                    role="group"
                    aria-label="Konfirmasi Kehadiran"
                    className="flex flex-wrap items-center gap-2"
                  >
                    {[
                      { value: 'hadir', label: 'Hadir', icon: Check },
                      { value: 'tidak_hadir', label: 'Berhalangan', icon: XCircle },
                      { value: 'ragu', label: 'Masih Ragu', icon: HelpCircle },
                    ].map((opt) => {
                      const isSelected = formData.attendance === opt.value;
                      const IconComponent = opt.icon;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              attendance: opt.value as 'hadir' | 'tidak_hadir' | 'ragu',
                            })
                          }
                          className={`flex-1 min-w-[105px] inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 px-4 text-xs font-sans tracking-wider border transition-all cursor-pointer whitespace-nowrap ${
                            isSelected ? themeStyles.optActive : themeStyles.optInactive
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5 shrink-0 opacity-85" />
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tactile Interactive Stepper [- 1 +] for Pax (Only visible if attending or unsure) */}
                {formData.attendance !== 'tidak_hadir' && (
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <span
                        className={`font-sans text-xs font-medium tracking-wide ${themeStyles.formLabel}`}
                      >
                        Jumlah Tamu
                      </span>
                      <span className="font-serif italic text-xs text-neutral-400">
                        Maks. 5 orang
                      </span>
                    </div>
                    <div
                      role="group"
                      aria-label="Pengatur Jumlah Tamu"
                      className={`flex items-center justify-between p-1.5 rounded-2xl border ${themeStyles.stepperBox}`}
                    >
                      <button
                        type="button"
                        onClick={handleDecrementPax}
                        disabled={formData.pax <= 1}
                        aria-label="Kurangi Jumlah Tamu"
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center transition cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed ${themeStyles.stepperBtn}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <div className="flex flex-col items-center justify-center px-4">
                        <span className="font-serif text-2xl font-medium tracking-normal text-amber-100/90">
                          {formData.pax} Orang
                        </span>
                        <span className="font-sans text-[10px] uppercase tracking-widest text-neutral-400">
                          TAMU HADIR
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleIncrementPax}
                        disabled={formData.pax >= 5}
                        aria-label="Tambah Jumlah Tamu"
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center transition cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed ${themeStyles.stepperBtn}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Wish / Message */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label
                      htmlFor="rsvp-message"
                      className={`font-sans text-xs font-medium tracking-wide ${themeStyles.formLabel}`}
                    >
                      Untaian Doa &amp; Restu
                    </label>
                    <span className="font-serif italic text-xs text-neutral-400">
                      {formData.message.length}/300
                    </span>
                  </div>
                  <textarea
                    id="rsvp-message"
                    rows={4}
                    required
                    maxLength={300}
                    placeholder="Tuliskan ucapan dan doa tulus untuk kedua mempelai..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs font-sans leading-relaxed transition-colors focus:outline-none resize-none ${themeStyles.formInput}`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full border text-xs font-sans tracking-widest uppercase transition-all duration-200 cursor-pointer ${themeStyles.buttonSubmit} disabled:opacity-50`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi & Doa'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Comment Feed Column */}
          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-7'} space-y-4`}>
            <div
              className={`flex items-center justify-between border-b pb-3 ${themeStyles.hairline}`}
            >
              <h3 className={`font-serif text-xl sm:text-2xl font-medium ${themeStyles.textPrimary}`}>
                Untaian Doa Kerabat ({entries.length})
              </h3>
              <div className="flex items-center gap-1.5">
                <Users className={`w-3.5 h-3.5 ${themeStyles.accent}`} />
                <span className={`font-serif italic text-sm ${themeStyles.textMuted}`}>
                  Doa Terkirim
                </span>
              </div>
            </div>

            {/* Clean Scrollable Feed with Subtle Scrollbar & Decorative Serif Quote Mark */}
            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1.5 custom-scrollbar">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className={`relative p-5 rounded-2xl border ${themeStyles.itemCard} shadow-sm overflow-hidden animate-fade-in`}
                >
                  {/* Decorative Editorial Serif Quote Mark */}
                  <span
                    aria-hidden="true"
                    className={`font-serif text-5xl leading-none absolute top-2 right-4 select-none pointer-events-none ${themeStyles.quoteMark}`}
                  >
                    &ldquo;
                  </span>

                  <div className="relative z-10 flex flex-wrap items-start justify-between gap-2 mb-2.5">
                    <div>
                      <h4 className={`font-serif text-base font-semibold ${themeStyles.textPrimary}`}>
                        {entry.guestName}
                      </h4>
                      <span className={`font-serif italic text-xs ${themeStyles.textMuted}`}>
                        {formatEntryDate(entry.createdAt)}
                      </span>
                    </div>
                    <div>{renderAttendanceBadge(entry.attendance, entry.pax)}</div>
                  </div>
                  <p className={`relative z-10 font-sans text-xs sm:text-sm leading-relaxed ${themeStyles.textPrimary}`}>
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
