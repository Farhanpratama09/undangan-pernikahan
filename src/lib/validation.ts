import { z } from 'zod';

export const DEFAULT_GUEST_NAME = 'Farhan & Partner';

/**
 * Safely resolves and validates the site base URL for metadataBase, sitemap, and robots.
 * Prevents TypeError: Invalid URL (ERR_INVALID_URL) during Vercel static page collection (e.g. /_not-found)
 * when NEXT_PUBLIC_SITE_URL is missing a protocol (https://), contains quotes/spaces, or is malformed.
 */
export function getSafeSiteUrl(): { url: URL; origin: string } {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const raw of candidates) {
    if (!raw || typeof raw !== 'string') continue;
    const cleaned = raw.trim().replace(/^['"]+|['"]+$/g, '').replace(/\/+$/, '');
    if (!cleaned || cleaned.includes(' ') || cleaned.startsWith('[')) continue;

    const withProtocol = /^https?:\/\//i.test(cleaned)
      ? cleaned
      : cleaned.startsWith('localhost') || cleaned.startsWith('127.0.0.1')
        ? `http://${cleaned}`
        : `https://${cleaned}`;

    try {
      const parsed = new URL(withProtocol);
      if (parsed.hostname && parsed.hostname.includes('.') || parsed.hostname === 'localhost') {
        return { url: new URL(parsed.origin), origin: parsed.origin };
      }
    } catch {
      // Continue to next candidate
    }
  }

  const fallback = new URL('http://localhost:3000');
  return { url: fallback, origin: fallback.origin };
}


/**
 * Strips HTML tags without cutting off benign text like "<3".
 */
export function stripHtmlTags(input: string): string {
  if (!input) return '';
  return input
    .replace(/<\/?[a-zA-Z][^>]*>/gm, '')
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Decodes a clean URL slug (e.g. "Farhan-dan-Partner", "Farhan-&-Partner", "Budi_Santoso")
 * into a human-readable guest name without requiring %20.
 */
export function decodeGuestSlugFromUrl(rawParam: string | null | undefined): string {
  if (!rawParam || typeof rawParam !== 'string') {
    return '';
  }
  const normalized = rawParam
    .replace(/[-_+]+&[-_+]+/g, ' & ')
    .replace(/[-_+]+/g, ' ');
  return sanitizeGuestInputRaw(normalized).replace(/\s+/g, ' ').trim();
}

/**
 * Encodes a guest name into a clean URL slug without %20 (e.g. "Farhan & Partner" -> "Farhan-&-Partner").
 */
export function encodeGuestSlugForUrl(guestName: string): string {
  return sanitizeGuestInputRaw(guestName)
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Sanitizes raw input value for controlled <input> fields (e.g. PortfolioCommandBar).
 * - Strips HTML tags
 * - Allows letters, numbers, spaces, dots, commas, apostrophes, ampersands (&), hyphens (-), and slashes (/)
 * - Does NOT trim trailing spaces so the user can type spaces naturally between words
 * - Does NOT return a fallback string when empty so the user can clear the input completely
 * - Truncates strictly at 35 characters
 */
export function sanitizeGuestInputRaw(rawInput: string | null | undefined): string {
  if (!rawInput || typeof rawInput !== 'string') {
    return '';
  }

  const withoutHtml = rawInput.replace(/<\/?[a-zA-Z][^>]*>/gm, '');
  const filtered = withoutHtml.replace(/[^a-zA-Z0-9 .,'&\-/]/g, '');
  return filtered.slice(0, 35);
}

/**
 * Sanitizes guest name extracted from URL query parameter (?to=) or derived for display.
 * - Converts URL slug separators (-, _, +) into spaces automatically (Clean Slug Decoder)
 * - Strips HTML tags and scripts
 * - Allows letters, numbers, spaces, dots, commas, apostrophes, ampersands (&), hyphens (-), and slashes (/)
 * - Truncates strictly at 35 characters
 * - Falls back to 'Farhan & Partner' if empty or invalid
 */
export function sanitizeGuestName(rawName: string | null | undefined): string {
  if (!rawName || typeof rawName !== 'string') {
    return DEFAULT_GUEST_NAME;
  }

  const decoded = rawName
    .replace(/[-_+]+&[-_+]+/g, ' & ')
    .replace(/[-_+]+/g, ' ');
  const cleaned = sanitizeGuestInputRaw(decoded).replace(/\s+/g, ' ').trim();
  return cleaned.length > 0 ? cleaned : DEFAULT_GUEST_NAME;
}

/**
 * Deterministic Indonesian full date formatter locked to Asia/Jakarta to prevent SSR hydration mismatch.
 * Example output: "Sabtu, 12 Desember 2026"
 */
export function formatIndoDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta',
    }).format(d);
  } catch {
    return '';
  }
}

/**
 * Deterministic time range formatter locked to Asia/Jakarta to prevent SSR hydration mismatch.
 * Example output: "08.00 — 10.30 WIB"
 */
export function formatTimeRange(startISO: string, endISO: string, tz: string): string {
  try {
    const fmt = new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta',
    });
    const start = fmt.format(new Date(startISO)).replace(':', '.');
    const end = fmt.format(new Date(endISO)).replace(':', '.');
    return `${start} — ${end} ${tz}`;
  } catch {
    return '';
  }
}

