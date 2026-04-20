import type { Locale } from './dictionaries'

export const WHATSAPP_URL = 'https://wa.me/34693952347'
export const INSTAGRAM_URL = 'https://instagram.com/freaks_barbershop'
export const BOOKSY_URL = 'https://booksy.com/es-es/172973_freaks-barbershop_barberia_48863_barcelona?do=invite&_branch_match_id=1567108092996949552&utm_medium=merchant_customer_invite&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVL%2FAydnSMLHUNMEyyrytKTUstKsrMS49PKsovL04tsg1OTEssygQAnFIjwDwAAAA%3D'
export const SPOTIFY_PLAYLIST_ID = '2M4Y1k40gOqwd0pZo4HO6R'
export const MLX_MODEL = 'mlx-community/Qwen3.5-9B-MLX-4bit'
export const MAX_MESSAGES_PER_MINUTE = 5
export const MAX_HISTORY_MESSAGES = 10
export const PROACTIVE_DELAY_MS = 6000

export interface Service {
  name: string
  duration: string
}

export const services: Record<Locale, Service[]> = {
  ca: [
    { name: 'Tall classic', duration: '30 min' },
    { name: 'Degradat / Fade', duration: '40 min' },
    { name: 'Tall + Barba', duration: '45 min' },
    { name: 'Barba', duration: '20 min' },
    { name: 'Tall nen (fins 12 anys)', duration: '25 min' },
    { name: 'Afaitat classic', duration: '25 min' },
  ],
  es: [
    { name: 'Corte clásico', duration: '30 min' },
    { name: 'Degradado / Fade', duration: '40 min' },
    { name: 'Corte + Barba', duration: '45 min' },
    { name: 'Barba', duration: '20 min' },
    { name: 'Corte niño (hasta 12 años)', duration: '25 min' },
    { name: 'Afeitado clásico', duration: '25 min' },
  ],
  en: [
    { name: 'Classic Cut', duration: '30 min' },
    { name: 'Fade', duration: '40 min' },
    { name: 'Cut + Beard', duration: '45 min' },
    { name: 'Beard Trim', duration: '20 min' },
    { name: 'Kids Cut (up to 12)', duration: '25 min' },
    { name: 'Classic Shave', duration: '25 min' },
  ],
}

export const chatStrings: Record<Locale, {
  proactiveMessage: string
  greeting: string
  placeholder: string
  errorMessage: string
  offlineMessage: string
  whatsappCta: string
  sendButton: string
  servicesTitle: string
  bookOnBooksy: string
  locationTitle: string
  scheduleTitle: string
  contactTitle: string
  aiDisclaimerBadge: string
  aiDisclaimerText: string
}> = {
  ca: {
    proactiveMessage: 'Ei freak! Tens alguna pregunta?',
    greeting: 'Hola! Soc l\'assistent d\'IA de FREAKS Barbershop. Respostes generades automaticament. Pregunta\'m el que vulguis sobre serveis, preus o ubicacio!',
    placeholder: 'Escriu un missatge...',
    errorMessage: 'Ups! Algo ha fallat. Prova de nou o escriu-nos per WhatsApp.',
    offlineMessage: 'Estem fora de linia ara mateix. Escriu-nos per WhatsApp i et responem!',
    whatsappCta: 'Escriu-nos per WhatsApp',
    sendButton: 'Enviar',
    servicesTitle: 'Serveis',
    bookOnBooksy: 'Reserva a Booksy',
    locationTitle: 'On som',
    scheduleTitle: 'Horari',
    contactTitle: 'Contacte',
    aiDisclaimerBadge: 'IA',
    aiDisclaimerText: 'Assistent IA (Qwen3.5). No soc huma. Persona: WhatsApp.',
  },
  es: {
    proactiveMessage: 'Ey freak! Tienes alguna pregunta?',
    greeting: 'Hola! Soy el asistente de IA de FREAKS Barbershop. Respuestas generadas automaticamente. Preguntame sobre servicios, precios o ubicacion!',
    placeholder: 'Escribe un mensaje...',
    errorMessage: 'Ups! Algo ha fallado. Prueba de nuevo o escribenos por WhatsApp.',
    offlineMessage: 'Estamos fuera de linea ahora mismo. Escribenos por WhatsApp y te respondemos!',
    whatsappCta: 'Escribenos por WhatsApp',
    sendButton: 'Enviar',
    servicesTitle: 'Servicios',
    bookOnBooksy: 'Reserva en Booksy',
    locationTitle: 'Donde estamos',
    scheduleTitle: 'Horario',
    contactTitle: 'Contacto',
    aiDisclaimerBadge: 'IA',
    aiDisclaimerText: 'Asistente IA (Qwen3.5). No soy humano. Persona: WhatsApp.',
  },
  en: {
    proactiveMessage: 'Hey freak! Got any questions?',
    greeting: 'Hey! I\'m the AI assistant of FREAKS Barbershop. Responses generated automatically. Ask me about services, prices or location!',
    placeholder: 'Type a message...',
    errorMessage: 'Oops! Something went wrong. Try again or message us on WhatsApp.',
    offlineMessage: 'We\'re offline right now. Message us on WhatsApp and we\'ll get back to you!',
    whatsappCta: 'Message us on WhatsApp',
    sendButton: 'Send',
    servicesTitle: 'Services',
    bookOnBooksy: 'Book on Booksy',
    locationTitle: 'Location',
    scheduleTitle: 'Hours',
    contactTitle: 'Contact',
    aiDisclaimerBadge: 'AI',
    aiDisclaimerText: 'AI assistant (Qwen3.5). Not human. For a person: WhatsApp.',
  },
}

