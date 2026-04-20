import Image from 'next/image'
import { Skull, Clapperboard, Zap, Music } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionaries'
import { SPOTIFY_PLAYLIST_ID } from '@/lib/chat-config'

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

        {/* Horror & Pop hero image */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative group overflow-hidden aspect-[21/9] border border-freaks-yellow/10 shadow-[0_0_40px_rgba(232,169,23,0.1)]">
            <Image
              src="/images/gallery-shelf.jpg"
              alt={dict.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="inline-flex items-center gap-2 text-freaks-yellow text-base font-bold uppercase tracking-wider">
                <Clapperboard className="w-5 h-5" />
                {dict.labelHorror}
              </span>
            </div>
          </div>
        </div>

        {/* Spotify player */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          {/* Decorative glow behind */}
          <div className="absolute -inset-4 bg-freaks-yellow/5 blur-2xl rounded-full pointer-events-none" />

          <div className="relative">
            {/* Header bar */}
            <div className="flex items-center gap-3 bg-dark-700 border border-freaks-yellow/30 border-b-0 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-freaks-yellow" />
                <div className="w-2 h-2 rounded-full bg-freaks-green" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <Music className="w-4 h-4 text-freaks-yellow animate-pulse" />
                <h3 className="font-heading text-lg text-freaks-yellow tracking-wider uppercase">
                  {dict.musicTitle}
                </h3>
              </div>
              <div className="ml-auto flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-freaks-yellow/60 rounded-full"
                    style={{
                      height: `${8 + Math.random() * 12}px`,
                      animation: `pulse-glow ${0.5 + i * 0.15}s ease-in-out infinite alternate`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Player */}
            <div className="bg-dark-900 border border-freaks-yellow/30 border-t-0 p-2 shadow-[0_0_30px_rgba(232,169,23,0.15)]">
              <iframe
                src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="FREAKS Barbershop Playlist"
              />
            </div>

            {/* Bottom accent */}
            <div className="h-1 bg-gradient-to-r from-freaks-yellow/0 via-freaks-yellow/60 to-freaks-yellow/0" />
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
