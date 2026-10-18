"use client";

import React from 'react';
import { Calendar, Download, Instagram, ArrowDownRight, Sparkles } from 'lucide-react';
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

export function EditorialMinimalistTheme({
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
    <article
      className={`w-full bg-[#F6F2EA] text-[#231C18] font-sans antialiased selection:bg-[#231C18] selection:text-[#F6F2EA] ${
        isMobile ? 'px-5' : 'px-6 sm:px-10'
      }`}
    >
      {/* SECTION 00: AREONE FINE PAPER & SIGNATURE SCRIPT HERO */}
      <header className="border-b border-[#E2D9C8] pb-14 pt-8 text-center">
        {/* Top Fine Paper Masthead Bar */}
        <div className="flex items-center justify-between border-y border-[#E2D9C8] py-2.5 mb-8 font-sans text-[10px] tracking-[0.25em] uppercase text-[#524F4A]">
          <span>The Wedding Edition</span>
          <span className="font-serif italic text-xs tracking-[0.18em] text-[#6F4E26] font-semibold">
            12 Desember 2026
          </span>
          <span>Jakarta, ID</span>
        </div>

        {/* Script Signature Couple Names Over Clean Editorial Portrait Frame */}
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#6F4E26] mb-2">
            Together With Their Beloved Families
          </p>

          {/* Signature Script Names */}
          <h1
            className={`font-script text-[#231C18] ${
              isMobile ? 'text-5xl' : 'text-6xl sm:text-7xl md:text-8xl'
            } leading-none mb-2 relative z-10`}
          >
            {data.couple.groom.nickname}{' '}
            <span className="font-serif italic text-3xl sm:text-5xl text-[#6F4E26]">&amp;</span>{' '}
            {data.couple.bride.nickname}
          </h1>

          <p className="font-serif tracking-[0.18em] uppercase text-xs sm:text-sm text-[#524F4A] mb-6">
            Invite You To Share In Their Joy
          </p>

          {/* Clean-Bordered Editorial Cover Photo */}
          <div className="p-2 sm:p-3 bg-[#FAF7F0] border border-[#E2D9C8] shadow-sm rounded-2xl mb-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#EAE3D5]">
              <img
                src={data.gallery[0]}
                alt="Editorial Cover Couple"
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
                className="w-full h-full object-cover contrast-[1.03] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Double-Bordered Date Badge & Guest Greeting Card */}
          <div
            className={`grid ${
              isMobile ? 'grid-cols-1 gap-5' : 'grid-cols-1 md:grid-cols-12 gap-6'
            } items-center text-left bg-[#FAF7F0] border border-[#E2D9C8] rounded-2xl p-5 sm:p-7`}
          >
            {/* Double-framed Date Badge */}
            <div
              className={`${
                isMobile ? 'col-span-1' : 'md:col-span-5'
              } p-1 border border-[#6F4E26]/60 rounded-xl bg-white text-center`}
            >
              <div className="py-4 px-3 border border-[#E2D9C8] rounded-lg">
                <span className="font-serif italic text-xs tracking-[0.15em] text-[#6F4E26] block mb-1">
                  Sabtu Legi
                </span>
                <span className="font-serif text-xl sm:text-2xl tracking-[0.14em] uppercase font-semibold text-[#231C18] block">
                  12 Desember 2026
                </span>
                <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-[#524F4A] block mt-1.5">
                  {data.location.venueName}
                </span>
              </div>
            </div>

            {/* Guest Honor Box + Quick RSVP Button */}
            <div
              className={`${
                isMobile ? 'col-span-1 text-center' : 'md:col-span-7 md:pl-2'
              } space-y-3`}
            >
              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6F4E26]">
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>
                <p className="font-serif text-2xl sm:text-3xl font-medium text-[#231C18] mt-0.5 break-words">
                  {guestName}
                </p>
              </div>
              <p className="font-sans text-xs text-[#524F4A] leading-relaxed">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
                berkenan hadir dan memberikan doa restu.
              </p>
              <div className="pt-1">
                <a
                  href="#rsvp-section"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#231C18] text-[#F6F2EA] hover:bg-[#382D27] font-sans text-xs font-medium tracking-[0.14em] uppercase transition"
                >
                  <span>Konfirmasi Kehadiran</span>
                  <ArrowDownRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 01: PROFIL MEMPELAI & OUR SONG */}
      <section className="py-14 border-b border-[#E2D9C8]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-script text-3xl sm:text-4xl text-[#6F4E26] block mb-1">
            The Bride &amp; Groom
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.12em] uppercase font-normal text-[#231C18]">
            Pasangan Mempelai
          </h2>
        </div>

        <div
          className={`grid ${
            isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 gap-8'
          }`}
        >
          {/* Groom Card */}
          <div className="rounded-2xl border border-[#E2D9C8] p-6 bg-[#FAF7F0] flex flex-col justify-between shadow-sm">
            <div>
              <div className="aspect-[4/5] w-full overflow-hidden rounded-xl mb-6 border border-[#E2D9C8] bg-[#EAE3D5]">
                <img
                  src={data.couple.groom.photoUrl}
                  alt={data.couple.groom.fullName}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="font-script text-3xl text-[#6F4E26] block">
                {data.couple.groom.nickname}
              </span>
              <h3
                className={`font-serif ${
                  isMobile ? 'text-xl' : 'text-2xl'
                } font-medium tracking-wide text-[#231C18] mb-3`}
              >
                {data.couple.groom.fullName}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#524F4A] leading-relaxed mb-6">
                Putra tercinta dari pasangan: <br />
                <strong className="text-[#231C18] font-medium">{data.couple.groom.fatherName}</strong>
                <br />
                &amp;{' '}
                <strong className="text-[#231C18] font-medium">{data.couple.groom.motherName}</strong>
              </p>
            </div>
            <a
              href={`https://instagram.com/${data.couple.groom.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-serif italic text-sm text-[#6F4E26] hover:text-[#231C18] transition"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{data.couple.groom.instagramHandle}</span>
            </a>
          </div>

          {/* Bride Card */}
          <div className="rounded-2xl border border-[#E2D9C8] p-6 bg-[#FAF7F0] flex flex-col justify-between shadow-sm">
            <div>
              <div className="aspect-[4/5] w-full overflow-hidden rounded-xl mb-6 border border-[#E2D9C8] bg-[#EAE3D5]">
                <img
                  src={data.couple.bride.photoUrl}
                  alt={data.couple.bride.fullName}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="font-script text-3xl text-[#6F4E26] block">
                {data.couple.bride.nickname}
              </span>
              <h3
                className={`font-serif ${
                  isMobile ? 'text-xl' : 'text-2xl'
                } font-medium tracking-wide text-[#231C18] mb-3`}
              >
                {data.couple.bride.fullName}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#524F4A] leading-relaxed mb-6">
                Putri tercinta dari pasangan: <br />
                <strong className="text-[#231C18] font-medium">{data.couple.bride.fatherName}</strong>
                <br />
                &amp;{' '}
                <strong className="text-[#231C18] font-medium">{data.couple.bride.motherName}</strong>
              </p>
            </div>
            <a
              href={`https://instagram.com/${data.couple.bride.instagramHandle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-serif italic text-sm text-[#6F4E26] hover:text-[#231C18] transition"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{data.couple.bride.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Inline "Our Song" Card */}
        <div className="mt-10">
          <InlineSongCard
            themeId="editorial"
            title={data.audio.title}
            artist={data.audio.artist}
            isPlaying={isPlayingAudio}
            onTogglePlay={onTogglePlayAudio}
          />
        </div>
      </section>

      {/* SECTION 02: COUNTDOWN, AKAD/RESEPSI & WAVY CALENDAR TIMELINE */}
      <section className="py-14 border-b border-[#E2D9C8]">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="font-script text-3xl sm:text-4xl text-[#6F4E26] block mb-1">
            Counting the Moments
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.12em] uppercase font-normal text-[#231C18]">
            Menuju Hari Bahagia
          </h2>
        </div>

        {/* Fine Paper Countdown Box */}
        <div
          className={`rounded-2xl border border-[#E2D9C8] ${
            isMobile ? 'p-5' : 'p-6 sm:p-8'
          } bg-[#FAF7F0] mb-8`}
        >
          <p className="font-serif italic text-sm sm:text-base tracking-wide text-[#6F4E26] mb-5 text-center">
            {countdown.isMounted && countdown.isEventPassed
              ? 'Acara Pernikahan Telah Berlangsung'
              : formatIndoDate(data.events.akad.dateISO)}
          </p>
          <div
            className={`grid ${
              isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-4'
            } text-center`}
          >
            {[
              { val: countdown.days, label: 'Hari' },
              { val: countdown.hours, label: 'Jam' },
              { val: countdown.minutes, label: 'Menit' },
              { val: countdown.seconds, label: 'Detik' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-xl border border-[#E2D9C8] bg-white shadow-sm"
              >
                <span
                  className={`font-serif ${
                    isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'
                  } font-light text-[#231C18] block`}
                >
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#6F4E26] mt-1 block">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Akad & Reception Cards */}
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 gap-6'
          } mb-8`}
        >
          {/* Akad Nikah */}
          <div className="rounded-2xl border border-[#E2D9C8] p-6 sm:p-8 bg-[#FAF7F0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-3 mb-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#6F4E26]">
                  Sesi Pertama • Sakral
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#6F4E26]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide mb-2">
                {data.events.akad.title}
              </h3>
              <p className="font-serif text-base text-[#231C18] mb-0.5">
                {formatIndoDate(data.events.akad.dateISO)}
              </p>
              <p className="font-serif italic text-base text-[#6F4E26] mb-4">
                Pukul{' '}
                {formatTimeRange(
                  data.events.akad.dateISO,
                  data.events.akad.endTimeISO,
                  data.events.akad.timezoneLabel
                )}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#524F4A] leading-relaxed mb-6">
                {data.events.akad.description}
              </p>
            </div>

            <div className={`flex flex-col ${isMobile ? '' : 'sm:flex-row'} gap-2 pt-4 border-t border-[#E2D9C8]`}>
              <a
                href={akadCalendar.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full border border-[#231C18] bg-[#231C18] text-[#F6F2EA] hover:bg-[#382D27] text-xs font-sans font-medium uppercase tracking-wider transition"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Simpan Kalender</span>
              </a>
              <button
                type="button"
                onClick={akadCalendar.downloadIcsFile}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full border border-[#D8CEBE] bg-white text-[#231C18] hover:bg-[#EFE9DD] text-xs font-sans font-medium uppercase tracking-wider transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .ICS</span>
              </button>
            </div>
          </div>

          {/* Resepsi Pernikahan */}
          <div className="rounded-2xl border border-[#E2D9C8] p-6 sm:p-8 bg-[#FAF7F0] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-3 mb-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#6F4E26]">
                  Sesi Kedua • Perayaan
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#6F4E26]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide mb-2">
                {data.events.reception.title}
              </h3>
              <p className="font-serif text-base text-[#231C18] mb-0.5">
                {formatIndoDate(data.events.reception.dateISO)}
              </p>
              <p className="font-serif italic text-base text-[#6F4E26] mb-4">
                Pukul{' '}
                {formatTimeRange(
                  data.events.reception.dateISO,
                  data.events.reception.endTimeISO,
                  data.events.reception.timezoneLabel
                )}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#524F4A] leading-relaxed mb-6">
                {data.events.reception.description}
              </p>
            </div>

            <div className={`flex flex-col ${isMobile ? '' : 'sm:flex-row'} gap-2 pt-4 border-t border-[#E2D9C8]`}>
              <a
                href={receptionCalendar.googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full border border-[#231C18] bg-[#231C18] text-[#F6F2EA] hover:bg-[#382D27] text-xs font-sans font-medium uppercase tracking-wider transition"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Simpan Kalender</span>
              </a>
              <button
                type="button"
                onClick={receptionCalendar.downloadIcsFile}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full border border-[#D8CEBE] bg-white text-[#231C18] hover:bg-[#EFE9DD] text-xs font-sans font-medium uppercase tracking-wider transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .ICS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Monthly Calendar Date Strip & Wavy S-Curve Timeline */}
        <WeddingTimelineModule
          themeId="editorial"
          variant="wavy"
          coupleNickname={coupleNickname}
          venueName={data.location.venueName}
          fullAddress={data.location.fullAddress}
          akadEvent={data.events.akad}
          rundown={data.rundown}
          viewMode={viewMode}
        />
      </section>

      {/* SECTION 03: LOVE STORY */}
      <section className="py-14 border-b border-[#E2D9C8]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-script text-3xl sm:text-4xl text-[#6F4E26] block mb-1">
            Our Journey
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.12em] uppercase font-normal text-[#231C18]">
            Kisah Perjalanan Cinta
          </h2>
        </div>

        <div className="space-y-5">
          {data.loveStory.map((item, idx) => (
            <div
              key={item.year}
              className={`${
                isMobile ? 'p-5' : 'p-6 sm:p-8'
              } rounded-2xl border border-[#E2D9C8] bg-[#FAF7F0] grid ${
                isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-12 gap-6'
              } items-center`}
            >
              <div
                className={
                  isMobile
                    ? 'col-span-1 border-b border-[#E2D9C8] pb-2'
                    : 'col-span-1 md:col-span-3 border-r border-[#E2D9C8] pr-4'
                }
              >
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#6F4E26] uppercase block">
                  Babak 0{idx + 1}
                </span>
                <span className="font-serif italic text-3xl sm:text-4xl text-[#231C18]">
                  {item.year}
                </span>
              </div>
              <div className={isMobile ? 'col-span-1' : 'col-span-1 md:col-span-9'}>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#231C18] mb-1.5">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#524F4A] leading-relaxed">
                  {item.story}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04: VENUE SKETCH, TAGS, DENAH & NAVIGATION */}
      <section className="border-b border-[#E2D9C8]">
        <HybridLocationModule
          themeId="editorial"
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

      {/* SECTION 05: DRESS CODE & INTERACTIVE SWATCHES */}
      <section className="border-b border-[#E2D9C8]">
        <DressCodeModule
          themeId="editorial"
          dressCode={data.dressCode}
          viewMode={viewMode}
        />
      </section>

      {/* SECTION 06: EDITORIAL GALLERY */}
      <section className="py-14 border-b border-[#E2D9C8]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-script text-3xl sm:text-4xl text-[#6F4E26] block mb-1">
            Captured Moments
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.12em] uppercase font-normal text-[#231C18]">
            Galeri Potret Kebahagiaan
          </h2>
        </div>

        <div
          className={`grid ${
            isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
          } gap-5`}
        >
          {data.gallery.slice(1).map((imgUrl, i) => (
            <div
              key={imgUrl}
              className="rounded-2xl border border-[#E2D9C8] p-2 bg-[#FAF7F0] shadow-sm flex flex-col justify-between"
            >
              <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#EAE3D5]">
                <img
                  src={imgUrl}
                  alt={`Editorial Gallery ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="pt-2.5 pb-1 px-2 flex items-center justify-between font-serif italic text-xs text-[#6F4E26]">
                <span>Potret 0{i + 1}</span>
                <span>Arya &amp; Kirana</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 07: DIGITAL ENVELOPE */}
      <section className="border-b border-[#E2D9C8]">
        <DigitalEnvelopeModule
          themeId="editorial"
          accounts={data.digitalEnvelope}
          viewMode={viewMode}
        />
      </section>

      {/* SECTION 08: GUESTBOOK & HIGH-CONTRAST DARK RSVP */}
      <section className="border-b border-[#E2D9C8]">
        <GuestbookModule
          themeId="editorial"
          initialEntries={initialGuestbookEntries}
          defaultGuestName={guestName}
          viewMode={viewMode}
        />
      </section>

      {/* FOOTER */}
      <footer className="py-14 text-center space-y-2">
        <p className="font-script text-4xl sm:text-5xl text-[#6F4E26]">
          {data.couple.groom.nickname} &amp; {data.couple.bride.nickname}
        </p>
        <p className="font-sans text-[10px] sm:text-xs text-[#524F4A] uppercase tracking-[0.25em]">
          Terima Kasih Atas Doa &amp; Kehadiran Anda
        </p>
      </footer>
    </article>
  );
}
