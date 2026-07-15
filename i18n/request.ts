import {getRequestConfig} from 'next-intl/server';
import {cookies, headers} from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('locale')?.value;
  const acceptedLanguage = (await headers()).get('accept-language');

  // Determine locale from cookie, header, or default to 'zh'
  let locale: 'zh' | 'en' = 'zh';
  if (localeCookie === 'zh' || localeCookie === 'en') {
    locale = localeCookie;
  } else if (acceptedLanguage) {
    locale = acceptedLanguage.startsWith('en') ? 'en' : 'zh';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
