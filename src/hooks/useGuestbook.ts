'use client';

import { useState, useEffect, useCallback } from 'react';
import { GuestbookEntry } from '@/types/invitation';
import { guestbookSchema } from '@/lib/validation';

const STORAGE_KEY_ENTRIES = 'wedding_guestbook_entries_v1';
const STORAGE_KEY_SUBMITTED = 'wedding_rsvp_submitted_v1';

export interface UseGuestbookReturn {
  entries: GuestbookEntry[];
  isLoading: boolean;
  isSubmitting: boolean;
  hasSubmitted: boolean;
  submitEntry: (formData: unknown) => Promise<{ success: boolean; error?: string }>;
  resetDemoLimit: () => void;
}

export function useGuestbook(initialEntries: GuestbookEntry[] = []): UseGuestbookReturn {
  // Deterministic initial state for SSR
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Read localStorage ONLY on client mount inside useEffect
  useEffect(() => {
    try {
      const storedSubmitted = localStorage.getItem(STORAGE_KEY_SUBMITTED);
      if (storedSubmitted === 'true') {
        setHasSubmitted(true);
      }

      const storedEntriesJson = localStorage.getItem(STORAGE_KEY_ENTRIES);
      if (storedEntriesJson) {
        const parsed = JSON.parse(storedEntriesJson) as GuestbookEntry[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
        }
      } else {
        // Seed initial entries if empty
        localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(initialEntries));
      }
    } catch {
      // LocalStorage unavailable (private mode or sandbox)
    } finally {
      setIsLoading(false);
    }
  }, [initialEntries]);

  // Reset limit for portfolio demo testing
  const resetDemoLimit = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY_SUBMITTED);
    } catch {}
    setHasSubmitted(false);
  }, []);

  // Submit RSVP & wish entry with optimistic update
  const submitEntry = useCallback(
    async (formData: unknown): Promise<{ success: boolean; error?: string }> => {
      // Check session limit
      if (hasSubmitted) {
        return {
          success: false,
          error: 'Anda sudah mengirimkan konfirmasi kehadiran sebelumnya.',
        };
      }

      setIsSubmitting(true);

      // Check honeypot before proceeding
      if (
        typeof formData === 'object' &&
        formData !== null &&
        'honeypot' in formData &&
        typeof (formData as { honeypot?: unknown }).honeypot === 'string' &&
        ((formData as { honeypot: string }).honeypot.trim().length > 0)
      ) {
        setIsSubmitting(false);
        return { success: true };
      }

      // Validate input using Zod schema
      const parseResult = guestbookSchema.safeParse(formData);
      if (!parseResult.success) {
        setIsSubmitting(false);
        const firstError = parseResult.error.errors[0]?.message || 'Data yang dimasukkan tidak valid.';
        return { success: false, error: firstError };
      }

      const validated = parseResult.data;

      let finalEntry: GuestbookEntry = {
        id: `gb-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        guestName: validated.guestName,
        attendance: validated.attendance,
        pax: validated.pax,
        message: validated.message,
        createdAt: new Date().toISOString(),
      };

      // Sync with API route if reachable
      try {
        const res = await fetch('/api/guestbook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(validated),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.entry?.id) {
            finalEntry = data.entry as GuestbookEntry;
          }
        }
      } catch {
        // Non-blocking fallback for offline/portfolio mode
      }

      // Update state & persist to localStorage
      setEntries((prev) => {
        const updated = [finalEntry, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(updated));
        } catch {}
        return updated;
      });

      // Mark submitted
      setHasSubmitted(true);
      try {
        localStorage.setItem(STORAGE_KEY_SUBMITTED, 'true');
      } catch {}

      setIsSubmitting(false);
      return { success: true };
    },
    [hasSubmitted]
  );

  return {
    entries,
    isLoading,
    isSubmitting,
    hasSubmitted,
    submitEntry,
    resetDemoLimit,
  };
}
