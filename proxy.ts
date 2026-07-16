import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const existingLocale = request.cookies.get('locale')?.value;

  // Respect the user's saved preference; only auto-detect on first visit
  if (existingLocale === 'zh' || existingLocale === 'en') {
    return NextResponse.next();
  }

  const acceptLanguage = request.headers.get('Accept-Language') || '';
  const isChinese = acceptLanguage.toLowerCase().includes('zh');

  const response = NextResponse.next();
  response.cookies.set('locale', isChinese ? 'zh' : 'en', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
