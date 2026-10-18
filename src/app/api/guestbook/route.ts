import { NextRequest, NextResponse } from 'next/server';
import { guestbookSchema } from '@/lib/validation';
import { initialGuestbookEntries } from '@/lib/dummy-data';
import { GuestbookEntry } from '@/types/invitation';

const MAX_IN_MEMORY_ENTRIES = 100;
const MAX_RATE_LIMIT_KEYS = 500;
const MAX_BODY_BYTES = 4096;

// In-memory mock database initialized with realistic dummy entries
let inMemoryEntries: GuestbookEntry[] = [...initialGuestbookEntries];

// Bounded in-memory IP rate limiter: max 5 requests per 60 seconds per IP
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Prune expired records if map grows large
  if (rateLimitMap.size >= MAX_RATE_LIMIT_KEYS) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetAt) {
        rateLimitMap.delete(key);
      }
    }
    // If still full, evict the oldest entry
    if (rateLimitMap.size >= MAX_RATE_LIMIT_KEYS) {
      const oldestKey = rateLimitMap.keys().next().value;
      if (oldestKey) rateLimitMap.delete(oldestKey);
    }
  }

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 });
    return false;
  }

  if (record.count >= 5) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      entries: inMemoryEntries,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    // 1. Payload size guard to prevent memory DoS
    const contentLength = Number(request.headers.get('content-length') || '0');
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ukuran data terlalu besar.',
        },
        { status: 413 }
      );
    }

    // 2. IP extraction & Rate limiting
    const ip =
      request.headers.get('x-real-ip')?.trim() ||
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Terlalu banyak permintaan. Mohon tunggu 1 menit sebelum mencoba kembali.',
        },
        { status: 429 }
      );
    }

    const rawText = await request.text();
    if (rawText.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ukuran data terlalu besar.',
        },
        { status: 413 }
      );
    }

    const body = JSON.parse(rawText);

    // 3. Honeypot check (Silent bot trap)
    if (body && typeof body.honeypot === 'string' && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'Pesan berhasil diterima.',
        },
        { status: 200 }
      );
    }

    // 4. Validation with Zod schema
    const parseResult = guestbookSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError =
        parseResult.error.errors[0]?.message || 'Data yang dimasukkan tidak valid.';
      return NextResponse.json(
        {
          success: false,
          error: firstError,
        },
        { status: 400 }
      );
    }

    const validated = parseResult.data;

    // 5. Construct GuestbookEntry
    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      guestName: validated.guestName,
      attendance: validated.attendance,
      pax: validated.pax,
      message: validated.message,
      createdAt: new Date().toISOString(),
    };

    // 6. Prepend to bounded in-memory store
    inMemoryEntries = [newEntry, ...inMemoryEntries].slice(0, MAX_IN_MEMORY_ENTRIES);

    return NextResponse.json(
      {
        success: true,
        entry: newEntry,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Terjadi kesalahan server internal saat menyimpan ucapan.',
      },
      { status: 500 }
    );
  }
}
