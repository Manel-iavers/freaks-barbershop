import Image from 'next/image'
import { Instagram } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionaries'

interface AboutSectionProps {
  dict: Dictionary['about']
}

export default function AboutSection({ dict }: AboutSectionProps) {
  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-freaks-purple/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="relative group">
            <div className="relative aspect-[3/4] max-w-md mx-auto overflow-hidden border-2 border-freaks-yellow/20 group-hover:border-freaks-yellow/40 transition-colors duration-500">
              <Image
                src="/images/juli-portrait.jpg"
                alt={dict.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
            </div>
            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-freaks-yellow/40" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-freaks-yellow/40" />
          </div>

          {/* Text */}
          <div>
            <h2 className="font-heading text-5xl md:text-6xl text-white tracking-wider uppercase mb-6">
              {dict.sectionTitle} <span className="text-freaks-purple">{dict.sectionTitleHighlight}</span>
            </h2>

            <div className="mb-6">
              <p className="font-heading text-2xl text-freaks-yellow tracking-wider uppercase">{dict.name}</p>
              <p className="text-gray-500 text-sm uppercase tracking-[0.2em]">{dict.role}</p>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {dict.description}
            </p>

            <a
              href="https://instagram.com/freaks_barbershop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-freaks-purple hover:text-freaks-purple-dark transition-colors font-bold uppercase tracking-wider text-sm"
            >
              <Instagram className="w-5 h-5" />
              @freaks_barbershop
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
