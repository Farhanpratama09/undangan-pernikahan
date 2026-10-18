"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  X,
  Compass,
  Sparkles,
} from 'lucide-react';
import { ThemeId } from '@/types/invitation';
import { useClipboard } from '@/hooks/useClipboard';

interface HybridLocationModuleProps {
  themeId: ThemeId;
  venueName: string;
  fullAddress: string;
  landmarkNotes: string;
  visualMapAssetUrl: string;
  venueSketchUrl?: string;
  venueTags?: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsPlaceId?: string;
  viewMode?: 'mobile' | 'desktop';
}

export function HybridLocationModule({
  themeId,
  venueName,
  fullAddress,
  landmarkNotes,
  visualMapAssetUrl,
  venueSketchUrl = '/images/venue-sketch.svg',
  venueTags = [],
  coordinates,
  viewMode = 'desktop',
}: HybridLocationModuleProps) {
  const isMobile = viewMode === 'mobile';
  const { copy, isCopied } = useClipboard(2000);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Lock body scroll ONLY while lightbox is open (never overwrite TactileGate's scroll lock on initial mount)
  useEffect(() => {
    if (typeof document === 'undefined' || !isLightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  const handleCopyAddress = useCallback(() => {
    const textToCopy = `${venueName}\n${fullAddress}\n\nCatatan / Patokan: ${landmarkNotes}`;
    copy(textToCopy, 'address');
  }, [venueName, fullAddress, landmarkNotes, copy]);

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.3, 0.8));
  const handleResetZoom = () => setZoomScale(1);

  // Exact navigation URLs per PRD 5.3
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${coordinates.lat},${coordinates.lng}&navigate=yes`;

  // Theme styling dictionary
  const themeStyles = {
    editorial: {
      cardBg: 'bg-[#FAF7F0]',
      sketchContainerBg: 'bg-[#FBF9F5] border-[#E2D9C8]',
      sketchFilter: 'opacity-90 contrast-110',
      tagPill: 'bg-[#F6F2EA] text-[#231C18] border-[#D8CEBE]',
      noteBg: 'bg-[#231C18]/[0.04]',
      border: 'border-[#E2D9C8]',
      accentBorder: 'border-[#8C6D46]',
      hairline: 'border-[#E2D9C8]',
      textPrimary: 'text-[#231C18]',
      textMuted: 'text-[#78756F]',
      accentText: 'text-[#8C6D46]',
      buttonPrimary: 'bg-[#231C18] text-[#F6F2EA] hover:bg-[#382D27] border-[#231C18]',
      buttonSecondary: 'bg-white text-[#231C18] hover:bg-[#F6F2EA] border-[#D8CEBE]',
      badge: 'bg-[#231C18] text-[#F6F2EA]',
      successIcon: 'text-emerald-700',
      modalBg: 'bg-[#F6F2EA]/95 text-[#231C18]',
      modalText: 'text-[#231C18]',
      modalBtn: 'border-[#231C18] text-[#231C18] bg-white hover:bg-[#ECE8E1]',
    },
    'dark-luxe': {
      cardBg: 'bg-[#141312]',
      sketchContainerBg: 'bg-[#1A1816] border-[#D4AF37]/30',
      sketchFilter: 'invert sepia saturate-[3] hue-rotate-[350deg] brightness-95 opacity-90',
      tagPill: 'bg-[#1C1A17] text-[#F2ECE4] border-[#C87D55]/45',
      noteBg: 'bg-[#C87D55]/[0.08]',
      border: 'border-[#D4AF37]/35',
      accentBorder: 'border-[#C87D55]',
      hairline: 'border-[#272421]',
      textPrimary: 'text-[#F2ECE4]',
      textMuted: 'text-[#A69F95]',
      accentText: 'text-[#D4AF37]',
      buttonPrimary: 'bg-[#D4AF37] text-[#0D0C0B] hover:bg-[#E5C158] border-[#D4AF37]',
      buttonSecondary: 'bg-[#1C1A18] text-[#F2ECE4] hover:bg-[#272421] border-[#D4AF37]/40',
      badge: 'bg-[#D4AF37] text-[#0D0C0B]',
      successIcon: 'text-emerald-400',
      modalBg: 'bg-[#0D0C0B]/95 text-[#F2ECE4]',
      modalText: 'text-[#D4AF37]',
      modalBtn: 'border-[#D4AF37]/50 text-[#F2ECE4] bg-[#1C1A18] hover:bg-[#272421]',
    },
    heritage: {
      cardBg: 'bg-[#FAF6F2]',
      sketchContainerBg: 'bg-[#FDFBF9] border-[#B08D57]/35',
      sketchFilter: 'sepia-[0.25] opacity-90',
      tagPill: 'bg-[#F4EFEA] text-[#2B211E] border-[#8E5B52]/35',
      noteBg: 'bg-[#8E5B52]/[0.06]',
      border: 'border-[#B08D57]/45',
      accentBorder: 'border-[#8E5B52]',
      hairline: 'border-[#DFD5CA]',
      textPrimary: 'text-[#2B211E]',
      textMuted: 'text-[#765D53]',
      accentText: 'text-[#8E5B52]',
      buttonPrimary: 'bg-[#8E5B52] text-[#F4EFEA] hover:bg-[#764840] border-[#8E5B52]',
      buttonSecondary: 'bg-white text-[#2B211E] hover:bg-[#F4EFEA] border-[#B08D57]/50',
      badge: 'bg-[#8E5B52] text-[#F4EFEA]',
      successIcon: 'text-emerald-700',
      modalBg: 'bg-[#2B211E]/95 text-[#F4EFEA]',
      modalText: 'text-[#F4EFEA]',
      modalBtn: 'border-[#B08D57] text-[#F4EFEA] bg-[#3B2E2A] hover:bg-[#4D3C37]',
    },
  }[themeId];

  return (
    <section className="w-full my-8">
      <div
        className={`${
          isMobile ? 'p-5' : 'p-6 sm:p-10'
        } rounded-2xl border ${themeStyles.border} ${themeStyles.cardBg} relative overflow-hidden shadow-sm`}
      >
        {/* 1. ARCHITECTURAL FACADE SKETCH AT THE VERY TOP OF VENUE CARD */}
        {venueSketchUrl && (
          <div
            className={`w-full mb-7 p-4 sm:p-6 rounded-xl border ${themeStyles.sketchContainerBg} flex flex-col items-center text-center`}
          >
            <span
              className={`font-sans text-[10px] tracking-[0.25em] uppercase ${themeStyles.accentText} mb-2`}
            >
              The Venue • Architectural Sketch
            </span>
            <img
              src={venueSketchUrl}
              alt={`Sketsa Arsitektur ${venueName}`}
              loading="lazy"
              decoding="async"
              className={`w-full max-w-2xl h-auto object-contain max-h-[220px] select-none ${themeStyles.sketchFilter}`}
            />
          </div>
        )}

        {/* 2. VENUE HEADER & SUBTITLE */}
        <div
          className={`flex flex-col ${
            isMobile ? '' : 'sm:flex-row sm:items-center sm:justify-between'
          } gap-2 mb-5 border-b pb-4 ${themeStyles.hairline}`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className={`w-4 h-4 ${themeStyles.accentText}`} />
              <p className={`font-sans text-[11px] tracking-[0.22em] uppercase ${themeStyles.textMuted}`}>
                Lokasi &amp; Panduan Akses
              </p>
            </div>
            <h2
              className={`font-serif ${
                isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl'
              } tracking-[0.06em] font-medium ${themeStyles.textPrimary}`}
            >
              {venueName}
            </h2>
          </div>
          <p className={`font-serif italic text-sm ${themeStyles.textMuted}`}>
            Kebayoran Baru, Jakarta Selatan
          </p>
        </div>

        {/* 3. ADDRESS, PILL TAGS & LANDMARK NOTES */}
        <div className="mb-6 space-y-4">
          <p className={`font-sans text-sm leading-relaxed ${themeStyles.textPrimary}`}>
            {fullAddress}
          </p>

          {/* Venue Pill Badges (venueTags) */}
          {venueTags && venueTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {venueTags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-serif italic tracking-wide ${themeStyles.tagPill}`}
                >
                  <Sparkles className={`w-3 h-3 shrink-0 ${themeStyles.accentText}`} />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          )}

          <div className={`p-3.5 rounded-r-xl border-l-2 ${themeStyles.accentBorder} ${themeStyles.noteBg}`}>
            <p className={`font-sans text-xs sm:text-sm leading-relaxed ${themeStyles.textMuted}`}>
              <strong className={`font-medium ${themeStyles.textPrimary}`}>
                Petunjuk Arah &amp; Akses:
              </strong>{' '}
              {landmarkNotes}
            </p>
          </div>
        </div>

        {/* 4. ACTION ROW: COPY ADDRESS + GOOGLE MAPS + WAZE — Force 1 column when viewMode === 'mobile' */}
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'
          } gap-3 mb-8`}
        >
          <button
            type="button"
            onClick={handleCopyAddress}
            className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border text-xs font-sans font-medium tracking-wider uppercase transition-colors cursor-pointer ${themeStyles.buttonSecondary}`}
          >
            {isCopied ? (
              <>
                <Check className={`w-4 h-4 shrink-0 ${themeStyles.successIcon}`} />
                <span>Alamat Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 shrink-0" />
                <span>Salin Alamat Lengkap</span>
              </>
            )}
          </button>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border text-xs font-sans font-medium tracking-wider uppercase transition-colors ${themeStyles.buttonPrimary}`}
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>Buka Google Maps</span>
          </a>

          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border text-xs font-sans font-medium tracking-wider uppercase transition-colors ${themeStyles.buttonSecondary}`}
          >
            <Navigation className="w-4 h-4 shrink-0" />
            <span>Petunjuk Arah Waze</span>
          </a>
        </div>

        {/* 5. INTERACTIVE VISUAL DENAH ILLUSTRATION & LIGHTBOX TRIGGER */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`font-sans text-xs tracking-wider uppercase ${themeStyles.textMuted}`}>
              Denah Visual &amp; Alur Lokasi
            </span>
            <button
              type="button"
              onClick={() => {
                setZoomScale(1);
                setIsLightboxOpen(true);
              }}
              className={`inline-flex items-center gap-1.5 text-xs font-sans underline underline-offset-4 cursor-pointer ${themeStyles.textPrimary} hover:opacity-75`}
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Perbesar Denah</span>
            </button>
          </div>

          <div
            role="button"
            tabIndex={0}
            aria-label="Perbesar Denah Arsitektural Lokasi Acara"
            onClick={() => {
              setZoomScale(1);
              setIsLightboxOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setZoomScale(1);
                setIsLightboxOpen(true);
              }
            }}
            className={`group relative w-full overflow-hidden rounded-xl border ${themeStyles.hairline} cursor-pointer bg-white transition-opacity hover:opacity-95`}
          >
            <img
              src={visualMapAssetUrl}
              alt="Denah Arsitektural Lokasi Acara"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-contain max-h-[380px] select-none"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span
                className={`px-4 py-2 rounded-full text-xs font-sans font-medium tracking-widest uppercase shadow-sm ${themeStyles.badge}`}
              >
                Klik Untuk Membuka Denah
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Zoomable Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Denah Arsitektur Lokasi Acara"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[70] flex flex-col p-4 sm:p-6 backdrop-blur-md ${themeStyles.modalBg}`}
          >
            {/* Lightbox Toolbar */}
            <div
              className={`flex flex-wrap items-center justify-between gap-2 pb-4 border-b ${themeStyles.hairline}`}
            >
              <div className="flex items-center gap-2">
                <p className={`font-serif text-base tracking-wide ${themeStyles.modalText}`}>
                  Denah Lokasi Acara ({Math.round(zoomScale * 100)}%)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  title="Perbesar"
                  aria-label="Perbesar Denah"
                  className={`p-2 rounded-full border transition cursor-pointer ${themeStyles.modalBtn}`}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title="Perkecil"
                  aria-label="Perkecil Denah"
                  className={`p-2 rounded-full border transition cursor-pointer ${themeStyles.modalBtn}`}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                  aria-label="Reset Ukuran Denah"
                  className={`p-2 rounded-full border transition cursor-pointer ${themeStyles.modalBtn}`}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <a
                  href={visualMapAssetUrl}
                  download="denah-lokasi-wedding.svg"
                  title="Unduh Berkas Denah"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-sans font-medium tracking-wider uppercase transition ${themeStyles.buttonPrimary}`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Unduh Denah</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  title="Tutup (Esc)"
                  aria-label="Tutup Lightbox"
                  className={`p-2 rounded-full border transition ml-1 cursor-pointer ${themeStyles.modalBtn}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Image Viewport */}
            <div className="flex-1 w-full overflow-auto flex items-center justify-center p-4">
              <motion.div
                animate={{ scale: zoomScale }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="max-w-4xl w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <img
                  src={visualMapAssetUrl}
                  alt="Denah Lokasi Full"
                  className="max-h-[80vh] w-auto object-contain border border-black/10 shadow-xl bg-white"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
