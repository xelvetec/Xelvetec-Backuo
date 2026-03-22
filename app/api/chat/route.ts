import { streamText, convertToModelMessages } from 'ai'
import { openai } from '@ai-sdk/openai'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

// Import getRelevantContext but handle errors gracefully
let getRelevantContext: (query: string, language: string) => Promise<string>
try {
  const vectorUtils = require('@/lib/chatbot/vector-utils')
  getRelevantContext = vectorUtils.getRelevantContext
} catch (err) {
  console.warn('[v0] Vector utils not available, using fallback')
  getRelevantContext = async () => ''
}

function detectLanguage(text: string): 'de' | 'tr' | 'en' {
  const turkishChars = /[çğıöşüÇĞİÖŞÜ]/
  const germanChars = /[äöüßÄÖÜ]/

  if (turkishChars.test(text)) return 'tr'
  if (germanChars.test(text)) return 'de'
  return 'en'
}

const SYSTEM_PROMPTS = {
  de: `Du bist ein hilfreicher AI-Assistent für xelvetec.ch. Du sprichst perfekt Deutsch, Türkisch und Englisch.

Du hilfst Kunden mit Fragen zu unseren Services wie Webentwicklung, SEO, Hosting, E-Commerce und App-Entwicklung.

Sei freundlich, professionell und hilfsbereit. Wenn du etwas nicht weißt, sage ehrlich Bescheid und leite zum Support weiter.`,
  tr: `Sen xelvetec.ch için yardımcı bir yapay zeka asistanısın. Türkçe, Almanca ve İngilizce mükemmel şekilde konuşursun.

Web geliştirme, SEO, barındırma, e-ticaret ve uygulama geliştirme gibi hizmetlerimiz hakkında müşterilere yardım edersin.

Dost canlı, profesyonel ve yardımcı ol. Bir şey bilmiyorsan dürüst ol ve desteğe yönlendir.`,
  en: `You are a helpful AI assistant for xelvetec.ch. You speak German, Turkish and English perfectly.

You help customers with questions about our services like web development, SEO, hosting, e-commerce and app development.

Be friendly, professional and helpful. If you don't know something, be honest and direct them to support.`,
}

export async function POST(req: Request) {
  console.log('[v0] Chat API called')

  try {
    const body = await req.json()
    console.log('[v0] Body received, keys:', Object.keys(body))

    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      console.error('[v0] Invalid messages:', messages)
      return new Response(
        JSON.stringify({ error: 'Invalid messages' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log('[v0] Got', messages.length, 'messages')

    // Get last user message
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage) {
      return new Response(JSON.stringify({ error: 'No messages' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let userText = ''
    if (typeof lastMessage.content === 'string') {
      userText = lastMessage.content
    } else if (Array.isArray(lastMessage.content)) {
      const part = lastMessage.content.find((p: any) => p.type === 'text')
      userText = part?.text || ''
    }

    console.log('[v0] User text:', userText.substring(0, 50))

    if (!userText.trim()) {
      return new Response(JSON.stringify({ error: 'Empty message' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Detect language
    const language = detectLanguage(userText)
    console.log('[v0] Language:', language)

    // Try to get context from knowledge base
    let contextText = ''
    try {
      if (getRelevantContext) {
        contextText = await getRelevantContext(userText, language)
        console.log('[v0] Context:', contextText.length, 'chars')
      }
    } catch (err) {
      console.warn('[v0] Could not get context:', err)
    }

    // Build system prompt
    const systemPrompt = `${SYSTEM_PROMPTS[language]}
    
${contextText ? `\nReferenz-Informationen:\n${contextText}` : ''}`

    console.log('[v0] System prompt ready, length:', systemPrompt.length)

    // Convert messages
    console.log('[v0] Converting messages...')
    let modelMessages: any[]
    try {
      modelMessages = await convertToModelMessages(messages)
    } catch (err) {
      console.error('[v0] Conversion failed:', err)
      modelMessages = messages.map((m: any) => ({
        role: m.role,
        content: typeof m.content === 'string' ? m.content : '',
      }))
    }

    console.log('[v0] Starting stream...')

    // Stream response
    const result = streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages: modelMessages,
      temperature: 0.7,
      maxTokens: 1024,
    })

    console.log('[v0] Returning response')

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
    })
  } catch (error) {
    console.error('[v0] Error:', error)
    const msg = error instanceof Error ? error.message : String(error)
    return new Response(
      JSON.stringify({ error: 'Error', message: msg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
