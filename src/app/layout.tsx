import type { Metadata } from 'next'
import { Inter, Bebas_Neue, Permanent_Marker } from 'next/font/google'
import './globals.css'

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

export const metadata: Metadata = {
  title: 'FREAKS Barbershop | Barberia a Gracia, Barcelona',
  description: 'be FREAK, it\'s cool. Nova barberia al cor de Gracia. Torrent de les Flors 67, Barcelona. Proximament.',
  keywords: ['barberia', 'barbershop', 'gracia', 'barcelona', 'freaks', 'tall de cabell', 'barber'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'FREAKS Barbershop',
    description: 'be FREAK, it\'s cool. Nova barberia al cor de Gracia, Barcelona.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'FREAKS Barbershop',
    locale: 'ca_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FREAKS Barbershop',
    description: 'be FREAK, it\'s cool. Nova barberia al cor de Gracia, Barcelona.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ca" className={`${inter.variable} ${bebasNeue.variable} ${permanentMarker.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
