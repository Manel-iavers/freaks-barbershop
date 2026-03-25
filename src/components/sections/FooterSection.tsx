import Image from 'next/image'
import { Instagram, Scissors } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionaries'

interface FooterSectionProps {
  dict: Dictionary['footer']
  locale: string
}

export default function FooterSection({ dict, locale }: FooterSectionProps) {
  return (
    <footer className="bg-dark-900 text-gray-500 py-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Scissors className="w-5 h-5 text-freaks-yellow" />
            <span className="font-heading text-xl text-white tracking-wider uppercase">FREAKS</span>
            <span className="text-gray-600">|</span>
            <span className="text-sm">{dict.address}</span>
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

        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mt-6 text-xs text-gray-600">
          <span>&copy; {new Date().getFullYear()} FREAKS Barbershop. {dict.rights}</span>
          <span className="hidden md:inline text-gray-700">·</span>
          <a
            href={`/${locale}/privacy`}
            className="hover:text-freaks-yellow transition-colors"
          >
            {dict.privacy}
          </a>
          <span className="hidden md:inline text-gray-700">·</span>
          <span>{dict.cookies}</span>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
          <span>{dict.madeBy}</span>
          <a
            href="https://iavers.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-200 transition-colors"
          >
            <Image
              src="/images/iavers-logo.png"
              alt="IAvers"
              width={22}
              height={22}
              className="rounded-sm"
            />
            <span className="font-medium">IAvers</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
