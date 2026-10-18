"use client";

import React from 'react';
import { Calendar, Download, Instagram, Clock, Sparkles } from 'lucide-react';
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

export function DarkLuxeTheme({
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
    <article className="w-full bg-[#0D0C0B] text-[#F2ECE4] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#0D0C0B]">
      {/* SECTION 00: WARM SUNSET TERRACOTTA & MIDNIGHT GOLD HERO */}
      <header
        className={`relative ${
          isMobile ? 'py-10 px-5' : 'py-16 px-6 sm:px-10'
        } border-b border-[#D4AF37]/30 text-center overflow-hidden`}
      >
        {/* Warm Sunset Terracotta & Gold Ambient Aura */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[340px] bg-gradient-to-b from-[#C87D55]/25 via-[#D4AF37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#161412]/80">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#D4AF37]">
              The Wedding Celebration Of
            </span>
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          </div>

          {/* Mixed Uppercase Serif & Gold Calligraphy Script */}
          <div className="py-2">
            <h1
              className={`font-serif tracking-[0.14em] uppercase font-light text-[#F2ECE4] ${
                isMobile ? 'text-4xl' : 'text-5xl sm:text-7xl'
              }`}
            >
              {data.couple.groom.nickname}
            </h1>
            <span
              className={`font-script text-[#D4AF37] block -my-2 sm:-my-3 ${
                isMobile ? 'text-4xl' : 'text-5xl sm:text-6xl'
              }`}
            >
              and
            </span>
            <h1
              className={`font-serif tracking-[0.14em] uppercase font-light text-[#F2ECE4] ${
                isMobile ? 'text-4xl' : 'text-5xl sm:text-7xl'
              }`}
            >
              {data.couple.bride.nickname}
            </h1>
          </div>

          <p className="font-serif italic text-base sm:text-lg tracking-wide text-[#C87D55]">
            {formatIndoDate(data.events.akad.dateISO)} • {data.location.venueName}
          </p>

          {/* Cinematic Portrait with Warm Sunset Vignette & 4-Column Horizontal Countdown Bar */}
          <div className="mt-8 max-w-3xl mx-auto relative rounded-2xl p-2 border border-[#D4AF37]/40 bg-[#141312] shadow-2xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#D4AF37]/20">
              <img
                src={data.gallery[0]}
                alt="Cinematic Sunset Couple"
                fetchPriority="high"
                decoding="async"
                width={800}
                height={500}
                srcSet="https://images.unsplash.com/photo-1519741497674-611481863552?w=480&q=75&fm=webp&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1519741497674-611481863552?w=640&q=75&fm=webp&auto=format&fit=crop 640w, https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=75&fm=webp&auto=format&fit=crop 800w"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
                className="w-full h-full object-cover brightness-90 contrast-110 hover:scale-105 transition-transform duration-1000"
              />
              {/* Warm sunset twilight gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B] via-[#C87D55]/15 to-transparent" />

              {/* Horizontal 4-Column Countdown Bar with Glowing Colon Separators */}
              <div className="absolute bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-8 py-3 sm:py-4 px-4 rounded-2xl bg-[#0D0C0B]/85 backdrop-blur-md border border-[#D4AF37]/40">
                <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C87D55] mb-1.5">
                  {countdown.isMounted && countdown.isEventPassed
                    ? 'The Ceremony Has Concluded'
                    : 'Countdown To Forever'}
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-5">
                  <div className="text-center min-w-[44px]">
                    <span className="font-serif text-2xl sm:text-4xl font-light text-[#F2ECE4] block leading-none">
                      {String(countdown.days).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[9px] tracking-widest text-[#D4AF37] uppercase mt-1 block">
                      Hari
                    </span>
                  </div>

                  <span className="font-serif text-xl sm:text-3xl text-[#D4AF37] animate-pulse -mt-3">
                    :
                  </span>

                  <div className="text-center min-w-[44px]">
                    <span className="font-serif text-2xl sm:text-4xl font-light text-[#F2ECE4] block leading-none">
                      {String(countdown.hours).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[9px] tracking-widest text-[#D4AF37] uppercase mt-1 block">
                      Jam
                    </span>
                  </div>

                  <span className="font-serif text-xl sm:text-3xl text-[#D4AF37] animate-pulse -mt-3">
                    :
                  </span>

                  <div className="text-center min-w-[44px]">
                    <span className="font-serif text-2xl sm:text-4xl font-light text-[#F2ECE4] block leading-none">
                      {String(countdown.minutes).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[9px] tracking-widest text-[#D4AF37] uppercase mt-1 block">
                      Menit
                    </span>
                  </div>

                  <span className="font-serif text-xl sm:text-3xl text-[#D4AF37] animate-pulse -mt-3">
                    :
                  </span>

                  <div className="text-center min-w-[44px]">
                    <span className="font-serif text-2xl sm:text-4xl font-light text-[#F2ECE4] block leading-none">
                      {String(countdown.seconds).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[9px] tracking-widest text-[#D4AF37] uppercase mt-1 block">
                      Detik
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Greeting Badge */}
          <div className="mt-6 max-w-md mx-auto p-4 rounded-2xl border border-[#D4AF37]/35 bg-[#141312]/90">
            <p className="font-sans text-[10px] text-[#C87D55] uppercase tracking-[0.22em] mb-1">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <p className="font-serif text-xl sm:text-2xl text-[#F2ECE4] font-medium tracking-wide break-words">
              {guestName}
            </p>
          </div>
        </div>
      </header>

      {/* SECTION 01: COUPLE & TILTED POLAROID LOVE STORY + VINYL SONG CARD */}
      <section
        className={`${
          isMobile ? 'py-14 px-5' : 'py-20 px-6 sm:px-10'
        } border-b border-[#D4AF37]/30`}
      >
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="font-script text-3xl sm:text-4xl text-[#D4AF37] block">
            The Celebrated Couple
          </span>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            } tracking-[0.12em] uppercase font-light text-[#F2ECE4]`}
          >
            Dua Insan, Satu Janji Suci
          </h2>
          <div className="h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-[#C87D55] to-transparent" />
        </div>

        {/* Tilted Editorial / Polaroid Style Couple Cards */}
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-1 md:grid-cols-2 gap-10'
          } max-w-5xl mx-auto mb-14`}
        >
          {/* Groom Polaroid/Editorial Card */}
          <div
            className={`rounded-2xl border border-[#D4AF37]/40 ${
              isMobile ? 'p-6' : 'p-7 md:-rotate-1 hover:rotate-0'
            } bg-[#141312] shadow-2xl transition-transform duration-500`}
          >
            <div className="p-2.5 bg-[#F2ECE4] rounded-xl mb-6 shadow-md">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-black">
                <img
                  src={data.couple.groom.photoUrl}
                  alt={data.couple.groom.fullName}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="font-script text-2xl text-[#231C18] text-center pt-2">
                {data.couple.groom.nickname}
              </p>
            </div>

            <p className="font-sans text-[10px] tracking-[0.25em] text-[#C87D55] uppercase mb-1">
              Mempelai Pria
            </p>
            <h3 className="font-serif text-2xl font-normal text-[#F2ECE4] mb-3">
              {data.couple.groom.fullName}
            </h3>
            <p className="font-sans text-xs text-[#A69F95] leading-relaxed mb-5">
              Putra terkasih dari keluarga: <br />
              <strong className="text-[#F2ECE4] font-medium">{data.couple.groom.fatherName}</strong>
              <br />
              &amp;{' '}
              <strong className="text-[#F2ECE4] font-medium">{data.couple.groom.motherName}</strong>
            </p>

            <a
              href={`https://instagram.com/${data.couple.groom.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-serif italic text-sm text-[#D4AF37] hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{data.couple.groom.instagramHandle}</span>
            </a>
          </div>

          {/* Bride Polaroid/Editorial Card */}
          <div
            className={`rounded-2xl border border-[#D4AF37]/40 ${
              isMobile ? 'p-6' : 'p-7 md:rotate-1 hover:rotate-0'
            } bg-[#141312] shadow-2xl transition-transform duration-500`}
          >
            <div className="p-2.5 bg-[#F2ECE4] rounded-xl mb-6 shadow-md">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-black">
                <img
                  src={data.couple.bride.photoUrl}
                  alt={data.couple.bride.fullName}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="font-script text-2xl text-[#231C18] text-center pt-2">
                {data.couple.bride.nickname}
              </p>
            </div>

            <p className="font-sans text-[10px] tracking-[0.25em] text-[#C87D55] uppercase mb-1">
              Mempelai Wanita
            </p>
            <h3 className="font-serif text-2xl font-normal text-[#F2ECE4] mb-3">
              {data.couple.bride.fullName}
            </h3>
            <p className="font-sans text-xs text-[#A69F95] leading-relaxed mb-5">
              Putri terkasih dari keluarga: <br />
              <strong className="text-[#F2ECE4] font-medium">{data.couple.bride.fatherName}</strong>
              <br />
              &amp;{' '}
              <strong className="text-[#F2ECE4] font-medium">{data.couple.bride.motherName}</strong>
            </p>

            <a
              href={`https://instagram.com/${data.couple.bride.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-serif italic text-sm text-[#D4AF37] hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{data.couple.bride.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Inline Vinyl Song Card */}
        <InlineSongCard
          themeId="dark-luxe"
          title={data.audio.title}
          artist={data.audio.artist}
          isPlaying={isPlayingAudio}
          onTogglePlay={onTogglePlayAudio}
        />
      </section>

      {/* SECTION 02: AKAD, RESEPSI & WAVY S-CURVE TIMELINE */}
      <section
        className={`${
          isMobile ? 'py-14 px-5' : 'py-20 px-6 sm:px-10'
        } border-b border-[#D4AF37]/30`}
      >
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="font-script text-3xl sm:text-4xl text-[#D4AF37] block">
            Solemn Itinerary
          </span>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            } tracking-[0.12em] uppercase font-light`}
          >
            Waktu &amp; Rangkaian Acara
          </h2>
          <div className="h-[1px] w-16 mx-auto bg-[#D4AF37]/60" />
        </div>

        {/* Akad & Reception Itinerary Cards */}
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 gap-8'
          } max-w-5xl mx-auto mb-10`}
        >
          {/* Akad */}
          <div className="rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-8 bg-[#141312] relative flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C87D55]/60 bg-[#1C1815] text-[#D4AF37] font-serif italic text-sm tracking-wide mb-6">
                <Clock className="w-3.5 h-3.5 text-[#C87D55]" />
                <span>
                  Pukul{' '}
                  {formatTimeRange(
                    data.events.akad.dateISO,
                    data.events.akad.endTimeISO,
                    data.events.akad.timezoneLabel
                  )}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-light italic mb-2 text-[#F2ECE4]">
                {data.events.akad.title}
              </h3>
              <p className="font-serif text-base text-[#C87D55] mb-4">
                {formatIndoDate(data.events.akad.dateISO)}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#A69F95] leading-relaxed mb-8">
                {data.events.akad.description}
              </p>
            </div>

            <div className={`flex flex-col ${isMobile ? '' : 'sm:flex-row'} gap-3 pt-6 border-t border-[#D4AF37]/20`}>
              <a
                href={akadCalendar.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#D4AF37] bg-[#D4AF37] text-[#0D0C0B] hover:bg-[#E5C158] font-sans font-medium text-xs uppercase tracking-wider transition"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Simpan Kalender</span>
              </a>
              <button
                type="button"
                onClick={akadCalendar.downloadIcsFile}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#D4AF37]/50 bg-[#1C1A18] text-[#F2ECE4] hover:bg-[#272421] font-sans font-medium text-xs uppercase tracking-wider transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .ICS</span>
              </button>
            </div>
          </div>

          {/* Resepsi */}
          <div className="rounded-2xl border border-[#D4AF37]/40 p-6 sm:p-8 bg-[#141312] relative flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C87D55]/60 bg-[#1C1815] text-[#D4AF37] font-serif italic text-sm tracking-wide mb-6">
                <Clock className="w-3.5 h-3.5 text-[#C87D55]" />
                <span>
                  Pukul{' '}
                  {formatTimeRange(
                    data.events.reception.dateISO,
                    data.events.reception.endTimeISO,
                    data.events.reception.timezoneLabel
                  )}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-light italic mb-2 text-[#F2ECE4]">
                {data.events.reception.title}
              </h3>
              <p className="font-serif text-base text-[#C87D55] mb-4">
                {formatIndoDate(data.events.reception.dateISO)}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#A69F95] leading-relaxed mb-8">
                {data.events.reception.description}
              </p>
            </div>

            <div className={`flex flex-col ${isMobile ? '' : 'sm:flex-row'} gap-3 pt-6 border-t border-[#D4AF37]/20`}>
              <a
                href={receptionCalendar.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#D4AF37] bg-[#D4AF37] text-[#0D0C0B] hover:bg-[#E5C158] font-sans font-medium text-xs uppercase tracking-wider transition"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Simpan Kalender</span>
              </a>
              <button
                type="button"
                onClick={receptionCalendar.downloadIcsFile}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-[#D4AF37]/50 bg-[#1C1A18] text-[#F2ECE4] hover:bg-[#272421] font-sans font-medium text-xs uppercase tracking-wider transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .ICS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Monthly Calendar Strip & Wavy S-Curve Timeline */}
        <div className="max-w-5xl mx-auto">
          <WeddingTimelineModule
            themeId="dark-luxe"
            variant="wavy"
            coupleNickname={coupleNickname}
            venueName={data.location.venueName}
            fullAddress={data.location.fullAddress}
            akadEvent={data.events.akad}
            rundown={data.rundown}
            viewMode={viewMode}
          />
        </div>
      </section>

      {/* SECTION 03: LOVE STORY WITH TILTED POLAROID ACCENTS */}
      <section
        className={`${
          isMobile ? 'py-14 px-5' : 'py-20 px-6 sm:px-10'
        } border-b border-[#D4AF37]/30`}
      >
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="font-script text-3xl sm:text-4xl text-[#C87D55] block">
            Our Love Story
          </span>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            } tracking-[0.12em] uppercase font-light`}
          >
            Kisah Menuju Abadi
          </h2>
          <div className="h-[1px] w-16 mx-auto bg-[#D4AF37]/60" />
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
          {data.loveStory.map((item, idx) => (
            <div
              key={item.year}
              className={`p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/35 bg-[#141312] flex flex-col ${
                isMobile ? '' : idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              } items-center gap-6`}
            >
              {/* Mini Polaroid Thumbnail */}
              <div
                className={`w-36 sm:w-40 shrink-0 p-2 bg-[#F2ECE4] rounded-lg shadow-lg ${
                  idx % 2 === 0 ? '-rotate-2' : 'rotate-2'
                }`}
              >
                <div className="aspect-square w-full overflow-hidden rounded bg-black">
                  <img
                    src={data.gallery[(idx + 1) % data.gallery.length]}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-serif italic text-sm text-[#231C18] font-semibold block text-center pt-1.5">
                  {item.year}
                </span>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <span className="font-serif italic text-sm text-[#C87D55] tracking-wider block mb-1">
                  Babak 0{idx + 1} • {item.year}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F2ECE4] mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#A69F95] leading-relaxed">
                  {item.story}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04: VENUE SKETCH (GOLD/COPPER ON DARK), TAGS, DENAH & NAVIGATION */}
      <section className="px-5 sm:px-10 border-b border-[#D4AF37]/30">
        <HybridLocationModule
          themeId="dark-luxe"
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
      <section className="px-5 sm:px-10 border-b border-[#D4AF37]/30">
        <DressCodeModule
          themeId="dark-luxe"
          dressCode={data.dressCode}
          viewMode={viewMode}
        />
      </section>

      {/* SECTION 06: CINEMATIC GALLERY */}
      <section
        className={`${
          isMobile ? 'py-14 px-5' : 'py-20 px-6 sm:px-10'
        } border-b border-[#D4AF37]/30`}
      >
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="font-script text-3xl sm:text-4xl text-[#D4AF37] block">
            Nocturne Memories
          </span>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            } tracking-[0.12em] uppercase font-light`}
          >
            Galeri Momen Berharga
          </h2>
          <div className="h-[1px] w-16 mx-auto bg-[#D4AF37]/60" />
        </div>

        <div
          className={`grid ${
            isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
          } gap-6 max-w-5xl mx-auto`}
        >
          {data.gallery.slice(1).map((imgUrl, i) => (
            <div
              key={imgUrl}
              className="p-2 rounded-2xl border border-[#D4AF37]/35 bg-[#141312] group hover:border-[#D4AF37] transition-colors duration-300"
            >
              <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#1A1A1D]">
                <img
                  src={imgUrl}
                  alt={`Dark Luxe Moment ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 07: DIGITAL ENVELOPE */}
      <section className="px-5 sm:px-10 border-b border-[#D4AF37]/30">
        <DigitalEnvelopeModule
          themeId="dark-luxe"
          accounts={data.digitalEnvelope}
          viewMode={viewMode}
        />
      </section>

      {/* SECTION 08: GUESTBOOK & RSVP */}
      <section className="px-5 sm:px-10 border-b border-[#D4AF37]/30">
        <GuestbookModule
          themeId="dark-luxe"
          initialEntries={initialGuestbookEntries}
          defaultGuestName={guestName}
          viewMode={viewMode}
        />
      </section>

      {/* FOOTER */}
      <footer className="py-14 px-6 text-center space-y-2">
        <p className="font-script text-4xl sm:text-5xl text-[#D4AF37]">
          {data.couple.groom.nickname} &amp; {data.couple.bride.nickname}
        </p>
        <p className="font-sans text-[10px] text-[#C87D55] uppercase tracking-[0.28em]">
          Terima Kasih Atas Doa &amp; Restu Anda
        </p>
      </footer>
    </article>
  );
}
