import { MapPin, Instagram, Clock } from 'lucide-react'

export default function LocationSection() {
  return (
    <section id="ubicacio" className="py-20 bg-dark-900 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-freaks-green/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-5xl md:text-6xl text-white tracking-wider uppercase mb-4">
            Troba&apos;ns a <span className="text-freaks-green">Gracia</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Map */}
          <div className="relative overflow-hidden border border-white/10 min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.5!2d2.1565!3d41.4035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2ed1f5e7e4f%3A0x0!2sTorrent+de+les+Flors+67%2C+Barcelona!5e0!3m2!1sca!2ses!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicacio FREAKS Barbershop"
              className="absolute inset-0"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-freaks-yellow/10 border border-freaks-yellow/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-freaks-yellow" />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-white tracking-wider uppercase mb-1">Direccio</h3>
                <p className="text-gray-400">Torrent de les Flors, 67</p>
                <p className="text-gray-400">08024 Barcelona (Gracia)</p>
                <a
                  href="https://maps.google.com/?q=Torrent+de+les+Flors+67+Barcelona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-freaks-yellow text-sm hover:text-freaks-yellow-light transition-colors mt-2 inline-block uppercase tracking-wider font-bold"
                >
                  Obrir a Google Maps &rarr;
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-freaks-green/10 border border-freaks-green/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-freaks-green" />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-white tracking-wider uppercase mb-1">Horari</h3>
                <p className="text-freaks-yellow font-bold uppercase tracking-wider">Proximament</p>
                <p className="text-gray-500 text-sm mt-1">Aviat anunciarem l&apos;horari d&apos;obertura</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-freaks-purple/10 border border-freaks-purple/20 flex items-center justify-center flex-shrink-0">
                <Instagram className="w-6 h-6 text-freaks-purple" />
              </div>
              <div>
                <h3 className="font-heading text-2xl text-white tracking-wider uppercase mb-1">Instagram</h3>
                <a
                  href="https://instagram.com/freaks_barbershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-freaks-purple transition-colors"
                >
                  @freaks_barbershop
                </a>
                <p className="text-gray-500 text-sm mt-1">Segueix-nos per saber la data d&apos;obertura</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
