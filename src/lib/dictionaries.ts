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
    tagline: string
    bookNow: string
    followUs: string
    howToGetHere: string
    address: string
  }
  gallery: {
    sectionTitle: string
    sectionTitleHighlight: string
    sectionDesc: string
    imageAlt: string
    labelHorror: string
    musicTitle: string
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
    hoursSchedule: Array<{ day: string; hours: string }>
    hoursClosed: string
    instagramTitle: string
    instagramDesc: string
    mapTitle: string
    phoneTitle: string
    phoneDesc: string
    callCta: string
  }
  about: {
    sectionTitle: string
    sectionTitleHighlight: string
    name: string
    role: string
    description: string
    imageAlt: string
  }
  footer: {
    address: string
    rights: string
    privacy: string
    cookies: string
    madeBy: string
    cookieBanner: {
      title: string
      description: string
      accept: string
      reject: string
    }
  }
  jsonLd: {
    description: string
  }
}

const dictionaries: Record<Locale, Dictionary> = {
  ca: {
    metadata: {
      title: 'FREAKS Barbershop | Barberia a Gracia, Barcelona',
      description: "be FREAK, it's cool. Barberia al cor de Gracia. Torrent de les Flors 67, Barcelona.",
      keywords: ['barberia', 'barbershop', 'gracia', 'barcelona', 'freaks', 'tall de cabell', 'barber'],
      ogLocale: 'ca_ES',
      ogDescription: "be FREAK, it's cool. Barberia al cor de Gracia, Barcelona.",
      twitterDescription: "be FREAK, it's cool. Barberia al cor de Gracia, Barcelona.",
    },
    hero: {
      badge: 'Ja oberts a Gracia!',
      tagline: "be FREAK, it's cool.",
      bookNow: 'Reserva cita',
      followUs: 'Segueix-nos',
      howToGetHere: 'Ubicació',
      address: 'Torrent de les Flors 67 · Gracia · Barcelona',
    },
    gallery: {
      sectionTitle: 'El nostre',
      sectionTitleHighlight: 'univers',
      sectionDesc:
        'No som una barberia qualsevol. Som un racó per a freaks, col·leccionistes i amants de la cultura pop.',
      imageAlt: 'Col·leccio de figures i memorabilia al local',
      labelHorror: 'Horror & Pop Culture',
      musicTitle: 'La nostra banda sonora',
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
    about: {
      sectionTitle: 'El',
      sectionTitleHighlight: 'Freak',
      name: 'Julian Ramallo',
      role: 'Fundador & Barber',
      description: 'Freak de tota la vida. Col·leccionista, amant del terror classic i la cultura pop. Ara porta les tisores i la bogeria a Gracia.',
      imageAlt: 'Julian Ramallo, fundador de FREAKS Barbershop',
    },
    location: {
      sectionTitle: "Troba'ns a",
      sectionTitleHighlight: 'Gracia',
      addressTitle: 'Direccio',
      openMaps: 'Obrir a Google Maps',
      hoursTitle: 'Horari',
      hoursSchedule: [
        { day: 'Dilluns', hours: '12:00-15:00, 16:00-20:00' },
        { day: 'Dimarts', hours: '10:00-14:00, 16:00-20:00' },
        { day: 'Dimecres', hours: '10:00-14:00, 16:00-20:00' },
        { day: 'Dijous', hours: '10:00-14:00, 16:00-20:00' },
        { day: 'Divendres', hours: '09:00-13:00, 14:00-18:30' },
      ],
      hoursClosed: 'Dissabte i diumenge tancat',
      instagramTitle: 'Instagram',
      instagramDesc: 'Segueix-nos per novetats i contingut freak',
      mapTitle: 'Ubicacio FREAKS Barbershop',
      phoneTitle: 'Telèfon',
      phoneDesc: 'Per a dubtes o preguntes, truca\'ns. Per reservar fes servir Booksy.',
      callCta: 'Truca ara',
    },
    footer: {
      address: 'Torrent de les Flors 67, Gracia',
      rights: 'Tots els drets reservats.',
      privacy: 'Politica de privacitat',
      cookies: 'Cookies',
      madeBy: 'Fet per',
      cookieBanner: {
        title: 'Utilitzem cookies',
        description: 'Aquesta web utilitza cookies per garantir el funcionament correcte del lloc. No recollim dades personals.',
        accept: 'Acceptar',
        reject: 'Rebutjar',
      },
    },
    jsonLd: {
      description: "be FREAK, it's cool. Barberia al cor de Gracia, Barcelona.",
    },
  },

  es: {
    metadata: {
      title: 'FREAKS Barbershop | Barbería en Gracia, Barcelona',
      description: "be FREAK, it's cool. Barbería en el corazón de Gracia. Torrent de les Flors 67, Barcelona.",
      keywords: ['barbería', 'barbershop', 'gracia', 'barcelona', 'freaks', 'corte de pelo', 'barber'],
      ogLocale: 'es_ES',
      ogDescription: "be FREAK, it's cool. Barbería en el corazón de Gracia, Barcelona.",
      twitterDescription: "be FREAK, it's cool. Barbería en el corazón de Gracia, Barcelona.",
    },
    hero: {
      badge: 'Ya abiertos en Gracia!',
      tagline: "be FREAK, it's cool.",
      bookNow: 'Reserva cita',
      followUs: 'Síguenos',
      howToGetHere: 'Ubicación',
      address: 'Torrent de les Flors 67 · Gracia · Barcelona',
    },
    gallery: {
      sectionTitle: 'Nuestro',
      sectionTitleHighlight: 'universo',
      sectionDesc:
        'No somos una barbería cualquiera. Somos un rincón para freaks, coleccionistas y amantes de la cultura pop.',
      imageAlt: 'Colección de figuras y memorabilia en el local',
      labelHorror: 'Horror & Pop Culture',
      musicTitle: 'Nuestra banda sonora',
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
    about: {
      sectionTitle: 'El',
      sectionTitleHighlight: 'Freak',
      name: 'Julian Ramallo',
      role: 'Fundador & Barbero',
      description: 'Freak de toda la vida. Coleccionista, amante del terror clásico y la cultura pop. Ahora lleva las tijeras y la locura a Gracia.',
      imageAlt: 'Julian Ramallo, fundador de FREAKS Barbershop',
    },
    location: {
      sectionTitle: 'Encuéntranos en',
      sectionTitleHighlight: 'Gracia',
      addressTitle: 'Dirección',
      openMaps: 'Abrir en Google Maps',
      hoursTitle: 'Horario',
      hoursSchedule: [
        { day: 'Lunes', hours: '12:00-15:00, 16:00-20:00' },
        { day: 'Martes', hours: '10:00-14:00, 16:00-20:00' },
        { day: 'Miércoles', hours: '10:00-14:00, 16:00-20:00' },
        { day: 'Jueves', hours: '10:00-14:00, 16:00-20:00' },
        { day: 'Viernes', hours: '09:00-13:00, 14:00-18:30' },
      ],
      hoursClosed: 'Sábado y domingo cerrado',
      instagramTitle: 'Instagram',
      instagramDesc: 'Síguenos para novedades y contenido freak',
      mapTitle: 'Ubicación FREAKS Barbershop',
      phoneTitle: 'Teléfono',
      phoneDesc: 'Para dudas o preguntas, llámanos. Para reservar usa Booksy.',
      callCta: 'Llamar ahora',
    },
    footer: {
      address: 'Torrent de les Flors 67, Gracia',
      rights: 'Todos los derechos reservados.',
      privacy: 'Politica de privacidad',
      cookies: 'Cookies',
      madeBy: 'Hecho por',
      cookieBanner: {
        title: 'Usamos cookies',
        description: 'Esta web utiliza cookies para garantizar el correcto funcionamiento del sitio. No recogemos datos personales.',
        accept: 'Aceptar',
        reject: 'Rechazar',
      },
    },
    jsonLd: {
      description: "be FREAK, it's cool. Barbería en el corazón de Gracia, Barcelona.",
    },
  },

  en: {
    metadata: {
      title: 'FREAKS Barbershop | Barbershop in Gracia, Barcelona',
      description: "be FREAK, it's cool. Barbershop in the heart of Gracia. Torrent de les Flors 67, Barcelona.",
      keywords: ['barbershop', 'barber', 'gracia', 'barcelona', 'freaks', 'haircut', 'barber shop'],
      ogLocale: 'en_US',
      ogDescription: "be FREAK, it's cool. Barbershop in the heart of Gracia, Barcelona.",
      twitterDescription: "be FREAK, it's cool. Barbershop in the heart of Gracia, Barcelona.",
    },
    hero: {
      badge: 'Now open in Gracia!',
      tagline: "be FREAK, it's cool.",
      bookNow: 'Book Now',
      followUs: 'Follow Us',
      howToGetHere: 'Location',
      address: 'Torrent de les Flors 67 · Gracia · Barcelona',
    },
    gallery: {
      sectionTitle: 'Our',
      sectionTitleHighlight: 'universe',
      sectionDesc:
        "We're not just any barbershop. We're a corner for freaks, collectors and pop culture lovers.",
      imageAlt: 'Collection of figures and memorabilia at the shop',
      labelHorror: 'Horror & Pop Culture',
      musicTitle: 'Our Soundtrack',
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
    about: {
      sectionTitle: 'The',
      sectionTitleHighlight: 'Freak',
      name: 'Julian Ramallo',
      role: 'Founder & Barber',
      description: 'Lifelong freak. Collector, classic horror and pop culture lover. Now bringing the scissors and the madness to Gracia.',
      imageAlt: 'Julian Ramallo, founder of FREAKS Barbershop',
    },
    location: {
      sectionTitle: 'Find us in',
      sectionTitleHighlight: 'Gracia',
      addressTitle: 'Address',
      openMaps: 'Open in Google Maps',
      hoursTitle: 'Hours',
      hoursSchedule: [
        { day: 'Monday', hours: '12:00-15:00, 16:00-20:00' },
        { day: 'Tuesday', hours: '10:00-14:00, 16:00-20:00' },
        { day: 'Wednesday', hours: '10:00-14:00, 16:00-20:00' },
        { day: 'Thursday', hours: '10:00-14:00, 16:00-20:00' },
        { day: 'Friday', hours: '09:00-13:00, 14:00-18:30' },
      ],
      hoursClosed: 'Saturday & Sunday closed',
      instagramTitle: 'Instagram',
      instagramDesc: 'Follow us for news and freak content',
      mapTitle: 'FREAKS Barbershop location',
      phoneTitle: 'Phone',
      phoneDesc: 'For questions, call us. To book, use Booksy.',
      callCta: 'Call now',
    },
    footer: {
      address: 'Torrent de les Flors 67, Gracia',
      rights: 'All rights reserved.',
      privacy: 'Privacy policy',
      cookies: 'Cookies',
      madeBy: 'Made by',
      cookieBanner: {
        title: 'We use cookies',
        description: 'This website uses cookies to ensure proper functioning. We do not collect personal data.',
        accept: 'Accept',
        reject: 'Reject',
      },
    },
    jsonLd: {
      description: "be FREAK, it's cool. Barbershop in the heart of Gracia, Barcelona.",
    },
  },
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
