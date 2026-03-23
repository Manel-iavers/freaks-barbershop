import { Instagram, MapPin, Scissors } from 'lucide-react'
import Image from 'next/image'
import type { Dictionary } from '@/lib/dictionaries'

interface HeroSectionProps {
  dict: Dictionary['hero']
}

export default function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grain-overlay">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-shelf.jpg"
          alt="FREAKS Barbershop interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/85 via-dark-900/75 to-dark-900" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-freaks-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-freaks-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Opening date badge */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 bg-freaks-yellow/10 backdrop-blur-sm text-freaks-yellow text-sm font-bold uppercase tracking-[0.2em] px-6 py-2 border border-freaks-yellow/30 mb-4 animate-pulse-glow">
              <Scissors className="w-4 h-4" />
              {dict.badge}
            </span>
            <p className="text-freaks-green font-heading text-lg tracking-wider uppercase mb-4">
              {dict.openingDate}
            </p>
          </div>

          {/* Dragon logo */}
          <div className="mb-6" style={{ animation: 'fade-up 0.8s ease-out 0.1s both' }}>
            <div className="w-32 h-32 md:w-40 md:h-40 relative mx-auto">
              <Image
                src="/images/dragon-logo.jpg"
                alt="FREAKS dragon logo"
                fill
                className="object-contain rounded-full border-2 border-freaks-yellow/50"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] text-freaks-yellow leading-none tracking-wide mb-4" style={{ animation: 'fade-up 0.8s ease-out 0.2s both' }}>
            FREAKS
          </h1>

          <p className="font-heading text-2xl md:text-4xl text-white/90 tracking-[0.15em] uppercase mb-2" style={{ animation: 'fade-up 0.8s ease-out 0.25s both' }}>
            Barbershop
          </p>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-400 mb-10 italic" style={{ animation: 'fade-up 0.8s ease-out 0.3s both' }}>
            {dict.tagline}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16" style={{ animation: 'fade-up 0.8s ease-out 0.4s both' }}>
            <a
              href="https://instagram.com/freaks_barbershop"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-freaks text-lg px-8 py-4"
            >
              <Instagram className="w-5 h-5" />
              {dict.followUs}
            </a>
            <a
              href="#ubicacio"
              className="inline-flex items-center justify-center gap-2 text-gray-300 hover:text-freaks-yellow px-8 py-4 font-bold uppercase tracking-wider transition-all duration-200 border border-white/20 hover:border-freaks-yellow/50"
            >
              <MapPin className="w-5 h-5" />
              {dict.howToGetHere}
            </a>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2 text-gray-500" style={{ animation: 'fade-up 0.8s ease-out 0.5s both' }}>
            <MapPin className="w-4 h-4 text-freaks-yellow/60" />
            <span className="text-sm uppercase tracking-[0.15em]">{dict.address}</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-freaks-yellow/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
