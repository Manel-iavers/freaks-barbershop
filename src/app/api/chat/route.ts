import { NextRequest } from 'next/server'
import { getSystemPrompt, MLX_MODEL, MAX_MESSAGES_PER_MINUTE, MAX_HISTORY_MESSAGES } from '@/lib/chat-config'
import type { Locale } from '@/lib/dictionaries'
import { locales } from '@/lib/dictionaries'

// Force edge runtime for faster cold starts and longer timeouts
export const runtime = 'edge'

// Simple in-memory rate limiter (resets on deploy - fine for landing)
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
    return new Response(JSON.stringify({ error: 'rate_limit' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: { messages: Array<{ role: string; content: string }>; locale: string }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { messages, locale: rawLocale } = body
  const locale: Locale = locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : 'ca'

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'no_messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
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
        stream: true,
        max_tokens: 200,
        temperature: 0.7,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'unknown')
      console.error(`MLX error: ${response.status} - ${errorText}`)
      return new Response(JSON.stringify({ error: 'llm_error', status: response.status }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return new Response(JSON.stringify({ error: 'connection_error', detail: String(err) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
