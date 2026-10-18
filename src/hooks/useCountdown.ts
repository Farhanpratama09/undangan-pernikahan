'use client';

import { useState, useEffect } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isMounted: boolean;
  isEventPassed: boolean;
}

const INITIAL_COUNTDOWN: CountdownTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isMounted: false,
  isEventPassed: false,
};

export function useCountdown(targetDateISO: string): CountdownTime {
  // Deterministic initial state to prevent any SSR / Hydration mismatch
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(INITIAL_COUNTDOWN);

  useEffect(() => {
    const calculateTimeRemaining = (): CountdownTime => {
      const targetTime = new Date(targetDateISO).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (isNaN(targetTime) || difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isMounted: true,
          isEventPassed: true,
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return {
        days,
        hours,
        minutes,
        seconds,
        isMounted: true,
        isEventPassed: false,
      };
    };

    // Calculate immediately on mount
    setTimeLeft(calculateTimeRemaining());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateISO]);

  return timeLeft;
}
