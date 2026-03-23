import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale, type Locale } from '@/lib/dictionaries'

function getLocaleFromHeader(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  // Parse Accept-Language header and find best match
  const preferred = acceptLanguage
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=')
      return { lang: lang.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { lang } of preferred) {
    if (locales.includes(lang as Locale)) {
      return lang as Locale
    }
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Skip non-page requests (static files, API routes, etc.)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') // files like favicon.ico, robots.txt, etc.
  ) {
    return NextResponse.next()
  }

  // Redirect to locale-prefixed path
  const locale = getLocaleFromHeader(request)
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
