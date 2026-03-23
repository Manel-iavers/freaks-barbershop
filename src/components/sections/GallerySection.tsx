import Image from 'next/image'
import { Skull, Clapperboard, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionaries'

interface GallerySectionProps {
  dict: Dictionary['gallery']
}

const featureIcons: LucideIcon[] = [Skull, Clapperboard, Zap]

export default function GallerySection({ dict }: GallerySectionProps) {
  return (
    <section className="py-20 bg-dark-800 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-freaks-yellow/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl text-white tracking-wider uppercase mb-4">
            {dict.sectionTitle} <span className="text-freaks-yellow">{dict.sectionTitleHighlight}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {dict.sectionDesc}
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {/* Main large image */}
          <div className="md:col-span-2 relative group overflow-hidden aspect-[16/9]">
            <Image
              src="/images/gallery-shelf.jpg"
              alt={dict.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center gap-2 text-freaks-yellow text-sm font-bold uppercase tracking-wider">
                <Clapperboard className="w-4 h-4" />
                {dict.labelHorror}
              </span>
            </div>
          </div>

          {/* Keychain image */}
          <div className="relative group overflow-hidden aspect-[3/4] md:aspect-auto">
            <Image
              src="/images/keychain.jpg"
              alt={dict.keychainAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center gap-2 text-freaks-yellow text-sm font-bold uppercase tracking-wider">
                <Skull className="w-4 h-4" />
                {dict.labelMerch}
              </span>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.features.map((feature, index) => {
            const Icon = featureIcons[index]
            return (
              <div
                key={feature.title}
                className="bg-dark-700 border border-white/5 p-6 group hover:border-freaks-yellow/20 transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-freaks-yellow mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-xl text-white tracking-wider uppercase mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