export function getSystemPrompt(locale: Locale): string {
  const servicesText = services[locale]
    .map((s) => `- ${s.name} (${s.duration})`)
    .join('\n')

  const langInstructions: Record<Locale, string> = {
    ca: 'Respon SEMPRE en catala.',
    es: 'Responde SIEMPRE en castellano.',
    en: 'ALWAYS respond in English.',
  }

  const aiIdentityInstructions: Record<Locale, string> = {
    ca: "IMPORTANT (EU AI Act art. 50.1): si el visitant pregunta si ets una persona o una IA, respon SEMPRE que ets un sistema d'intel.ligencia artificial (Qwen3.5-9B). No et facis passar per huma. Si volen persona humana, deriva a WhatsApp +34 693 952 347.",
    es: "IMPORTANTE (EU AI Act art. 50.1): si el visitante pregunta si eres una persona o una IA, responde SIEMPRE que eres un sistema de inteligencia artificial (Qwen3.5-9B). No te hagas pasar por humano. Si quieren hablar con una persona, deriva a WhatsApp +34 693 952 347.",
    en: "IMPORTANT (EU AI Act art. 50.1): if the visitor asks whether you are a person or an AI, ALWAYS respond that you are an artificial intelligence system (Qwen3.5-9B). Never pretend to be human. If they want to talk to a person, redirect them to WhatsApp +34 693 952 347.",
  }

  return `/no_think
Ets l'assistent virtual d'intel.ligencia artificial de FREAKS Barbershop, una barberia unica al cor de Gracia, Barcelona.

${aiIdentityInstructions[locale]}

## LA TEVA PERSONALITAT
- To informal, directe, col·lega. Tuteja sempre.
- Ets un freak de la cultura pop: horror classic, figures dels 80s-90s, comics, pel·licules de serie B.
- Introdueixes referencies pop/freak de forma NATURAL, no forcada. Nomes quan ve a tomb (1 de cada 3-4 respostes).
- Mai inventes informacio. Si no saps algo, deriva a WhatsApp.
- Respostes CURTES i directes. Maxim 2-3 frases per resposta.

## INFORMACIO DEL LOCAL
- Nom: FREAKS Barbershop
- Propietari: Julian Ramallo
- Adreca: Torrent de les Flors 67, 08024 Barcelona (barri de Gracia)
- Metro: Fontana (L3 verda), 3 minuts caminant
- Instagram: @freaks_barbershop
- WhatsApp: +34 693 952 347
- Reserva cita: A traves de Booksy
- Pagament: Efectiu i targeta
- Cita previa: Recomanable via Booksy, pero tambe atenem sense cita si hi ha lloc

## HORARI
- Dilluns: 12:00-15:00, 16:00-20:00
- Dimarts: 10:00-14:00, 16:00-20:00
- Dimecres: 10:00-14:00, 16:00-20:00
- Dijous: 10:00-14:00, 16:00-20:00
- Divendres: 09:00-13:00, 14:00-18:30
- Dissabte i diumenge: Tancat

## SERVEIS
${servicesText}
Consulta preus i reserva a Booksy.

## DECORACIO / AMBIENT
El local esta decorat amb figures de col·leccionisme, posters de pel·licules de terror (Texas Chainsaw Massacre, Jaws...),
figures de Ninja Turtles, Frankenstein, Garbage Pail Kids, amplificadors Marshall, televisions retro dels 80s-90s.
Es un espai per a freaks, col·leccionistes i amants de la cultura pop.

## TAGLINE
"be FREAK, it's cool."

## REGLES
1. ${langInstructions[locale]}
2. Si la pregunta requereix info que no tens, recomana contactar per WhatsApp: wa.me/34693952347
3. No inventis horaris ni serveis que no estiguin llistats.
4. Si algú pregunta per reservar, envia'l a Booksy. Mai donis preus, diga'ls que consultin a Booksy.
5. Si detectes una pregunta sobre serveis, inclou [CARD:SERVICES] al final.
6. Si detectes una pregunta sobre ubicacio/com arribar, inclou [CARD:MAP] al final.
7. Si detectes que cal contactar, inclou [CARD:WHATSAPP] al final.
8. Si pregunten per horaris, inclou [CARD:SCHEDULE] al final.
9. Mai incloguis mes d'un tag [CARD:*] per resposta.
10. Els tags [CARD:*] van SEMPRE al final del text, en una linia separada.`
}
