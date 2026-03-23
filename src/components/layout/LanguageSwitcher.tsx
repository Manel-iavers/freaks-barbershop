'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, type Locale } from '@/lib/dictionaries'

const localeLabels: Record<Locale, string> = {
  ca: 'CA',
  es: 'ES',
  en: 'EN',
}

interface LanguageSwitcherProps {
  currentLocale: Locale
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname()

  // Replace the current locale prefix with the target locale
  function getLocalePath(targetLocale: Locale): string {
    // pathname is like /ca, /ca/something, /es, etc.
    const segments = pathname.split('/')
    // segments[0] = '', segments[1] = locale, segments[2..] = rest
    segments[1] = targetLocale
    return segments.join('/') || `/${targetLocale}`
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-0 bg-dark-900/80 backdrop-blur-sm border border-white/10">
      {locales.map((locale, index) => {
        const isActive = locale === currentLocale
        const isLast = index === locales.length - 1
        return (
          <Link
            key={locale}
            href={getLocalePath(locale)}
            className={[
              'px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200',
              isActive
                ? 'text-freaks-yellow bg-freaks-yellow/10'
                : 'text-gray-500 hover:text-white hover:bg-white/5',
              !isLast ? 'border-r border-white/10' : '',
            ].join(' ')}
            aria-label={`Switch to ${locale.toUpperCase()}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {localeLabels[locale]}
          </Link>
        )
      })}
    </div>
  )
}
