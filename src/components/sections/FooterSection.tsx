import { Instagram, Scissors } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="bg-dark-900 text-gray-500 py-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Scissors className="w-5 h-5 text-freaks-yellow" />
            <span className="font-heading text-xl text-white tracking-wider uppercase">FREAKS</span>
            <span className="text-gray-600">|</span>
            <span className="text-sm">Torrent de les Flors 67, Gracia</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/freaks_barbershop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-freaks-yellow transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              @freaks_barbershop
            </a>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-700">
          &copy; {new Date().getFullYear()} FREAKS Barbershop. Tots els drets reservats.
        </div>
      </div>
    </footer>
  )
}
