'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseAudioControllerReturn {
  isPlaying: boolean;
  isMuted: boolean;
  hasInteracted: boolean;
  playFromGate: () => Promise<void>;
  stopAndReset: () => void;
  togglePlay: () => void;
  unlockAndPlay: () => Promise<void>;
  togglePlayPause: () => void;
  toggleMute: () => void;
  pauseAudio: () => void;
  playAudio: () => Promise<void>;
  resetAudio: () => void;
}

export function useAudioController(srcUrl: string): UseAudioControllerReturn {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasInteractedRef = useRef<boolean>(false);
  const wasPlayingBeforeHiddenRef = useRef<boolean>(false);

  // Initialize audio element ONCE per srcUrl — never re-run when gate/interaction state changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio(srcUrl);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Auto pause on tab hidden, auto resume when visible
    const handleVisibilityChange = () => {
      const currentAudio = audioRef.current;
      if (!currentAudio || !hasInteractedRef.current) return;

      if (document.hidden) {
        if (!currentAudio.paused) {
          wasPlayingBeforeHiddenRef.current = true;
          currentAudio.pause();
        } else {
          wasPlayingBeforeHiddenRef.current = false;
        }
      } else {
        if (wasPlayingBeforeHiddenRef.current) {
          currentAudio.loop = true;
          currentAudio.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [srcUrl]);

  // Smooth volume ramp towards targetVolume without stopping playback
  const fadeInVolume = useCallback((targetVolume: number = 0.8, durationMs: number = 1500) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const steps = 25;
    const intervalTime = durationMs / steps;
    let currentVol = 0.05;
    const volumeStep = (targetVolume - currentVol) / steps;
    audio.volume = currentVol;

    fadeIntervalRef.current = setInterval(() => {
      const activeAudio = audioRef.current;
      if (!activeAudio || activeAudio.paused) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        return;
      }
      currentVol = Math.min(targetVolume, currentVol + volumeStep);
      activeAudio.volume = currentVol;

      if (currentVol >= targetVolume) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, intervalTime);
  }, []);

  // Explicitly called when user opens the TactileGate ("Buka Undangan")
  const playFromGate = useCallback(async () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const audio = audioRef.current;
    if (!audio) return;

    try {
      hasInteractedRef.current = true;
      setHasInteracted(true);
      audio.loop = true;
      audio.muted = false;
      setIsMuted(false);

      if (audio.paused) {
        audio.volume = 0.05;
        await audio.play();
      }
      setIsPlaying(true);
      fadeInVolume(0.8, 1500);
    } catch {
      setIsPlaying(false);
    }
  }, [fadeInVolume]);

  // Explicitly called ONLY when user presses "Re-lock" in PortfolioCommandBar
  const stopAndReset = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0.8;
    setIsPlaying(false);
    hasInteractedRef.current = false;
    setHasInteracted(false);
    wasPlayingBeforeHiddenRef.current = false;
  }, []);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      hasInteractedRef.current = true;
      setHasInteracted(true);
      audio.loop = true;
      if (audio.volume < 0.2) {
        audio.volume = 0.8;
      }
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pauseAudio = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  // Pure manual Pause / Resume toggle from Command Bar
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [pauseAudio, playAudio]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  return {
    isPlaying,
    isMuted,
    hasInteracted,
    playFromGate,
    stopAndReset,
    togglePlay,
    unlockAndPlay: playFromGate,
    togglePlayPause: togglePlay,
    toggleMute,
    pauseAudio,
    playAudio,
    resetAudio: stopAndReset,
  };
}
