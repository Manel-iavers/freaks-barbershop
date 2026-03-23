import { NextRequest } from 'next/server'
import { getSystemPrompt, MLX_MODEL, MAX_MESSAGES_PER_MINUTE, MAX_HISTORY_MESSAGES } from '@/lib/chat-config'
import type { Locale } from '@/lib/dictionaries'
import { locales } from '@/lib/dictionaries'

export const runtime = 'edge'

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }

  if (entry.count >= MAX_MESSAGES_PER_MINUTE) {
    return false
  }

  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (!checkRateLimit(ip)) {
    return Response.json({ error: 'rate_limit' }, { status: 429 })
  }

  let body: { messages: Array<{ role: string; content: string }>; locale: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'invalid_body' }, { status: 400 })
  }

  const { messages, locale: rawLocale } = body
  const locale: Locale = locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : 'ca'

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'no_messages' }, { status: 400 })
  }

  const recentMessages = messages.slice(-MAX_HISTORY_MESSAGES)
  const mlxUrl = process.env.MLX_API_URL || 'http://localhost:8090'

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 25000)

    const response = await fetch(`${mlxUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MLX_MODEL,
        messages: [
          { role: 'system', content: getSystemPrompt(locale) },
          ...recentMessages,
        ],
        stream: false,
        max_tokens: 200,
        temperature: 0.7,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      console.error(`MLX error: ${response.status}`)
      return Response.json({ error: 'llm_error' }, { status: 502 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''

    return Response.json({ content })
  } catch (err) {
    console.error('Chat API error:', err)
    return Response.json({ error: 'connection_error' }, { status: 502 })
  }
}
