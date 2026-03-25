'use client'

import { useState, useEffect } from 'react'
import type { Dictionary } from '@/lib/dictionaries'

interface CookieBannerProps {
  dict: Dictionary['footer']['cookieBanner']
}

const STORAGE_KEY = 'freaks-cookie-consent'

export default function CookieBanner({ dict }: CookieBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      setVisible(true)
    }
  }, [])

  function handleConsent(value: 'accepted' | 'rejected') {
    localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-2xl mx-auto bg-dark-900/95 backdrop-blur-sm border border-white/10 rounded-xl p-5 shadow-2xl">
        <p className="text-white font-heading text-lg tracking-wide mb-1">{dict.title}</p>
        <p className="text-gray-400 text-sm mb-4">{dict.description}</p>
        <div className="flex gap-3">
          <button
            onClick={() => handleConsent('accepted')}
            className="px-5 py-2 bg-freaks-yellow text-black text-sm font-bold rounded-lg hover:bg-freaks-yellow/90 transition-colors"
          >
            {dict.accept}
          </button>
          <button
            onClick={() => handleConsent('rejected')}
            className="px-5 py-2 bg-white/10 text-gray-300 text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
          >
            {dict.reject}
          </button>
        </div>
      </div>
    </div>
  )
}
