const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'BarberShop',
  name: 'FREAKS Barbershop',
  description: 'be FREAK, it\'s cool. Barberia al cor de Gracia, Barcelona.',
  url: 'https://freaks-barbershop.vercel.app',
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
  sameAs: [
    'https://instagram.com/freaks_barbershop',
  ],
  priceRange: '$$',
}

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(jsonLdData)}
    </script>
  )
}
