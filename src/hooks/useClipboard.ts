'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseClipboardReturn {
  copiedId: string | null;
  isCopied: boolean;
  copy: (text: string, id?: string) => Promise<boolean>;
  resetCopyState: () => void;
}

export function useClipboard(timeoutMs: number = 2000): UseClipboardReturn {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetCopyState = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCopiedId(null);
  }, []);

  const copy = useCallback(
    async (text: string, id: string = 'default'): Promise<boolean> => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      let success = false;

      // 1. Primary method: Modern Clipboard API
      if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          success = true;
        } catch {
          success = false;
        }
      }

      // 2. Fallback method: For Android In-App WebViews (WhatsApp, Instagram, Telegram)
      if (!success && typeof document !== 'undefined') {
        try {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          // Prevent zoom & screen jump on mobile
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          textArea.style.top = '-9999px';
          textArea.style.opacity = '0';
          textArea.setAttribute('readonly', '');
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          success = document.execCommand('copy');
          document.body.removeChild(textArea);
        } catch {
          success = false;
        }
      }

      if (success) {
        setCopiedId(id);
        timeoutRef.current = setTimeout(() => {
          setCopiedId(null);
        }, timeoutMs);
      }

      return success;
    },
    [timeoutMs]
  );

  return {
    copiedId,
    isCopied: copiedId !== null,
    copy,
    resetCopyState,
  };
}
