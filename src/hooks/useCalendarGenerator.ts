'use client';

import { useMemo, useCallback } from 'react';

export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startDateISO: string;
  endDateISO: string;
}

export interface UseCalendarGeneratorReturn {
  googleCalendarUrl: string;
  downloadIcsFile: () => void;
}

/**
 * Formats an ISO date string into UTC ICS timestamp format: YYYYMMDDTHHMMSSZ
 */
function formatToUTCStamp(isoString: string): string {
  const date = new Date(isoString);
  return date
    .toISOString()
    .replace(/-|:|\.\d{3}/g, '');
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

export function useCalendarGenerator(details: CalendarEventDetails): UseCalendarGeneratorReturn {
  const { title, description, location, startDateISO, endDateISO } = details;

  const startStamp = useMemo(() => formatToUTCStamp(startDateISO), [startDateISO]);
  const endStamp = useMemo(() => formatToUTCStamp(endDateISO), [endDateISO]);

  // Google Calendar direct web URL
  const googleCalendarUrl = useMemo(() => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${startStamp}/${endStamp}`,
      details: description,
      location: location,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [title, startStamp, endStamp, description, location]);

  // Downloadable .ics file for Apple Calendar, Outlook, and others
  const downloadIcsFile = useCallback(() => {
    if (typeof window === 'undefined') return;

    const nowStamp = formatToUTCStamp(new Date().toISOString());
    const safeDesc = escapeIcsText(description);
    const safeTitle = escapeIcsText(title);
    const safeLoc = escapeIcsText(location);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Arya & Kirana Wedding//Bespoke Invitation Engine//ID',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:wedding-${Date.now()}@bespoke-invitation.com`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART:${startStamp}`,
      `DTEND:${endStamp}`,
      `SUMMARY:${safeTitle}`,
      `DESCRIPTION:${safeDesc}`,
      `LOCATION:${safeLoc}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `${title.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase()}.ics`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [title, description, location, startStamp, endStamp]);

  return {
    googleCalendarUrl,
    downloadIcsFile,
  };
}
