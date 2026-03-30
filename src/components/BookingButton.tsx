'use client'

import { Calendar } from 'lucide-react'
import { BOOKSY_URL } from '@/lib/chat-config'

interface BookingButtonProps {
  label: string
}

export default function BookingButton({ label }: BookingButtonProps) {
  return (
    <a
      href={BOOKSY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-freaks-yellow hover:bg-freaks-yellow-light text-dark-900 font-bold uppercase tracking-wider text-sm px-5 py-3 shadow-lg shadow-freaks-yellow/20 transition-all duration-200 hover:scale-105"
      aria-label={label}
    >
      <Calendar className="w-5 h-5" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  )
}
