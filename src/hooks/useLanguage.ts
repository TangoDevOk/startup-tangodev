'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { type Locale } from '@/i18n/config';

export function useLanguage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('language');

  const setLocale = useCallback((newLocale: Locale) => {
    // Set cookie for server-side detection
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Reload page to apply new locale
    window.location.reload();
  }, []);

  return {
    locale: locale as Locale,
    setLocale,
    t
  };
}
