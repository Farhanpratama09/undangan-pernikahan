"use client";

import React from 'react';
import { Calendar, Download, Instagram, Heart } from 'lucide-react';
import { ThemeProps } from '@/types/invitation';
import { useCountdown } from '@/hooks/useCountdown';
import { useCalendarGenerator } from '@/hooks/useCalendarGenerator';
import { formatIndoDate, formatTimeRange } from '@/lib/validation';
import { WeddingTimelineModule } from '@/components/shared/WeddingTimelineModule';
import { DressCodeModule } from '@/components/shared/DressCodeModule';
import { InlineSongCard } from '@/components/shared/InlineSongCard';
import { HybridLocationModule } from '@/components/shared/HybridLocationModule';
import { DigitalEnvelopeModule } from '@/components/shared/DigitalEnvelopeModule';
import { GuestbookModule } from '@/components/shared/GuestbookModule';

// Fine 1px Botanical & Geometric Nusantara Line Divider
function BotanicalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5 text-[#8E5B52] opacity-90 select-none">
      <div className="h-[1px] w-14 sm:w-20 bg-[#B08D57]/60" />
      <svg
        width="36"
        height="24"
        viewBox="0 0 36 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        aria-hidden="true"
      >
        <path d="M 18 3 L 23 12 L 18 21 L 13 12 Z" stroke="#B08D57" />
        <path d="M 13 12 C 8 7, 3 9, 2 12 C 3 15, 8 17, 13 12 Z" stroke="#8E5B52" />
        <path d="M 23 12 C 28 7, 33 9, 34 12 C 33 15, 28 17, 23 12 Z" stroke="#8E5B52" />
        <circle cx="18" cy="12" r="2" fill="#8E5B52" />
      </svg>
      <div className="h-[1px] w-14 sm:w-20 bg-[#B08D57]/60" />
    </div>
  );
}

