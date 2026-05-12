import type { Locale } from '@/lib/dictionaries'

interface JsonLdProps {
  description: string
  locale: Locale
}

export default function JsonLd({ description, locale }: JsonLdProps) {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    name: 'FREAKS Barbershop',
    description,
    url: 'https://freaks-barbershop.vercel.app',
    inLanguage: locale,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Torrent de les Flors, 67',
      addressLocality: 'Barcelona',
      addressRegion: 'Catalunya',
      postalCode: '08024',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.4035,
      longitude: 2.1565,
    },
    telephone: '+34684721756',
    sameAs: [
      'https://instagram.com/freaks_barbershop',
    ],
    priceRange: '$$',
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  )
}
