import type { Metadata } from 'next'
import { Inter, Bebas_Neue, Permanent_Marker } from 'next/font/google'
import '../globals.css'
import { locales, defaultLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-permanent-marker',
  display: 'swap',
})

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
  const dict = getDictionary(safeLocale)
  const { metadata } = dict

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    openGraph: {
      title: 'FREAKS Barbershop',
      description: metadata.ogDescription,
      url: process.env.NEXT_PUBLIC_APP_URL,
      siteName: 'FREAKS Barbershop',
      locale: metadata.ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'FREAKS Barbershop',
      description: metadata.twitterDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
  const dict = getDictionary(safeLocale)

  return (
    <html
      lang={safeLocale}
      className={`${inter.variable} ${bebasNeue.variable} ${permanentMarker.variable}`}
    >
      <body className={inter.className}>
        <LanguageSwitcher currentLocale={safeLocale} />
        {children}
        <CookieBanner dict={dict.footer.cookieBanner} />
      </body>
    </html>
  )
}
