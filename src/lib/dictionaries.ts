export const locales = ['ca', 'es', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ca'

export interface Dictionary {
  metadata: {
    title: string
    description: string
    keywords: string[]
    ogLocale: string
    ogDescription: string
    twitterDescription: string
  }
  hero: {
    badge: string
    openingDate: string
    tagline: string
    followUs: string
    howToGetHere: string
    address: string
  }
  gallery: {
    sectionTitle: string
    sectionTitleHighlight: string
    sectionDesc: string
    imageAlt: string
    keychainAlt: string
    labelHorror: string
    labelMerch: string
    features: Array<{
      title: string
      description: string
    }>
  }
  location: {
    sectionTitle: string
    sectionTitleHighlight: string
    addressTitle: string
    openMaps: string
    hoursTitle: string
    hoursSoon: string
    hoursSoonDesc: string
    instagramTitle: string
    instagramDesc: string
    mapTitle: string
  }
  footer: {
    address: string
    rights: string
  }
  jsonLd: {
    description: string
  }
}

const dictionaries: Record<Locale, Dictionary> = {
  ca: {
    metadata: {
      title: 'FREAKS Barbershop | Barberia a Gracia, Barcelona',
      description: "be FREAK, it's cool. Nova barberia al cor de Gracia. Torrent de les Flors 67, Barcelona. Proximament.",
      keywords: ['barberia', 'barbershop', 'gracia', 'barcelona', 'freaks', 'tall de cabell', 'barber'],
      ogLocale: 'ca_ES',
      ogDescription: "be FREAK, it's cool. Nova barberia al cor de Gracia, Barcelona.",
      twitterDescription: "be FREAK, it's cool. Nova barberia al cor de Gracia, Barcelona.",
    },
    hero: {
      badge: 'Obrim el 26 de marc!',
      openingDate: 'Dijous 26 de marc de 2026',
      tagline: "be FREAK, it's cool.",
      followUs: 'Segueix-nos',
      howToGetHere: 'Com arribar',
      address: 'Torrent de les Flors 67 · Gracia · Barcelona',
    },
    gallery: {
      sectionTitle: 'El nostre',
      sectionTitleHighlight: 'univers',
      sectionDesc:
        'No som una barberia qualsevol. Som un racó per a freaks, col·leccionistes i amants de la cultura pop.',
      imageAlt: 'Col·leccio de figures i memorabilia al local',
      keychainAlt: 'Clauer FREAKS vintage',
      labelHorror: 'Horror & Pop Culture',
      labelMerch: 'Merch',
      features: [
        {
          title: 'Vibes uniques',
          description: 'Decorat amb figures, posters i col·leccionisme dels 80s i 90s.',
        },
        {
          title: 'Cultura pop',
          description: 'De Texas Chainsaw a Ninja Turtles. Cada racó te una historia.',
        },
        {
          title: 'Talls amb actitud',
          description: 'Aqui venim a tallar cabell i a ser freaks. Sense filtres.',
        },
      ],
    },
    location: {
      sectionTitle: "Troba'ns a",
      sectionTitleHighlight: 'Gracia',
      addressTitle: 'Direccio',
      openMaps: 'Obrir a Google Maps',
      hoursTitle: 'Horari',
      hoursSoon: 'Obrim dijous 26 de marc!',
      hoursSoonDesc: "Aviat anunciarem l'horari complet",
      instagramTitle: 'Instagram',
      instagramDesc: 'Segueix-nos per novetats i contingut freak',
      mapTitle: 'Ubicacio FREAKS Barbershop',
    },
    footer: {
      address: 'Torrent de les Flors 67, Gracia',
      rights: 'Tots els drets reservats.',
    },
    jsonLd: {
      description: "be FREAK, it's cool. Barberia al cor de Gracia, Barcelona.",
    },
  },

  es: {
    metadata: {
      title: 'FREAKS Barbershop | Barbería en Gracia, Barcelona',
      description: "be FREAK, it's cool. Nueva barbería en el corazón de Gracia. Torrent de les Flors 67, Barcelona. Próximamente.",
      keywords: ['barbería', 'barbershop', 'gracia', 'barcelona', 'freaks', 'corte de pelo', 'barber'],
      ogLocale: 'es_ES',
      ogDescription: "be FREAK, it's cool. Nueva barbería en el corazón de Gracia, Barcelona.",
      twitterDescription: "be FREAK, it's cool. Nueva barbería en el corazón de Gracia, Barcelona.",
    },
    hero: {
      badge: 'Abrimos el 26 de marzo!',
      openingDate: 'Jueves 26 de marzo de 2026',
      tagline: "be FREAK, it's cool.",
      followUs: 'Síguenos',
      howToGetHere: 'Cómo llegar',
      address: 'Torrent de les Flors 67 · Gracia · Barcelona',
    },
    gallery: {
      sectionTitle: 'Nuestro',
      sectionTitleHighlight: 'universo',
      sectionDesc:
        'No somos una barbería cualquiera. Somos un rincón para freaks, coleccionistas y amantes de la cultura pop.',
      imageAlt: 'Colección de figuras y memorabilia en el local',
      keychainAlt: 'Llavero FREAKS vintage',
      labelHorror: 'Horror & Pop Culture',
      labelMerch: 'Merch',
      features: [
        {
          title: 'Vibes únicos',
          description: 'Decorado con figuras, pósters y coleccionismo de los 80s y 90s.',
        },
        {
          title: 'Cultura pop',
          description: 'De Texas Chainsaw a Ninja Turtles. Cada rincón tiene una historia.',
        },
        {
          title: 'Cortes con actitud',
          description: 'Aquí venimos a cortar pelo y a ser freaks. Sin filtros.',
        },
      ],
    },
    location: {
      sectionTitle: 'Encuéntranos en',
      sectionTitleHighlight: 'Gracia',
      addressTitle: 'Dirección',
      openMaps: 'Abrir en Google Maps',
      hoursTitle: 'Horario',
      hoursSoon: 'Abrimos jueves 26 de marzo!',
      hoursSoonDesc: 'Pronto anunciaremos el horario completo',
      instagramTitle: 'Instagram',
      instagramDesc: 'Síguenos para novedades y contenido freak',
      mapTitle: 'Ubicación FREAKS Barbershop',
    },
    footer: {
      address: 'Torrent de les Flors 67, Gracia',
      rights: 'Todos los derechos reservados.',
    },
    jsonLd: {
      description: "be FREAK, it's cool. Barbería en el corazón de Gracia, Barcelona.",
    },
  },

  en: {
    metadata: {
      title: 'FREAKS Barbershop | Barbershop in Gracia, Barcelona',
      description: "be FREAK, it's cool. New barbershop in the heart of Gracia. Torrent de les Flors 67, Barcelona. Coming soon.",
      keywords: ['barbershop', 'barber', 'gracia', 'barcelona', 'freaks', 'haircut', 'barber shop'],
      ogLocale: 'en_US',
      ogDescription: "be FREAK, it's cool. New barbershop in the heart of Gracia, Barcelona.",
      twitterDescription: "be FREAK, it's cool. New barbershop in the heart of Gracia, Barcelona.",
    },
    hero: {
      badge: 'Opening March 26th!',
      openingDate: 'Thursday, March 26, 2026',
      tagline: "be FREAK, it's cool.",
      followUs: 'Follow Us',
      howToGetHere: 'Get Directions',
      address: 'Torrent de les Flors 67 · Gracia · Barcelona',
    },
    gallery: {
      sectionTitle: 'Our',
      sectionTitleHighlight: 'universe',
      sectionDesc:
        "We're not just any barbershop. We're a corner for freaks, collectors and pop culture lovers.",
      imageAlt: 'Collection of figures and memorabilia at the shop',
      keychainAlt: 'FREAKS vintage keychain',
      labelHorror: 'Horror & Pop Culture',
      labelMerch: 'Merch',
      features: [
        {
          title: 'Unique vibes',
          description: 'Decorated with figures, posters and collectibles from the 80s and 90s.',
        },
        {
          title: 'Pop culture',
          description: 'From Texas Chainsaw to Ninja Turtles. Every corner has a story.',
        },
        {
          title: 'Cuts with attitude',
          description: "We're here to cut hair and be freaks. No filters.",
        },
      ],
    },
    location: {
      sectionTitle: 'Find us in',
      sectionTitleHighlight: 'Gracia',
      addressTitle: 'Address',
      openMaps: 'Open in Google Maps',
      hoursTitle: 'Hours',
      hoursSoon: 'Coming Soon',
      hoursSoonDesc: "We'll announce opening hours soon",
      instagramTitle: 'Instagram',
      instagramDesc: 'Follow us to know our opening date',
      mapTitle: 'FREAKS Barbershop location',
    },
    footer: {
      address: 'Torrent de les Flors 67, Gracia',
      rights: 'All rights reserved.',
    },
    jsonLd: {
      description: "be FREAK, it's cool. Barbershop in the heart of Gracia, Barcelona.",
    },
  },
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
