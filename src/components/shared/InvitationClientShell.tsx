"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Play, Pause, Volume2, VolumeX, SlidersHorizontal } from 'lucide-react';
import { ThemeId } from '@/types/invitation';
import { portfolioWeddingData, initialGuestbookEntries } from '@/lib/dummy-data';
import {
  DEFAULT_GUEST_NAME,
  sanitizeGuestName,
  sanitizeGuestInputRaw,
  decodeGuestSlugFromUrl,
  encodeGuestSlugForUrl,
  formatDotDate,
} from '@/lib/validation';
import { useAudioController } from '@/hooks/useAudioController';
import { TactileGate } from '@/components/shared/TactileGate';
import { PortfolioCommandBar } from '@/components/shared/PortfolioCommandBar';
import { EditorialMinimalistTheme } from '@/components/themes/EditorialMinimalist';
import { DarkLuxeTheme } from '@/components/themes/DarkLuxe';
import { ModernHeritageTheme } from '@/components/themes/ModernHeritage';

interface InvitationClientShellProps {
  initialGuestName?: string;
  initialTheme?: ThemeId;
}

export function InvitationClientShell({
  initialGuestName = DEFAULT_GUEST_NAME,
  initialTheme = 'editorial',
}: InvitationClientShellProps) {
  const searchParams = useSearchParams();
  const rawParamTo = searchParams.get('to');
  const urlModeLive = searchParams.get('mode') === 'live';

  // Real-time reactive states
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(initialTheme);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(urlModeLive);
  const [rawGuestInput, setRawGuestInput] = useState<string>(() => {
    if (rawParamTo !== null) {
      const decoded = decodeGuestSlugFromUrl(rawParamTo);
      return decoded.length > 0 ? decoded : DEFAULT_GUEST_NAME;
    }
    return sanitizeGuestInputRaw(initialGuestName) || DEFAULT_GUEST_NAME;
  });
  const [isGateLocked, setIsGateLocked] = useState<boolean>(true);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [isRealMobileDevice, setIsRealMobileDevice] = useState<boolean>(false);
  const [rsvpResetKey, setRsvpResetKey] = useState<number>(0);

  const mobileScrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLiveMode(urlModeLive);
  }, [urlModeLive]);

  // Detect real mobile viewport (< 768px) so we never wrap a physical phone screen inside a fake phone bezel
  useEffect(() => {
    const checkViewportWidth = () => {
      const mobile = window.innerWidth < 768;
      setIsRealMobileDevice(mobile);
      if (mobile) {
        setIsMobileFrame(false);
      }
    };

    checkViewportWidth();
    window.addEventListener('resize', checkViewportWidth);
    return () => window.removeEventListener('resize', checkViewportWidth);
  }, []);

  // Track whether the user is actively editing the input to prevent URL sync loop
  const isInternalUrlUpdateRef = useRef<boolean>(false);

  // Sync from external URL parameter changes only
  useEffect(() => {
    if (isInternalUrlUpdateRef.current) {
      isInternalUrlUpdateRef.current = false;
      return;
    }
    if (rawParamTo !== null) {
      const decoded = decodeGuestSlugFromUrl(rawParamTo);
      if (decoded.length > 0) {
        setRawGuestInput(decoded);
      }
    }
  }, [rawParamTo]);

  // Derived guestName for TactileGate and Theme components:
  const displayGuestName = sanitizeGuestName(rawGuestInput);

  // Sync clean URL helper
  const syncCleanUrl = useCallback((cleanedRaw: string, liveFlag: boolean) => {
    if (typeof window !== 'undefined') {
      isInternalUrlUpdateRef.current = true;
      const slug = encodeGuestSlugForUrl(cleanedRaw);
      const params: string[] = [];
      if (slug && cleanedRaw.trim() !== DEFAULT_GUEST_NAME) {
        params.push(`to=${slug}`);
      }
      if (liveFlag) {
        params.push('mode=live');
      }
      const nextUrl =
        params.length > 0
          ? `${window.location.pathname}?${params.join('&')}`
          : window.location.pathname;
      window.history.replaceState(null, '', nextUrl);
    }
  }, []);

  // Handle guest name typing in PortfolioCommandBar + clean URL replaceState without %20 or &theme=
  const handleGuestNameChange = useCallback(
    (val: string) => {
      const cleanedRaw = sanitizeGuestInputRaw(val);
      setRawGuestInput(cleanedRaw);
      syncCleanUrl(cleanedRaw, isLiveMode);
    },
    [isLiveMode, syncCleanUrl]
  );

  const handleToggleLiveMode = useCallback(
    (nextLive: boolean) => {
      setIsLiveMode(nextLive);
      syncCleanUrl(rawGuestInput, nextLive);
    },
    [rawGuestInput, syncCleanUrl]
  );

  // Audio Controller Hook
  const {
    isPlaying: isPlayingAudio,
    isMuted: isMutedAudio,
    playFromGate,
    stopAndReset,
    togglePlay,
    toggleMute,
  } = useAudioController(portfolioWeddingData.audio.srcUrl);

  // Open gate handler ("Buka Undangan" button)
  const handleOpenInvitation = useCallback(async () => {
    setIsGateLocked(false);
    await playFromGate();
  }, [playFromGate]);

  // Re-lock gate handler ("Kunci Amplop" button in Command Bar)
  const handleRelockGate = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mobileScrollContainerRef.current) {
      mobileScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsGateLocked(true);
    stopAndReset();
  }, [stopAndReset]);

  // Reset RSVP limit handler
  const handleResetRsvpLimit = useCallback(() => {
    try {
      localStorage.removeItem('wedding_rsvp_submitted_v1');
    } catch {}
    setRsvpResetKey((prev) => prev + 1);
  }, []);

  // Root theme background matching the 3 overhauled palettes
  const themeBackground = {
    editorial: 'bg-[#F6F2EA] text-[#231C18]',
    'dark-luxe': 'bg-[#0D0C0B] text-[#F2ECE4]',
    heritage: 'bg-[#F4EFEA] text-[#2B211E]',
  }[currentTheme];

  const coupleTitle = `${portfolioWeddingData.couple.groom.nickname} & ${portfolioWeddingData.couple.bride.nickname}`;
  const formattedEventDate = formatDotDate(portfolioWeddingData.events.akad.dateISO);

  // On real mobile devices (< 768px), never render the fake phone bezel mockup
  const effectiveMobileFrame = !isRealMobileDevice && !isLiveMode && isMobileFrame;
  const viewMode = effectiveMobileFrame || isRealMobileDevice ? 'mobile' : 'desktop';
  const showCommandBar = portfolioWeddingData.isPortfolioDemo && !isLiveMode;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${themeBackground} relative selection:bg-current selection:text-white`}
    >
      {/* 1. Tactile Gate when in Full Viewport Mode (Desktop or Real Mobile Device) */}
      {!effectiveMobileFrame && (
        <TactileGate
          themeId={currentTheme}
          coupleTitle={coupleTitle}
          eventDate={formattedEventDate}
          guestName={displayGuestName}
          isLocked={isGateLocked}
          onOpenInvitation={handleOpenInvitation}
          isMobileFrame={false}
        />
      )}

      {/* 2. Floating Glass Capsule Dock Command Bar (Always Z-[60], hidden when ?mode=live) */}
      {showCommandBar && (
        <PortfolioCommandBar
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          guestName={rawGuestInput}
          onGuestNameChange={handleGuestNameChange}
          isMobileFrame={effectiveMobileFrame}
          onToggleMobileFrame={setIsMobileFrame}
          onRelockGate={handleRelockGate}
          isPlayingAudio={isPlayingAudio}
          isMutedAudio={isMutedAudio}
          onTogglePlayAudio={togglePlay}
          onToggleMuteAudio={toggleMute}
          onResetRsvpLimit={handleResetRsvpLimit}
          onActivateLiveMode={() => handleToggleLiveMode(true)}
        />
      )}

      {/* 2B. Minimal Floating Audio Control Pill when in Pure Client Preview (?mode=live) */}
      {isLiveMode && !isGateLocked && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-1 p-1.5 rounded-full border border-[#D4AF37]/50 bg-neutral-950/90 text-[#F6F2EA] shadow-2xl backdrop-blur-md">
          <button
            type="button"
            onClick={togglePlay}
            title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
            aria-label={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
            className="p-2 rounded-full hover:text-[#D4AF37] transition cursor-pointer"
          >
            {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            title={isMutedAudio ? 'Nyalakan Suara' : 'Bisukan Suara'}
            aria-label={isMutedAudio ? 'Nyalakan Suara' : 'Bisukan Suara'}
            className="p-2 rounded-full hover:text-[#D4AF37] transition cursor-pointer"
          >
            {isMutedAudio ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
          {portfolioWeddingData.isPortfolioDemo && (
            <button
              type="button"
              onClick={() => handleToggleLiveMode(false)}
              title="Tampilkan Kembali Command Bar"
              aria-label="Tampilkan Command Bar"
              className="p-2 rounded-full border-l border-white/15 pl-2.5 text-[#D4AF37] hover:text-white transition cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* 3. Main Container / Mobile Phone Frame Simulation (Only on Desktop when Mobile Frame is active) */}
      <div
        className={`mx-auto transition-all duration-300 relative ${
          effectiveMobileFrame
            ? 'max-w-[430px] my-6 border-[8px] border-[#27272A] rounded-[44px] shadow-2xl overflow-hidden h-[820px] max-h-[82vh] flex flex-col bg-inherit'
            : 'max-w-5xl px-0 sm:px-8 py-0 sm:py-8'
        }`}
      >
        {/* Mobile Device Status Bar Mockup & Dynamic Island ONLY when Desktop Mobile Frame is active */}
        {effectiveMobileFrame && (
          <div className="w-full shrink-0 bg-[#1A1A1D] text-white/80 px-6 py-2.5 flex items-center justify-between text-[11px] font-sans font-medium select-none z-50 relative border-b border-white/5">
            <span>09:41</span>
            {/* Dynamic Island Pill */}
            <div className="w-20 h-4 bg-black rounded-full border border-white/10" />
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2 border border-current rounded-sm p-0.5">
                <div className="w-full h-full bg-current" />
              </div>
            </div>
          </div>
        )}

        {/* Inner Viewport Wrapper (Scrollable inside 430px phone screen, or natural document flow) */}
        <div
          ref={mobileScrollContainerRef}
          className={
            effectiveMobileFrame
              ? `flex-1 relative custom-scrollbar ${isGateLocked ? 'overflow-hidden' : 'overflow-y-auto'}`
              : 'relative'
          }
        >
          {/* Tactile Gate Framed Inside Smartphone Container when in Desktop Mobile Frame Mode */}
          {effectiveMobileFrame && (
            <TactileGate
              themeId={currentTheme}
              coupleTitle={coupleTitle}
              eventDate={formattedEventDate}
              guestName={displayGuestName}
              isLocked={isGateLocked}
              onOpenInvitation={handleOpenInvitation}
              isMobileFrame={true}
            />
          )}

          {/* 4. Active Theme Presentation */}
          <main
            key={`${currentTheme}-${rsvpResetKey}`}
            className={showCommandBar && !effectiveMobileFrame ? 'pb-32' : 'pb-12'}
          >
            {currentTheme === 'editorial' && (
              <EditorialMinimalistTheme
                data={portfolioWeddingData}
                guestName={displayGuestName}
                viewMode={viewMode}
                initialGuestbookEntries={initialGuestbookEntries}
                isPlayingAudio={isPlayingAudio}
                onTogglePlayAudio={togglePlay}
              />
            )}

            {currentTheme === 'dark-luxe' && (
              <DarkLuxeTheme
                data={portfolioWeddingData}
                guestName={displayGuestName}
                viewMode={viewMode}
                initialGuestbookEntries={initialGuestbookEntries}
                isPlayingAudio={isPlayingAudio}
                onTogglePlayAudio={togglePlay}
              />
            )}

            {currentTheme === 'heritage' && (
              <ModernHeritageTheme
                data={portfolioWeddingData}
                guestName={displayGuestName}
                viewMode={viewMode}
                initialGuestbookEntries={initialGuestbookEntries}
                isPlayingAudio={isPlayingAudio}
                onTogglePlayAudio={togglePlay}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