export function ModernHeritageTheme({
  data,
  guestName,
  viewMode = 'desktop',
  initialGuestbookEntries = [],
  isPlayingAudio = false,
  onTogglePlayAudio,
}: ThemeProps) {
  const isMobile = viewMode === 'mobile';
  const countdown = useCountdown(data.events.akad.dateISO);

  const akadCalendar = useCalendarGenerator({
    title: `${data.couple.groom.nickname} & ${data.couple.bride.nickname} - ${data.events.akad.title}`,
    description: `${data.events.akad.description} di ${data.location.venueName}`,
    location: data.location.fullAddress,
    startDateISO: data.events.akad.dateISO,
    endDateISO: data.events.akad.endTimeISO,
  });

  const receptionCalendar = useCalendarGenerator({
    title: `${data.couple.groom.nickname} & ${data.couple.bride.nickname} - ${data.events.reception.title}`,
    description: `${data.events.reception.description} di ${data.location.venueName}`,
    location: data.location.fullAddress,
    startDateISO: data.events.reception.dateISO,
    endDateISO: data.events.reception.endTimeISO,
  });

  const coupleNickname = `${data.couple.groom.nickname} & ${data.couple.bride.nickname}`;

  return (
    <article className="w-full bg-[#F4EFEA] text-[#2B211E] font-sans antialiased selection:bg-[#8E5B52] selection:text-[#F4EFEA]">
      {/* SECTION 00: SOFT MAUVE/SAND ARCH & BOTANICAL LINE ELEGANCE HERO */}
      <header
        className={`${
          isMobile ? 'py-10 px-5' : 'py-16 px-6 sm:px-10'
        } border-b border-[#DFD5CA] text-center relative overflow-hidden`}
      >
        {/* Subtle 1px Botanical Corner SVG Ornaments */}
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="#B08D57"
          strokeWidth="0.9"
          className="w-24 h-24 absolute top-4 left-4 opacity-40 pointer-events-none"
          aria-hidden="true"
        >
          <path d="M 8 112 L 8 40 C 8 20, 20 8, 40 8 L 112 8" />
          <path d="M 8 70 C 24 66, 36 52, 40 36" />
          <circle cx="40" cy="36" r="2.5" />
        </svg>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="#B08D57"
          strokeWidth="0.9"
          className="w-24 h-24 absolute top-4 right-4 opacity-40 pointer-events-none -scale-x-100"
          aria-hidden="true"
        >
          <path d="M 8 112 L 8 40 C 8 20, 20 8, 40 8 L 112 8" />
          <path d="M 8 70 C 24 66, 36 52, 40 36" />
          <circle cx="40" cy="36" r="2.5" />
        </svg>

        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#8E5B52] font-medium">
            Ikrar Suci Pernikahan
          </p>

          <div>
            <h1
              className={`font-script text-[#8E5B52] ${
                isMobile ? 'text-5xl' : 'text-5xl sm:text-6xl md:text-7xl'
              } leading-tight`}
            >
              {data.couple.groom.nickname} &amp; {data.couple.bride.nickname}
            </h1>
            <p className="font-serif italic text-base sm:text-lg tracking-wide text-[#765D53] mt-1">
              {formatIndoDate(data.events.akad.dateISO)}
            </p>
          </div>

          <BotanicalDivider />

          {/* Arch Dome Framed Hero Portrait (rounded-t-full) */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative p-3 border border-[#B08D57] rounded-t-full rounded-b-2xl bg-[#FAF6F2] shadow-md">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-xl border border-[#8E5B52]/35 bg-[#E8DFD5]">
                <img
                  src={data.gallery[0]}
                  alt="Modern Heritage Cover"
                  fetchPriority="high"
                  decoding="async"
                  width={800}
                  height={1000}
                  srcSet="https://images.unsplash.com/photo-1519741497674-611481863552?w=480&q=75&fm=webp&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1519741497674-611481863552?w=640&q=75&fm=webp&auto=format&fit=crop 640w, https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=75&fm=webp&auto=format&fit=crop 800w"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
                  className="w-full h-full object-cover sepia-[0.08] contrast-[1.03] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* 4 Separate Thin-Bordered Countdown Boxes (border border-[#8E5B52]/30) */}
          <div className="max-w-lg mx-auto pt-6">
            <p className="font-serif italic text-sm tracking-wide text-[#8E5B52] mb-3">
              {countdown.isMounted && countdown.isEventPassed
                ? 'Prosesi Pernikahan Telah Dilaksanakan'
                : 'Menghitung Hari Menuju Bahagia'}
            </p>
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
              {[
                { val: countdown.days, label: 'Hari' },
                { val: countdown.hours, label: 'Jam' },
                { val: countdown.minutes, label: 'Menit' },
                { val: countdown.seconds, label: 'Detik' },
              ].map((c) => (
                <div
                  key={c.label}
                  className="py-3.5 px-2 rounded-xl border border-[#8E5B52]/30 bg-[#FAF6F2] shadow-sm"
                >
                  <span
                    className={`font-serif ${
                      isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
                    } text-[#8E5B52] font-normal block leading-none`}
                  >
                    {String(c.val).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#765D53] mt-1.5 block">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Invitation Badge */}
          <div className="max-w-md mx-auto mt-6 p-5 rounded-2xl border border-[#B08D57]/55 bg-[#FAF6F2] shadow-sm">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#765D53] mb-1">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <p className="font-serif text-2xl text-[#2B211E] font-medium tracking-wide break-words">
              {guestName}
            </p>
          </div>
        </div>
      </header>

      {/* SECTION 01: PASANGAN MEMPELAI (ARCH FRAMED PORTRAITS) & OUR SONG */}
      <section
        className={`${
          isMobile ? 'py-14 px-5' : 'py-20 px-6 sm:px-10'
        } border-b border-[#DFD5CA]`}
      >
        <div className="text-center max-w-xl mx-auto mb-12 space-y-1">
          <span className="font-script text-3xl sm:text-4xl text-[#8E5B52] block">
            Sang Mempelai
          </span>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            } tracking-[0.12em] uppercase font-normal text-[#2B211E]`}
          >
            Mempelai Pria &amp; Wanita
          </h2>
          <BotanicalDivider />
        </div>

        <div
          className={`grid ${
            isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-1 md:grid-cols-2 gap-10'
          } max-w-5xl mx-auto mb-10`}
        >
          {/* Groom Arch Card */}
          <div
            className={`${
              isMobile ? 'p-6' : 'p-8'
            } rounded-2xl border border-[#8E5B52]/35 bg-[#FAF6F2] flex flex-col items-center text-center shadow-sm`}
          >
            <div className="w-52 h-72 sm:w-56 sm:h-72 mb-6 p-2 border border-[#B08D57] rounded-t-full bg-white shadow-inner">
              <div className="w-full h-full overflow-hidden rounded-t-full bg-[#E8DFD5]">
                <img
                  src={data.couple.groom.photoUrl}
                  alt={data.couple.groom.fullName}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover sepia-[0.08] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <span className="font-script text-3xl text-[#8E5B52] mb-0.5">
              {data.couple.groom.nickname}
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#2B211E] mb-3">
              {data.couple.groom.fullName}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#765D53] leading-relaxed mb-6">
              Putra tercinta dari: <br />
              <strong className="text-[#2B211E] font-medium">{data.couple.groom.fatherName}</strong>
              <br />
              &amp;{' '}
              <strong className="text-[#2B211E] font-medium">{data.couple.groom.motherName}</strong>
            </p>

            <a
              href={`https://instagram.com/${data.couple.groom.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-serif italic text-sm text-[#8E5B52] hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{data.couple.groom.instagramHandle}</span>
            </a>
          </div>

          {/* Bride Arch Card */}
          <div
            className={`${
              isMobile ? 'p-6' : 'p-8'
            } rounded-2xl border border-[#8E5B52]/35 bg-[#FAF6F2] flex flex-col items-center text-center shadow-sm`}
          >
            <div className="w-52 h-72 sm:w-56 sm:h-72 mb-6 p-2 border border-[#B08D57] rounded-t-full bg-white shadow-inner">
              <div className="w-full h-full overflow-hidden rounded-t-full bg-[#E8DFD5]">
                <img
                  src={data.couple.bride.photoUrl}
                  alt={data.couple.bride.fullName}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover sepia-[0.08] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <span className="font-script text-3xl text-[#8E5B52] mb-0.5">
              {data.couple.bride.nickname}
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#2B211E] mb-3">
              {data.couple.bride.fullName}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#765D53] leading-relaxed mb-6">
              Putri tercinta dari: <br />
              <strong className="text-[#2B211E] font-medium">{data.couple.bride.fatherName}</strong>
              <br />
              &amp;{' '}
              <strong className="text-[#2B211E] font-medium">{data.couple.bride.motherName}</strong>
            </p>

            <a
              href={`https://instagram.com/${data.couple.bride.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-serif italic text-sm text-[#8E5B52] hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{data.couple.bride.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Inline Song Card */}
        <InlineSongCard
          themeId="heritage"
          title={data.audio.title}
          artist={data.audio.artist}
          isPlaying={isPlayingAudio}
          onTogglePlay={onTogglePlayAudio}
        />
      </section>

      {/* SECTION 02: RANGKAIAN PROSESI & ICON-PILLAR RUNDOWN TIMELINE */}
      <section
        className={`${
          isMobile ? 'py-14 px-5' : 'py-20 px-6 sm:px-10'
        } border-b border-[#DFD5CA]`}
      >
        <div className="text-center max-w-xl mx-auto mb-12 space-y-1">
          <span className="font-script text-3xl sm:text-4xl text-[#8E5B52] block">
            Waktu &amp; Prosesi
          </span>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            } tracking-[0.12em] uppercase font-normal text-[#2B211E]`}
          >
            Rangkaian Acara Sakral
          </h2>
          <BotanicalDivider />
        </div>

        {/* Procession Cards */}
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 gap-8'
          } max-w-5xl mx-auto mb-10`}
        >
          {/* Akad Nikah */}
          <div className="rounded-2xl border border-[#8E5B52]/40 p-6 sm:p-8 bg-[#FAF6F2] flex flex-col justify-between shadow-sm">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full border border-[#B08D57] bg-[#F4EFEA] text-[#8E5B52] font-sans text-[10px] font-medium uppercase tracking-[0.2em] mb-4">
                Ijab Kabul
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#2B211E] mb-2">
                {data.events.akad.title}
              </h3>
              <p className="font-serif text-base text-[#8E5B52] mb-0.5 font-medium">
                {formatIndoDate(data.events.akad.dateISO)}
              </p>
              <p className="font-serif italic text-base text-[#765D53] mb-4">
                Pukul{' '}
                {formatTimeRange(
                  data.events.akad.dateISO,
                  data.events.akad.endTimeISO,
                  data.events.akad.timezoneLabel
                )}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#765D53] leading-relaxed mb-6">
                {data.events.akad.description}
              </p>
            </div>

            <div className={`flex flex-col ${isMobile ? '' : 'sm:flex-row'} gap-2 pt-4 border-t border-[#DFD5CA]`}>
              <a
                href={akadCalendar.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#8E5B52] bg-[#8E5B52] text-[#F4EFEA] hover:bg-[#764840] text-xs font-sans font-medium uppercase tracking-wider transition"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Simpan di Kalender</span>
              </a>
              <button
                type="button"
                onClick={akadCalendar.downloadIcsFile}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#B08D57]/60 bg-white text-[#2B211E] hover:bg-[#F4EFEA] text-xs font-sans font-medium uppercase tracking-wider transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .ICS</span>
              </button>
            </div>
          </div>

          {/* Resepsi Pernikahan */}
          <div className="rounded-2xl border border-[#8E5B52]/40 p-6 sm:p-8 bg-[#FAF6F2] flex flex-col justify-between shadow-sm">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full border border-[#B08D57] bg-[#F4EFEA] text-[#8E5B52] font-sans text-[10px] font-medium uppercase tracking-[0.2em] mb-4">
                Pahargyan &amp; Ramah Tamah
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#2B211E] mb-2">
                {data.events.reception.title}
              </h3>
              <p className="font-serif text-base text-[#8E5B52] mb-0.5 font-medium">
                {formatIndoDate(data.events.reception.dateISO)}
              </p>
              <p className="font-serif italic text-base text-[#765D53] mb-4">
                Pukul{' '}
                {formatTimeRange(
                  data.events.reception.dateISO,
                  data.events.reception.endTimeISO,
                  data.events.reception.timezoneLabel
                )}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#765D53] leading-relaxed mb-6">
                {data.events.reception.description}
              </p>
            </div>

            <div className={`flex flex-col ${isMobile ? '' : 'sm:flex-row'} gap-2 pt-4 border-t border-[#DFD5CA]`}>
              <a
                href={receptionCalendar.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#8E5B52] bg-[#8E5B52] text-[#F4EFEA] hover:bg-[#764840] text-xs font-sans font-medium uppercase tracking-wider transition"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Simpan di Kalender</span>
              </a>
              <button
                type="button"
                onClick={receptionCalendar.downloadIcsFile}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#B08D57]/60 bg-white text-[#2B211E] hover:bg-[#F4EFEA] text-xs font-sans font-medium uppercase tracking-wider transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .ICS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Monthly Calendar Strip & Icon-Pillar Timeline */}
        <div className="max-w-5xl mx-auto">
          <WeddingTimelineModule
            themeId="heritage"
            variant="icon-pillar"
            coupleNickname={coupleNickname}
            venueName={data.location.venueName}
            fullAddress={data.location.fullAddress}
            akadEvent={data.events.akad}
            rundown={data.rundown}
            viewMode={viewMode}
          />
        </div>
      </section>

      {/* SECTION 03: CERITA CINTA */}
      <section
        className={`${
          isMobile ? 'py-14 px-5' : 'py-20 px-6 sm:px-10'
        } border-b border-[#DFD5CA]`}
      >
        <div className="text-center max-w-xl mx-auto mb-12 space-y-1">
          <span className="font-script text-3xl sm:text-4xl text-[#8E5B52] block">
            Jejak Langkah
          </span>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            } tracking-[0.12em] uppercase font-normal text-[#2B211E]`}
          >
            Kisah Kasih &amp; Komitmen
          </h2>
          <BotanicalDivider />
        </div>

        <div className="max-w-4xl mx-auto space-y-5">
          {data.loveStory.map((story) => (
            <div
              key={story.year}
              className="p-6 sm:p-8 rounded-2xl border border-[#8E5B52]/30 bg-[#FAF6F2] shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3 border-b border-[#DFD5CA] pb-2.5">
                <span className="font-serif italic text-2xl sm:text-3xl font-medium text-[#8E5B52]">
                  {story.year}
                </span>
                <span className="h-4 w-[1px] bg-[#B08D57]" />
                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#2B211E]">
                  {story.title}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#765D53] leading-relaxed">
                {story.story}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04: VENUE SKETCH, TAGS, DENAH & NAVIGATION */}
      <section className="px-5 sm:px-10 border-b border-[#DFD5CA]">
        <HybridLocationModule
          themeId="heritage"
          venueName={data.location.venueName}
          fullAddress={data.location.fullAddress}
          landmarkNotes={data.location.landmarkNotes}
          visualMapAssetUrl={data.location.visualMapAssetUrl}
          venueSketchUrl={data.location.venueSketchUrl}
          venueTags={data.location.venueTags}
          coordinates={data.location.coordinates}
          googleMapsPlaceId={data.location.googleMapsPlaceId}
          viewMode={viewMode}
        />
      </section>

      {/* SECTION 05: DRESS CODE & SWATCHES */}
      <section className="px-5 sm:px-10 border-b border-[#DFD5CA]">
        <DressCodeModule
          themeId="heritage"
          dressCode={data.dressCode}
          viewMode={viewMode}
        />
      </section>

      {/* SECTION 06: ARCH-FRAMED HERITAGE GALLERY */}
      <section
        className={`${
          isMobile ? 'py-14 px-5' : 'py-20 px-6 sm:px-10'
        } border-b border-[#DFD5CA]`}
      >
        <div className="text-center max-w-xl mx-auto mb-12 space-y-1">
          <span className="font-script text-3xl sm:text-4xl text-[#8E5B52] block">
            Potret Kenangan
          </span>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            } tracking-[0.12em] uppercase font-normal text-[#2B211E]`}
          >
            Galeri Kisah &amp; Momen
          </h2>
          <BotanicalDivider />
        </div>

        <div
          className={`grid ${
            isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
          } gap-6 max-w-5xl mx-auto`}
        >
          {data.gallery.slice(1).map((imgUrl, i) => (
            <div
              key={imgUrl}
              className="p-2.5 border border-[#B08D57]/60 rounded-t-full rounded-b-2xl bg-[#FAF6F2] shadow-sm"
            >
              <div className="aspect-[3/4] w-full overflow-hidden rounded-t-full rounded-b-xl bg-[#E8DFD5]">
                <img
                  src={imgUrl}
                  alt={`Heritage Memory ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover sepia-[0.08] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 07: DIGITAL ENVELOPE */}
      <section className="px-5 sm:px-10 border-b border-[#DFD5CA]">
        <DigitalEnvelopeModule
          themeId="heritage"
          accounts={data.digitalEnvelope}
          viewMode={viewMode}
        />
      </section>

      {/* SECTION 08: GUESTBOOK & RSVP */}
      <section className="px-5 sm:px-10 border-b border-[#DFD5CA]">
        <GuestbookModule
          themeId="heritage"
          initialEntries={initialGuestbookEntries}
          defaultGuestName={guestName}
          viewMode={viewMode}
        />
      </section>

      {/* FOOTER */}
      <footer className="py-14 px-6 text-center space-y-2">
        <Heart className="w-4 h-4 mx-auto text-[#8E5B52] fill-current" />
        <p className="font-script text-4xl sm:text-5xl text-[#8E5B52]">
          {data.couple.groom.nickname} &amp; {data.couple.bride.nickname}
        </p>
        <p className="font-sans text-[10px] sm:text-xs text-[#765D53] tracking-[0.25em] uppercase">
          Matur Nuwun • Sampai Jumpa Di Hari Bahagia Kami
        </p>
      </footer>
    </article>
  );
}
