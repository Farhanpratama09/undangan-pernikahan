import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { sanitizeGuestName } from '@/lib/validation';
import { portfolioWeddingData } from '@/lib/dummy-data';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawTo = searchParams.get('to');
    const theme = (searchParams.get('theme') || 'editorial').toLowerCase();

    const guestName = sanitizeGuestName(rawTo);
    const groomName = portfolioWeddingData.couple.groom.nickname;
    const brideName = portfolioWeddingData.couple.bride.nickname;

    // Theme color dictionary strictly for Satori Flexbox
    let bg = '#F8F6F2';
    let text = '#141413';
    let muted = '#78756F';
    let border = '#141413';
    let accent = '#141413';
    let badgeBg = '#FFFFFF';

    if (theme === 'dark-luxe') {
      bg = '#0B0B0C';
      text = '#EAE6DF';
      muted = '#A1A1AA';
      border = '#D4AF37';
      accent = '#D4AF37';
      badgeBg = '#121214';
    } else if (theme === 'heritage') {
      bg = '#F2ECE1';
      text = '#231A16';
      muted = '#765D53';
      border = '#9E4733';
      accent = '#9E4733';
      badgeBg = '#F7F3EB';
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bg,
            color: text,
            padding: '40px',
            fontFamily: 'serif',
          }}
        >
          {/* Outer Hairline Border */}
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: `2px solid ${border}`,
              padding: '48px',
              backgroundColor: 'transparent',
            }}
          >
            {/* Top Bar */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${muted}`,
                paddingBottom: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: '14px',
                  letterSpacing: '4px',
                  color: muted,
                  fontFamily: 'sans-serif',
                  textTransform: 'uppercase',
                }}
              >
                THE WEDDING CELEBRATION
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '15px',
                  letterSpacing: '3px',
                  color: accent,
                  fontFamily: 'serif',
                }}
              >
                12 . 12 . 2026
              </div>
            </div>

            {/* Middle Couple Monogram & Names */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px 0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: '68px',
                  fontWeight: 300,
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: text,
                  textAlign: 'center',
                }}
              >
                {groomName} &amp; {brideName}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '15px',
                  letterSpacing: '6px',
                  color: muted,
                  fontFamily: 'sans-serif',
                  marginTop: '8px',
                  textTransform: 'uppercase',
                }}
              >
                THE MAJESTIC GLASS HOUSE • JAKARTA
              </div>
            </div>

            {/* Bottom Guest Personalization Box */}
            <div
              style={{
                width: '100%',
                maxWidth: '680px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${border}`,
                backgroundColor: badgeBg,
                padding: '20px 32px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: '12px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: muted,
                  fontFamily: 'sans-serif',
                  marginBottom: '6px',
                }}
              >
                KEPADA YTH. BAPAK/IBU/SAUDARA/I:
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '28px',
                  fontWeight: 600,
                  color: text,
                  textAlign: 'center',
                }}
              >
                {guestName}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
