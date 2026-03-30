import { MapPin, Phone, Clock, Scissors, Calendar } from 'lucide-react'
import { services, chatStrings, WHATSAPP_URL, BOOKSY_URL } from '@/lib/chat-config'
import type { Locale } from '@/lib/dictionaries'

export type CardType = 'SERVICES' | 'MAP' | 'WHATSAPP' | 'SCHEDULE'

interface CardProps {
  locale: Locale
}

export function ServiceCard({ locale }: CardProps) {
  const items = services[locale]
  const strings = chatStrings[locale]

  return (
    <div className="bg-dark-700 border border-freaks-yellow/20 rounded-lg overflow-hidden mt-2 text-sm">
      <div className="bg-freaks-yellow/10 px-3 py-2 flex items-center gap-2">
        <Scissors className="w-4 h-4 text-freaks-yellow" />
        <span className="font-bold text-freaks-yellow uppercase tracking-wider text-xs">{strings.servicesTitle}</span>
      </div>
      <div className="px-3 py-2 space-y-1.5">
        {items.map((s) => (
          <div key={s.name} className="flex justify-between items-center">
            <span className="text-gray-300">{s.name}</span>
            <span className="text-gray-500 text-xs">{s.duration}</span>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 border-t border-white/5">
        <a
          href={BOOKSY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-freaks-yellow hover:bg-freaks-yellow-light text-dark-900 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <Calendar className="w-3 h-3" />
          {strings.bookOnBooksy}
        </a>
      </div>
    </div>
  )
}

export function MapCard({ locale }: CardProps) {
  const strings = chatStrings[locale]

  return (
    <div className="bg-dark-700 border border-freaks-green/20 rounded-lg overflow-hidden mt-2 text-sm">
      <div className="bg-freaks-green/10 px-3 py-2 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-freaks-green" />
        <span className="font-bold text-freaks-green uppercase tracking-wider text-xs">{strings.locationTitle}</span>
      </div>
      <div className="px-3 py-2">
        <p className="text-gray-300">Torrent de les Flors, 67</p>
        <p className="text-gray-400 text-xs">08024 Barcelona (Gracia)</p>
        <p className="text-gray-500 text-xs mt-1">Metro Fontana (L3) - 3 min</p>
      </div>
      <div className="px-3 py-2 border-t border-white/5">
        <a
          href="https://maps.google.com/?q=Torrent+de+les+Flors+67+Barcelona"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-freaks-green/20 hover:bg-freaks-green/30 text-freaks-green py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <MapPin className="w-3 h-3" />
          Google Maps
        </a>
      </div>
    </div>
  )
}

export function WhatsAppCard({ locale }: CardProps) {
  const strings = chatStrings[locale]

  return (
    <div className="bg-dark-700 border border-green-500/20 rounded-lg overflow-hidden mt-2 text-sm">
      <div className="bg-green-500/10 px-3 py-2 flex items-center gap-2">
        <Phone className="w-4 h-4 text-green-400" />
        <span className="font-bold text-green-400 uppercase tracking-wider text-xs">{strings.contactTitle}</span>
      </div>
      <div className="px-3 py-2">
        <a
          href={`${WHATSAPP_URL}?text=${encodeURIComponent(locale === 'en' ? 'Hi! I have a question about FREAKS Barbershop' : locale === 'es' ? 'Hola! Tengo una pregunta sobre FREAKS Barbershop' : 'Hola! Tinc una pregunta sobre FREAKS Barbershop')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <Phone className="w-3 h-3" />
          {strings.whatsappCta}
        </a>
      </div>
    </div>
  )
}

export function ScheduleCard({ locale }: CardProps) {
  const strings = chatStrings[locale]
  const schedule: Array<{ day: string; hours: string }> = locale === 'ca'
    ? [
        { day: 'Dl', hours: '12-15, 16-20' },
        { day: 'Dm', hours: '10-14, 16-20' },
        { day: 'Dc', hours: '10-14, 16-20' },
        { day: 'Dj', hours: '10-14, 16-20' },
        { day: 'Dv', hours: '9-13, 14-18:30' },
      ]
    : locale === 'es'
    ? [
        { day: 'Lun', hours: '12-15, 16-20' },
        { day: 'Mar', hours: '10-14, 16-20' },
        { day: 'Mié', hours: '10-14, 16-20' },
        { day: 'Jue', hours: '10-14, 16-20' },
        { day: 'Vie', hours: '9-13, 14-18:30' },
      ]
    : [
        { day: 'Mon', hours: '12-15, 16-20' },
        { day: 'Tue', hours: '10-14, 16-20' },
        { day: 'Wed', hours: '10-14, 16-20' },
        { day: 'Thu', hours: '10-14, 16-20' },
        { day: 'Fri', hours: '9-13, 14-18:30' },
      ]
  const closed = locale === 'ca' ? 'Ds-Dg tancat' : locale === 'es' ? 'Sáb-Dom cerrado' : 'Sat-Sun closed'

  return (
    <div className="bg-dark-700 border border-freaks-purple/20 rounded-lg overflow-hidden mt-2 text-sm">
      <div className="bg-freaks-purple/10 px-3 py-2 flex items-center gap-2">
        <Clock className="w-4 h-4 text-freaks-purple" />
        <span className="font-bold text-freaks-purple uppercase tracking-wider text-xs">{strings.scheduleTitle}</span>
      </div>
      <div className="px-3 py-2 space-y-1">
        {schedule.map((s) => (
          <div key={s.day} className="flex justify-between items-center">
            <span className="text-gray-300 font-medium">{s.day}</span>
            <span className="text-gray-400 text-xs">{s.hours}</span>
          </div>
        ))}
        <p className="text-gray-500 text-xs mt-1 pt-1 border-t border-white/5">{closed}</p>
      </div>
    </div>
  )
}

export function renderCard(type: CardType, locale: Locale) {
  switch (type) {
    case 'SERVICES': return <ServiceCard locale={locale} />
    case 'MAP': return <MapCard locale={locale} />
    case 'WHATSAPP': return <WhatsAppCard locale={locale} />
    case 'SCHEDULE': return <ScheduleCard locale={locale} />
  }
}

export function extractCardType(text: string): { cleanText: string; cardType: CardType | null } {
  const cardMatch = text.match(/\[CARD:(SERVICES|MAP|WHATSAPP|SCHEDULE)\]/)
  if (cardMatch) {
    return {
      cleanText: text.replace(/\[CARD:\w+\]/g, '').trim(),
      cardType: cardMatch[1] as CardType,
    }
  }
  return { cleanText: text, cardType: null }
}
