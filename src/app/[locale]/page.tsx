import HeroSection from '@/components/sections/HeroSection'
import GallerySection from '@/components/sections/GallerySection'
import LocationSection from '@/components/sections/LocationSection'
import FooterSection from '@/components/sections/FooterSection'
import JsonLd from '@/components/layout/JsonLd'
import ChatWidget from '@/components/chat/ChatWidget'
import { locales, defaultLocale, getDictionary, type Locale } from '@/lib/dictionaries'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
  const dict = getDictionary(safeLocale)

  return (
    <>
      <JsonLd description={dict.jsonLd.description} locale={safeLocale} />
      <main>
        <HeroSection dict={dict.hero} />
        <GallerySection dict={dict.gallery} />
        <LocationSection dict={dict.location} />
      </main>
      <FooterSection dict={dict.footer} />
      <ChatWidget locale={safeLocale} />
    </>
  )
}
