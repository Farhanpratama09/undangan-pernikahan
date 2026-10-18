"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Copy, Check, QrCode, ChevronDown, Gift } from 'lucide-react';
import { ThemeId, BankAccount } from '@/types/invitation';
import { useClipboard } from '@/hooks/useClipboard';

interface DigitalEnvelopeModuleProps {
  themeId: ThemeId;
  accounts: BankAccount[];
  viewMode?: 'mobile' | 'desktop';
}

export function DigitalEnvelopeModule({
  themeId,
  accounts,
  viewMode = 'desktop',
}: DigitalEnvelopeModuleProps) {
  const isMobile = viewMode === 'mobile';
  const { copy, copiedId } = useClipboard(2000);
  const [activeQrId, setActiveQrId] = useState<string | null>(null);

  const toggleQr = (id: string) => {
    setActiveQrId((prev) => (prev === id ? null : id));
  };

  // Theme styling dictionary
  const themeStyles = {
    editorial: {
      cardBg: 'bg-[#FAF7F0]',
      subCardBg: 'bg-white',
      border: 'border-[#E2D9C8]',
      hairline: 'border-[#E2D9C8]',
      textPrimary: 'text-[#231C18]',
      textMuted: 'text-[#524F4A]',
      accentText: 'text-[#6F4E26]',
      buttonAction: 'bg-[#231C18] text-[#F6F2EA] hover:bg-[#382D27] border-[#231C18]',
      qrContainer: 'bg-[#FFFFFF] border-[#E2D9C8]',
      successIcon: 'text-[#D4AF37]',
    },
    'dark-luxe': {
      cardBg: 'bg-[#141312]',
      subCardBg: 'bg-[#1A1816]',
      border: 'border-[#D4AF37]/35',
      hairline: 'border-[#272421]',
      textPrimary: 'text-[#F2ECE4]',
      textMuted: 'text-[#A69F95]',
      accentText: 'text-[#D4AF37]',
      buttonAction: 'bg-[#D4AF37] text-[#0D0C0B] hover:bg-[#E5C158] border-[#D4AF37]',
      qrContainer: 'bg-[#FFFFFF] border-[#D4AF37]',
      successIcon: 'text-[#0D0C0B]',
    },
    heritage: {
      cardBg: 'bg-[#FAF6F2]',
      subCardBg: 'bg-white/85',
      border: 'border-[#B08D57]/45',
      hairline: 'border-[#DFD5CA]',
      textPrimary: 'text-[#2B211E]',
      textMuted: 'text-[#765D53]',
      accentText: 'text-[#8E5B52]',
      buttonAction: 'bg-[#8E5B52] text-[#F4EFEA] hover:bg-[#764840] border-[#8E5B52]',
      qrContainer: 'bg-[#FFFFFF] border-[#B08D57]',
      successIcon: 'text-[#F4EFEA]',
    },
  }[themeId];

  return (
    <section className="w-full my-8">
      <div
        className={`${
          isMobile ? 'p-5' : 'p-6 sm:p-10'
        } rounded-2xl border ${themeStyles.border} ${themeStyles.cardBg} relative shadow-sm`}
      >
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Gift className={`w-4 h-4 ${themeStyles.accentText}`} />
            <p className={`font-sans text-[11px] tracking-[0.22em] uppercase ${themeStyles.accentText}`}>
              Tanda Kasih &amp; Amplop Digital
            </p>
          </div>
          <h2
            className={`font-serif ${
              isMobile ? 'text-2xl' : 'text-2xl sm:text-3xl'
            } tracking-[0.1em] uppercase font-normal ${themeStyles.textPrimary}`}
          >
            Wedding Gift
          </h2>
          <p className={`font-sans text-xs sm:text-sm leading-relaxed ${themeStyles.textMuted}`}>
            Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Anda berkehendak
            memberikan tanda kasih secara cashless, Anda dapat menyalurkannya melalui rekening berikut:
          </p>
        </div>

        {/* Bank Accounts Grid — Force 1 column when viewMode === 'mobile' */}
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          } gap-4`}
        >
          {accounts.map((acc) => {
            const isAccCopied = copiedId === acc.id;
            const isQrExpanded = activeQrId === acc.id;

            return (
              <div
                key={acc.id}
                className={`p-5 rounded-2xl border ${themeStyles.hairline} ${themeStyles.subCardBg} flex flex-col justify-between shadow-sm`}
              >
                <div>
                  {/* Bank Header */}
                  <div
                    className={`flex items-center justify-between gap-2 mb-4 border-b pb-2.5 ${themeStyles.hairline}`}
                  >
                    <span
                      className={`font-serif text-base font-semibold tracking-wide ${themeStyles.textPrimary}`}
                    >
                      {acc.bankName}
                    </span>
                    <CreditCard className={`w-4 h-4 shrink-0 ${themeStyles.accentText}`} />
                  </div>

                  {/* Account Number — The ONLY place where font-mono is intentionally used for numeric clarity */}
                  <p
                    className={`font-mono text-base sm:text-lg font-medium tracking-wider mb-1 break-all ${themeStyles.textPrimary}`}
                  >
                    {acc.accountNumber}
                  </p>
                  <p
                    className={`font-sans text-xs tracking-wide uppercase ${themeStyles.textMuted} mb-5`}
                  >
                    a.n. {acc.accountHolder}
                  </p>
                </div>

                {/* Actions: Copy & QR toggle */}
                <div className={`space-y-2.5 pt-3 border-t ${themeStyles.hairline}`}>
                  <button
                    type="button"
                    onClick={() => copy(acc.accountNumber, acc.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border text-xs font-sans font-medium tracking-wider uppercase transition-colors cursor-pointer ${themeStyles.buttonAction}`}
                  >
                    {isAccCopied ? (
                      <>
                        <Check className={`w-3.5 h-3.5 ${themeStyles.successIcon}`} />
                        <span>Nomor Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>

                  {acc.qrImageUrl && (
                    <button
                      type="button"
                      onClick={() => toggleQr(acc.id)}
                      aria-expanded={isQrExpanded}
                      className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-sans underline underline-offset-4 cursor-pointer ${themeStyles.textPrimary} hover:opacity-75 transition-opacity`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{isQrExpanded ? 'Tutup Kode QRIS' : 'Tampilkan Kode QRIS'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isQrExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* QR Code Reveal Dropdown */}
                <AnimatePresence>
                  {acc.qrImageUrl && isQrExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`overflow-hidden mt-4 pt-3 border-t ${themeStyles.hairline}`}
                    >
                      <div
                        className={`p-3 rounded-xl border ${themeStyles.qrContainer} flex flex-col items-center text-center`}
                      >
                        <img
                          src={acc.qrImageUrl}
                          alt={`QRIS ${acc.bankName}`}
                          width={192}
                          height={192}
                          loading="lazy"
                          decoding="async"
                          className="w-48 h-auto object-contain mb-2"
                        />
                        <p className="font-sans text-[11px] tracking-wide text-neutral-600">
                          Pindai menggunakan aplikasi m-Banking atau e-Wallet
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
