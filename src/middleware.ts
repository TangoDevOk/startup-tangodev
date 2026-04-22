import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
  alternateLinks: false
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|imgs).*)'],
};
