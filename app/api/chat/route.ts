import { streamText, convertToModelMessages } from 'ai'
import { openai } from '@ai-sdk/openai'
import { getRelevantContext } from '@/lib/chatbot/vector-utils'

const SYSTEM_PROMPTS = {
  de: `Du bist ein hilfreicher AI-Assistent für xelvetec.ch. Du sprichst perfekt Deutsch und hilfst Kunden mit allen Fragen zu unseren Dienstleistungen.

Unsere Services:
- Moderne Webentwicklung und Design
- SEO-Optimierung
- Hosting und technische Unterstützung
- E-Commerce Lösungen
- App-Entwicklung

Regeln:
- Antworte immer auf Deutsch, es sei denn der Nutzer bittet ausdrücklich um eine andere Sprache
- Sei freundlich, professionell und hilfsbereit
- Zitiere spezifische Informationen aus der Wissensdatenbank wenn relevant
- Wenn du keine Antwort findest, sage ehrlich Bescheid und biete an, den Support zu kontaktieren
- Beende deine Antworten mit einem klaren Call-to-Action wenn angemessen`,

  tr: `Sen xelvetec.ch için yardımcı bir yapay zeka asistanısın. Türkçeyi kusursuz şekilde konuşur ve müşterilerin hizmetlerimizle ilgili tüm sorularında yardım edersin.

Hizmetlerimiz:
- Modern web geliştirme ve tasarım
- SEO optimizasyonu
- Hosting ve teknik destek
- E-ticaret çözümleri
- Uygulama geliştirme

Kurallar:
- Kullanıcı açıkça başka bir dil istememedikçe her zaman Türkçe yanıt ver
- Dost canlı, profesyonel ve yardımcı ol
- Bilgi tabanından ilgili belirli bilgileri alıntıla
- Cevap bulamazsan açık sözlü ol ve desteğe başvurmayı öner
- Uygunsa yanıtını açık bir harekete geçir çağrısıyla bitir`,

  en: `You are a helpful AI assistant for xelvetec.ch. You speak perfect English and help customers with all questions about our services.

Our Services:
- Modern web development and design
- SEO optimization
- Hosting and technical support
- E-commerce solutions
- App development

Rules:
- Always respond in English unless the user explicitly asks for another language
- Be friendly, professional, and helpful
- Quote specific information from the knowledge base when relevant
- If you can't find an answer, be honest and offer to contact support
- End your responses with a clear call-to-action when appropriate`,
}

function detectLanguage(message: string): 'de' | 'tr' | 'en' {
  // Simple language detection based on common words
  const germanWords = ['wie', 'was', 'wo', 'wann', 'warum', 'ich', 'mein', 'der', 'die', 'das']
  const turkishWords = ['nasıl', 'ne', 'nerde', 'ne zaman', 'niye', 'ben', 'benim', 'bir', 'bu']

  const lowerMessage = message.toLowerCase()
  const germanCount = germanWords.filter((w) => lowerMessage.includes(w)).length
  const turkishCount = turkishWords.filter((w) => lowerMessage.includes(w)).length

  if (germanCount > turkishCount && germanCount > 0) return 'de'
  if (turkishCount > 0) return 'tr'
  return 'en'
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 })
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== 'user') {
      return new Response('Invalid message format', { status: 400 })
    }

    const userMessage =
      typeof lastMessage.content === 'string'
        ? lastMessage.content
        : lastMessage.content?.[0]?.text || ''

    if (!userMessage.trim()) {
      return new Response('Empty message', { status: 400 })
    }

    // Detect language from user message
    const language = detectLanguage(userMessage)

    // Get relevant context from knowledge base
    const relevantContext = await getRelevantContext(userMessage, language)

    // Build system prompt with context
    const contextSection = relevantContext 
      ? `\n\nRelevante Informationen aus unserer Wissensdatenbank:\n${relevantContext}`
      : ''
    
    const systemPrompt = `${SYSTEM_PROMPTS[language]}${contextSection}`

    // Convert messages to model format
    const modelMessages = await convertToModelMessages(messages)

    // Stream the response
    const result = streamText({
      model: openai('gpt-4-turbo'),
      system: systemPrompt,
      messages: modelMessages,
      temperature: 0.7,
      maxTokens: 1024,
    })

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
    })
  } catch (error) {
    console.error('[v0] Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
