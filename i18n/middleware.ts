import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['zh', 'en'],

  // Used when no locale matches
  defaultLocale: 'zh',

  // Locale prefix options
  localePrefix: 'as-needed', // Use 'always' to force locale in URL
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en)/:path*'],
};
