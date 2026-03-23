'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { renderCard, extractCardType, type CardType } from './ChatCards'
import { chatStrings, PROACTIVE_DELAY_MS, WHATSAPP_URL } from '@/lib/chat-config'
import type { Locale } from '@/lib/dictionaries'

interface Message {
  role: 'user' | 'assistant'
  content: string
  cardType?: CardType | null
}

interface ChatWidgetProps {
  locale: Locale
}

export default function ChatWidget({ locale }: ChatWidgetProps) {
  const strings = chatStrings[locale]
  const [isOpen, setIsOpen] = useState(false)
  const [showProactive, setShowProactive] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Proactive message after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowProactive(true)
      }
    }, PROACTIVE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [hasInteracted])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const openChat = useCallback(() => {
    setIsOpen(true)
    setShowProactive(false)
    setHasInteracted(true)
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: strings.greeting, cardType: 'SERVICES' }])
    }
  }, [messages.length, strings.greeting])

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          locale,
        }),
      })

      if (response.status === 429) {
        setMessages([...newMessages, {
          role: 'assistant',
          content: strings.errorMessage,
          cardType: 'WHATSAPP',
        }])
        setIsLoading(false)
        return
      }

      if (!response.ok || !response.body) {
        setMessages([...newMessages, {
          role: 'assistant',
          content: strings.offlineMessage,
          cardType: 'WHATSAPP',
        }])
        setIsLoading(false)
        return
      }

      // Stream the response
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      setMessages([...newMessages, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') continue

          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) {
              assistantContent += delta
              const { cleanText, cardType } = extractCardType(assistantContent)
              setMessages([...newMessages, {
                role: 'assistant',
                content: cleanText,
                cardType,
              }])
            }
          } catch {
            // Ignore parse errors in stream chunks
          }
        }
      }

      // Final extraction of card type
      const { cleanText, cardType } = extractCardType(assistantContent)
      setMessages([...newMessages, {
        role: 'assistant',
        content: cleanText,
        cardType,
      }])
    } catch {
      setMessages([...newMessages, {
        role: 'assistant',
        content: strings.offlineMessage,
        cardType: 'WHATSAPP',
      }])
    }

    setIsLoading(false)
  }, [input, isLoading, messages, locale, strings])

  return (
    <>
      {/* Proactive bubble */}
      {showProactive && !isOpen && (
        <div
          onClick={openChat}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') openChat() }}
          className="fixed bottom-24 right-4 md:right-6 z-50 bg-dark-700 border border-freaks-yellow/30 text-white px-4 py-3 rounded-2xl rounded-br-none shadow-lg max-w-[260px] text-left animate-fade-up cursor-pointer hover:border-freaks-yellow/60 transition-colors"
        >
          <p className="text-sm">{strings.proactiveMessage}</p>
          <button
            onClick={(e) => { e.stopPropagation(); setShowProactive(false); setHasInteracted(true) }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-dark-600 border border-white/10 rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            aria-label="Tancar"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Dragon floating button */}
      <button
        onClick={() => isOpen ? setIsOpen(false) : openChat()}
        className="fixed bottom-4 right-4 md:right-6 z-50 w-16 h-16 rounded-full overflow-hidden border-2 border-freaks-yellow-dark hover:border-freaks-yellow-light shadow-lg shadow-freaks-yellow/30 hover:shadow-freaks-yellow/50 transition-all duration-300 group bg-freaks-yellow"
        aria-label={isOpen ? 'Tancar xat' : 'Obrir xat'}
      >
        {isOpen ? (
          <div className="w-full h-full bg-dark-700 flex items-center justify-center">
            <X className="w-6 h-6 text-freaks-yellow" />
          </div>
        ) : (
          <div className="w-full h-full relative">
            <Image
              src="/images/dragon-btn.png"
              alt="FREAKS chat"
              fill
              className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
            />
            {/* Notification dot */}
            {!hasInteracted && (
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-freaks-yellow rounded-full border-2 border-dark-900 animate-pulse z-10" />
            )}
          </div>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:right-6 z-50 w-[340px] md:w-[380px] h-[500px] bg-dark-800 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="bg-dark-700 px-4 py-3 flex items-center gap-3 border-b border-white/5">
            <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0 border border-freaks-yellow/30">
              <Image src="/images/dragon-btn.png" alt="FREAKS" fill className="object-contain p-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">FREAKS Bot</p>
              <p className="text-freaks-green text-xs">Online</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? '' : ''}`}>
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-freaks-yellow text-dark-900 rounded-br-none'
                        : 'bg-dark-600 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.cardType && msg.role === 'assistant' && (
                    <div className="mt-1">
                      {renderCard(msg.cardType, locale)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-dark-600 px-4 py-2 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-freaks-yellow/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-freaks-yellow/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-freaks-yellow/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp quick link */}
          <div className="px-4 py-1">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-green-400 text-xs hover:text-green-300 transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              {strings.whatsappCta}
            </a>
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-white/5">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage() }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={strings.placeholder}
                className="flex-1 bg-dark-600 text-white px-3 py-2 rounded-lg text-sm placeholder-gray-500 border border-white/5 focus:border-freaks-yellow/30 focus:outline-none transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-freaks-yellow hover:bg-freaks-yellow-light disabled:opacity-30 disabled:hover:bg-freaks-yellow text-dark-900 p-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
