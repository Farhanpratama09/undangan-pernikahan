import { Suspense } from 'react';
import type { Metadata } from 'next';
import { portfolioWeddingData } from '@/lib/dummy-data';
import { sanitizeGuestName, sanitizeGuestInputRaw, encodeGuestSlugForUrl } from '@/lib/validation';
import { InvitationClientShell } from '@/components/shared/InvitationClientShell';

type PageSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface PageProps {
  searchParams: PageSearchParams;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const rawTo = typeof resolved.to === 'string' ? resolved.to : undefined;
  const rawTheme = typeof resolved.theme === 'string' ? resolved.theme.toLowerCase() : undefined;

  const groom = portfolioWeddingData.couple.groom.nickname;
  const bride = portfolioWeddingData.couple.bride.nickname;

  const hasCustomGuest = Boolean(rawTo && sanitizeGuestInputRaw(rawTo).trim().length > 0);
  const sanitizedGuest = sanitizeGuestName(rawTo);
  const cleanSlug = encodeGuestSlugForUrl(sanitizedGuest);

  const pageTitle = hasCustomGuest
    ? `Undangan Pernikahan ${groom} & ${bride} — Spesial untuk ${sanitizedGuest}`
    : `The Wedding of ${groom} & ${bride}`;

  const pageDescription =
    'Kami mengundang Anda untuk merayakan momen bahagia pernikahan Arya & Kirana. Simak detail acara, lokasi, dan konfirmasi kehadiran.';

  const validTheme =
    rawTheme === 'editorial' || rawTheme === 'dark-luxe' || rawTheme === 'heritage'
      ? rawTheme
      : undefined;

  const ogImageUrl = validTheme
    ? `/api/og?to=${cleanSlug}&theme=${validTheme}`
    : `/api/og?to=${cleanSlug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: '/',
      siteName: `The Wedding of ${groom} & ${bride}`,
      type: 'website',
      locale: 'id_ID',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Undangan Pernikahan ${groom} & ${bride}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const rawTo = typeof resolved.to === 'string' ? resolved.to : undefined;
  const initialGuestName = sanitizeGuestName(rawTo);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F6F2EA] font-serif italic text-sm tracking-widest text-stone-500">
          Memuat Undangan Pernikahan Arya &amp; Kirana...
        </div>
      }
    >
      <InvitationClientShell initialGuestName={initialGuestName} />
    </Suspense>
  );
}

