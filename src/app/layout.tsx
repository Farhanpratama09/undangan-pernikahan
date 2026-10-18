import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono, Pinyon_Script } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '');

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1C1613',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'The Wedding of Arya & Kirana',
  authors: [{ name: 'Arya & Kirana' }],
  keywords: [
    'Undangan Pernikahan Digital',
    'The Wedding of Arya & Kirana',
    'Arya Satria',
    'Kirana Larasati',
    'Wedding Invitation',
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${jakarta.variable} ${mono.variable} ${pinyon.variable}`}
    >
      <body className="min-h-screen bg-[#F6F2EA] text-[#231C18] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