/**
 * Deterministic dot-separated date formatter locked to Asia/Jakarta (e.g. "12 . 12 . 2026").
 */
export function formatDotDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    const parts = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Jakarta',
    }).formatToParts(d);
    const day = parts.find((p) => p.type === 'day')?.value || '12';
    const month = parts.find((p) => p.type === 'month')?.value || '12';
    const year = parts.find((p) => p.type === 'year')?.value || '2026';
    return `${day} . ${month} . ${year}`;
  } catch {
    return '12 . 12 . 2026';
  }
}

/**
 * Deterministic guestbook timestamp formatter locked to Asia/Jakarta.
 */
export function formatEntryDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }).format(date);
  } catch {
    return '';
  }
}

/**
 * Zod schema for RSVP & Guestbook submissions.
 * Validates guest name, attendance status, pax count, message, and honeypot.
 * Automatically coerces pax to 0 if attendance is 'tidak_hadir'.
 */
export const guestbookSchema = z
  .object({
    guestName: z
      .string()
      .trim()
      .min(2, 'Nama minimal 2 karakter')
      .max(40, 'Nama maksimal 40 karakter')
      .transform(stripHtmlTags)
      .refine((val) => val.length >= 2, {
        message: 'Nama minimal 2 karakter valid',
      }),
    attendance: z.enum(['hadir', 'tidak_hadir', 'ragu'], {
      required_error: 'Pilih status kehadiran',
    }),
    pax: z.coerce
      .number({ invalid_type_error: 'Jumlah tamu harus berupa angka' })
      .int('Jumlah tamu harus bilangan bulat')
      .min(0, 'Minimal 0 tamu')
      .max(5, 'Maksimal 5 tamu'),
    message: z
      .string()
      .trim()
      .min(5, 'Pesan minimal 5 karakter')
      .max(300, 'Pesan maksimal 300 karakter')
      .transform(stripHtmlTags)
      .refine((val) => val.length >= 5, {
        message: 'Pesan minimal 5 karakter valid',
      }),
    honeypot: z
      .string()
      .max(0, 'Spam terdeteksi')
      .optional()
      .default(''),
  })
  .transform((data) => {
    // If attendance is 'tidak_hadir', force pax to 0
    if (data.attendance === 'tidak_hadir') {
      return {
        ...data,
        pax: 0,
      };
    }
    // If attending or undecided, ensure at least 1 pax
    return {
      ...data,
      pax: Math.max(1, Math.min(5, data.pax)),
    };
  });

export type GuestbookFormData = z.infer<typeof guestbookSchema>;
