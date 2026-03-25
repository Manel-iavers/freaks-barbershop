import type { Metadata } from 'next'
import Link from 'next/link'
import { locales, defaultLocale, type Locale } from '@/lib/dictionaries'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Politica de Privacitat | FREAKS Barbershop',
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale

  return (
    <main className="min-h-screen bg-dark-950 text-gray-300 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-heading text-white tracking-wider uppercase mb-8">
          Politica de Privacitat
        </h1>

        <p className="text-sm text-gray-500 mb-8">Ultima actualitzacio: marc 2026</p>

        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-heading text-white tracking-wide mb-3">1. Responsable del tractament</h2>
            <p>
              Julian Ramallo (FREAKS Barbershop), amb domicili a Torrent de les Flors 67, Gracia, Barcelona.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-white tracking-wide mb-3">2. Dades que recollim</h2>
            <p className="mb-2">
              Aquesta web no recull dades personals a traves de formularis ni xatbots.
              Unicament utilitzem cookies tecniques necessaries per al funcionament correcte del lloc web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-white tracking-wide mb-3">3. Cookies</h2>
            <p className="mb-2">Aquesta web utilitza les seguents cookies:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-gray-200">Cookies tecniques:</strong> Necessaries per al funcionament del lloc (preferencia d&apos;idioma, consentiment de cookies).</li>
              <li><strong className="text-gray-200">Cookies d&apos;allotjament:</strong> Vercel pot establir cookies tecniques per al lliurament del contingut.</li>
            </ul>
            <p className="mt-2">
              No utilitzem cookies d&apos;analisi, publicitat ni seguiment de tercers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-white tracking-wide mb-3">4. Base legal</h2>
            <p>
              El tractament es basa en l&apos;interes legitim per garantir el funcionament
              correcte del lloc web (art. 6.1.f RGPD) i en el consentiment de l&apos;usuari
              per a les cookies no essencials (art. 6.1.a RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-white tracking-wide mb-3">5. Drets</h2>
            <p className="mb-2">Tens dret a:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Accedir a les teves dades personals</li>
              <li>Rectificar dades inexactes</li>
              <li>Sol·licitar l&apos;eliminacio de les dades</li>
              <li>Oposar-te al tractament</li>
              <li>Portabilitat de les dades</li>
            </ul>
            <p className="mt-2">
              Pots gestionar les cookies des de la configuracio del teu navegador en qualsevol moment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-white tracking-wide mb-3">6. Reclamacions</h2>
            <p>
              Si consideres que el tractament no es adequat, pots presentar una
              reclamacio davant l&apos;Autoritat Catalana de Proteccio de Dades (APDCAT)
              o l&apos;Agencia Espanyola de Proteccio de Dades (AEPD).
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link
            href={`/${safeLocale}`}
            className="text-freaks-yellow hover:text-freaks-yellow/80 transition-colors"
          >
            &larr; Tornar a la pagina principal
          </Link>
        </div>
      </div>
    </main>
  )
}
