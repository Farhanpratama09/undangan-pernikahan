import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Pinyon_Script } from 'next/font/google';
import { getSafeSiteUrl } from '@/lib/validation';
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

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1C1613',
};

export const metadata: Metadata = {
  metadataBase: getSafeSiteUrl().url,
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
      className={`${cormorant.variable} ${jakarta.variable} ${pinyon.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=75&fm=webp&auto=format&fit=crop"
          fetchPriority="high"
          imageSrcSet="https://images.unsplash.com/photo-1519741497674-611481863552?w=480&q=75&fm=webp&auto=format&fit=crop 480w, https://images.unsplash.com/photo-1519741497674-611481863552?w=640&q=75&fm=webp&auto=format&fit=crop 640w, https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=75&fm=webp&auto=format&fit=crop 800w"
          imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
        />
      </head>
      <body className="min-h-screen bg-[#F6F2EA] text-[#231C18] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
